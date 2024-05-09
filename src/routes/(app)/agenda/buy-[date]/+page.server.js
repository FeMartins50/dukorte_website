import { redirect } from "@sveltejs/kit";
import * as bookings from "$lib/server/bookings.js";
import * as payments from "$lib/server/payments.js";
import * as clube from "$lib/server/clube.js";

export function load ({ params, locals }) {
    if (!locals.user) {
        redirect(302, "/");
    }
    if (bookings.getStatus(params.date)) {
        redirect(302, "/");
    }
    const clubeInfo = clube.getClubeInfo(locals.user.email);
    return {
        clubeInfo: clubeInfo,
        params: params
    }
}

export const actions = {
    reserve: async ({ request, locals, params }) => {
        const data = await request.formData();

        const tesoura = data.get('tesoura') ? true : false;
        const sobrancelha = data.get('sobrancelha') ? true : false;
        const pezinho = data.get('pezinho') ? true : false;
        const quarto = data.get('quarto') ? data.get('quarto') : false;

        bookings.prepareBooking (
            params.date, 
            locals.user.name+ "-" +locals.user.squad,
            JSON.stringify({ tesoura: tesoura, sobrancelha: sobrancelha, pezinho: pezinho, quarto: quarto })
        );

        const clubeInfo = clube.getClubeInfo(locals.user.email);
        let qtdcortes = 0, incluidosob = false;
        if (clubeInfo) {
            qtdcortes = clubeInfo.qtdcortes;
            incluidosob = clubeInfo.incluidosob;
        }
        let value = (qtdcortes > 0 ? 0 : 13) + (tesoura ? 3 : 0) + (sobrancelha && !incluidosob ? 3 : 0) + (pezinho ? 1 : 0);
        if (clubeInfo) {
            clube.decrementCorte(locals.user.email);
        }

        if (value <= 0) {
            bookings.reserveBooking (params.date);
            redirect(302, "/perfil");
        }

        let timeToLive = 15*60*1000;
        const timeout = new Date().getTime() + timeToLive;
        // UTC TIME
        const pixId = crypto.randomUUID();
        payments.registerCharge (
            locals.user.email,
            value,
            params.date,
            timeout,
            pixId
        );
        setTimeout(() => {
            // Se já está reservado, é porque pagamento já foi processado em outro lugar.
            if (bookings.getStatus(params.date) == 2) {
                return payments.deleteCharge(pixId);;
            }
            // Senão, vamos ver se ele pagou mesmo. Pode ter dado algum erro, sei lá.
            const charge = payments.getCharge(pixId);
            if (charge.status == "1") {
                bookings.reserveBooking(charge.date);
            } else {
                bookings.clearBooking(charge.date);
            }
            payments.deleteCharge(pixId);
        }, timeToLive);

        redirect(302, "/agenda/pagamento");
    }
}
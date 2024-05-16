import { getUserDebt, updateChargeStatus } from "$lib/server/payments.js";
import { reserveBooking } from "$lib/server/bookings.js";
import { writeFileSync } from 'fs';
import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
    let debts = [];
    debts = getUserDebt(locals.user.email);
    return {
        debts: debts
    };
}

export const actions = {
    saveVoucher: async ({ locals, request }) => {
        const formData = await request.formData();
        const file = formData.get("voucher");
        const date = formData.get("date");
        const value = formData.get("value");
        const pixId = formData.get("pixId");

        if ( !file.name || file.name == 'undefined' ) {
            return fail(400, {
                error: true,
                message: 'Você precisa enviar um arquivo.'
            });
        }
        /* if (!file.name.endsWith(".pdf")) {
            return fail(400, {
                error: true,
                message: 'O arquivo precisa ser pdf.'
            });
        } */
        const fileType = file.name.split('.').pop();
        // Nome do arquivo: [date]_[value]_[user.name]_[user_squad]
        const fileName = (date.replaceAll(":", "")) +"_"+ value +"_"+ locals.user.name +"_"+ locals.user.squad;
        console.log(fileName);
        // Write the file to the comprovantes folder
        writeFileSync(`./comprovantes/${fileName}.${fileType}`, Buffer.from(await file.arrayBuffer()));
        updateChargeStatus(pixId);
        reserveBooking(date);

        redirect(302, "/");
    }
}
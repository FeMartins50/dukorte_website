import { getBookingsByCustomer } from "$lib/server/bookings.js"
import { getClubeInfo } from "$lib/server/clube.js";

export const load = ({ locals }) => {
    const bookings = getBookingsByCustomer(locals.user.name+"-"+locals.user.squad);
    let date = new Date(new Date().getTime() - 3*60*60*1000);
    let dayStr = date.toISOString();
    let futureKortes = [], pastKortes = [];

    bookings.forEach(booking => {
        if (booking.status != 2) {
            return;
        }
        if (booking.date.substring(0, 10) >= dayStr) {
            futureKortes.push(booking);
        } else {
            pastKortes.push(booking);
        }
    });

    const clube = getClubeInfo(locals.user.email);
    return {
        futureKortes: futureKortes,
        pastKortes: pastKortes,
        clube: clube
    }
}
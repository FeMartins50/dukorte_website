import { getBookingsByCustomer } from "$lib/server/bookings.js"

export const load = ({ locals }) => {
    // If user not logged in, return;
    if (!locals.user) return;

    const bookings = getBookingsByCustomer(locals.user.name+"-"+locals.user.squad);
    let date = new Date(new Date().getTime() - 3*60*60*1000);
    let dayStr = date.toISOString();

    let futureKortes = [];
    let pendingKortesQtd = 0;
    bookings.forEach(booking => {
        if (booking.date.substring(0, 10) >= dayStr.substring(0, 10)) {
            if (booking.status == 1) {
                pendingKortesQtd++;
            } else if (booking.status == 2) {
                futureKortes.push(booking);
            }
        }
    });

    return {
        futureKortes: futureKortes,
        pendingKortesQtd: pendingKortesQtd
    }
}
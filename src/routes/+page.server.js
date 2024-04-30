import { fetchBookingsByCustomer } from "$lib/server/bookings.js"

export const load = ({ locals }) => {
    if (!locals.user) return;
    const bookings = fetchBookingsByCustomer(locals.user.name+"-"+locals.user.squad);
    let date = new Date(new Date().getTime() - 3*60*60*1000);
    let dayStr = date.toISOString();

    let futureKortes = [];
    let pendingKortes = 0;
    bookings.forEach(booking => {
        if (booking.date.substring(0, 10) >= dayStr) {
            if (booking.status == 1) {
                pendingKortes++;
            } else if (booking.status == 2) {
                futureKortes.push(booking);
            }
        }
    });

    return {
        futureKortes: futureKortes,
        pendingKortes: pendingKortes
    }
}
import { fetchBookingsByCustomer } from "$lib/server/bookings.js"

export const load = ({ locals }) => {
    const bookings = fetchBookingsByCustomer(locals.user.name+"-"+locals.user.squad);
    let date = new Date(new Date().getTime() - 3*60*60*1000);
    let dayStr = date.toISOString();
    let futureKortes = [];
    let pastKortes = [];
    bookings.forEach(booking => {
        if (booking.date.substring(0, 10) >= dayStr && booking.status == 2) {
            futureKortes.push(booking);
        } else {
            pastKortes.push(booking);
        }
    });

    return {
        futureKortes: futureKortes,
        pastKortes: pastKortes
    }
}
import { getBookingsByDay } from "$lib/server/bookings.js";
const statusEnum = ["Disponível", "Pendente", "Reservado"];

export const load = async ({ locals }) => {
    let date = new Date(new Date().getTime() - 3*60*60*1000);
    let dayStr = "", week = [], dailyBookings = [];
    
    for (let i = 0; i < 7; i++) {
        dayStr = date.toISOString().substring(0, 10);
        dailyBookings = getBookingsByDay(dayStr);
        // Date example (y-m-d+ts+te): 2024-03-15+10:20+10:40
        dailyBookings = dailyBookings.map(booking => {
            return {
                date: booking.date,
                status: statusEnum[booking.status]
            }
        })
        dailyBookings = sortBookings(dailyBookings);
        week.push({
            date: dayStr.substring(8, 10) + "/" + dayStr.substring(5, 7),
            kortes: dailyBookings
        });
        date = new Date(date.getTime() + 24*60*60*1000);
    }

    let loggedIn = locals.user ? true : false;
    return {
        loggedIn: loggedIn,
        week: week
    };
}

function sortBookings (bookings) {
    let sorted = bookings;
    let back, next;
    for (let i = 0; i < bookings.length; i++) {
        for (let j = 0; j < (bookings.length - 1); j++) {
            back = sorted[j];
            next = sorted[j + 1];
            if (back.date > next.date) {
                sorted[j] = next;
                sorted[j + 1] = back;
            }
        }
    }
    return sorted;
}
import { fetchBookingsByDay } from "$lib/server/bookings.js";

export const load = async () => {
    let date = new Date(new Date().getTime() - 3*60*60*1000);
    let dayStr = "";
    let week = [];
    let dailyBookings = [];
    for (let i = 0; i < 7; i++) {
        dayStr = date.toISOString();
        dailyBookings = fetchBookingsByDay(dayStr.substring(0, 10));
        //2024-03-15+10:20+10:40
        dailyBookings = sortBookings(dailyBookings);
        week[i] = {
            date: dayStr.substring(8, 10) + "/" + dayStr.substring(5, 7),
            kortes: dailyBookings
        }
        date = new Date(date.getTime() + 24*60*60*1000);
    }
    return {
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
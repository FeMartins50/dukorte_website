import { getBookingsByDay } from "$lib/server/bookings.js";

export const load = async () => {
    let date = new Date(new Date().getTime() - 3*60*60*1000);
    let dayStr = "", week = [], dailyBookings = [];
    
    for (let i = 0; i < 7; i++) {
        dayStr = date.toISOString().substring(0, 10);
        dailyBookings = getBookingsByDay(dayStr);
        // Date example (y-m-d+ts+te): 2024-03-15+10:20+10:40
        dailyBookings = sortBookings(dailyBookings);
        week.push({
            date: dayStr.substring(8, 10) + "/" + dayStr.substring(5, 7),
            kortes: dailyBookings
        });
        date = new Date(date.getTime() + 24*60*60*1000);
    }
    return {
        week: week
    };
}

function sortBookings (bookings) {
    let sorted = bookings;
    // Instead of copying the whole element, i'm just copying its index. Saving resources maybe?
    let keyIndex = 0, swap; // swap is just a placeholder for the swapping
    for (let i = 0; i < sorted.length; i++) {
        keyIndex = i;
        for (let j = i; j < bookings.length; j++) {
            if (sorted[j] < sorted[keyIndex]) {
                keyIndex = j;
            }
        }
        swap = sorted[i];
        sorted[i] = sorted[keyIndex];
        sorted[keyIndex] = swap;
    }
    return sorted;
}
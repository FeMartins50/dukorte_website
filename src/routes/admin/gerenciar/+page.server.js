import { fetchUsers } from '$lib/server/login.js';
import { createBooking, fetchBookings } from '$lib/server/bookings.js';
import { createSchedule } from "./schedule";

export const load = async () => {
    let sortedBookings = [];
    try {
        const bookings = await fetchBookings();
        sortedBookings = sortBookings(bookings);
    } catch (e) {
        console.log("==Erro carregando dados de bookings - Admin==");
        console.error(e);
    }
    
    let sortedUsers = [];
    try {
        const users = await fetchUsers();
        sortedUsers = sortUsers(users);
    } catch (e) {
        console.log("==Erro carregando dados de login - Admin==");
        console.error(e);
    }
    
    return {
        users: sortedUsers,
        bookings: sortedBookings
    }
}

export const actions = {
    create: async ({ request }) => {
        const data = await request.formData();

        const day = data.get('day').trim();
        const time = data.get('time').trim();
        const duration = Number(data.get('duration').trim());
        const pause = Number(data.get('pause').trim());
        const quantity = Number(data.get('quantity').trim());
        if (quantity == 0) {
            return { status: -1 };
        }

        let schedule = createSchedule (time, duration, pause, quantity);
        for (let time of schedule) {
            createBooking(day +"+"+ time.start +"+"+ time.end);
        }
        return { status: 1 };
    }
}

function sortUsers(users) {
    let sortedUsers = [];
    // Admins first
    sortedUsers = sortedUsers.concat(users.filter(user => user.role == "Admin"));
    // CVK not admins
    sortedUsers = sortedUsers.concat(users.filter(user => user.turma == "CVK" && user.role != "Admin"));
    // all the others
    sortedUsers = sortedUsers.concat(users.filter(user => user.turma != "CVK" && user.role != "Admin"));
    return sortedUsers;
}

function sortBookings (bookings) {
    let sorted = bookings;
    let back, next;
    for (let i = 0; i < bookings.length; i++) {
        for (let j = 0; j < (bookings.length - 1); j++) {
            back = sorted[j];
            next = sorted[j + 1];
            if (back.date < next.date) {
                sorted[j] = next;
                sorted[j + 1] = back;
            }
        }
    }
    return sorted;
}
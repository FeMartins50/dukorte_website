import { redirect } from "@sveltejs/kit";
import { getBookings } from '$lib/server/bookings.js';
import { getUsers } from '$lib/server/login.js';
import { getClubeUsers } from '$lib/server/clube.js';


export const load = async ({ locals }) => {
    if (locals.user.role != "Admin") {
        console.log("not this time");
        redirect(302, "/");
    }

    let sortedBookings = [];
    try {
        const bookings = await getBookings();
        sortedBookings = sortBookings(bookings);
    } catch (e) {
        console.log("==Erro carregando dados de bookings - Admin==");
        console.error(e);
    }
    
    let sortedUsers = [];
    try {
        const users = await getUsers();
        sortedUsers = sortUsers(users);
    } catch (e) {
        console.log("==Erro carregando dados de login - Admin==");
        console.error(e);
    }

    let clubeUsers = [];
    try {
        clubeUsers = await getClubeUsers();
    } catch (e) {
        console.log("==Erro carregando dados do clube - Admin==");
        console.error(e);
    }
    
    return {
        bookings: sortedBookings,
        clube: clubeUsers,
        users: sortedUsers
    }
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
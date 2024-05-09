import { fetchUsers } from '$lib/server/login.js';
import { getClubeUsers, resetCortes } from '$lib/server/clube.js';

export const load = async () => {
    let sortedUsers = [];
    try {
        const users = await fetchUsers();
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
        clube: clubeUsers,
        users: sortedUsers
    }
}

export const actions = {
    addClube: async ({ request }) => {
        const data = await request.formData();

        const email = data.get('email').trim();
        const qtdcortes = 4;
        const incluidosob = data.get('sobrancelha').trim();

        resetCortes(email, qtdcortes, incluidosob);
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
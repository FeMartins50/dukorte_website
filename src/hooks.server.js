import { getUserBySession } from "$lib/server/login.js";

export async function handle({ event, resolve }) {
    const sessionid = event.cookies.get('sessionid');
    // if no session, return as normal
    if (!sessionid) {
        return resolve(event);
    }

    const user = await getUserBySession(sessionid);
    if (user) {
        event.locals.user = {
            name: user.nome,
            squad: user.turma,
            email: user.email,
            role: user.role
        };
    }
    return resolve(event);
}

export async function handleError({ error, event, status }) {
    console.log("==Erro inesperado==");
    console.log(error);
    console.log("==Erro inesperado==");

	return {
		message: error.message,
        status: status
	};
}
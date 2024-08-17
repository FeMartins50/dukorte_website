import { getUserBySession } from "$lib/server/login.js";
import { writeFileSync } from "fs";

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
    const errorId = crypto.randomUUID();
    let date = new Date().toISOString();

    let fileName = date.split("T")[0] + "-" + errorId.toString();
    let content = "Status Code: " + status + "\n";
    content += "Error ID: " + errorId + "\n";
    content += "Event: " + "\n" + event + "\n";
    content += "Description: " + "\n" + error + "\n";
    writeFileSync(`./error_logs/${fileName}.txt`, content);
    console.log("Logged Error: " + errorId);

	return {
		message: "Whoops! Bugou tudo.",
        id: errorId,
        status: status
	};
}
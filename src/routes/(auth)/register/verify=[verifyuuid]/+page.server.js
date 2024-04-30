import { deleteUUIDsByEmail, getEmailByUUID } from "$lib/server/validation.js";
import { validateEmail } from "$lib/server/login.js";
import { redirect } from '@sveltejs/kit';

export const load = ({ params }) => {
    const vInfo = getEmailByUUID(params.verifyuuid);
    if (vInfo) {
        validateEmail(vInfo.email);
        deleteUUIDsByEmail(vInfo.email);
        redirect(302, "/login");
    }
    redirect(302, "/");
}
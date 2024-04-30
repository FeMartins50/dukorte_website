import { getUUIDsByEmail } from "$lib/server/validation.js";
import { redirect } from '@sveltejs/kit';

export const load = ({ params }) => {
    const uuids = getUUIDsByEmail(params.verifyemail);
    if (uuids.length == 0) {
        redirect(302, "/login");
    }
}
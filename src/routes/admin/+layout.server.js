import { redirect } from "@sveltejs/kit";

export const load = async ({ locals }) => {
    if (locals.user.role != "Admin") {
        console.log("not this time");
        redirect(302, "/");
    }
}
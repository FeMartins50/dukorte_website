import { loginUser, createSession } from "$lib/server/login.js";
import { redirect } from '@sveltejs/kit'

export const load = async ({ locals }) => {
    // redirect user if logged in
    if (locals.user) {
        redirect(302, '/')
    }
}

export const actions = {
    login: async ({ cookies, request }) => {
        const data = await request.formData();
        const email = data.get('email').trim();
        const password = data.get('password').trim();
        // Try Login
        let response = await loginUser(email, password);
        if (!response.success) {
            return { status: -1 };
        }
        // Create session
        const sessionid = await createSession(email);
        // Save session in cookies
        cookies.set('sessionid', sessionid, {
            // send cookie for every page
            path: '/',
            // server side only cookie so you can't use `document.cookie`
            httpOnly: true,
            // only requests from same site can send cookies
            // https://developer.mozilla.org/en-US/docs/Glossary/CSRF
            sameSite: 'strict',
            // set cookie to expire after a month
            maxAge: 60 * 60 * 24 * 30,
        });
        redirect(302, "/");
    }
}
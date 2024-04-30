import { redirect } from '@sveltejs/kit'
export const load = async () => {
    // we only use this endpoint for the api
    // and don't need to see the page
    redirect(302, '/');
}

export const actions = {
    logout: async ({ cookies }) => {
        cookies.delete('sessionid', { path: '/' });
        redirect(302, '/');
    } 
}
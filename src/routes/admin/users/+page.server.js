import { resetCortes } from '$lib/server/clube.js';

export const actions = {
    addClube: async ({ request }) => {
        const data = await request.formData();

        const email = data.get('email').trim();
        const qtdcortes = 4;
        const incluidosob = data.get('sobrancelha').trim();

        resetCortes(email, qtdcortes, incluidosob);
    }
}
import { resetMember, addMember, deleteMember } from '$lib/server/clube.js';

export const actions = {
    addToClube: async ({ request }) => {
        const data = await request.formData();

        const email = data.get('email').trim();
        const qtdcortes = data.get('qtdcortes');
        const incluidosob = data.get('sobrancelha').trim();

        addMember(email, qtdcortes, incluidosob);
    },
    reset: async ({ request }) => {
        const data = await request.formData();

        for (let [email, checked] of data.entries()) {
            if (checked) {
                resetMember(email, 4);
            }
        }
    },
    delete: async ({ request }) => {
        const data = await request.formData();

        for (let [email, checked] of data.entries()) {
            if (checked) {
                deleteMember(email);
            }
        }
    }
}
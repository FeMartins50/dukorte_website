import { createBooking } from '$lib/server/bookings.js';
import { createSchedule } from "./schedule";

export const actions = {
    create: async ({ request }) => {
        const data = await request.formData();

        const day = data.get('day').trim();
        const time = data.get('time').trim();
        const duration = Number(data.get('duration').trim());
        const pause = Number(data.get('pause').trim());
        const quantity = Number(data.get('quantity').trim());
        if (quantity == 0) {
            return { status: -1 };
        }

        let schedule = createSchedule (time, duration, pause, quantity);
        for (let time of schedule) {
            createBooking(day +"+"+ time.start +"+"+ time.end);
        }
        return { status: 1 };
    }
}
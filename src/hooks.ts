import type { Handle } from "@sveltejs/kit"

export const handle: Handle = async ({resolve, event}) => {
    console.dir(event.url.searchParams);
    const response = await resolve(event);
    return response;
}
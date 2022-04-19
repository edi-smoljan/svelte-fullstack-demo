import type { RequestHandler } from "@sveltejs/kit";
import {api} from './_api';

export const get: RequestHandler = ({request}) => {
    return api(request);
}

export const post: RequestHandler = async ({request, params}) => {
    const formData = await request.formData();
    const value = formData.get("text");
    const todo: Todo = {
        uid: `${Date.now()}`,
        created_at: new Date(),
        done: false,
        text: value.toString()
    };
    const res = api(request, undefined, todo);
    return {
        status: res.status,
        headers: {
            location: '/'
        },
        body: res.body
    };
}
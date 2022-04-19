import type { RequestHandler } from "@sveltejs/kit";
import {api} from './_api'

export const del:RequestHandler = ({params, request}) => {
    const response = api(request, params);
    return {
        status: response.status,
        headers: {
            location: "/"
        }
    }
}

export const patch:RequestHandler = async ({params, request}) => {
    const form = await request.formData();
    const text = form.get("text")?.toString();
    const done = form.has("done") ? !!form.get("done").toString() : undefined;
    const resp = api(request, params, {text, done});
    return {
        status: resp.status,
        body: resp.body,
        headers: {
            location: "/"
        }
    }
}
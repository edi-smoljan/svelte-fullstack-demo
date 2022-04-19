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
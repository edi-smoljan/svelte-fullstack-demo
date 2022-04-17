import type { RequestHandler } from "@sveltejs/kit";

let todos: Todo[] = [];

export const get: RequestHandler = () => {
    return {
        status: 200,
        body: todos
    }
}

export const post: RequestHandler = async ({request}) => {
    const formData = await request.formData();
    const value = formData.get("text");
    todos.push({
        created_at: new Date(),
        done: false,
        text: value.toString()
    });
    return {
        status: 303,
        headers: {
            location: '/'
        }
    }
}
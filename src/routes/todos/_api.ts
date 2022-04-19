import type {  } from "@sveltejs/kit";

let todos: Todo[] = [];

export const api = (request: Request, params?: Record<string, string>, todo?: Partial<Todo>) => {
    let body = {};
    let status = 500;
    switch (request.method) {
        case "GET":
            body = todos;
            status = 200;
            break;
        case "POST":
            todos.push(<Todo>todo);
            status = 201;
            body = todo;
            break;
        case "DELETE":
            todos = todos.filter(todo => todo.uid !== params.uid);
            status = 200;
            break;
        case "PATCH":
            const found = todos.find(todo => todo.uid === params.uid);
            found.text = todo.text;
            status = 200;
            break;
        default:
            break;
    }

    if (Math.floor(status/100) === 2 && request.method !== "GET")
        status = 303;

    return {
        status,
        body
    }
}
import PrismaClient from '$lib/prisma';

const prisma = new PrismaClient();

export const api = async (request: Request, params?: Record<string, string>, todo?: Partial<Todo>) => {
    let body = {};
    let status = 500;
    switch (request.method) {
        case "GET":
            body = await prisma.todo.findMany();
            status = 200;
            break;
        case "POST":
            body = await prisma.todo.create({
                data: {
                    created_at: todo.created_at,
                    done: todo.done,
                    text: todo.text
                }
            });
            status = 201;
            break;
        case "DELETE":
            await prisma.todo.delete({
                where: {
                    uid: params.uid
                }
            });
            status = 200;
            break;
        case "PATCH":
            body = await prisma.todo.update({
                where: {
                    uid: params.uid
                },
                data: {
                    text: todo.text,
                    done: todo.done
                }
            })
            status = 200;
            break;
        default:
            break;
    }

    if (Math.floor(status/100) === 2 && request.method !== "GET" && request.headers.get("accept") !== "application/json")
        status = 303;

    return {
        status,
        body
    }
}
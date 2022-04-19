<script context="module" lang="ts">
    import type { Load } from "@sveltejs/kit";
    import {enhance} from '$lib/actions/form';
    export const load: Load = async ({fetch}) => {
        const res = await fetch("/todos.json");
        if (res.ok) {
            const todos = await res.json();
            return {
                props: {todos}
            }
        }
        const { message } = await res.json();
        return {
            error: new Error(message)
        }
    }
</script>

<script lang="ts">
    import TodoItem from '$lib/todo-item.svelte';

    export let todos: Todo[];

    const title = 'TODOs';

    const processNewTodoResult = async (response: Response, form: HTMLFormElement) => {
        const newTodo = await response.json();
        //console.dir(newTodo);
        todos = [...todos, newTodo];
        form.reset();
    }

    const processUpdatedTodoResult = async (response: Response, form: HTMLFormElement) => {
        if (response.ok) {
            const updatedTodo = <Todo> await response.json();
            todos = todos.map(t => t.uid == updatedTodo.uid ? updatedTodo : t);
        }
    }
</script>

<style>
    .todos {
        max-width: 42rem;
        width: 100%;
        margin: 4rem auto 0 auto;
    }

    .new {
        margin-bottom: 0.5rem;
    }

    .new input {
        font-size: 28px;
        width: 100%;
        padding: 0.5em 1em 0.3em 1em;
        box-sizing: border-box;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 8px;
        text-align: center;
    }

    .todos :global(input) {
        border: 1px solid transparent;
    }

    .todos :global(input:focus-visible) {
        box-shadow: inset 1px 1px 6px rgba(0,0,0,0.1);
        border: 1px solid #ff3e00 !important;
        outline: none;
    }
</style>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<div class="todos">
    <h1>{title}</h1>

    <form action="/todos.json" method="post" class="new" use:enhance={{result: processNewTodoResult}}>
        <input type="text" name="text" aria-label="Add a todo" placeholder="+ type to add a todo">
    </form>

    {#each todos as todo}
        <TodoItem 
            {todo} 
            processDeletedTodoResult={(response) => {
                if (response.status == 200) {
                    todos = todos.filter(td => td.uid !== todo.uid);
                }
            }}
            {processUpdatedTodoResult}
        />
    {/each}
</div>
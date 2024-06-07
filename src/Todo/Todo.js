import { useState } from "react";

const initialTodos = {
    [Date.now()]: {
        id: Date.now(),
        activity: 'Belajar Ngoding',
        description: 'Belajar Ngoding Menggunakan React',
        datetime: new Date(),
        is_done: true,
    }
};

function TodoItem(props) {
    const todo = props.todo;
    const onUpdateComplete = props.onUpdateComplete;
    const onRemove = props.onRemove;

    return (
        <li>
            <p style={todo.is_done ? { textDecoration: 'line-through' } : undefined}>{todo.activity}</p>
            <p style={todo.is_done ? { textDecoration: 'line-through' } : undefined}>{todo.description}</p>
            <p><small>{todo.datetime.toLocaleString()}</small></p>
            <div>

                <button style={{ marginRight: '16px' }} onClick={onUpdateComplete}>
                    {!todo.is_done ? "Mark" : "Unmark"} as Complete
                </button>
                <button className="contrast" onClick={onRemove}>Remove</button>
            </div>
        </li>
    );
}

function Todo() {
    const [todos, setTodos] = useState(initialTodos);

    const addTodo = (id, newTodo) => {
        setTodos((state) => ({
            ...state,
            [id]: newTodo,
        }));
    }

    const handleAddTodo = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        addTodo(Date.now(), {
            id: Date.now(),
            activity: formData.get('activity'),
            description: formData.get('description'),
            datetime: new Date(formData.get('datetime')),
            is_done: formData.get('is_done'),
        })

        event.target.reset();
    }

    const handleRemoveTodo = (todo) => {
        setTodos((state) => ({
            ...state,
            [todo.id]: undefined
        }));
    }

    const handleUpdateComplete = (todo) => {
        setTodos((state) => ({
            ...state,
            [todo.id]: {
                ...todo,
                is_done: !todo.is_done
            }
        }));

        console.log({todos});
    }

    return (
        <div style={{ width: '520px', margin: '0 auto' }}>
            <form onSubmit={handleAddTodo}>
                <input type="text" name="activity" placeholder="Activity" aria-label="Activity" required/>
                <textarea
                    name="description"
                    placeholder="Write a brief description..."
                    aria-label="Write a brief description"
                >
                </textarea>
                <input type="datetime-local" name="datetime" aria-label="Datetime" required/>
                <label>
                    <input type="checkbox" name="is_done" />
                    Completed
                </label>
                <input type="submit" value="Add Todo" />
            </form>

            {Object.values(todos)
                .filter((todo) => !!todo)
                .length ? (
                <div style={{ marginTop: '24px' }}>
                    <h5>List Todo</h5>
                    <ul>
                        {Object.entries(todos)
                            .filter(([_, todo]) => !!todo)
                            .sort((a, b) => b[1].id - a[1].id)
                            .map(([_, todo]) => (
                                <TodoItem
                                    key={todo.id}
                                    todo={todo}
                                    onUpdateComplete={() => handleUpdateComplete(todo)}
                                    onRemove={() => handleRemoveTodo(todo)}
                                />
                            ))}
                    </ul>
                </div>
            ) : (
                <h5>No activity. Please add a new todo.</h5>
            )}
        </div>
    );
}

export default Todo;

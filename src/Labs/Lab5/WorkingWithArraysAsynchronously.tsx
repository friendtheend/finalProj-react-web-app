import { FaEdit, FaPlusCircle } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import React, { useState, useEffect } from "react";
import * as client from "./client";
import { FaTrash } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
export default function WorkingWithArraysAsynchronously() {
    const [errorMessage, setErrorMessage] = useState(null);
    const [todos, setTodos] = useState<any[]>([]);
    const fetchTodos = async () => {
        const todos = await client.fetchTodos();
        setTodos(todos);
    };
    const createTodo = async () => {
        const todos = await client.createTodo();
        setTodos(todos);
    };
    const postTodo = async () => {
        const newTodo = await client.postTodo({
            title: "New Posted Todo",
            completed: false,
        });
        setTodos([...todos, newTodo]);
    };
    
    const removeTodo = async (todo: any) => {
        const updatedTodos = await client.removeTodo(todo);
        setTodos(updatedTodos);
    };
    const editTodo = async (todo: any) => {
        const updatedTodos = todos.map(
            (t) => t.id === todo.id ? { ...todo, editing: true } : t);
        setTodos(updatedTodos);
    };
    const updateTodo = async (todo: any) => {
        try {
          await client.updateTodo(todo);
          setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
        } catch (error: any) {
          setErrorMessage(error.response.data.message);
        }
        console.log("Sending to backend:", todo);
      };

    const updateDescription = async (todo: any) => {
        const updatedTodos = todos.map(
            (t) => t.id === todo.id ? { ...todo, descriptionEditing: true } : t);
        setTodos(updatedTodos);
    };

    const deleteTodo = async (todo: any) => {
        try {
            await client.deleteTodo(todo);
            const newTodos = todos.filter((t) => t.id !== todo.id);
            setTodos(newTodos);
        } catch (error: any) {
            console.log(error);
            setErrorMessage(error.response.data.message);
        }
    };
    useEffect(() => {
        fetchTodos();
    }, []);
    return (
        <div id="wd-asynchronous-arrays">
            <h3>Working with Arrays Asynchronously</h3>
            {errorMessage && (
                <div
                    id="wd-todo-error-message"
                    className="alert alert-danger mb-2 mt-2"
                >
                    {errorMessage}
                </div>
            )}
            <h4>
                Todos
                <FaPlusCircle
                    onClick={createTodo}
                    className="text-success float-end fs-3"
                    id="wd-create-todo"
                />
                <FaPlusCircle
                    onClick={postTodo}
                    className="text-primary float-end fs-3 me-3"
                    id="wd-post-todo"
                />
            </h4>
            <ul className="list-group">
                {todos.map((todo) => (
                    <li key={todo.id} className="list-group-item">

                        <FaTrash
                            onClick={() => removeTodo(todo)}
                            className="text-danger float-end mt-1"
                            id="wd-remove-todo"
                        />

                        <TiDelete
                            onClick={() => deleteTodo(todo)}
                            className="text-danger float-end me-2 fs-3"
                            id="wd-delete-todo"
                        />
                        <FaPencil
                            onClick={() => editTodo(todo)}
                            className="text-primary float-end me-2 mt-1"
                            id="wd-edit-todo"
                        />

                        <FaEdit
                            onClick={() => updateDescription(todo)}
                            className="text-primary float-end me-2 mt-1"
                            id="wd-editDescription-todo"
                        />


                        <input
                            type="checkbox"
                            defaultChecked={todo.completed}
                            className="form-check-input me-2 float-start "
                            onChange={(e) =>
                                updateTodo({ ...todo, completed: e.target.checked }
                                )
                            }
                        />

                        {!todo.editing ? (
                            <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                                {todo.title}
                            </span>


                        ) : (
                            <input
                                className="form-control w-50 float-start"
                                defaultValue={todo.title}
                                onKeyDown={(e) => {
                           
                                    if (e.key === "Enter") {
                                        updateTodo({ ...todo, title:todo.title, editing: false });
                                    }
                                }}

                                onChange={(e) => {
                                    updateTodo({ ...todo, title: e.target.value })
                                  }}
                            />

                        )}

                        {!todo.descriptionEditing ? (
                            <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                                {todo.description}
                            </span>


                        ) : (
                            <input
                                className="form-control w-50 float-start"
                                defaultValue={todo.description}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        updateTodo({ ...todo, descriptionEditing: false });
                                    }
                                }}
                                onChange={(e) => updateTodo({ ...todo, description: e.target.value })}
                            />

                        )}










                    </li>

   

                ))}
                {/* <li>        <pre>{JSON.stringify(todos, null, 2)}</pre></li> */}
            </ul>
            <hr />
        </div>
    );
}
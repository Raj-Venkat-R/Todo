import { useState, useEffect } from "react"
import Create from "./Create";
import axios from "axios";

export default function Home() {
    const [todos, setTodos] = useState([]);
    useEffect(() => {
        fetchTodos();
    }, []);
    const fetchTodos = async(query = "") => {
        try {
            const res = await axios.get(`http://localhost:4000/api/v1/todo/?task=${query}`);
            setTodos(res.data.todo);
        } catch (error) {
            console.log(error);
        }
    };
    const handleDelete = async(id) => {
        try{
            await axios.delete(`http://localhost:4000/api/v1/todo/${id}`);
            fetchTodos();
        } catch (error) {
            console.log(error);
        }
    };
    const toggleTodo = async (id, currentStatus) => {
        try {
            await axios.patch(
            `http://localhost:4000/api/v1/todo/${id}`,
            { isCompleted: !currentStatus }
            );
            fetchTodos();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="home">
            <h1>Todo List</h1>
            <Create fetchTodos={fetchTodos}/>
            {
                todos.length === 0 ?
                <h2>No task available</h2>
                :
                todos.map((todo) => (
                    <div key={todo._id} className="todo-card">
                        <h3>{todo.task}</h3>
                        <p>{todo.description}</p>
                        <p>{todo.isCompleted ? "Done" : "Pending"}</p>
                        <button className="create_button" onClick={() => toggleTodo(todo._id)}>Completed</button>
                        <button className="create_button" onClick={() => handleDelete(todo._id)}>Delete Task</button>
                    </div>
                ))
            }
        </div>
    )
}
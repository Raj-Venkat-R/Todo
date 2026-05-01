import { useState } from "react"
import axios from "axios";

export default function Create({ fetchTodos }) {
    const [task, setTask] = useState("");
    const [description, setDescription] = useState("");
    const [search, setSearch] = useState("");
    const handleAdd = () => {
        axios.post(
            "http://localhost:4000/api/v1/todo/",
            { task, description });
            setTask("");
            setDescription("");
            fetchTodos();
    }
    const fetchTodo = async (query = "") => {
        try {
            fetchTodos(search);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <input type="text" placeholder="Enter task..." className="create_input" value={task} onChange={(e) => setTask(e.target.value)}></input>
            <input type="text" placeholder="Description...." className="create_input" value={description} onChange={(e) => setDescription(e.target.value)}></input>
            <button className="create_button" onClick={handleAdd}>Add Task</button>
            <input type="text" placeholder="Search Task..." className="create_input" value={search} onChange={(e) => setSearch(e.target.value)}></input>
            <button className="create_button" onClick={fetchTodo}>Search</button>
        </div>
    )
}
import { Todo } from "../models/todo.model.js";

const postTask = async (req, res) => {
    try {
        const { task, description, isCompleted } = req.body;

        if(!task) return res.status(400).json({ message: "No task to add" });

        const todo = await Todo.create({ task, description, isCompleted });

        res.status(201).json({
            message: "Task is Added Successfully",
            todo: {
                id: todo._id,
                task: todo.task,
                description: todo.description,
                isCompleted: todo.isCompleted
            }
        });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" , error: error.message });
    }
}

const getTask = async (req, res) => {
    try {
        const { task } = req.query;

        const filter = {};

        if(task){
            filter.task = { $regex: task, $options: "i" };
        }
        const todo = await Todo.find(filter);
        return res.status(200).json({ todo });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const patchTask = async (req, res) => {
    try {
        const { id } = req.params;

        const todo = await Todo.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        if(!todo) return res.status(404).json({ Message: "Task not found..." });
        return res.status(200).json({ todo });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Serever Error",
            error: error.message
        })
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findByIdAndDelete(id);
        if(!todo) return res.status(404).json({
            message: "Task not found..."
        })
        return res.status(200).json({
            message: "Task deleted successfully..."
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

export {
    postTask,
    getTask,
    patchTask,
    deleteTask
}
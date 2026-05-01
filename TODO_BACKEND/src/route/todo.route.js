import { Router } from "express";
import { postTask, getTask, patchTask, deleteTask } from "../controller/todo.controller.js";

const router = Router();

router.route("/").post(postTask);
router.route("/").get(getTask);
router.route("/:id").patch(patchTask);
router.route("/:id").delete(deleteTask);

export default router;
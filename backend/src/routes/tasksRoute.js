import express from 'express'
import { addNewTasks, deleteTasks, getAllTasks, updateTasks } from '../controllers/tasksController.js';

const router = express.Router(); 

router.get("/", getAllTasks)

router.post("/", addNewTasks)
 
router.put("/:id", updateTasks)

router.delete("/:id", deleteTasks)

export default router; 

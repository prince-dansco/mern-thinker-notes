 import express from "express";
import { CreateNotes, deletNotes, editNotes, getAllNotes, getNoteById } from "../controller/notesController.js";
 
 const router = express.Router();
 
 router.get('/', getAllNotes);
 router.get('/:id', getNoteById);
 router.post('/', CreateNotes);
 router.put('/:id', editNotes);
 router.delete('/:id', deletNotes);

 export default router;
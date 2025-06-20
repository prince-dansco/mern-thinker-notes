import mongoose from 'mongoose';
import Note from '../modal/Note.js';            

export const getAllNotes = async (_, res) => {
   try {
    const notes = await Note.find().sort({createdAt: -1});
    res.status(200).json({success:  true, data:notes, message:'all note got successfully'});
   } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' });
   }
}
export const getNoteById = async (req, res) => {
   const {id}= req.params;
    try {
    const notes = await Note.findById(id);
    if(!notes) return res.status(404).json({success:  false, message:'note not found'});
    res.status(200).json({success:  true, data:notes, message:'all note got successfully'});
   } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' });
   }
}
export const CreateNotes = async (req, res) => {
try {
    const {title,content} = req.body;
    const note = new Note({title, content});
   const saveNote =  await note.save();
    res.status(201).json({success:  true, data:saveNote, message:'note created successfully'});
} catch (error) {
    console.log(error);
    res.status(500).json({success:  false, message:' internal server error '});
}
}
export const editNotes = async (req, res) => {
// const {id} = req.params;
// const note = req.body

//     if(!mongoose.Types.ObjectId.isValid(id)){
//     return res.status(404).json({success: false, message: 'invalit product id'})
//   }
   try {
      const {title,content} = req.body;
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content}, {new:true});
    if(!updatedNote) return res.status(404).json({message:'note not found'});
    
    res.status(200).json({success:true, data: updatedNote, message:'successfully updated notes'});
   } catch (error) {
    console.error(error ,'fail to update note');
    res.status(500).json({success:  false, message:'internal server error '});
   }
}
export const deletNotes =async (req, res) => {
   const {id} = req.params;
   try{
    const deleteNote = await Note.findByIdAndDelete(id);
    if(!deleteNote) return res.status(404).json({success:  false, message:'note not found'});
    
    res.status(200).json({success:  true, data:deleteNote, message:'note deleted successfully'});
   } catch (error) {
    console.log(error,'fail to delete note');
    res.status(500).json({success:  false, message:'internal server error '});
   }
}
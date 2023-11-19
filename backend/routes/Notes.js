const express = require('express')
const router = express.Router();
const notesModel = require('../models/Notes_Module'); //import userschema 
const fetchuser = require('../middleware/fetUser')
const { body, validationResult } = require('express-validator');


// Route 1 :  Get All Notes
router.get('/fetchallnotes', fetchuser, async (req, resp) => {

    try {
        const notes = await notesModel.find({ user: req.user.id })
        resp.send(notes)
    } catch (error) {
        console.log(error.message)
        resp.status(500).send("some Internal Error Occured");
    }


});

// Route 2 : create New notes Api 
router.post('/addnotes/', [
    body('title', 'UserName Length must be greater then 3').isLength({ min: 3 }),
    body('description', 'Password Length must be greater then 4').isLength({ min: 4 }),
], fetchuser, async (req, resp) => {


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return resp.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, description, tag } = req.body;
        const note = new notesModel({
            title, description, tag, user: req.user.id
        })
        const saveNote = await note.save();
        resp.json({ saveNote });

    } catch (error) {
        console.log(error.message)
        resp.status(500).send("some Internal Error Occured");
    }
});

// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    // Create a newNote object
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    // Find the note to be updated and update it
    let note = await notesModel.findById(req.params.id);
    console.log(note)
    if (!note) { return res.status(404).send("Not Found") }

    // This code is for check user is correct or not --------- (not working , todo complete)
    // const id = req.user.id;
    // if (note.id.toString() == id) {
    //     return res.status(401).send("Not Allowed");
    // }

    note = await notesModel.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json({ note });

})


// ROUTE 4 : Delete an existing Not using: DELETE "/api/notes/deletenote" Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    // Create a newNote object
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    // Find the note to be delete and delete it
    let note = await notesModel.findById(req.params.id);
    // console.log(note)
    if (!note) { return res.status(404).send("Not Found") }

    // This code is for check user is correct or not --------- (not working , todo complete)
    // const id = req.user.id;
    // if (note.id.toString() == id) {
    //     return res.status(401).send("Not Allowed");
    // }

    note = await notesModel.findByIdAndDelete(req.params.id)
    res.json({ success : "Record Successfully Deleted. ", note: note  });

})


exports.router = router
import React, { useContext, useState } from 'react'
import noteContext from '../Context/Notes/NoteContext'

function AddNote() {

    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ note_title: "", note_description : "", note_tag: " " })
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.note_title, note.note_description)
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div className='constiner w-50 h-75 py-3' >

            <form>
                <div className="mb-3">
                    <label htmlFor="note_title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="note_title" name='note_title' onChange={onChange} />
                </div>


                <div className="form-floating">
                    <textarea className="form-control" placeholder="Leave a Description here" name='note_description' onChange={onChange} id="note_description" style={{ "height": "200px" }}></textarea>
                    <label htmlFor="note_description">Comments</label>
                </div>

                <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
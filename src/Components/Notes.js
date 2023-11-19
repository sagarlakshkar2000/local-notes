import React, { useContext, useEffect } from 'react';
import noteContext from '../Context/Notes/NoteContext'
import NoteItem from '../Components/NoteItem';
import AddNote from './AddNote'


function Notes() {
    const notesData = useContext(noteContext);
    const { notes, fetchAll } = notesData;

    useEffect(() => {
        fetchAll(); 
    }, [])
    

    return (
        <>
            <AddNote />
            <h1>Your Notes</h1>
            {notes.map((note) => {
                return <NoteItem note={note} key={note._id} />
            })}
        </>
    )
}

export default Notes



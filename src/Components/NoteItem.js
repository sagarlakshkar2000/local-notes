import React, { useContext } from 'react'
import noteContext from '../Context/Notes/NoteContext'

function NoteItem(props) {
    const context = useContext(noteContext)
    const { deleteNote, editNote } = context;
    const { note } = props;


    return (
        <div className="row " >
            <div className="col ">
                <div className="card my-3 ">
                    <div className="card-body " style={{ "height": "230px" }}>
                        <h5 className="card-title fs-6 my-4">{note.title}</h5>
                        <p className="card-text fs-6 my-4">{note.description}</p>
                    </div>
                    <div className="card-footer">
                        <span className="card-text fs-6 mx-5">Note ID :{note.id}</span>
                        <i className="fa-solid  fa-pen-to-square mx-5" onClick={() => editNote(note.id)} style={{ "color": "#086dd9" }}></i>
                        <i className="fa-sharp fa-solid fa-trash mx-5" onClick={() => deleteNote(note._id)} style={{ "color": "#d65c62" }}></i>
                      
                    </div>
                </div>
            </div>
        </div>

    )
}

export default NoteItem
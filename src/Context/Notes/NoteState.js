import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {

  const HOST = "http://localhost:4000/"
  const notesInital = [];
  // create state and setstate 
  const [notes, setNotes] = useState(notesInital);




  // 
  // Add Note function 
  const fetchAll = async () => {

    const response = await fetch(`${HOST}api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklEIjoiNjQxZDMwNzg0OGQ1ZTI0YjlmMDViYzkwIn0sImlhdCI6MTY3OTYzNDU5MH0.01lqrV7lwcYoxhSMhpjoJjHop9b3GU_WwZLKMtJBRnM"
      }

    });
    const json = await response.json()
    console.log(`json Data from fetch all ${json}`)
    setNotes(json)


  }





  // Add Note function 
  const addNote = async(title, description, tag) => {

    const response = await fetch(`${HOST}api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklEIjoiNjQxZDMwNzg0OGQ1ZTI0YjlmMDViYzkwIn0sImlhdCI6MTY3OTYzNDU5MH0.01lqrV7lwcYoxhSMhpjoJjHop9b3GU_WwZLKMtJBRnM"
      },
      body: JSON.stringify({title, description, tag})

    });

    setNotes(notes.concat(response)) 
  }

  // Update Note function 
  
  const editNote = async (id , title , description , tag ) => {
    id = "641da0a4a3bfd9bd9adbc105";
    // Call and api to get data 
    const response = await fetch(`${HOST}api/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklEIjoiNjQxZDMwNzg0OGQ1ZTI0YjlmMDViYzkwIn0sImlhdCI6MTY3OTYzNDU5MH0.01lqrV7lwcYoxhSMhpjoJjHop9b3GU_WwZLKMtJBRnM"
      },
      body: JSON.stringify({title, description, tag})

    });
    // what is use of Json ? 
    const json = response.json();

    for(let index = 0; index<notes.length; index++){
      const element = notes[index];
      if(element._id === id){
        element.title = title ;
        element.description = description;
        element.tag = tag;
      }
    }

  }

  // Delete Note function 
  const deleteNote = async (id) => {

    const response = await fetch(`${HOST}api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklEIjoiNjQxZDMwNzg0OGQ1ZTI0YjlmMDViYzkwIn0sImlhdCI6MTY3OTYzNDU5MH0.01lqrV7lwcYoxhSMhpjoJjHop9b3GU_WwZLKMtJBRnM"
      }

    });

    const json = await response.json()
    console.log(`json Data from fetch all ${json}`)
    setNotes(json)


   
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
    console.log(`newNotes = ${newNotes}`);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, fetchAll }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;
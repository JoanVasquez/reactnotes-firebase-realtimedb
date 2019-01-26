import React, { Component } from "react";
import firebase from "firebase";
import { FIREBASE_CONFIG } from "./config/config";
import "firebase/database";

import "./App.css";
import Note from "./Notes/Note";
import NoteForm from "./NoteForm/NoteForm";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: []
    };

    this.addNote = this.addNote.bind(this);
    this.handleRemove = this.handleRemove.bind(this);

    this.app = firebase.initializeApp(FIREBASE_CONFIG);
    this.db = this.app
      .database()
      .ref()
      .child("notes");
  }

  addNote(note) {
    this.db.push().set({ noteContent: note });
  }

  handleRemove(noteId) {
    this.db.child(noteId).remove();
  }

  componentDidMount() {
    const { notes } = this.state;
    this.db.on("child_added", snap => {
      notes.push({
        noteId: snap.key,
        noteContent: snap.val().noteContent
      });
      this.setState({ notes });
    });

    this.db.on('child_removed', snap => {
      notes.forEach((note, index) => {
        if(note.noteId == snap.key) {
          notes.splice(index, 1);
        }
      });
      this.setState({ notes });
    });

  }

  render() {
    return (
      <div className="notesContainer">
        <div className="notesHeader">
          <h1>React and Firebase App!</h1>
        </div>
        <div className="notesBody">
          <ul>
            {this.state.notes.map(note => {
              return (
                <Note
                  key={note.noteId}
                  noteId={note.noteId}
                  noteContent={note.noteContent}
                  handleRemove={this.handleRemove}
                />
              );
            })}
          </ul>
        </div>

        <div className="notesFooter">
          <NoteForm addNote={this.addNote} />
        </div>
      </div>
    );
  }
}

export default App;

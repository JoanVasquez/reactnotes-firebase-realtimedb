import React, { Component } from "react";
import "./NoteForm.css";

class NoteForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="NoteForm">
        <input
          placeholder="Write a Note"
          ref={input => {
            this.textInput = input;
          }}
          type="text"
        />
        <button onClick={() => {
            this.props.addNote(this.textInput.value);
            this.textInput.value = '';
            this.textInput.focus();
        }}>Add Note</button>
      </div>
    );
  }
}

export default NoteForm;

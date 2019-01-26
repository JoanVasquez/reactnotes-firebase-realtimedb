import React from "react";

import "./Note.css";

const Note = props => {

  return (
    <div className="Note">
      <span
        onClick={() => {
          props.handleRemove(props.noteId)
        }}
      >
          &times;
      </span>
      <p>
        {props.noteContent}
      </p>
    </div>
  );
};

export default Note;

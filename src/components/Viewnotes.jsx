import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../css components/Viewnotes.css';

const Viewnotes = () => {
  const { id } = useParams();
  const allNotes = useSelector((state) => state.note.notes);
  const note = allNotes.find((n) => n._id === id);

  const stripHTML = (htmlString) => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = htmlString || '';
    return tempElement.innerText;
  };

  return (
    <div className="container">
      <div className="title-btn">
        <input
          type="text"
          placeholder="Enter title here"
          value={note?.title || ''}
          disabled
          id="title-txt"
        />
      </div>
      <div className="textarea">
        <textarea
          className="details"
          disabled
          id="description"
          value={stripHTML(note?.content)}
        />
      </div>
    </div>
  );
};

export default Viewnotes;

import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../css components/Viewpastes.css'
const Viewpastes = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id);

  // Strip HTML tags to show plain text
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
          placeholder="Enter title Here"
          value={paste?.title || ''}
          disabled
          id='title-txt'
        />
      </div>
      <div className="textarea">
        <textarea
          className="details"
          disabled
          id="description"
          value={stripHTML(paste?.content)}
        />
      </div>
    </div>
  );
};

export default Viewpastes;

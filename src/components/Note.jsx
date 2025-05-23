import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeNote, resetAllNotes } from '../Redux/noteSlice';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import jsPDF from 'jspdf';
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  EmailIcon,
} from 'react-share';
import '../css components/note.css';
import { MdOutlineModeEdit } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa6";
import { FaShareAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { CiRead } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";

const Note = () => {
  const notes = useSelector((state) => state.note.notes);
  const [searchTerm, setSearchTerm] = useState('');
  const [share, setShare] = useState(false);
  const [shareLinkValue, setShareLinkValue] = useState('');
  const dispatch = useDispatch();

  const toggleShare = () => setShare(!share);

  const generateNoteURL = (noteId) => {
    return `${window.location.origin}/notes/${noteId}`;
  };

  const filterData = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const clickDelete = (noteId) => {
    dispatch(removeNote(noteId));
  };

  const shareLink = (noteId) => {
    setShareLinkValue(generateNoteURL(noteId));
  };

  const formatDate = (unformattedDate) => {
    const date = new Date(unformattedDate);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const downloadPdf = (note) => {
    const doc = new jsPDF();
    const title = note.title;

    const tempElement = document.createElement('div');
    tempElement.innerHTML = note.content ;
    const content = tempElement.innerText;

    doc.setFontSize(16);
    doc.text(title, 10, 20);

    doc.setFontSize(12);
    const splitContent = doc.splitTextToSize(content, 180);
    doc.text(splitContent, 10, 30);

    doc.save(`Note-${note._id}.pdf`);
  };

  const deleteAll = () => {
    dispatch(resetAllNotes());
  };

  const copyText = (noteContent) => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = noteContent;
    const plainText = tempElement.innerText;
    navigator.clipboard.writeText(plainText);
    toast.success("Note copied successfully");
  };

  return (
    <div className="note-container">
      <div>
        <h2>List of Notes</h2>
        <input
          className="search-txt"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search your title here'
        />
      </div>

      <div className="note-history">
        {filterData.length > 0 &&
          filterData.map((note) => (
            <div className="note-contents" key={note?._id}>
              <div className='date-contents'>
                <div className="note-details">
                  <p>{note.title}</p>
                  <div
                    id="note-content"
                    dangerouslySetInnerHTML={{ __html: note.content }}
                  ></div>
                </div>
                <p className="note-created-date">{formatDate(note.createdAt)}</p>
              </div>
              <div className="note-nav">
                <div className="note-buttons">
                  <button>
                    <NavLink to={`/?noteId=${note._id}`}><MdOutlineModeEdit /></NavLink>
                  </button>

                  <button onClick={() => clickDelete(note._id)}><MdDelete /></button>

                  <button>
                    <NavLink to={`/notes/${note._id}`}><CiRead /></NavLink>
                  </button>

                  <button onClick={() => { copyText(note?.content) }}>
                    <FaRegCopy />
                  </button>

                  <div>
                    <button
                      className="share-btn"
                      onClick={() => {
                        toggleShare();
                        shareLink(note._id);
                      }}
                    >
                      <FaShareAlt />
                    </button>

                    {share && (
                      <div className="share">
                        <div className="overlay">
                          <div className="share_content">
                            <div className="Anyone-who">
                              <h3>Share Link</h3>
                              <span>
                                Anyone who has this link will be able to view this
                              </span>
                            </div>
                            <div className="closebtn">
                              <button onClick={toggleShare} className="close-share">
                                <IoMdClose />
                              </button>
                            </div>
                          </div>

                          <input
                            type="text"
                            value={shareLinkValue}
                            className="copy-link"
                            readOnly
                          />

                          <div className="icons">
                            <FacebookShareButton url={shareLinkValue} quote="Check out this note" id='Fb'>
                              <FacebookIcon id='Fb-icon' />
                            </FacebookShareButton>

                            <TwitterShareButton url={shareLinkValue} id='X'>
                              <TwitterIcon id='X-icon' />
                            </TwitterShareButton>

                            <EmailShareButton url={shareLinkValue} id='Email'>
                              <EmailIcon id='Email-icon' />
                            </EmailShareButton>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="note-created-date">
                  <button id="download-btn" onClick={() => downloadPdf(note)}>
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      <button id="delete-all" onClick={deleteAll}>
        Reset All Notes
      </button>
    </div>
  );
};

export default Note;

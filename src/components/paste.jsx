import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removePaste, resetAllPastes } from '../Redux/pasteSlice';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {
  EmailShareButton,
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  EmailIcon,
} from 'react-share';
import '../css components/paste.css';
import { MdOutlineModeEdit } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa6";
import { FaShareAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { CiRead } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const [share, setShare] = useState(false);
  const [Sharelink, setShareLink] = useState('');
  const pdfRef = useRef();
  const dispatch = useDispatch();

  const toggleShare = () => setShare(!share);

  const generatePasteURL = (pasteId) => {
    return `${window.location.origin}/pastes/${pasteId}`;
  };

  const filterData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const clickDelete = (pasteId) => {
    dispatch(removePaste(pasteId));
  };

  const shareLink = (pasteId) => {
    setShareLink(generatePasteURL(pasteId));
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

  const downloadPdf = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4', true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('Note.pdf');
    });
  };

  const deleteAll = () => {
    dispatch(resetAllPastes());
  };
 const copyText=(pasteContent)=>{
  const tempElement = document.createElement('div');
  tempElement.innerHTML = pasteContent;
  const plainText = tempElement.innerText;
  navigator.clipboard.writeText(plainText);
  toast.success("Note copied successfully");
 }
  return (
    <div className="paste-container">
      <div>
        <h2>List of Pastes</h2>
        <input
          className="search-txt"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='search Your title here'
        />
      </div>

      <div className="paste-history">
        {filterData.length > 0 &&
          filterData.map((paste) => (
            <div className="paste-contents" key={paste?._id}>
              <div className='date-contents'>
              <div className="paste-details" ref={pdfRef}>
                <p>{paste.title}</p>
                <div
                  id="paste-content"
                  dangerouslySetInnerHTML={{ __html: paste.content }}
                ></div>
              </div>
              <p className="paste-created-date">{formatDate(paste.createdAt)}</p>
            </div>
              <div className="paste-nav">
                <div className="paste-buttons">
                  <button>
                    <NavLink to={`/?pasteId=${paste._id}`}><MdOutlineModeEdit /></NavLink>
                  </button>

                  <button onClick={() => clickDelete(paste._id)}><MdDelete /></button>

                  <button>
                    <NavLink to={`/pastes/${paste._id}`}><CiRead /></NavLink>
                  </button>

                  <button
                    onClick={() => {copyText(paste?.content)}}>
                    <FaRegCopy />
                  </button>

                  <div>
                    <button
                      className="share-btn"
                      onClick={() => {
                        toggleShare();
                        shareLink(paste._id);
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
                            value={Sharelink}
                            className="copy-link"
                            readOnly
                          />

                          <div className="icons">
                            <FacebookShareButton
                              url={Sharelink}
                              quote="Check out this note" id='Fb'
                            >
                              <FacebookIcon id='Fb-icon'/>
                            </FacebookShareButton>

                            <TwitterShareButton url={Sharelink} id='X'>
                              <TwitterIcon id='X-icon' />
                            </TwitterShareButton>

                            <EmailShareButton url={Sharelink} id='Email'>
                              <EmailIcon id='Email-icon' />
                            </EmailShareButton>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="paste-created-date">
                  <button id="download-btn" onClick={downloadPdf}>
                    Download
                  </button>
                  
                </div>
              </div>
            </div>
          ))}
      </div>

      <button id="delete-all" onClick={deleteAll}>
        Reset All Pastes
      </button>
    </div>
  );
};

export default Paste;

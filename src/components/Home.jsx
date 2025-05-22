import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../Redux/pasteSlice';
import toast from 'react-hot-toast';
import '../css components/home.css';
import { FaBold } from "react-icons/fa";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { LiaItalicSolid } from "react-icons/lia";
import { HiOutlineUnderline } from "react-icons/hi2";
const Home = () => {
  const [title, setTitle] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const Dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: '',
  });

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        editor?.commands.setContent(paste.content || '');
      }
    }
  }, [pasteId, allPastes, editor]);

  const createPaste = () => {
    const content = editor?.getHTML() || '';
    const isEditorEmpty = editor?.isEmpty;
    const paste = {
      title:title,
      content:content,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (paste.title && !isEditorEmpty) {
      if (pasteId) {
        Dispatch(updateToPastes(paste));
      } else {
        Dispatch(addToPastes(paste));
      }
    } else {
      toast("Field can't be empty");
    }

    setTitle('');
    editor?.commands.setContent('');
    setSearchParams({});
  };

  return (
    <div className="container">
      <div className='title-btn'>
        <input
          type="text"
          id='paste-title'
          placeholder='Enter title here'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={createPaste} id='paste-create'>
          {pasteId ? "Update my Paste" : "Create my Paste"}
        </button>
      </div>

      <div className='Tool-buttons'>
        <button onClick={() => editor?.chain().focus().toggleBold().run()}
          className={editor?.isActive('bold') ? 'active' : ''}>
          <FaBold />
        </button>
        <button onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={editor?.isActive('italic') ? 'active' : ''}>
          <LiaItalicSolid />
        </button>
        <button onClick={() => editor?.chain().focus().toggleUnderline().run()}
          className={editor?.isActive('underline') ? 'active' : ''}>
          <HiOutlineUnderline />
        </button>
      </div>

      <div className="textarea" >
        <EditorContent editor={editor} className="details" id="description"/>
      </div>
    </div>
  );
};

export default Home;

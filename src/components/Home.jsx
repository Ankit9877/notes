import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToNotes, updateToNotes } from '../Redux/noteSlice';
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
  const noteId = searchParams.get("noteId");
  const dispatch = useDispatch();
  const allNotes = useSelector((state) => state.note.notes);

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: '',
  });

  useEffect(() => {
    if (noteId) {
      const note = allNotes.find((n) => n._id === noteId);
      if (note) {
        setTitle(note.title);
        editor?.commands.setContent(note.content || '');
      }
    }
  }, [noteId, allNotes, editor]);

  const createNote = () => {
    const content = editor?.getHTML() || '';
    const isEditorEmpty = editor?.isEmpty;
    const note = {
      title: title,
      content: content,
      _id: noteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (note.title && !isEditorEmpty) {
      if (noteId) {
        dispatch(updateToNotes(note));
      } else {
        dispatch(addToNotes(note));
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
          id='note-title'
          placeholder='Enter title here'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={createNote} id='note-create'>
          {noteId ? "Update my Note" : "Create my Note"}
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

      <div className="textarea">
        <EditorContent editor={editor} className="details" id="description" />
      </div>
    </div>
  );
};

export default Home;

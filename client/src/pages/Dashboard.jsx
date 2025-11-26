import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Dashboard = () => {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [summarizingId, setSummarizingId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const res = await api.get('/notes');
            setNotes(res.data);
        } catch (err) {
            console.error('Error fetching notes:', err);
            if (err.response?.status === 401) {
                navigate('/login');
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleCreateNote = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/notes', { title, content });
            setNotes([res.data, ...notes]);
            setTitle('');
            setContent('');
        } catch (err) {
            console.error('Error creating note:', err);
        }
    };

    const handleDeleteNote = async (id) => {
        if (!window.confirm('Are you sure you want to delete this note?')) return;
        try {
            await api.delete(`/notes/${id}`);
            setNotes(notes.filter((note) => note._id !== id));
        } catch (err) {
            console.error('Error deleting note:', err);
        }
    };

    const handleSummarize = async (id) => {
        setSummarizingId(id);
        try {
            const res = await api.post(`/notes/${id}/summarize`);
            setNotes(notes.map((note) => (note._id === id ? res.data : note)));
        } catch (err) {
            console.error('Error summarizing note:', err);
            alert('Failed to generate summary. Please try again.');
        } finally {
            setSummarizingId(null);
        }
    };

    return (
        <div className="dashboard-container">
            <header>
                <h1>My Notes</h1>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </header>

            <div className="create-note-section">
                <h3>Create New Note</h3>
                <form onSubmit={handleCreateNote}>
                    <input
                        type="text"
                        placeholder="Note Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Write your note content here..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        rows="4"
                    ></textarea>
                    <button type="submit">Add Note</button>
                </form>
            </div>

            <div className="notes-list">
                {notes.map((note) => (
                    <div key={note._id} className="note-card">
                        <h3>{note.title}</h3>
                        <p className="note-content">{note.content}</p>
                        {note.summary && (
                            <div className="note-summary">
                                <strong>✨ AI Summary</strong>
                                <p>{note.summary}</p>
                            </div>
                        )}
                        <div className="note-actions">
                            <button
                                onClick={() => handleSummarize(note._id)}
                                disabled={summarizingId === note._id}
                                className="summarize-btn"
                            >
                                {summarizingId === note._id ? 'Summarizing...' : 'Summarize'}
                            </button>
                            <button onClick={() => handleDeleteNote(note._id)} className="delete-btn">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;

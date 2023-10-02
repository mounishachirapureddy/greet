import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserDetails from './UserForm';
import VideoPage from './VideoPage';
import EditorForm from './EditorForm';
import NotFound from './NotFound';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<UserDetails/>} />
        <Route path="/video-page" element={<VideoPage/>} />
        <Route path="/editor-form" element={<EditorForm/>} />
        <Route path="/not-found" element={<NotFound/>} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

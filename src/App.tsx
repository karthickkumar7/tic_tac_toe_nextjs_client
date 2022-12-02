import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FriendInvite from './pages/FriendInvite';
import HomePage from './pages/HomePage';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/friend" element={<FriendInvite />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;

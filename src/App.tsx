import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FriendInvite from './pages/FriendInvite';
import HomePage from './pages/HomePage';
import TTTHome from './pages/TTTHome';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/ttt">
                    <Route index element={<TTTHome />} />
                    <Route path="friend" element={<FriendInvite />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;

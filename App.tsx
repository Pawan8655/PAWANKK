import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Editor from './Editor';

const App: React.FC = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/editor' element={<Editor />} />
        </Routes>
    );
};

export default App;

import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import DashboardPage from './Pages/DashboardPage';
import PrivateRoute from './Security/PrivateRoute';


function App() {
    return (
        <Routes>
          <Route exact path='/' element={<LoginPage/>}/>
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/dashboard' element={<PrivateRoute element={<DashboardPage />} />} />
        </Routes>
    );
}

export default App;

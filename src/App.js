import './App.css';
import React from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BackToTop } from './components/BackToTop/BackToTop';
function App() {
  // track logged-in user
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // optional: persist user state in localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <>
      {/* if i want to fix somthing do it in app and make outhers nasted routes */}
      <Navbar user={user} setUser={setUser} />
      <Outlet context={{ user, setUser }} />
      <BackToTop />
    </>
  );
}

export default App;

// the code here is jsx => javascript xml

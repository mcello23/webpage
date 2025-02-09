// src/components/Layout/Layout.jsx
import React from 'react';
import Navbar from './Navbar/Navbar';
//import Footer from './Footer'; // Se você tiver um componente Footer

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>
        {children}
      </main>
      {/* <Footer /> Se você tiver um componente Footer */}
    </>
  );
};

export default Layout;
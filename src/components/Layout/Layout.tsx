import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    // You can perform side-effects here
  }, []);

  return (
    <>
      <Navbar />
      <div className="container py-10">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;

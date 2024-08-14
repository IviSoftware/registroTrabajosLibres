import React from 'react';

const Navbar = () => {
  return (
    <>
      <img src="/img/congressHeaderMobile.png" alt="Header movil" className="NavbarHeader w-full  justify-center items-center top-0 lg:top-auto md:hidden lg:bottom-0 shadow-md" />
      <img src="/img/headerHomeDesktop.png" alt="Header escritorio" className="NavbarHeader w-full  justify-center items-center top-0 lg:top-auto hidden md:block lg:bottom-0 shadow-md" />
    </>
  );
};

export {Navbar};
import React from 'react';

const NavbarQuest = () => {
  return (
    <>
      <img src="/img/questHeaderMobile.png" alt="Header movil" className="NavbarHeader w-full flex justify-center items-center top-0 lg:top-auto md:hidden lg:bottom-0 shadow-md" />
      <img src="/img/questHeaderDesktop.png" alt="Header escritorio" className="NavbarHeader w-full  justify-center items-center top-0 lg:top-auto hidden md:block lg:bottom-0 shadow-md" />
    </>
  );
};

export {NavbarQuest};
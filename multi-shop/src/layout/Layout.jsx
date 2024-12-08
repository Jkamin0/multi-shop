import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="flex">
      <Header />
      <Navbar />
      <div className="flex-grow">
        <main className="mt-[64px] p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;

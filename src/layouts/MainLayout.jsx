import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="bg-grey">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;

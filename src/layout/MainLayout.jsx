import React from "react";
import "./MainLayout.scss";
import ProfileSide from "../components/profileSide/ProfileSide";
import { Outlet } from "react-router-dom";
import RightSide from "../components/rightSide/RightSide";

const MainLayout = () => {
  return (
    <div className="MainLayout">
      <ProfileSide />
      <Outlet />
      <RightSide />
    </div>
  );
};

export default MainLayout;

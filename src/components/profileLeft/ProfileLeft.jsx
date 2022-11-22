import React from "react";
import FollowerCard from "../followersCard/FollowersCard";
import InfoCard from "../infoCard/InfoCard";
import LogoSearch from "../logoSearch/LogoSearch";
import "./ProfileLeft.scss";

const ProfileLeft = () => {
  return (
    <div className="ProfileSide">
      <LogoSearch />
      <div className="user-options">
        <InfoCard />
        <FollowerCard />
      </div>
    </div>
  );
};

export default ProfileLeft;

import React from "react";
import FollowersCard from "../followersCard/FollowersCard";
import LogoSearch from "../logoSearch/LogoSearch";
import ProfileCard from "../profileCard/ProfileCard";
import './ProfileSide.scss';

const ProfileSide = () => {
  return (
    <div className="ProfileSide">
      <LogoSearch />
      <div className="user-options">
        <ProfileCard />
        <FollowersCard />
      </div>
    </div>
  );
}

export default ProfileSide;

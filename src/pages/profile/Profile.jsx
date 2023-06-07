import { useEffect } from "react";
import { useSelector } from "react-redux";
import FixedBottomNavigation from "../../components/bottomNavigation/BottomNavigation";
import PostSide from "../../components/postSide/PostSide";
import ProfileCard from "../../components/profileCard/ProfileCard";
import ProfileLeft from "../../components/profileLeft/ProfileLeft";
import RightSide from "../../components/rightSide/RightSide";
import "./Profile.scss";

const Profile = () => {
  const { sizeState } = useSelector((state) => state.appReducer);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className='Profile'>
      <ProfileLeft />

      <div className='Profile-center'>
        <ProfileCard />
        <PostSide />
      </div>

      {sizeState === "desktop" ? <RightSide /> : <FixedBottomNavigation />}
    </div>
  );
};

export default Profile;

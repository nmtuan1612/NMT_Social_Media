import { useEffect } from "react";
import { useSelector } from "react-redux";
import FixedBottomNavigation from "../../components/bottomNavigation/BottomNavigation";
import PostSide from "../../components/postSide/PostSide";
import ProfileSide from "../../components/profileSide/ProfileSide";
import RightSide from "../../components/rightSide/RightSide";
import "./Home.scss";

const Home = () => {
  const { sizeState } = useSelector((state) => state.appReducer);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className='Home'>
      <ProfileSide />
      <PostSide />
      {sizeState === "desktop" ? <RightSide /> : <FixedBottomNavigation />}
    </div>
  );
};

export default Home;

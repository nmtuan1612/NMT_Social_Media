import ChatBox from "components/messenger/components/ChatBox/ChatBox";
import FixedBottomNavigation from "../../components/bottomNavigation/BottomNavigation";
import ProfileSide from "../../components/profileSide/ProfileSide";
import "./MessengerPage.scss";

const MessengerPage = () => {
  return (
    <div className='MessengerPage'>
      <ProfileSide />
      <div className='messenger__box-center'>
        <ChatBox />
      </div>
      <FixedBottomNavigation />
    </div>
  );
};

export default MessengerPage;

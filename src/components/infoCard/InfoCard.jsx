import { useEffect } from "react";
import { UilPen } from "@iconscout/react-unicons";
import "./InfoCard.scss";
import { useState } from "react";
import EditProfileModal from "../editProfileModal/EditProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/actions/AuthAction";
import { useUser } from "../../hooks";

const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const { user } = useSelector((state) => state.authReducer.authData);
  const [profileUser, setProfileUser] = useState(user);

  const dispatch = useDispatch();
  const userData = useUser();

  useEffect(() => {
    if (userData) {
      setProfileUser(userData);
    }
  }, [userData]);
  // const params = useParams();

  // const profileUserId = params.id;

  // useEffect(() => {
  //   const fetchProfileUser = async () => {
  //     if (profileUserId === user._id) {
  //       setProfileUser(user);
  //     } else {
  //       const profileData = await UserApi.getUser(profileUserId);
  //       setProfileUser(profileData.data);
  //     }
  //   };
  //   fetchProfileUser();
  // }, [user]);

  const handleLogout = () => {
    dispatch(logOut());
  };

  const showModal = () => setModalOpened(true);

  const hideModal = () => setModalOpened(false);

  return (
    <div className='InfoCard'>
      <div className='infoHead'>
        <h4>Profile Info</h4>
        {user._id === profileUser._id ? (
          <div className='edit-btn'>
            <UilPen style={{ width: "2rem", height: "1.2rem" }} onClick={showModal} />
            <EditProfileModal modalOpened={modalOpened} hideModal={hideModal} data={user} />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className='info'>
        <span>
          <b>Status</b>
        </span>
        <span>{profileUser.relationship}</span>
      </div>

      <div className='info'>
        <span>
          <b>Live in</b>
        </span>
        <span>{profileUser.liveIn}</span>
      </div>

      <div className='info'>
        <span>
          <b>Come from</b>
        </span>
        <span>{profileUser.country}</span>
      </div>

      <div className='info'>
        <span>
          <b>Work at</b>
        </span>
        <span>{profileUser.workAt}</span>
      </div>

      {profileUser._id === user._id ? (
        <button className='button logout-btn' onClick={handleLogout}>
          Logout
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default InfoCard;

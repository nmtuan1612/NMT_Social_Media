import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../../redux/actions/AuthAction";
import EditProfileModal from "../editProfileModal/EditProfileModal";
import Messenger from "../messenger/Messenger";
import NotificationList from "../notificationList/NotificationList";
import SavedPostList from "../savedPostList/SavedPostList";
import "./BottomNavigation.scss";

const FixedBottomNavigation = () => {
  const [editModalOpen, setEditModalOpen] = useState(false);

  const { user } = useSelector((state) => state.authReducer.authData);
  // const { chatID, otherUserId } = useSelector((state) => state.appReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ref = useRef(null);
  const [currTab, setCurrTab] = useState("home");

  useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
  }, [currTab]);

  const handleLogout = () => {
    setCurrTab("home");
    dispatch(logOut());
    navigate("/auth");
  };

  const hideEditModal = () => setEditModalOpen(false);
  const showEditModal = () => {
    setEditModalOpen(true);
    setCurrTab("home");
  };

  const hidePopUp = () => {
    setCurrTab("home");
  };

  return (
    <div className='FixedBottomNavigation' ref={ref}>
      {currTab === "notifications" && (
        <div className='bottom-nav__tab'>
          <NotificationList hidePopUp={hidePopUp} />
        </div>
      )}
      {currTab === "saved" && (
        <div className='bottom-nav__tab'>
          <SavedPostList hidePopUp={hidePopUp} />
        </div>
      )}
      {currTab === "messages" && (
        // <div className='bottom-nav__tab'>{chatID && otherUserId ? <ChatBox /> : <Messenger />}</div>
        <div className='bottom-nav__tab'>
          <Messenger />
        </div>
      )}
      {currTab === "menu" && (
        <div className='bottom-nav__tab'>
          <h2 style={{ color: "var(--black" }}>Menu</h2>
          <List sx={{ backgroundColor: "white", padding: 0, width: "100%" }}>
            <ListItem disablePadding sx={{ marginBottom: "12px" }}>
              <Link to={`/profile/${user._id}`} style={{ textDecoration: "none", display: "block", width: "100%" }}>
                <div className='user-info'>
                  <img
                    src={
                      user.profilePicture ||
                      "http://res.cloudinary.com/duyb3dqsr/image/upload/v1686151682/umqnvu5voukxkdxtowo4.png"
                    }
                    alt=''
                    className='user-img'
                  />
                  <div className='user-text'>
                    <span className='user-name'>{`${user.firstName} ${user.lastName}`}</span>
                    <span className='user-nick-name'>{`@${user.userName}`}</span>
                  </div>
                </div>
              </Link>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={showEditModal} sx={{ padding: "4px 8px", borderRadius: 2 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <EditOutlinedIcon sx={{ width: 24, height: 24 }} />
                </ListItemIcon>
                <ListItemText secondary={<span style={{ fontSize: 16, marginLeft: 6 }}>Edit profile</span>} />
              </ListItemButton>
            </ListItem>

            <div style={{ borderTop: "2px solid var(--hrColor)", margin: 12 }} />

            <ListItem disablePadding>
              <div className='flex__center' style={{ width: "100%" }}>
                <button className='button' onClick={handleLogout} style={{ width: 120, background: "#b0acac" }}>
                  <LogoutIcon sx={{ width: 24, height: 24 }} /> Logout
                </button>
              </div>
              {/* <ListItemButton onClick={handleLogout} sx={{ padding: "4px 8px", borderRadius: 2 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <LogoutIcon sx={{ width: 24, height: 24 }} />
                </ListItemIcon>
                <ListItemText secondary={<span style={{ fontSize: 16, marginLeft: 6 }}>Logout</span>} />
              </ListItemButton> */}
            </ListItem>
          </List>
        </div>
      )}
      {/* nav */}
      <div className='BottomNavigation'>
        <BottomNavigation
          showLabels
          value={currTab}
          onChange={(event, newValue) => {
            // console.log(newValue);
            setCurrTab(newValue);
            dispatch({
              type: "CONNECT_SOCKET",
              payload: { chatID: "", otherUserId: "" }
            });
          }}
        >
          <BottomNavigationAction
            value='home'
            label='Home'
            icon={<HomeRoundedIcon />}
            onClick={() => navigate("/home")}
          />
          <BottomNavigationAction
            value='notifications'
            label='Notifications'
            icon={<NotificationsNoneOutlinedIcon />}
          />
          <BottomNavigationAction value='saved' label='Saved' icon={<BookmarkBorderOutlinedIcon />} />
          <BottomNavigationAction
            value='messages'
            label='Messages'
            icon={
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
                className='h-3 w-3'
                style={{ width: 24, height: 24 }}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z'
                />
              </svg>
            }
          />
          <BottomNavigationAction
            value='menu'
            label='Menu'
            icon={
              <img
                src={
                  user?.profilePicture
                    ? user.profilePicture
                    : "http://res.cloudinary.com/duyb3dqsr/image/upload/v1686151682/umqnvu5voukxkdxtowo4.png"
                }
                alt={user?.profilePicture?.slice(-10)}
                style={{
                  borderRadius: "50%",
                  objectFit: "cover"
                }}
                className='bottom-icon__avt'
              />
            }
          />
        </BottomNavigation>
      </div>
      <EditProfileModal data={user} modalOpened={editModalOpen} hideModal={hideEditModal} />
    </div>
  );
};

export default FixedBottomNavigation;

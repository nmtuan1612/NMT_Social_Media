import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import { withStyles } from "@mui/styles";
import Messenger from "components/messenger/Messenger";
import ChatBox from "components/messenger/components/ChatBox/ChatBox";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../../redux/actions/AuthAction";
import EditProfileModal from "../editProfileModal/EditProfileModal";
import NotificationList from "../notificationList/NotificationList";
import SavedPostList from "../savedPostList/SavedPostList";
import ShareModal from "../shareModal/ShareModal";
import TrendCard from "../trendCard/TrendCard";
import "./RightSide.scss";

const CustomTooltip = withStyles({
  arrow: {
    "&:before": {
      border: "1px solid #aba9a9",
      backgroundColor: "#fff !important"
    },
    color: "#fff"
  },
  tooltip: {
    backgroundColor: "#fff !important",
    boxShadow: "0px 0px 4px 1px #999",
    borderRadius: "8px !important",
    marginTop: 0
  }
})(Tooltip);

const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [openNoti, setOpenNoti] = useState(false);
  const [openSaved, setOpenSaved] = useState(false);
  const [openMessenger, setOpenMessenger] = useState(false);

  const { user } = useSelector((state) => state.authReducer.authData);
  const { chatID } = useSelector((state) => state.appReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showSaved = () => {
    setOpenSaved(!openSaved);
  };

  const hideSaved = () => {
    setOpenSaved(false);
  };

  const hideSetting = () => {
    setSettingOpen(false);
  };

  const showSetting = () => {
    setSettingOpen((prev) => !prev);
  };

  const handleLogout = () => {
    hideSetting();
    dispatch(logOut());
    navigate("/auth");
  };

  const showShareModal = () => setModalOpened(true);
  const hideShareModal = () => setModalOpened(false);

  const hideEditModal = () => setEditModalOpen(false);
  const showEditModal = () => {
    setEditModalOpen(true);
    hideSetting();
  };

  const showNoti = () => {
    setOpenNoti(!openNoti);
  };
  const hideNoti = () => {
    setOpenNoti(false);
  };

  const showMessenger = () => {
    setOpenMessenger(!openMessenger);
  };
  const hideMessenger = () => {
    setOpenMessenger(false);
  };

  return (
    <div className='RightSide'>
      <div className='navIcons'>
        {/* Home */}
        <CustomTooltip arrow placement='bottom-end' title={<div style={{ color: "var(--black" }}>Home</div>}>
          <Link to='/home' className='flex__center'>
            <HomeRoundedIcon sx={{ color: "var(--base-color)", fontSize: 26 }} />
          </Link>
        </CustomTooltip>

        {/* Notification */}
        <ClickAwayListener onClickAway={hideNoti}>
          <CustomTooltip
            arrow
            placement='bottom'
            open={openNoti}
            onClose={hideNoti}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={
              <div className='nav__tooltip-content'>
                <NotificationList hideNoti={hideNoti} />
              </div>
            }
          >
            <div className='flex__center nav-icon__wrapper'>
              <NotificationsNoneOutlinedIcon onClick={showNoti} />
            </div>
          </CustomTooltip>
        </ClickAwayListener>

        {/* Saved */}
        <ClickAwayListener onClickAway={hideSaved}>
          <CustomTooltip
            arrow
            placement='bottom-end'
            open={openSaved}
            onClose={hideSaved}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={
              <div className='nav__tooltip-content'>
                <SavedPostList hideSaved={hideSaved} />
              </div>
            }
          >
            <div className='flex__center nav-icon__wrapper'>
              <BookmarkBorderOutlinedIcon onClick={showSaved} />
            </div>
          </CustomTooltip>
        </ClickAwayListener>

        {/* Messenger */}
        <ClickAwayListener onClickAway={hideMessenger}>
          <CustomTooltip
            arrow
            placement='bottom-end'
            open={openMessenger}
            onClose={hideMessenger}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={
              <div className='nav__tooltip-content'>
                <Messenger hideMessenger={hideMessenger} />
              </div>
            }
          >
            <div className='flex__center nav-icon__wrapper' onClick={showMessenger}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
                className='h-3 w-3'
                style={{ width: 20, height: 20 }}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z'
                />
              </svg>
            </div>
          </CustomTooltip>
        </ClickAwayListener>

        {/* User */}
        <ClickAwayListener onClickAway={hideSetting}>
          <CustomTooltip
            arrow
            placement='bottom-end'
            open={settingOpen}
            onClose={hideSetting}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={
              <List sx={{ backgroundColor: "white", padding: 0 }}>
                <ListItem disablePadding>
                  <Link to={`/profile/${user._id}`} style={{ textDecoration: "none" }}>
                    <ListItemButton onClick={hideSetting} sx={{ padding: "4px 8px", borderRadius: 2 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <AccountBoxOutlinedIcon sx={{ width: 20, height: 20 }} />
                      </ListItemIcon>
                      <ListItemText secondary='My profile' />
                    </ListItemButton>
                  </Link>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton onClick={showEditModal} sx={{ padding: "4px 8px", borderRadius: 2 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <EditOutlinedIcon sx={{ width: 20, height: 20 }} />
                    </ListItemIcon>
                    <ListItemText secondary='Edit profile' />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton onClick={handleLogout} sx={{ padding: "4px 8px", borderRadius: 2 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <LogoutIcon sx={{ width: 20, height: 20 }} />
                    </ListItemIcon>
                    <ListItemText secondary='Logout' />
                  </ListItemButton>
                </ListItem>
              </List>
            }
          >
            <img
              src={
                user.profilePicture
                  ? process.env.REACT_APP_PUBLIC_FOLDER + user.profilePicture
                  : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fplain-white-background&psig=AOvVaw0RA9E5KddBSwB8X3R1hRJ7&ust=1686132401107000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCMDngeiyrv8CFQAAAAAdAAAAABAD"
              }
              alt={user.profilePicture}
              onClick={showSetting}
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "1px solid #ebebeb"
              }}
            />
          </CustomTooltip>
        </ClickAwayListener>
      </div>

      <div className='trend-card'>
        <TrendCard />
      </div>

      <button className='button right-share-btn' onClick={showShareModal}>
        Share
      </button>

      <ShareModal modalOpened={modalOpened} hideModal={hideShareModal} />
      <EditProfileModal data={user} modalOpened={editModalOpen} hideModal={hideEditModal} />

      {chatID && (
        <div className='chat-box__desktop'>
          <ChatBox />
        </div>
      )}
    </div>
  );
};

export default RightSide;

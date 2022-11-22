import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import { Link } from "react-router-dom";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Tooltip from "@mui/material/Tooltip";
import { withStyles } from "@mui/styles";
import TrendCard from "../trendCard/TrendCard";
import ShareModal from "../shareModal/ShareModal";
import { logOut } from '../../redux/actions/AuthAction';
import EditProfileModal from "../editProfileModal/EditProfileModal";
import Home from "../../img/home.png";
import "./RightSide.scss";
import { getNotifications } from "../../redux/actions/UserAction";
import Notification from "./Notification";
import SavedPost from "./SavedPost";
import { getSavedPost } from "../../redux/actions/PostAction";


const CustomTooltip = withStyles({
  arrow: {
    "&:before": {
      border: "1px solid #aba9a9",
      backgroundColor: "#fff !important",
    },
    color: "#fff",
  },
  tooltip: {
    backgroundColor: "#fff !important",
    boxShadow: "0px 0px 4px 1px #999",
    borderRadius: "8px !important",
  }
})(Tooltip);

const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [openNoti, setOpenNoti] = useState(false);
  const [openSaved, setOpenSaved] = useState(false);

  const { user } = useSelector(state => state.authReducer.authData);
  const notifications = useSelector(state => state.notificationReducer.notifications);
  const savedPosts = useSelector(state => state.postReducer.savedPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotifications(user._id));
    dispatch(getSavedPost(user._id));
  }, [user._id, dispatch]);

  const showSaved = () => {
    setOpenSaved((prev) => !prev);
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
  }

  const showShareModal = () => setModalOpened(true);
  const hideShareModal = () => setModalOpened(false);

  const hideEditModal = () => setEditModalOpen(false);
  const showEditModal = () => {
    setEditModalOpen(true);
    hideSetting();
  };

  const showNoti = () => {
    setOpenNoti((prev) => !prev);
  };
  const hideNoti = () => { setOpenNoti(false) };

  return (
    <div className="RightSide">
      <div className="navIcons">
        {/* Home */}
        <CustomTooltip
          arrow
          placement="bottom-end"
          title={<div style={{ color: "var(--black" }}>Home</div>}
        >
          <Link to="/home">
            <img src={Home} alt="" />
          </Link>
        </CustomTooltip>

        {/* Notification */}
        <ClickAwayListener onClickAway={hideNoti}>
          <CustomTooltip
            arrow
            placement="bottom"
            open={openNoti}
            onClose={hideNoti}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={
              <div
                className="noti-side"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "0.6rem",
                  gap: "1.2rem",
                  minWidth: 200,
                  maxHeight: 300,
                  overflowY: "scroll",}}
              >
                <h2 style={{ color: "var(--black" }}>Notifications</h2>
                {(notifications && notifications.length) ? (
                  <ul
                    className="noti-list"
                    style={{
                      listStyle: "none",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.6rem",
                    }}
                  >
                    {notifications.map((noti) => (
                      <Notification key={noti._id} notiData={noti} hideNoti={hideNoti} />
                    ))}
                  </ul>
                ) : <div style={{ color: "var(--gray)"}}><i>No notification found.</i></div>}
              </div>
            }
          >
            <NotificationsNoneOutlinedIcon onClick={showNoti} />
          </CustomTooltip>
        </ClickAwayListener>

        {/* Saved */}
        <ClickAwayListener onClickAway={hideSaved}>
          <CustomTooltip
            arrow
            placement="bottom-end"
            open={openSaved}
            onClose={hideSaved}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={
              <div
                className="noti-side"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "0.4rem",
                  gap: "1rem",
                  minWidth: 200,
                  maxHeight: 300,
                  overflowY: "scroll"
                }}
              >
                <h2 style={{ color: "var(--black" }}>Saved posts</h2>
                {(savedPosts && savedPosts.length) ? (
                  <ul
                    className="noti-list"
                    style={{
                      listStyle: "none",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.6rem",
                    }}
                  >
                    {savedPosts.map((post) => (
                      <SavedPost key={post._id} savedPost={post} hideSaved={hideSaved} />
                    ))}
                  </ul>
                ) : <div style={{ color: "var(--gray)"}}><i>No post saved.</i></div>}
              </div>
            }
          >
            <BookmarkBorderOutlinedIcon onClick={showSaved} />
          </CustomTooltip>
        </ClickAwayListener>

        {/* User */}
        <ClickAwayListener onClickAway={hideSetting}>
          <CustomTooltip
            arrow
            placement="bottom-end"
            open={settingOpen}
            onClose={hideSetting}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={
              <List sx={{ backgroundColor: "white", padding: 0 }}>
                <ListItem disablePadding>
                  <Link
                    to={`/profile/${user._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <ListItemButton
                      onClick={hideSetting}
                      sx={{ padding: "4px 8px", borderRadius: 2 }}
                    >
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <AccountBoxOutlinedIcon
                          sx={{ width: 20, height: 20 }}
                        />
                      </ListItemIcon>
                      <ListItemText secondary="My profile" />
                    </ListItemButton>
                  </Link>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton
                    onClick={showEditModal}
                    sx={{ padding: "4px 8px", borderRadius: 2 }}
                  >
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <EditOutlinedIcon sx={{ width: 20, height: 20 }} />
                    </ListItemIcon>
                    <ListItemText secondary="Edit profile" />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton
                    onClick={handleLogout}
                    sx={{ padding: "4px 8px", borderRadius: 2 }}
                  >
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <LogoutIcon sx={{ width: 20, height: 20 }} />
                    </ListItemIcon>
                    <ListItemText secondary="Logout" />
                  </ListItemButton>
                </ListItem>
              </List>
            }
          >
            <img
              src={
                user.profilePicture
                  ? process.env.REACT_APP_PUBLIC_FOLDER + user.profilePicture
                  : process.env.REACT_APP_PUBLIC_FOLDER + "profileImg.jpg"
              }
              alt={user.profilePicture}
              onClick={showSetting}
              style={{
                width: "2rem",
                height: "2rem",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </CustomTooltip>
        </ClickAwayListener>
      </div>

      <div className="trend-card">
        <TrendCard />
      </div>

      <button className="button right-share-btn" onClick={showShareModal}>
        Share
      </button>

      <ShareModal modalOpened={modalOpened} hideModal={hideShareModal} />
      <EditProfileModal
        data={user}
        modalOpened={editModalOpen}
        hideModal={hideEditModal}
      />
    </div>
  );
};

export default RightSide;

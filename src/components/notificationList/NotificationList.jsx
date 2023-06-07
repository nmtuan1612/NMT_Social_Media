import React, { useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import Notification from "./Notification";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { UserApi } from "../../redux/api";

const NotificationList = (props) => {
  const { hideNoti, hidePopUp } = props;
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchNoti = async () => {
      setLoading(true);
      const { data } = await UserApi.getNotifications(user?._id);
      setLoading(false);
      data && setNotifications(data);
    };
    user && fetchNoti();
  }, [user]);

  return (
    <>
      <h2 style={{ color: "var(--black" }}>Notifications</h2>
      {loading ? (
        <ul className='popover__list-item' style={{ width: 300 }}>
          {Array(3)
            .fill({})
            .map((_, idx) => (
              <div className='popover__item' key={idx}>
                <Skeleton variant='circular' className='pop__item-avt' />

                <div className='pop__item-content'>
                  <Skeleton variant='rounded' width={220} height={20} />
                  <Skeleton variant='rounded' width={60} height={14} />
                </div>
              </div>
            ))}
        </ul>
      ) : notifications && notifications.length ? (
        <ul className='popover__list-item'>
          {notifications.map((noti) => (
            <Notification key={noti._id} notiData={noti} hideNoti={hideNoti} hidePopUp={hidePopUp} />
          ))}
        </ul>
      ) : (
        <div style={{ color: "var(--gray)" }}>
          <i>No notification found.</i>
        </div>
      )}
    </>
  );
};

export default NotificationList;

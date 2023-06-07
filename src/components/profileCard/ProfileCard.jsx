import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../../hooks";
import { followUser, unFollowUser } from "../../redux/actions/UserAction";
import { createConversation } from "../../redux/api/ChatRequest";
import UserList from "../userReactList/UserList";
import "./ProfileCard.scss";

const ProfileCard = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state) => state.postReducer.posts);

  const [currentUser, setCurrentUser] = useState();
  const [following, setFollowing] = useState(false);
  const [followModal, setFollowModal] = useState({
    visible: false,
    listIds: []
  });

  const data = useUser();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentUser(null);
    if (data) {
      setCurrentUser(data);
      setFollowing(data.followers.includes(user._id));
    }
  }, [data, user]);

  useEffect(() => {
    hideFollowModal();
  }, [pathname]);

  const hideFollowModal = () => {
    setFollowModal({ visible: false, listIds: [] });
  };

  const handleFollow = (e) => {
    // e.preventDefault();
    following ? dispatch(unFollowUser(data._id, user)) : dispatch(followUser(data._id, user));
    setFollowing((prev) => !prev);
  };

  const handleOpenChat = async () => {
    if (currentUser && user) {
      const conversationData = {
        author_ids: [currentUser._id, user._id],
        updated_time: moment().toString()
      };
      const { data } = await createConversation(conversationData);
      data &&
        dispatch({
          type: "CONNECT_SOCKET",
          payload: { chatID: data._id, otherUserId: currentUser._id }
        });
    }
  };

  return (
    <div className='ProfileCard box__shadow'>
      <div className='ProfileImages'>
        {!currentUser ? (
          <>
            <Skeleton className='cover-img' variant='rounded' />
            <Skeleton
              variant='circular'
              className={`profile-img ${pathname.includes("profile") ? "profile-page" : ""}`}
            />
          </>
        ) : (
          <>
            <img
              className='cover-img'
              src={
                currentUser.coverPicture ||
                "http://res.cloudinary.com/duyb3dqsr/image/upload/v1686144829/pumtwznfzzffgtv4aaio.jpg"
              }
              alt='cover-pic'
            />
            <img
              className={`profile-img ${
                // pathname.includes("profile") && currentUser._id !== user._id ? "profile-page" : ""
                pathname.includes("profile") ? "profile-page" : ""
              }`}
              src={
                currentUser.profilePicture ||
                "http://res.cloudinary.com/duyb3dqsr/image/upload/v1686151682/umqnvu5voukxkdxtowo4.png"
              }
              alt='avt-pic'
            />
          </>
        )}
      </div>

      {/* info */}
      {!currentUser ? (
        <div className={`ProfileName ${pathname.includes("profile") ? "other-user-profile" : ""} `}>
          <div className={`profile-name  other-user-name `}>
            <Skeleton variant='round' height={18} width={60} />
            <Skeleton variant='round' height={18} width={40} />
          </div>
        </div>
      ) : (
        <div className={`ProfileName ${pathname.includes("profile") ? "other-user-profile" : ""}`}>
          {/* <div className={`ProfileName other-user-profile`}> */}
          <div
            className={`profile-name ${
              pathname.includes("profile") ? "other-user-name" : ""
              // pathname.includes("profile") && currentUser._id !== user._id ? "other-user-name" : ""
            }`}
          >
            <span className='name-text'>{currentUser.userName}</span>
            {currentUser.about ? (
              <span className='profile-about-text'>{currentUser.about}</span>
            ) : (
              <>
                {currentUser._id === user._id ? (
                  <span className='profile-about-text'>Write about yourself</span>
                ) : (
                  <div style={{ height: "1rem" }} />
                )}
              </>
            )}
          </div>

          {pathname.includes("profile") && currentUser._id !== user._id ? (
            <Stack className='profile__action-btns'>
              <button className={`button follow-btn ${following ? "unfollow-btn" : ""}`} onClick={handleFollow}>
                {following ? "Unfollow" : "Follow"}
              </button>
              <button className='button' style={{ width: 102 }} onClick={handleOpenChat}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={2}
                  stroke='currentColor'
                  className='h-3 w-3'
                  style={{ width: 18, height: 18 }}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z'
                  />
                </svg>
                Message
              </button>
            </Stack>
          ) : (
            ""
          )}
        </div>
      )}

      <div className='FollowStatus'>
        <hr />
        <div className='follow-info'>
          {!currentUser ? (
            <>
              <div className='follow'>
                <Skeleton variant='round' height={18} width={40} />
                <Skeleton variant='round' height={18} width={50} />
              </div>
              <div className='separator'></div>
              <div className='follow'>
                <Skeleton variant='round' height={18} width={40} />
                <Skeleton variant='round' height={18} width={50} />
              </div>

              {pathname.includes("profile") && (
                <>
                  <div className='separator'></div>
                  <div className='follow'>
                    <Skeleton variant='round' height={18} width={40} />
                    <Skeleton variant='round' height={18} width={50} />
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <div
                className='follow'
                onClick={() =>
                  setFollowModal({
                    visible: true,
                    listIds: currentUser.followers
                  })
                }
              >
                <span className='follow-number'>{currentUser.followers.length}</span>
                <span className='follow-text'>Followers</span>
              </div>
              <div className='separator'></div>
              <div
                className='follow'
                onClick={() =>
                  setFollowModal({
                    visible: true,
                    listIds: currentUser.following
                  })
                }
              >
                <span className='follow-number'>{currentUser.following.length}</span>
                <span className='follow-text'>Followings</span>
              </div>

              {pathname.includes("profile") && (
                <>
                  <div className='separator'></div>
                  <div className='follow'>
                    <span className='follow-number'>
                      {posts.filter((post) => post.userId === currentUser._id).length}
                    </span>
                    <span className='follow-text'>Posts</span>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <hr />
      </div>

      {pathname.includes("profile") ? (
        ""
      ) : (
        <span className='MyProfile'>
          {!currentUser ? (
            <Skeleton variant='rounded' width={80} height={20} />
          ) : (
            <Link to={`/profile/${currentUser._id}`} style={{ color: "var(--orange)", textDecoration: "none" }}>
              My Profile
            </Link>
          )}
        </span>
      )}

      {followModal.visible ? (
        <UserList
          title='Follow'
          userIdList={followModal.listIds}
          openModal={followModal.visible}
          hideModal={hideFollowModal}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default ProfileCard;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useUser } from '../../hooks';
import UserList from "../userReactList/UserList";
import { followUser, unFollowUser } from "../../redux/actions/UserAction";
import "./ProfileCard.scss";

const ProfileCard = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state) => state.postReducer.posts);

  const [currentUser, setCurrentUser] = useState(user);
  const [following, setFollowing] = useState(false);
  const [followModal, setFollowModal] = useState({ visible: false, listIds: [] });

  const data = useUser();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  
  const serverPublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    if (data) {
      setCurrentUser(data);
      setFollowing(data.followers.includes(user._id))
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
    following
      ? dispatch(unFollowUser(data._id, user))
      : dispatch(followUser(data._id, user));
    setFollowing(prev => !prev);
  };

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img
          className="cover-img"
          src={
            currentUser.coverPicture
              ? serverPublicFolder + currentUser.coverPicture
              : serverPublicFolder + "cover.jpg"
          }
          alt=""
        />
        <img
          className={`profile-img ${
            pathname.includes("profile") && currentUser._id !== user._id ? "profile-page" : ""
          }`}
          src={
            currentUser.profilePicture
              ? serverPublicFolder + currentUser.profilePicture
              : serverPublicFolder + "profileImg.jpg"
          }
          alt=""
        />
      </div>

      <div
        className={`ProfileName ${
          currentUser._id !== user._id ? "other-user-profile" : ""
        }`}
      >
        <div className={`profile-name ${pathname.includes("profile") && currentUser._id !== user._id ? "other-user-name" : ""}`}>
          <span className="name-text">{currentUser.userName}</span>
          {currentUser.about ? (
            <span>{currentUser.about}</span>
          ) : currentUser._id === user._id ? (
            <span>Write about yourself</span>
          ) : <div style={{ height: "1rem" }} />}
        </div>

        {pathname.includes("profile") && currentUser._id !== user._id ? (
          <button
            className={`button follow-btn ${following ? "unfollow-btn" : ""}`}
            onClick={handleFollow}
          >
            {following ? "Unfollow" : "Follow"}
          </button>
        ) : (
          ""
        )}
      </div>

      <div className="FollowStatus">
        <hr />
        <div className="follow-info">
          <div
            className="follow"
            onClick={() =>
              setFollowModal({ visible: true, listIds: currentUser.followers })
            }
          >
            <span className="follow-number">
              {currentUser.followers.length}
            </span>
            <span className="follow-text">Followers</span>
          </div>
          <div className="separator"></div>
          <div
            className="follow"
            onClick={() =>
              setFollowModal({ visible: true, listIds: currentUser.following })
            }
          >
            <span className="follow-number">
              {currentUser.following.length}
            </span>
            <span className="follow-text">Followings</span>
          </div>

          {pathname.includes("profile") && (
            <>
              <div className="separator"></div>
              <div className="follow">
                <span className="follow-number">
                  {
                    posts.filter((post) => post.userId === currentUser._id)
                      .length
                  }
                </span>
                <span className="follow-text">Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>

      {pathname.includes("profile") ? (
        ""
      ) : (
        <span className="MyProfile">
          <Link
            to={`/profile/${currentUser._id}`}
            style={{ color: "var(--orange)", textDecoration: "none" }}
          >
            My Profile
          </Link>
        </span>
      )}

      {followModal.visible ? (
        <UserList
          title="Follow"
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

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { followUser, unFollowUser } from "../../redux/actions/UserAction";
import "./User.scss";

function User({ data, showFollow = true }) {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [following, setFollowing] = useState(data.followers.includes(user._id));
  const dispatch = useDispatch();
  const serverPublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleFollow = (e) => {
    // e.preventDefault();
    following
      ? dispatch(unFollowUser(data._id, user))
      : dispatch(followUser(data._id, user));
    setFollowing(prev => !prev);
  };

  return (
    <div className="user">
      <Link to={`/profile/${data._id}`} style={{ textDecoration: 'none', color: 'inherit' }} >
        <div className="user-info">
          <img
            src={
              data.profilePicture
                ? serverPublicFolder + data.profilePicture
                : serverPublicFolder + "profileImg.jpg"
            }
            alt=""
            className="user-img"
          />
          <div className="user-text">
            <span className="user-name">{`${data.firstName} ${data.lastName}`}</span>
            <span>{`@${data.userName}`}</span>
          </div>
        </div>
      </Link>
      {showFollow ? (
        <button className={`button follow-btn ${following ? "unfollow-btn" : ''}`} onClick={handleFollow}>
          {following ? "Unfollow" : "Follow"}
        </button>
      ) : ""}
    </div>
  );
}

export default User;

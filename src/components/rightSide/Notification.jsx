import { useState, useEffect } from "react";
import "./Notification.scss";
import { useUser } from "../../hooks";
import moment from "moment";
import { getPost } from "../../redux/api/PostRequest";
import { Link } from "react-router-dom";

const Notification = (props) => {
  const { notiData, hideNoti } = props;
  const [attackUser, setAttackUser] = useState({});
  const [post, setPost] = useState({});
  const authorData = useUser(notiData.userCreateId);

  useEffect(() => {
    const fetchPost = async () => {
      const post = await getPost(notiData.postId);
      setPost(post.data);
    };
    fetchPost();
  }, [notiData.postId]);

  useEffect(() => {
    if (authorData && Object.keys(authorData)) {
      setAttackUser(authorData);
    }
  }, [authorData]);

  return (
    <Link
      to={`/post/${notiData.postId}`}
      style={{ textDecoration: "none", color: "var(--black)" }}
    >
      <div className="notification" onClick={hideNoti}>
        <img
          className="attack-user"
          src={
            attackUser.profilePicture
              ? process.env.REACT_APP_PUBLIC_FOLDER + attackUser.profilePicture
              : process.env.REACT_APP_PUBLIC_FOLDER + "profileImg.jpg"
          }
          alt="avt"
        />
        <div className="noti-content">
          <span className="noti-desc">{`${notiData.userCreateName} ${notiData.desc}`}</span>
          <span className="noti-time">
            {moment(notiData.createdAt).fromNow().replace(" ago", "")}
          </span>
        </div>
        <div className="post-thumb">
          {post.image ? (
            post.image.includes(".mp4") || post.image.includes(".mov") ? (
              <video
                className="post-img"
                src={process.env.REACT_APP_PUBLIC_FOLDER + post.image}
                alt={post.image}
              />
            ) : (
              <img
                className="post-img"
                src={process.env.REACT_APP_PUBLIC_FOLDER + post.image}
                alt={post.image}
              />
            )
          ) : (
            ""
          )}
        </div>
      </div>
    </Link>
  );
};

export default Notification;

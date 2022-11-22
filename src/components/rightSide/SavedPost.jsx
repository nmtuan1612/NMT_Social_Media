import { Link } from "react-router-dom";
import moment from "moment";
import "./Notification.scss";

const SavedPost = (props) => {
  const { savedPost, hideSaved } = props;
  return (
    <Link
      to={`/post/${savedPost._id}`}
      style={{
        textDecoration: "none",
        color: "var(--black)",
        background: "var(--inputColor",
        padding: 4,
        borderRadius: 4,
      }}
    >
      <div className="notification" onClick={hideSaved}>
        {savedPost.image ? (
          savedPost.image.includes(".mp4") ||
          savedPost.image.includes(".mov") ? (
            <video
              className="post-img"
              src={process.env.REACT_APP_PUBLIC_FOLDER + savedPost.image}
              alt={savedPost.image}
            />
          ) : (
            <img
              className="post-img"
              src={process.env.REACT_APP_PUBLIC_FOLDER + savedPost.image}
              alt={savedPost.image}
            />
          )
        ) : (
          ""
        )}

        <div className="noti-content">
          <div className="noti-desc-header">
            <h4>{savedPost.author}</h4>
            <div className="noti-time">
              {moment(savedPost.createdAt).fromNow().replace(" ago", "")}
            </div>
          </div>
          <span className="noti-desc">{savedPost.desc}</span>
        </div>
      </div>
    </Link>
  );
};

export default SavedPost;

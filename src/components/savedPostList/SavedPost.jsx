import { Link } from "react-router-dom";
import moment from "moment";

const SavedPost = (props) => {
  const { savedPost, hideSaved, hidePopUp } = props;

  const hide = () => {
    hidePopUp?.();
    hideSaved?.();
  };
  return (
    <Link
      to={`/post/${savedPost._id}`}
      style={{
        textDecoration: "none",
        color: "var(--black)",
        background: "var(--inputColor)",
        borderRadius: 4
      }}
    >
      <div className='popover__item' onClick={hide}>
        <div className='post-thumb'>
          {savedPost.image ? (
            <>
              {savedPost.image.includes(".mp4") || savedPost.image.includes(".mov") ? (
                <video className='post-img' src={savedPost.image} alt={savedPost.image.slice(-10)} />
              ) : (
                <img className='post-img' src={savedPost.image} alt={savedPost.image.slice(-10)} />
              )}
            </>
          ) : (
            ""
          )}
        </div>

        <div className='pop__item-content'>
          <div className='pop__item-desc-header'>
            <h4>{savedPost.author}</h4>
            <div className='pop__item-time'>{moment(savedPost.createdAt).fromNow().replace(" ago", "")}</div>
          </div>
          <span className='pop__item-desc'>{savedPost.desc}</span>
        </div>
      </div>
    </Link>
  );
};

export default SavedPost;

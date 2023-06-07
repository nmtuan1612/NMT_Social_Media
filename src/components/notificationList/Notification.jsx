import moment from "moment";
import { Link } from "react-router-dom";
import "./Notification.scss";

const Notification = (props) => {
  const { notiData, hideNoti, hidePopUp } = props;

  const hide = () => {
    hidePopUp && hidePopUp();
    hideNoti && hideNoti();
  };

  return (
    <Link to={`/post/${notiData?.postId}`} style={{ textDecoration: "none", color: "var(--black)" }}>
      <div className='popover__item' onClick={hide}>
        <div className='pop__item-avt'>
          <img
            src={
              notiData?.attackUser?.profilePicture
                ? notiData?.attackUser.profilePicture
                : "http://res.cloudinary.com/duyb3dqsr/image/upload/v1686151682/umqnvu5voukxkdxtowo4.png"
            }
            alt='avt'
          />
        </div>
        <div className='pop__item-content'>
          <span className='pop__item-desc'>{`${notiData?.userCreateName} ${notiData?.desc}`}</span>
          <span className='pop__item-time'>{moment(notiData?.createdAt).fromNow().replace(" ago", "")}</span>
        </div>
        <div className='post-thumb'>
          {notiData?.postThumb ? (
            <>
              {notiData?.postThumb.includes(".mp4") || notiData?.postThumb.includes(".mov") ? (
                <video className='post-img' src={notiData?.postThumb || ""} alt={"postThumb"} />
              ) : (
                <img className='post-img' src={notiData?.postThumb || ""} alt={"postThumb"} />
              )}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </Link>
  );
};

export default Notification;

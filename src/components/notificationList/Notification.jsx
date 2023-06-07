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
        <img
          className='pop__item-avt'
          src={
            notiData?.attackUser?.profilePicture
              ? process.env.REACT_APP_PUBLIC_FOLDER + notiData?.attackUser?.profilePicture
              : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fplain-white-background&psig=AOvVaw0RA9E5KddBSwB8X3R1hRJ7&ust=1686132401107000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCMDngeiyrv8CFQAAAAAdAAAAABAD"
          }
          alt='avt'
        />
        <div className='pop__item-content'>
          <span className='pop__item-desc'>{`${notiData?.userCreateName} ${notiData?.desc}`}</span>
          <span className='pop__item-time'>{moment(notiData?.createdAt).fromNow().replace(" ago", "")}</span>
        </div>
        <div className='post-thumb'>
          {notiData?.postThumb ? (
            notiData?.postThumb.includes(".mp4") || notiData?.postThumb.includes(".mov") ? (
              <video
                className='post-img'
                src={process.env.REACT_APP_PUBLIC_FOLDER + notiData?.postThumb}
                alt={notiData?.postThumb}
              />
            ) : (
              <img
                className='post-img'
                src={process.env.REACT_APP_PUBLIC_FOLDER + notiData?.postThumb}
                alt={notiData?.postThumb}
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

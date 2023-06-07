import moment from "moment";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { likePostComment } from "../../redux/actions/PostAction";
import { createNotification } from "../../redux/actions/UserAction";
import UserList from "../userReactList/UserList";

const Comment = (props) => {
  const { comment } = props;
  const { user } = useSelector((state) => state.authReducer.authData);

  const [liked, setLiked] = useState(comment.likes.includes(user._id));
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();

  const handleLikeComment = () => {
    if (comment?.userId !== user._id && !liked) {
      const notiData = {
        userCreateId: user._id,
        userCreateName: user.userName,
        notiType: "LIKE_COMMENT",
        userReceiveId: comment?.userId,
        postId: comment._id,
        desc: "liked your comment."
      };

      dispatch(createNotification(notiData));
    }
    dispatch(likePostComment(comment._id, user._id));
    setLiked((prev) => !prev);
    // liked ? setLikeNum(prev => prev - 1) : setLikeNum(prev => prev + 1);
  };

  const hideModal = () => {
    setOpenModal(false);
  };

  return (
    <div className='post-comment'>
      <Link to={`/profile/${comment?.userId}`} style={{ textDecoration: "none", color: "inherit" }}>
        <div className='profile-img'>
          <img
            src={
              comment?.authorData?.profilePicture
                ? comment.authorData.profilePicture
                : "http://res.cloudinary.com/duyb3dqsr/image/upload/v1686151682/umqnvu5voukxkdxtowo4.png"
            }
            alt={comment?.authorData?.profilePicture}
          />
        </div>
      </Link>
      <div className='comment-detail'>
        <div className='comment-text'>
          <Link to={`/profile/${comment?.userId}`} style={{ textDecoration: "none", color: "inherit" }}>
            <span className='author-name'>{comment.author}</span>
          </Link>
          <div className='comment-content'>
            <div>{comment?.content}</div>
            <img src={liked ? Heart : NotLike} alt=' ' onClick={handleLikeComment} />
          </div>
        </div>
        <div className='comment-react'>
          <span className='created-time' style={{ marginRight: 12 }}>
            {moment(comment?.createdAt).fromNow().replace(" ago", "")}
          </span>

          <span className='like-num' onClick={() => setOpenModal(true)}>
            {`${comment?.likes?.length} ${comment?.likes?.length > 1 ? "likes" : "like"}`}
          </span>
        </div>
      </div>
      {openModal ? <UserList userIdList={comment?.likes} openModal={openModal} hideModal={hideModal} /> : ""}
    </div>
  );
};

export default Comment;

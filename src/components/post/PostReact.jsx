import { useState } from "react";
import Comment from "../../img/comment.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import Share from "../../img/share.png";
import { likePost } from "../../redux/api/PostRequest";
import { Link } from 'react-router-dom';
import CommentList from '../commentList/CommentList';


const PostReact = (props) => {
  const { user, post } = props;
  const [liked, setLiked] = useState(post.likes.includes(user._id));
  const [likeNum, setLikeNum] = useState(post.likes.length);
  const [showComment, setShowComment] = useState(false);

  const handleLike = () => {
    setLiked((prev) => !prev);
    likePost(post._id, user._id);
    liked ? setLikeNum((prev) => prev - 1) : setLikeNum((prev) => prev + 1);
  };

  const handleShowComment = () => {
    setShowComment(prev => !prev);
  };

  return (
    <>
      <div className="postReact">
        <img src={liked ? Heart : NotLike} alt="" onClick={handleLike} />
        <img src={Comment} alt="" onClick={handleShowComment} />
        <img src={Share} alt="" />
      </div>

      <span className="likeNum">{likeNum} likes</span>

      <div className="detail">
        <Link to={`/profile/${post.userId}`}>
          <span>
            <b>{post.author}</b>
          </span>
        </Link>
        <span>{post.desc}</span>
      </div>

      {showComment && (
        <div className="post-comments">
          <CommentList />
        </div>
      )}
    </>
  );
};

export default PostReact;

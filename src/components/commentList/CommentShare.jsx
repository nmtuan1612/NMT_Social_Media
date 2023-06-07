import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { commentToPost, getPostComments } from "../../redux/actions/PostAction";
import { createNotification } from "../../redux/actions/UserAction";

const CommentShare = (props) => {
  const { post, setShowComment } = props;
  const { user } = useSelector((state) => state.authReducer.authData);

  const [content, setContent] = useState("");

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSendComment = () => {
    const commentData = {
      postId: post._id,
      userId: user._id,
      author: user.userName,
      content: content,
      likes: []
    };
    dispatch(commentToPost(commentData));
    if (post.userId !== user._id) {
      const notiData = {
        userCreateId: user._id,
        userCreateName: user.userName,
        notiType: "COMMENT_POST",
        userReceiveId: post.userId,
        postId: post._id,
        desc: "commented in your post.",
        postThumb: post.image
      };

      dispatch(createNotification(notiData));
    }
    setContent("");
    setShowComment(true);
  };

  return (
    <div className='share-comment'>
      <div className='profile-img'>
        <img
          src={
            user?.profilePicture
              ? user.profilePicture
              : "http://res.cloudinary.com/duyb3dqsr/image/upload/v1686151682/umqnvu5voukxkdxtowo4.png"
          }
          alt={user?.profilePicture}
        />
      </div>
      <form className='comment-form'>
        <input
          type='text'
          className='comment-input'
          placeholder='Enter comment...'
          value={content}
          onChange={handleChange}
        />
        {content ? (
          <button type='submit' className='submit-btn' onClick={handleSendComment}>
            Send
          </button>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};

export default CommentShare;

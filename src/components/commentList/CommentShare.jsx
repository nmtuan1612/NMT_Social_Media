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
      <img
        className='profile-img'
        src={
          user?.profilePicture
            ? process.env.REACT_APP_PUBLIC_FOLDER + user?.profilePicture
            : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fplain-white-background&psig=AOvVaw0RA9E5KddBSwB8X3R1hRJ7&ust=1686132401107000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCMDngeiyrv8CFQAAAAAdAAAAABAD"
        }
        alt={user?.profilePicture}
      />
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

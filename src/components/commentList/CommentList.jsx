import { useMemo } from "react";
import { useSelector } from "react-redux";
import Comment from "./Comment";
// import CommentShare from "./CommentShare";
import "./CommentList.scss";

const CommentList = (props) => {
  const { post } = props;
  const { commentData, loading } = useSelector((state) => state.commentReducer);

  // const commentsList = useMemo(() => commentData.filter((comment) => comment.postId === post._id), [post, commentData]);

  return (
    <div className='post-comments'>
      {/* <CommentShare post={post} /> */}
      {loading ? (
        <span style={{ color: "var(--gray", fontSize: 14 }}>
          <i>Loading comments...</i>
        </span>
      ) : (
        <>
          {commentData?.length ? (
            <div className='comment-list'>
              {commentData.map((comment, idx) => (
                <Comment comment={comment} key={idx} />
              ))}
            </div>
          ) : (
            <div style={{ color: "var(--gray)" }}>
              <i>No comment.</i>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CommentList;

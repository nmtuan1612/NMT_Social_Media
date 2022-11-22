import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTimelinePosts, getUserPosts } from "../../redux/actions/PostAction";
import Post from "../post/Post";
import "./PostsList.scss";
import { useParams } from 'react-router-dom';

const PostsList = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      dispatch(getUserPosts(params.id, user._id));
    } else {
      dispatch(getTimelinePosts(user._id));
    }
  }, [user, dispatch, params]);
  
  if (params.id ) posts = posts.filter(post => post.userId === params.id);

  // console.log('posts', posts)
  return (
    posts.length > 0 ? (
      <div className="PostsList">
        {loading
          ? "Loading posts..."
          : posts.map((post, idx) => <Post data={post} key={idx} />)}
      </div>
    ) : <i>No posts found!</i>
  );
};

export default PostsList;

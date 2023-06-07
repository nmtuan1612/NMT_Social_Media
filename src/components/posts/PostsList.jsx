import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTimelinePosts, getUserPosts } from "../../redux/actions/PostAction";
import Post from "../post/Post";
import "./PostsList.scss";
import { useParams } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";

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

  if (params.id) posts = posts.filter((post) => post.userId === params.id);

  // console.log('posts', posts)
  return posts.length > 0 ? (
    <div className='PostsList'>
      {loading ? (
        <>
          {Array(5)
            .fill({})
            .map((_, idx) => (
              <div className='Post box__shadow' key={idx}>
                <div className='post-options'>
                  <div className='author-info'>
                    <Skeleton className='profile-img' variant='circular' width={32} height={32} />
                    <Skeleton className='profile-user__name' variant='rounded' width={70} height={18} />
                  </div>
                </div>
                <div className='detail'>
                  <Skeleton height={20} variant='rounded' sx={{ width: "80%" }} />
                </div>
                <div className='detail'>
                  <Skeleton height={20} variant='rounded' sx={{ width: "50%" }} />
                </div>
                <div className='postReact'>
                  <Skeleton variant='rounded' width={30} height={20} />
                  <Skeleton variant='rounded' width={30} height={20} />
                  <Skeleton variant='rounded' width={30} height={20} />
                </div>

                <Skeleton variant='rounded' height={18} sx={{ width: "90%" }} />
              </div>
            ))}
          <span>Loading posts...</span>
        </>
      ) : (
        <>
          {posts.map((post, idx) => (
            <Post data={post} key={idx} />
          ))}
          <div className='flex__center'>
            <i>No posts left!</i>
          </div>
        </>
      )}
    </div>
  ) : (
    <div className='flex__center'>
      <i>No posts found!</i>
    </div>
  );
};

export default PostsList;

import Skeleton from "@mui/material/Skeleton";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FixedBottomNavigation from "../../components/bottomNavigation/BottomNavigation";
import Post from "../../components/post/Post";
import ProfileSide from "../../components/profileSide/ProfileSide";
import RightSide from "../../components/rightSide/RightSide";
import { getPost } from "../../redux/api/PostRequest";
import "./PostView.scss";

const PostView = () => {
  const [post, setPost] = useState(null);
  const { sizeState } = useSelector((state) => state.appReducer);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      const post = await getPost(id);
      setPost(post.data);
    };
    fetchPost();
  }, [id]);

  return (
    <div className='PostView'>
      <ProfileSide />
      <div className='current-post'>
        {post ? (
          <Post data={post} inPostView={true} />
        ) : (
          <div className='Post box__shadow'>
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
            <div style={{ display: "flex", gap: 10 }}>
              <Skeleton variant='rounded' width={30} height={20} />
              <Skeleton variant='rounded' width={30} height={20} />
              <Skeleton variant='rounded' width={30} height={20} />
            </div>

            <Skeleton variant='rounded' height={18} sx={{ width: "90%" }} />
          </div>
        )}
      </div>
      {sizeState === "desktop" ? <RightSide /> : <FixedBottomNavigation />}
    </div>
  );
};

export default PostView;

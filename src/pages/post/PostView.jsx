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
      {post ? (
        <div className='current-post'>
          <Post data={post} inPostView={true} />
        </div>
      ) : (
        ""
      )}
      {sizeState === "desktop" ? <RightSide /> : <FixedBottomNavigation />}
    </div>
  );
};

export default PostView;

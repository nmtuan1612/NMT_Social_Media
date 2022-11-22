import { useState, useEffect } from "react";
import ProfileSide from "../../components/profileSide/ProfileSide";
import RightSide from "../../components/rightSide/RightSide";
import "./PostView.scss";
import Post from '../../components/post/Post';
import { getPost } from '../../redux/api/PostRequest';
import { useParams } from 'react-router-dom';

const PostView = () => {
  const [post, setPost] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      const post = await getPost(id);
      setPost(post.data);
    };
    fetchPost();
  }, [id]);

  return (
    <div className="PostView">
      <ProfileSide />
      { post ? (
        <div className="current-post">
          <Post data={post} inPostView={true} />
        </div>
      ) : ""}
      <RightSide />
    </div>
  );
}

export default PostView;

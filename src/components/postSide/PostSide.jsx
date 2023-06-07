import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PostShare from "../postShare/PostShare";
import PostsList from "../posts/PostsList";
import "./PostSide.scss";

const PostSide = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const params = useParams();

  return (
    <div
      className='PostSide'
      // style={{ overflowY: pathname.includes("profile") ? "unset" : "auto" }}
    >
      {!params.id || params.id === user._id ? <PostShare /> : ""}
      <PostsList />
    </div>
  );
};

export default PostSide;

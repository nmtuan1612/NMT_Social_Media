import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import PostShare from "../postShare/PostShare";
import PostsList from "../posts/PostsList";
import "./PostSide.scss";

const PostSide = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const params = useParams();
  const { pathname } = useLocation();

  return (
    <div
      className="PostSide"
      // style={{ overflowY: pathname.includes("profile") ? "unset" : "auto" }}
    >
      {!params.id || params.id === user._id ? <PostShare /> : ""}
      <PostsList />
    </div>
  );
};

export default PostSide;

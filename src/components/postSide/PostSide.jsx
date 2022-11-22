import React from "react";
import PostsList from "../posts/PostsList";
import PostShare from "../postShare/PostShare";
import "./PostSide.scss";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const PostSide = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const params = useParams();

  return (
    <div className="PostSide">
      {(!params.id || params.id === user._id) ? <PostShare /> : ""}
      <PostsList />
    </div>
  );
};

export default PostSide;

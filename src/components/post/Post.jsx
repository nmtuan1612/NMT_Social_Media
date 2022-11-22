import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import { withStyles } from "@mui/styles";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useUser from "../../hooks/useUser";
import Comment from "../../img/comment.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import Share from "../../img/share.png";
import { deletePost, getPostComments, likePost, hidePost, savedPost } from "../../redux/actions/PostAction";
import { createNotification, deleteNotification } from "../../redux/actions/UserAction";
import CommentList from "../commentList/CommentList";
import CommentShare from "../commentList/CommentShare";
import UserList from "../userReactList/UserList";
import "./Post.scss";
import PostModal from "./PostModal";

const CustomTooltip = withStyles({
  arrow: {
    "&:before": {
      border: "1px solid #aba9a9",
      backgroundColor: "#fff !important",
    },
    color: "#fff",
  },
  tooltip: {
    backgroundColor: "#fff !important",
    boxShadow: "0px 0px 4px 1px #999",
    borderRadius: "8px !important",
  },
})(Tooltip);

const Post = (props) => {
  const { data, inPostView } = props;
  const { user } = useSelector((state) => state.authReducer.authData);

  const [author, setAuthor] = useState(null);
  const [liked, setLiked] = useState(data.likes?.includes(user._id));
  const [likeNum, setLikeNum] = useState(data.likes?.length);
  const [saved, setSaved] = useState(data.usersSaved?.includes(user._id));
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState({ open: false, type: "" });
  const [showComment, setShowComment] = useState(false);
  const [likeModal, setLikeModal] = useState(false);
  
  const authorData = useUser(data.userId);

  const dispatch = useDispatch();

  useEffect(() => {
    if (authorData && Object.keys(authorData)) {
      setAuthor(authorData);
    }
  }, [authorData]);

  useEffect(() => {
    setShowComment(inPostView);
  }, [inPostView]);

  useEffect(() => {
    dispatch(getPostComments(data._id));
  }, [data._id, dispatch]);

  const hideOptions = () => {
    setOpen(false);
  };

  const openOptions = () => {
    setOpen((prev) => !prev);
  };

  const closeModal = () => {
    setModal({ open: false, type: "" });
  };

  const hideLikeModal = () => {
    setLikeModal(false);
  };

  const handleLike = () => {
    if (liked) {
      const notiData = {
        userCreateId: user._id,
        notiType: "LIKE_POST",
        postId: data._id,
      };

      dispatch(deleteNotification(notiData));
    }
    if (authorData._id !== user._id && !liked) {
      const notiData = {
        userCreateId: user._id,
        userCreateName: user.userName,
        notiType: "LIKE_POST",
        userReceiveId: author._id,
        postId: data._id,
        desc: "liked your post.",
      };

      dispatch(createNotification(notiData));
    }
    dispatch(likePost(data._id, user._id));

    setLiked((prev) => !prev);
    liked ? setLikeNum((prev) => prev - 1) : setLikeNum((prev) => prev + 1);
  };

  const handleShowComment = () => {
    setShowComment((prev) => !prev);
  };

  const handleSave = () => {
    hideOptions();
    setSaved((prev) => !prev);
    dispatch(savedPost(data._id, user._id));
  };

  const handleDelete = () => {
    dispatch(deletePost(data._id, user._id));
    hideOptions();
    closeModal();
  };

  const handleHide = () => {
    dispatch(hidePost(data._id, user._id));
    hideOptions();
  };

  return (
    <div className="Post">
      <div className="post-options">
        <div className="author-info">
          <Link to={`/profile/${data.userId}`}>
            <img
              className="profile-img"
              src={
                author?.profilePicture
                  ? process.env.REACT_APP_PUBLIC_FOLDER + author.profilePicture
                  : ""
              }
              alt={author?.profilePicture}
            />
          </Link>
          <Link to={`/profile/${data.userId}`}>
            <span>
              <b>{data.author}</b>
            </span>
          </Link>
        </div>

        <div className="options">
          <ClickAwayListener onClickAway={hideOptions}>
            <CustomTooltip
              arrow
              placement="bottom-end"
              open={open}
              onClose={hideOptions}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              title={
                <List sx={{ backgroundColor: "white", padding: 0 }}>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={handleSave}
                      sx={{ padding: "4px 8px", borderRadius: 2 }}
                    >
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        {saved ? (
                          <BookmarkIcon sx={{ width: 20, height: 20 }} />
                        ) : (
                          <BookmarkBorderOutlinedIcon
                            sx={{ width: 20, height: 20 }}
                          />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        secondary={saved ? "Unsave post" : "Save post"}
                      />
                    </ListItemButton>
                  </ListItem>
                  {user._id === data.userId ? (
                    <>
                      <ListItem disablePadding>
                        <ListItemButton
                          onClick={() => setModal({ open: true, type: "EDIT" })}
                          sx={{ padding: "4px 8px", borderRadius: 2 }}
                        >
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <EditOutlinedIcon sx={{ width: 20, height: 20 }} />
                          </ListItemIcon>
                          <ListItemText secondary="Edit" />
                        </ListItemButton>
                      </ListItem>

                      <ListItem disablePadding>
                        <ListItemButton
                          onClick={() =>
                            setModal({ open: true, type: "DELETE" })
                          }
                          sx={{ padding: "4px 8px", borderRadius: 2 }}
                        >
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <DeleteOutlineOutlinedIcon
                              sx={{ width: 20, height: 20 }}
                            />
                          </ListItemIcon>
                          <ListItemText secondary="Delete" />
                        </ListItemButton>
                      </ListItem>

                      <ListItem disablePadding>
                        <ListItemButton
                          onClick={handleHide}
                          sx={{ padding: "4px 8px", borderRadius: 2 }}
                        >
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <VisibilityOffOutlinedIcon
                              sx={{ width: 20, height: 20 }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            secondary={data.visibility ? "Hide" : "Unhide"}
                          />
                        </ListItemButton>
                      </ListItem>
                    </>
                  ) : (
                    ""
                  )}
                </List>
              }
            >
              <MoreHorizIcon onClick={openOptions} />
            </CustomTooltip>
          </ClickAwayListener>
        </div>
      </div>
      {data.image ? (
        data.image.includes(".mp4") || data.image.includes(".mov") ? (
          <video
            src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
            alt={data.image}
            controls
          />
        ) : (
          <img
            src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
            alt={data.image}
          />
        )
      ) : (
        <div className="detail">
          <p>{data.desc}</p>
        </div>
      )}

      <div className="postReact">
        <img src={liked ? Heart : NotLike} alt="" onClick={handleLike} />
        <img src={Comment} alt="" onClick={handleShowComment} />
        <img src={Share} alt="" />
      </div>

      <span className="likeNum" onClick={() => setLikeModal(true)}>
        {likeNum} {likeNum > 1 ? "likes" : "like"}
      </span>

      {data.image ? (
        <div className="detail">
          <Link to={`/profile/${data.userId}`}>
            <span>
              <b>{data.author}</b>
            </span>
          </Link>
          <p>{data.desc}</p>
        </div>
      ) : (
        ""
      )}

      <div className="created-time">
        {moment(data.createdAt).fromNow().replace(" ago", "")}
      </div>

      <div className="post-comments">
        <CommentShare post={data} setShowComment={setShowComment} />
      </div>

      {showComment ? <CommentList post={data} /> : ""}

      <PostModal
        post={data}
        author={author}
        modalData={modal}
        closeModal={closeModal}
        handleDelete={handleDelete}
      />
      {likeModal ? (
        <UserList
          userIdList={data.likes}
          openModal={likeModal}
          hideModal={hideLikeModal}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Post;

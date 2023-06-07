import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import Tooltip from "@mui/material/Tooltip";
import { withStyles } from "@mui/styles";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { deletePost, getPostComments, hidePost, likePost, savedPost } from "../../redux/actions/PostAction";
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
      backgroundColor: "#fff !important"
    },
    color: "#fff"
  },
  tooltip: {
    backgroundColor: "#fff !important",
    boxShadow: "0px 0px 4px 1px #999",
    borderRadius: "8px !important"
  }
})(Tooltip);

const Post = (props) => {
  const { data, inPostView } = props;
  const { user } = useSelector((state) => state.authReducer.authData);
  const { currentPostId } = useSelector((state) => state.commentReducer);

  const [liked, setLiked] = useState(data.likes?.includes(user._id));
  const [likeNum, setLikeNum] = useState(data.likes?.length);
  const [saved, setSaved] = useState(data.usersSaved?.includes(user._id));
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState({ open: false, type: "" });
  const [showComment, setShowComment] = useState(false);
  const [likeModal, setLikeModal] = useState(false);

  // const authorData = useUser(data.userId);

  const dispatch = useDispatch();
  const { pathname } = useLocation();

  // useEffect(() => {
  //   if (authorData && Object.keys(authorData)) {
  //     setAuthor(authorData);
  //   }
  // }, [authorData]);

  useEffect(() => {
    if (inPostView || pathname.includes("post/")) {
      setShowComment(inPostView);
      dispatch(getPostComments(data._id));
    }
  }, [inPostView, pathname, data?._id, dispatch]);

  useEffect(() => {
    if (showComment) {
      dispatch(getPostComments(data?._id));
    }
  }, [showComment, data?._id, dispatch]);

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
        postId: data._id
      };

      dispatch(deleteNotification(notiData));
    }
    if (data?.userId !== user._id && !liked) {
      const notiData = {
        userCreateId: user._id,
        userCreateName: user.userName,
        notiType: "LIKE_POST",
        userReceiveId: data?.userId,
        postId: data._id,
        desc: "liked your post.",
        postThumb: data.image
      };

      dispatch(createNotification(notiData));
    }
    dispatch(likePost(data._id, user._id));

    setLiked((prev) => !prev);
    liked ? setLikeNum((prev) => prev - 1) : setLikeNum((prev) => prev + 1);
  };

  const handleShowComment = () => {
    !showComment && dispatch(getPostComments(data._id));
    setShowComment((prev) => !prev);
  };

  const handleSave = () => {
    hideOptions();
    setSaved((prev) => !prev);
    dispatch(savedPost(data._id, user._id));
    // dispatch(getSavedPost(user._id));
    toast.success("You saved this post!");
  };

  const handleDelete = () => {
    dispatch(deletePost(data._id, user._id));
    hideOptions();
    closeModal();
    toast.error("You have deleted post!");
  };

  const handleHide = () => {
    dispatch(hidePost(data._id, user._id));
    hideOptions();
    toast.success("This post is hide with other people");
  };

  return (
    <div className='Post box__shadow'>
      {!data ? (
        <>
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
        </>
      ) : (
        <>
          <div className='post-options'>
            <div className='author-info'>
              <Link to={`/profile/${data.userId}`}>
                <div className='profile-img'>
                  <img
                    src={
                      data?.authorData?.profilePicture ||
                      "http://res.cloudinary.com/duyb3dqsr/image/upload/v1686151682/umqnvu5voukxkdxtowo4.png"
                    }
                    alt={data?.authorData?.profilePicture?.slice(-10)}
                  />
                </div>
              </Link>
              <div>
                <Link to={`/profile/${data.userId}`}>
                  <span className='profile-user__name'>{data.author}</span>
                </Link>
                <div className='created-time'>
                  {/* <span style={{ margin: "0 4px" }}> · </span> */}
                  {moment(data.createdAt).fromNow().replace(" ago", "")}
                </div>
              </div>
            </div>

            <div className='options'>
              <ClickAwayListener onClickAway={hideOptions}>
                <CustomTooltip
                  arrow
                  placement='bottom-end'
                  open={open}
                  onClose={hideOptions}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  title={
                    <List sx={{ backgroundColor: "white", padding: 0 }}>
                      <ListItem disablePadding>
                        <ListItemButton onClick={handleSave} sx={{ padding: "4px 8px", borderRadius: 2 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            {saved ? (
                              <BookmarkIcon sx={{ width: 20, height: 20 }} />
                            ) : (
                              <BookmarkBorderOutlinedIcon sx={{ width: 20, height: 20 }} />
                            )}
                          </ListItemIcon>
                          <ListItemText secondary={saved ? "Unsave post" : "Save post"} />
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
                              <ListItemText secondary='Edit' />
                            </ListItemButton>
                          </ListItem>

                          <ListItem disablePadding>
                            <ListItemButton
                              onClick={() => setModal({ open: true, type: "DELETE" })}
                              sx={{ padding: "4px 8px", borderRadius: 2 }}
                            >
                              <ListItemIcon sx={{ minWidth: 32 }}>
                                <DeleteOutlineOutlinedIcon sx={{ width: 20, height: 20 }} />
                              </ListItemIcon>
                              <ListItemText secondary='Delete' />
                            </ListItemButton>
                          </ListItem>

                          <ListItem disablePadding>
                            <ListItemButton onClick={handleHide} sx={{ padding: "4px 8px", borderRadius: 2 }}>
                              <ListItemIcon sx={{ minWidth: 32 }}>
                                <VisibilityOffOutlinedIcon sx={{ width: 20, height: 20 }} />
                              </ListItemIcon>
                              <ListItemText secondary={data.visibility ? "Hide" : "Unhide"} />
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
            <>
              {data.image.includes(".mp4") || data.image.includes(".mov") ? (
                <video
                  src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
                  alt={data.image.slice(-10)}
                  controls
                />
              ) : (
                <img
                  src={
                    // data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""
                    data.image
                  }
                  alt={data.image.slice(-10)}
                />
              )}
            </>
          ) : (
            <div className='detail'>
              <p>{data.desc}</p>
            </div>
          )}

          <div className='postReact'>
            <div className='post__react-icons'>
              {liked ? (
                <div style={{ color: "var(--base-color)" }}>
                  <FavoriteRoundedIcon onClick={handleLike} />
                </div>
              ) : (
                <FavoriteBorderRoundedIcon onClick={handleLike} />
              )}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                style={{ width: 24 }}
                onClick={handleShowComment}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z'
                />
              </svg>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                style={{ width: 24, transform: "rotate(-30deg) translateY(-1px) translateX(4px)" }}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5'
                />
              </svg>
            </div>
            <span className='likeNum' onClick={() => setLikeModal(true)}>
              {likeNum} {likeNum > 1 ? "likes" : "like"}
            </span>
          </div>

          {data.image ? (
            <div className='detail'>
              <Link to={`/profile/${data.userId}`}>
                <span className='profile-user__name'>{data.author}</span>
              </Link>
              <p>{data.desc}</p>
            </div>
          ) : (
            ""
          )}
        </>
      )}

      <div className='post-comments'>
        <CommentShare post={data} setShowComment={setShowComment} />
      </div>

      {showComment && currentPostId === data?._id ? <CommentList post={data} /> : ""}

      {modal ? (
        <PostModal
          post={data}
          author={data?.authorData}
          modalData={modal}
          closeModal={closeModal}
          handleDelete={handleDelete}
        />
      ) : (
        ""
      )}
      {likeModal ? <UserList userIdList={data.likes} openModal={likeModal} hideModal={hideLikeModal} /> : ""}
    </div>
  );
};

export default Post;

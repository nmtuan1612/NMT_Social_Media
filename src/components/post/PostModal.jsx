import { UilLocationPoint, UilPlayCircle, UilScenery, UilTimes } from "@iconscout/react-unicons";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updatePost } from "../../redux/actions/PostAction";
import { uploadImage } from "../../redux/actions/UploadAction";
import "./PostModal.scss";
import { PostApi } from "../../redux/api";

const PostModal = (props) => {
  const { post, author, modalData, closeModal, handleDelete } = props;
  console.log("alo");

  const [postDesc, setPostDesc] = useState(post.desc);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const imgRef = useRef();
  const videoRef = useRef();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setPostDesc(e.target.value);
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];

      setImage(img);
    }
  };

  const onVideoChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let video = event.target.files[0];
      setVideo(video);
    }
  };

  const handleCancelUpload = () => {
    setImage(null);
    setVideo(null);
    imgRef.current.value = "";
    videoRef.current.value = "";
  };

  const saveChange = async () => {
    const editedPost = { ...post, desc: postDesc };

    if (image || video) {
      const postData = new FormData();
      const fileName = Date.now() + image.name;
      postData.append("name", fileName);
      postData.append("file", image);
      // editedPost.image = fileName;

      try {
        const { data } = await PostApi.uploadImage(postData);
        console.log(data);
        editedPost.image = data?.url;
      } catch (error) {
        console.log(error);
      }
    }

    dispatch(updatePost(editedPost));
    cancel();
    toast.success("Updated post successfully!");
  };

  const cancel = () => {
    setPostDesc(post.desc);
    closeModal();
  };

  return (
    <Modal
      open={modalData.open}
      onClose={cancel}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      sx={{ p: 0 }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          // width: modalData.type === "DELETE" ? 400 : 600,
          bgcolor: "#fff",
          borderRadius: 2,
          boxShadow: 24,
          zIndex: 20,
          p: 2
        }}
        className={modalData.type === "DELETE" ? "modal-delete" : "modal__edit-post"}
      >
        <CloseIcon sx={{ float: "right", cursor: "pointer" }} onClick={cancel} />
        <h4 id='modal-modal-title' style={{ textAlign: "center" }}>
          {modalData.type === "DELETE" ? "Delete post?" : "Edit post"}
        </h4>

        <Divider sx={{ margin: "16px 0" }} />

        {modalData.type === "DELETE" ? (
          <>
            <Typography id='modal-modal-description' sx={{ textAlign: "center" }}>
              This action will delete the post permanently. Are you sure you want to delete this post?
            </Typography>

            <Divider sx={{ margin: "16px 0" }} />

            <Stack spacing={2} direction='row' sx={{ float: "right", cursor: "pointer" }}>
              <button
                className='button'
                style={{
                  height: "2rem",
                  padding: "0 20px",
                  background: "transparent",
                  color: "var(--gray)",
                  border: "1px solid var(--gray)"
                }}
                onClick={cancel}
              >
                Cancel
              </button>
              <button className='button' style={{ height: "2rem", width: 80 }} onClick={handleDelete}>
                Delete
              </button>
            </Stack>
          </>
        ) : (
          <div className='edit-post'>
            <div className='post-img'>
              {image || video ? (
                <>
                  <UilTimes style={{ color: "var(--orange" }} onClick={handleCancelUpload} />
                  {image ? (
                    <img src={URL.createObjectURL(image)} alt='' />
                  ) : (
                    <video src={URL.createObjectURL(video)} controls alt='' />
                  )}
                </>
              ) : (
                <img src={post?.image} alt={post?.image?.slice(-10)} />
              )}
            </div>
            <div className='post-info'>
              <div className='post-detail'>
                <div className='author-info'>
                  <img
                    className='profile-img'
                    src={
                      author?.profilePicture
                        ? process.env.REACT_APP_PUBLIC_FOLDER + author?.profilePicture
                        : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fplain-white-background&psig=AOvVaw0RA9E5KddBSwB8X3R1hRJ7&ust=1686132401107000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCMDngeiyrv8CFQAAAAAdAAAAABAD"
                    }
                    alt={author?.profilePicture}
                  />
                  <span>
                    <b>{post.author}</b>
                  </span>
                </div>
                <div className='post-desc'>
                  <TextField
                    fullWidth
                    multiline
                    minRows={6}
                    variant='standard'
                    autoFocus
                    value={postDesc}
                    onChange={handleChange}
                  />
                </div>
                <div className='post-options'>
                  <div
                    className='option hover__item'
                    style={{ color: "var(--photo)" }}
                    onClick={() => imgRef.current.click()}
                  >
                    <UilScenery />
                    <div className='option-text'>Photo</div>
                  </div>
                  <div
                    className='option hover__item'
                    style={{ color: "var(--video)" }}
                    onClick={() => videoRef.current.click()}
                  >
                    <UilPlayCircle />
                    <div className='option-text'>Video</div>
                  </div>
                  <div className='option hover__item' style={{ color: "var(--location)", cursor: "not-allowed" }}>
                    <UilLocationPoint />
                    <div className='option-text'>Location</div>
                  </div>

                  <div style={{ display: "none" }}>
                    <input type='file' name='myImage' ref={imgRef} onChange={onImageChange} />
                  </div>
                  <div style={{ display: "none" }}>
                    <input type='file' name='myVideo' ref={videoRef} onChange={onVideoChange} />
                  </div>
                </div>
              </div>
              <div className='post-save'>
                <button className='button save-btn' onClick={saveChange}>
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default PostModal;

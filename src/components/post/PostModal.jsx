import { useState } from "react";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import './PostModal.scss';
import { updatePost } from "../../redux/actions/PostAction";
import { useDispatch } from 'react-redux';

const PostModal = (props) => {
  const { post, author, modalData, closeModal, handleDelete } = props;

  const [postDesc, setPostDesc] = useState(post.desc);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setPostDesc(e.target.value);
  };

  const saveChange = () => {
    const editedPost = { ...post, desc: postDesc };

    dispatch(updatePost(editedPost));
    cancel();
  };
  
  const cancel = () => {
    setPostDesc(post.desc);
    closeModal();
  }

  return (
    <Modal
      open={modalData.open}
      onClose={cancel}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ p: 0 }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: modalData.type === "DELETE" ? 400 : 600,
          bgcolor: "#fff",
          borderRadius: 2,
          boxShadow: 24,
          p: 2,
        }}
      >
        <CloseIcon
          sx={{ float: "right", cursor: "pointer" }}
          onClick={cancel}
        />
        <h4 id="modal-modal-title" style={{ textAlign: "center" }}>
          {modalData.type === "DELETE" ? "Delete post?" : "Edit post"}
        </h4>

        <Divider sx={{ margin: "16px 0" }} />

        {modalData.type === "DELETE" ? (
          <>
            <Typography
              id="modal-modal-description"
              sx={{ textAlign: "center" }}
            >
              This action will delete the post permanently. Are you sure you
              want to delete this post?
            </Typography>

            <Divider sx={{ margin: "16px 0" }} />

            <Stack
              spacing={2}
              direction="row"
              sx={{ float: "right", cursor: "pointer" }}
            >
              <button
                className="button"
                style={{
                  height: "2rem",
                  padding: "0 20px",
                  background: "transparent",
                  color: "var(--gray)",
                  border: "1px solid var(--gray)",
                }}
                onClick={cancel}
              >
                Cancel
              </button>
              <button
                className="button"
                style={{ height: "2rem", padding: "0 20px" }}
                onClick={handleDelete}
              >
                Delete
              </button>
            </Stack>
          </>
        ) : (
          <div className="edit-post">
            <div className="post-img">
              <img src={ post?.image ? process.env.REACT_APP_PUBLIC_FOLDER + post?.image : "" } alt={post?.image} />
            </div>
            <div className="post-info">
              <div className="post-detail">
                <div className="author-info">
                    <img
                    className="profile-img"
                    src={ author?.profilePicture ? process.env.REACT_APP_PUBLIC_FOLDER + author?.profilePicture : "" }
                    alt={author?.profilePicture}
                    />
                    <span>
                    <b>{post.author}</b>
                    </span>
                </div>
                <div className="post-desc">
                    <TextField
                    fullWidth
                    multiline
                    minRows={6}
                    variant="standard"
                    autoFocus
                    value={postDesc}
                    onChange={handleChange}
                    />
                </div>
              </div>
              <div className="post-save">
                <button className="button save-btn" onClick={saveChange}>Save</button>
              </div>
            </div>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default PostModal;

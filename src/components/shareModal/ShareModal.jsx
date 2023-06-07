import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Modal from "@mui/material/Modal";
import PostShare from "../postShare/PostShare";

const ShareModal = ({ modalOpened, hideModal }) => {
  return (
    <Modal open={modalOpened} onClose={hideModal} sx={{ p: 0 }}>
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "#fff",
          width: "70%",
          maxWidth: "600px",
          borderRadius: 2,
          boxShadow: 24,
          p: 2
        }}
      >
        <CloseIcon sx={{ float: "right", cursor: "pointer" }} onClick={hideModal} />
        <h4 id='modal-modal-title' style={{ textAlign: "center" }}>
          Create post
        </h4>
        <Divider sx={{ margin: "12px -16px" }} />

        <PostShare />
      </Box>
    </Modal>
  );
};

export default ShareModal;

import { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import User from "../User/User";
import { getAllUsers } from "../../redux/api/UserRequest";
import "./UserList.scss";
import { useSelector } from 'react-redux';

const UserList = (props) => {
  const { title, userIdList, openModal, hideModal } = props;
  const [userList, setUserList] = useState([]);
  const { user: currentUser } = useSelector(state => state.authReducer.authData);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await getAllUsers(userIdList);
      setUserList(data);
    };
    fetchUsers();
  }, [userIdList]);

  return (
    <Modal
      open={openModal}
      onClose={hideModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      // sx={{ p: 0 }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "#fff",
          borderRadius: 2,
          boxShadow: 24,
          p: 2,
        }}
      >
        <CloseIcon
          sx={{ float: "right", cursor: "pointer" }}
          onClick={hideModal}
        />
        <div className="likes-list">
          <h3>{title ? title : "Likes"}</h3>
          {userList.length ? (
            <div className="user-list">
              {userList.map((user) => (
                <User data={user} key={user._id} showFollow={currentUser._id !== user._id} />
              ))}
            </div>
          ) : (
            <div style={{ color: "var(--gray", fontSize: 14 }}>
              <i>{`No one ${title ? title : "like"}.`}</i>
            </div>
          )}
        </div>
      </Box>
    </Modal>
  );
};

export default UserList;

import { useEffect, useMemo, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import IconButton from "@mui/material/IconButton";
import io from "socket.io-client";
import "./ChatBox.scss";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getAllMessageOfChat } from "redux/api/ChatRequest";
import useUser from "../../../../hooks/useUser";
import Skeleton from "@mui/material/Skeleton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
// const socket = io.connect("http://localhost:5000");

const ChatBox = (props) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const { user } = useSelector((state) => state.authReducer.authData);
  const { chatID, otherUserId } = useSelector((state) => state.appReducer);
  const dispatch = useDispatch();

  const socket = useMemo(() => io.connect("http://localhost:5000"), []);
  const otherUser = useUser(otherUserId);

  const serverPublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    socket.emit("join_chat", chatID);
    const fetchMessages = async () => {
      const { data } = await getAllMessageOfChat(chatID);
      data && setMessageList(data);
    };
    chatID && fetchMessages();
  }, [chatID]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((prev) => [...prev, data]);
    });

    return () => socket.on("receive_message");
  }, [socket]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        chatID,
        author: user?.userName,
        author_id: user._id,
        message: currentMessage,
        created_time: moment().toString()
      };

      await socket.emit("send_message", messageData);
      setMessageList((prev) => [...prev, messageData]);
      setCurrentMessage("");
    }
  };

  const closeChatBox = () => {
    dispatch({
      type: "CONNECT_SOCKET",
      payload: { chatID: "", otherUserId: "" }
    });
  };

  return (
    <div className='chat-window'>
      <div className='chat-header'>
        {!otherUser ? (
          <>
            <Skeleton variant='circular' className='chat-avatar' />
            <div className='header-user__info'>
              <Skeleton variant='rounded' width={30} height={16} />
              <Skeleton variant='rounded' width={30} height={12} />
            </div>
          </>
        ) : (
          <>
            <img
              src={
                otherUser.profilePicture
                  ? serverPublicFolder + otherUser.profilePicture
                  : serverPublicFolder + "profileImg.jpg"
              }
              alt='avt'
              className='chat-avatar'
            />
            <div className='header-user__info'>
              <p>{otherUser?.userName}</p>
              <div className='flex__center'>
                <div className='active-dot' />
                <span className='chat-user__status'>Active</span>
              </div>
            </div>
            <IconButton className='chat__close-btn' onClick={closeChatBox}>
              <CloseRoundedIcon />
            </IconButton>
          </>
        )}
      </div>
      <div className='chat-body'>
        <ScrollToBottom className='message-container'>
          {messageList.map((msg) => (
            <div className='message' key={msg?._id} id={user?.userName === msg.author ? "you" : "other"}>
              <div className='message-wrapper'>
                <div className='message-content'>
                  <p>{msg.message}</p>
                </div>
                <div className='message-meta'>
                  <p id='author'>{msg.author}</p>
                  <p id='time'>{moment(msg.created_time).fromNow()}</p>
                </div>
              </div>
            </div>
          ))}
        </ScrollToBottom>
      </div>
      <div className='chat-footer'>
        <input
          type='text'
          placeholder='Enter msg...'
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyDown={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        {/* <button onClick={sendMessage}>&#9658;</button> */}
        <IconButton onClick={sendMessage} disabled={currentMessage?.trim() === ""}>
          <SendRoundedIcon
            sx={currentMessage?.trim() ? { color: "var(--base-color)" } : { color: "lightgrey", cursor: "not-allowed" }}
          />
        </IconButton>
      </div>
    </div>
  );
};

export default ChatBox;

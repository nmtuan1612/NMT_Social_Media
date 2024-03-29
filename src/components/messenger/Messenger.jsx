import Skeleton from "@mui/material/Skeleton";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ChatApi } from "../../redux/api";
import "./Messenger.scss";
import Chat from "./components/chat/Chat";

const Messenger = (props) => {
  const { hideMessenger } = props;
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state.authReducer.authData);
  const { sizeState } = useSelector((state) => state.appReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConversation = async () => {
      setLoading(true);
      const { data } = await ChatApi.getAllConversationsOfUser(user?._id);
      setLoading(false);
      data && setConversations(data);
    };
    user && fetchConversation();
  }, [user]);

  const joinChat = (chatID, otherUserId) => {
    // await socket.emit("join_chat", 123);
    // console.log("alo");
    dispatch({
      type: "CONNECT_SOCKET",
      payload: { chatID, otherUserId }
    });
  };

  return (
    <>
      <h2 style={{ color: "var(--black" }}>Messages</h2>
      {loading ? (
        <ul className='popover__list-item' style={{ width: 300 }}>
          {Array(2)
            .fill({})
            .map((_, idx) => (
              <div className='popover__item' key={idx}>
                <Skeleton variant='circular' className='pop__item-avt' width={50} height={50} />

                <div className='pop__item-content'>
                  <Skeleton variant='rounded' width={220} height={20} />
                  <Skeleton variant='rounded' width={60} height={14} />
                </div>
              </div>
            ))}
        </ul>
      ) : (
        <>
          {conversations?.length ? (
            <ul className='popover__list-item' id='message__list'>
              {conversations.map((chat) => {
                const otherUserId = chat?.author_ids?.filter((id) => id !== user?._id)[0];

                return (
                  <div
                    style={{ color: "var(--black)" }}
                    key={chat?._id}
                    onClick={() => {
                      joinChat(chat?._id, otherUserId);
                      sizeState !== "desktop" && navigate("/messenger");
                      document.querySelectorAll(".bottom-nav__tab").forEach((node) => (node.style.display = "none"));
                    }}
                  >
                    <Chat chatData={chat} otherUserId={otherUserId} hideMessenger={hideMessenger} />
                  </div>
                );
              })}
            </ul>
          ) : (
            <div style={{ color: "var(--gray)" }}>
              <i>No message found.</i>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Messenger;

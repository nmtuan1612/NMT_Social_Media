import moment from "moment";
import Skeleton from "@mui/material/Skeleton";
import { useUser } from "../../../../hooks";
import "./Chat.scss";

const Chat = (props) => {
  const { chatData, hideMessenger, otherUserId } = props;

  // const [attackUser, setAttackUser] = useState({});
  const attackUser = useUser(otherUserId);
  // console.log(attackUser);

  // useEffect(() => {
  //   if (authorData && Object.keys(authorData)) {
  //     setAttackUser(authorData);
  //   }
  // }, [authorData]);

  return (
    <>
      {!attackUser ? (
        <>
          <div className='popover__item'>
            <Skeleton variant='circular' className='pop__item-avt' width={50} height={50} />

            <div className='pop__item-content'>
              <Skeleton variant='rounded' width={220} height={20} />
              <Skeleton variant='rounded' width={60} height={14} />
            </div>
          </div>
        </>
      ) : (
        <div className='chat' onClick={hideMessenger}>
          <div className='chat_avatar'>
            <img
              src={
                attackUser?.profilePicture
                  ? attackUser.profilePicture
                  : "http://res.cloudinary.com/duyb3dqsr/image/upload/v1686151682/umqnvu5voukxkdxtowo4.png"
              }
              alt='avt'
            />
          </div>
          <div className='chat_content'>
            <span className='attack__user-name'>{attackUser?.userName}</span>
            <div className='chat-newest__msg'>
              <span className='newest__msg'>{chatData?.newestMessage?.message}</span>
              <span style={{ margin: "0 4px" }}> · </span>
              <span className='chat_time'>{moment(chatData?.newestMessage?.created_time).fromNow(true)}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;

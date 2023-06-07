import Skeleton from "@mui/material/Skeleton";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PostApi } from "../../redux/api";
import SavedPost from "./SavedPost";

const SavedPostList = (props) => {
  const { hideSaved, hidePopUp } = props;
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      setLoading(true);
      const { data } = await PostApi.getSavedPosts(user?._id);
      setLoading(false);
      data && setSavedPosts(data);
    };
    user && fetchSavedPosts();
  }, [user]);

  return (
    <>
      <h2 style={{ color: "var(--black" }}>Saved posts</h2>
      {loading ? (
        <ul className='popover__list-item' style={{ width: 200 }}>
          {Array(3)
            .fill({})
            .map((_, idx) => (
              <div className='popover__item' key={idx}>
                <Skeleton variant='rounded' width={41} height={41} />

                <div className='pop__item-content'>
                  <Skeleton variant='rounded' width={150} height={20} />
                  <Skeleton variant='rounded' width={60} height={14} />
                </div>
              </div>
            ))}
        </ul>
      ) : savedPosts && savedPosts.length ? (
        <ul className='popover__list-item'>
          {savedPosts.map((post) => (
            <SavedPost key={post._id} savedPost={post} hideSaved={hideSaved} hidePopUp={hidePopUp} />
          ))}
        </ul>
      ) : (
        <div style={{ color: "var(--gray)" }}>
          <i>No post saved.</i>
        </div>
      )}
    </>
  );
};

export default SavedPostList;

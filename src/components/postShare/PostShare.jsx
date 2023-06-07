import { UilLocationPoint, UilPlayCircle, UilScenery, UilTimes } from "@iconscout/react-unicons";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PostApi } from "redux/api";
import { uploadPost } from "../../redux/actions/UploadAction";
import "./PostShare.scss";

const PostShare = () => {
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [canShare, setCanShare] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.authReducer.authData);
  const { uploading } = useSelector((state) => state.postReducer);
  const dispatch = useDispatch();

  const imgRef = useRef();
  const videoRef = useRef();
  const descInputRef = useRef();

  useEffect(() => {
    setLoading(uploading);
  }, [uploading]);

  const onImageChange = (event) => {
    if (event.target.files?.[0]) {
      let img = event.target.files[0];

      setImage(img);
      setCanShare(true);
    }
  };

  const onVideoChange = (event) => {
    if (event.target.files?.[0]) {
      let video = event.target.files[0];
      setVideo(video);
      setCanShare(true);
    }
  };

  const handleCaptionChange = (e) => {
    e.target.value ? setCanShare(true) : setCanShare(false);
  };

  const handleCancelUpload = () => {
    setImage(null);
    setVideo(null);
    setCanShare(false);
    imgRef.current.value = "";
    videoRef.current.value = "";
  };

  const reset = () => {
    setImage(null);
    setVideo(null);
    setCanShare(false);
    imgRef.current.value = "";
    videoRef.current.value = "";
    descInputRef.current.value = "";
  };

  const handleShare = async (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      author: user.userName,
      desc: descInputRef.current.value
    };

    if (image) {
      const postData = new FormData();
      const fileName = Date.now() + image.name;
      postData.append("name", fileName);
      postData.append("file", image);

      try {
        const { data } = await PostApi.uploadImage(postData);
        newPost.image = data?.url;
      } catch (error) {
        console.log(error);
      }
    }
    if (video) {
      const postData = new FormData();
      const fileName = Date.now() + video.name;
      postData.append("name", fileName);
      postData.append("file", video);

      try {
        const { data } = await PostApi.uploadImage(postData);
        newPost.image = data?.url;
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(uploadPost(newPost));
    reset();
    toast.success("Create post successfully!");
  };

  return (
    <div className='PostShare'>
      <img
        className='profile-img'
        src={
          user?.profilePicture
            ? user.profilePicture
            : "http://res.cloudinary.com/duyb3dqsr/image/upload/v1686151682/umqnvu5voukxkdxtowo4.png"
        }
        alt='sdfsdf'
      />

      <div className='post-create'>
        <input
          type='text'
          ref={descInputRef}
          required
          placeholder="What's happening"
          onChange={handleCaptionChange}
          style={descInputRef?.current?.value || image || video ? { order: 1 } : {}}
        />

        <div className='post-options' style={descInputRef?.current?.value || image || video ? { order: 3 } : {}}>
          <div className='option hover__item' style={{ color: "var(--photo)" }} onClick={() => imgRef.current.click()}>
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
            <input
              type='file'
              accept='image/png, image/gif, image/jpeg'
              name='myImage'
              ref={imgRef}
              onChange={onImageChange}
            />
          </div>
          <div style={{ display: "none" }}>
            <input
              type='file'
              accept='video/mp4,video/x-m4v,video/*'
              name='myVideo'
              ref={videoRef}
              onChange={onVideoChange}
            />
          </div>
        </div>

        {(image || video) && (
          <div className='previewImg'>
            <UilTimes style={{ color: "var(--orange" }} onClick={handleCancelUpload} />
            {image ? (
              <img src={URL.createObjectURL(image)} alt='' />
            ) : (
              <video src={URL.createObjectURL(video)} controls alt='' />
            )}
          </div>
        )}

        <button
          className='button post-share-btn'
          onClick={handleShare}
          disabled={loading}
          style={{ display: canShare ? "block" : "none" }}
        >
          {loading ? "Uploading..." : "Share"}
        </button>
      </div>
    </div>
  );
};

export default PostShare;

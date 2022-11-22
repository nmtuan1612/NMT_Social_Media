import { useState, useRef } from "react";
import { UilScenery, UilPlayCircle, UilLocationPoint, UilSchedule, UilTimes } from "@iconscout/react-unicons";
import { useSelector, useDispatch } from "react-redux";
import { uploadImage, uploadPost } from "../../redux/actions/UploadAction";
import "./PostShare.scss";

const PostShare = () => {
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [canShare, setCanShare] = useState(false);
  const { user } = useSelector((state) => state.authReducer.authData);
  const { uploading } = useSelector((state) => state.postReducer);
  const dispatch = useDispatch();

  const imgRef = useRef();
  const videoRef = useRef();
  const descInputRef = useRef();

  const serverPublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];

      setImage(img);
      setCanShare(true);
    }
  };

  const onVideoChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let video = event.target.files[0];
      setVideo(video);
      setCanShare(true);
    }
  }

  const handleCaptionChange = (e) => {
    e.target.value ? setCanShare(true) : setCanShare(false);
  }

  const handleCancelUpload = () => {
    setImage(null);
    setVideo(null);
    imgRef.current.value = "";
    videoRef.current.value = "";
  }

  const reset = () => {
    setImage(null);
    setVideo(null);
    setCanShare(false);
    imgRef.current.value = "";
    videoRef.current.value = "";
    descInputRef.current.value = "";
  };

  const handleShare = (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      author: user.userName,
      desc: descInputRef.current.value,
    };

    if (image) {
      const postData = new FormData();
      const fileName = Date.now() + image.name;
      postData.append("name", fileName);
      postData.append("file", image);
      newPost.image = fileName;

      try {
        dispatch(uploadImage(postData));
      } catch (error) {
        console.log(error);
      }
    }
    if (video) {
      const postData = new FormData();
      const fileName = Date.now() + video.name;
      postData.append("name", fileName);
      postData.append("file", video);
      newPost.image = fileName;

      try {
        dispatch(uploadImage(postData));
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(uploadPost(newPost));
    reset();
  };

  return (
    <div className="PostShare">
      <img className="profile-img" src={user.profilePicture ? serverPublicFolder + user.profilePicture : serverPublicFolder + 'profileImg.jpg'} alt="" />

      <div className="post-create">
        <input
          type="text"
          ref={descInputRef}
          required
          placeholder="What's happening"
          onChange={handleCaptionChange}
        />

        <div className="post-options">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imgRef.current.click()}
          >
            <UilScenery />
            <div className="option-text">Photo</div>
          </div>
          <div className="option" style={{ color: "var(--video)" }} onClick={() => videoRef.current.click()}>
            <UilPlayCircle />
            <div className="option-text">Video</div>
          </div>
          <div className="option" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            <div className="option-text">Location</div>
          </div>
          <div className="option" style={{ color: "var(--schedule)" }}>
            <UilSchedule />
            <div className="option-text">Schedule</div>
          </div>

          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage" 
              ref={imgRef}
              onChange={onImageChange}
            />
          </div>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myVideo"
              ref={videoRef}
              onChange={onVideoChange}
            /> 
          </div>
        </div>

        {(image || video) && (
          <div className="previewImg">
            <UilTimes
              style={{ color: "var(--orange" }}
              onClick={handleCancelUpload}
            />
            {image ? (
              <img src={URL.createObjectURL(image)} alt="" />
            ) : (
              <video src={URL.createObjectURL(video)} controls alt=""/>
            )}
          </div>
        )}

        <button
          className="button post-share-btn"
          onClick={handleShare}
          disabled={uploading}
          style={{ display: canShare ? 'block' : 'none'}}
        >
          {uploading ? "Uploading..." : "Share"}
        </button>
      </div>
    </div>
  );
};

export default PostShare;

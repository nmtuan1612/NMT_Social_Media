import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Modal from "@mui/material/Modal";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateUser } from "../../redux/actions/UserAction";
import { PostApi } from "../../redux/api";
import "./EditProfileModal.scss";
import { toast } from "react-toastify";

const EditProfileModal = ({ modalOpened, hideModal, data }) => {
  const [formData, setFormData] = useState({});
  const [coverPicture, setCoverPicture] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  const { updating } = useSelector((state) => state.authReducer);

  const profileInputRef = useRef();
  const coverInputRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      const { password, ...other } = data;
      setFormData(other);
      setCoverPicture(other.coverPicture);
      setProfilePicture(other.profilePicture);
    }
  }, [data]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (e) => {
    if (e.target.files?.[0]) {
      let img = e.target.files[0];
      e.target.name === "profilePicture" ? setProfilePicture(img) : setCoverPicture(img);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = formData;

    if (profilePicture && typeof profilePicture !== "string") {
      const imgData = new FormData();
      const fileName = Date.now() + profilePicture.name;
      imgData.append("name", fileName);
      imgData.append("file", profilePicture);

      try {
        const { data } = await PostApi.uploadImage(imgData);
        userData.profilePicture = data?.url;
      } catch (error) {
        console.log(error);
      }
    }
    if (coverPicture && typeof coverPicture !== "string") {
      const imgData = new FormData();
      const fileName = Date.now() + coverPicture.name;
      imgData.append("name", fileName);
      imgData.append("file", coverPicture);

      try {
        const { data } = await PostApi.uploadImage(imgData);
        userData.coverPicture = data?.url;
      } catch (error) {
        console.log(error);
      }
    }

    dispatch(updateUser(formData?._id, userData));
    hideModal();
    toast.success("Update profile successfully!");
  };

  return (
    <Modal open={modalOpened} onClose={hideModal}>
      <div className='edit-profile__modal'>
        <form action='' className='info-form' onSubmit={handleSubmit}>
          <h3>Your info</h3>
          <div className='input-group'>
            <div className='input-item'>
              <label htmlFor='userName' className='input-label'>
                User name
              </label>
              <input
                type='text'
                id='userName'
                className='info-input'
                name='userName'
                placeholder='User name'
                onChange={handleChange}
                value={formData?.userName}
              />
            </div>
          </div>

          <div className='input-group'>
            <div className='input-item'>
              <label htmlFor='workAt' className='input-label'>
                Work at
              </label>
              <input
                type='text'
                id='workAt'
                className='info-input'
                name='workAt'
                placeholder='Works at'
                onChange={handleChange}
                value={formData?.workAt}
              />
            </div>
            <div className='input-item'>
              <label htmlFor='liveIn' className='input-label'>
                Live in
              </label>
              <input
                type='text'
                id='liveIn'
                className='info-input'
                name='liveIn'
                placeholder='Lives in'
                onChange={handleChange}
                value={formData?.liveIn}
              />
            </div>
          </div>

          <div className='input-group'>
            <div className='input-item'>
              <label htmlFor='country' className='input-label'>
                Country
              </label>
              <input
                type='text'
                id='country'
                className='info-input'
                name='country'
                placeholder='Country'
                onChange={handleChange}
                value={formData?.country}
              />
            </div>
            <div className='input-item'>
              <label htmlFor='relationship' className='input-label'>
                Relationship
              </label>
              <input
                type='text'
                id='relationship'
                className='info-input'
                name='relationship'
                placeholder='Relationship Status'
                onChange={handleChange}
                value={formData?.relationship}
              />
            </div>
          </div>

          <div className='input-group'>
            <div className='input-item'>
              <label htmlFor='about' className='input-label'>
                About
              </label>
              <input
                type='text-area'
                id='about'
                className='info-input about-input'
                name='about'
                placeholder='About yourself'
                onChange={handleChange}
                value={formData?.about}
              />
            </div>
          </div>

          <div className='input-group' style={{ justifyContent: "flex-start", height: "auto" }}>
            <div className='input-item' style={{ height: "auto" }}>
              <label htmlFor='avatar_input'>Profile Image</label>
              <div className='input-file__wrap'>
                <input
                  ref={profileInputRef}
                  type='file'
                  name='profilePicture'
                  id='avatar_input'
                  onChange={onImageChange}
                />
                <div
                  className='input-file__button flex__center'
                  onClick={() => {
                    profileInputRef.current.click();
                  }}
                >
                  <AddRoundedIcon />
                </div>
                {profilePicture && (
                  <img
                    src={typeof profilePicture === "string" ? profilePicture : URL.createObjectURL(profilePicture)}
                    alt=''
                    style={{ width: 50, height: 50 }}
                  />
                )}
              </div>
            </div>
          </div>
          <div className='input-group' style={{ justifyContent: "flex-start", height: "auto" }}>
            <div className='input-item' style={{ height: "auto" }}>
              <label htmlFor='cover_input'>Cover Image</label>
              <div className='input-file__wrap'>
                <input ref={coverInputRef} type='file' name='coverPicture' id='cover_input' onChange={onImageChange} />
                <div
                  className='input-file__button flex__center'
                  onClick={() => {
                    coverInputRef.current.click();
                  }}
                >
                  <AddRoundedIcon />
                </div>
                {coverPicture && (
                  <div style={{ flex: 1, height: 70, overflow: "hidden" }}>
                    <img
                      src={typeof coverPicture === "string" ? coverPicture : URL.createObjectURL(coverPicture)}
                      alt=''
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <button type='submit' className='button info-btn'>
            {updating && <div className='loader' />}
            Update
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default EditProfileModal;

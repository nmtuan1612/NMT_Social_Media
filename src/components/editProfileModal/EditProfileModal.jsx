import { Modal, useMantineTheme } from "@mantine/core";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { uploadImage } from '../../redux/actions/UploadAction';
import { updateUser } from '../../redux/actions/UserAction';
import "./EditProfileModal.scss";

const EditProfileModal = ({ modalOpened, hideModal, data }) => {
  const { password, ...other } = data;

  const [formData, setFormData] = useState(other);
  const [coverPicture, setCoverPicture] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  const params = useParams();
  const dispatch = useDispatch();
  const theme = useMantineTheme();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      e.target.name === 'profilePicture' ? setProfilePicture(img) : setCoverPicture(img);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const userData = formData;

    if (profilePicture) {
      const imgData = new FormData();
      const fileName = Date.now() + profilePicture.name;
      imgData.append("name", fileName);
      imgData.append("file", profilePicture);
      userData.profilePicture = fileName;
      try {
        dispatch(uploadImage(imgData));
      } catch (error) {
        console.log(error);
      }
    }
    if (coverPicture) {
      const imgData = new FormData();
      const fileName = Date.now() + coverPicture.name;
      imgData.append("name", fileName);
      imgData.append("file", coverPicture);
      userData.coverPicture = fileName;
      try {
        dispatch(uploadImage(imgData));
      } catch (error) {
        console.log(error);
      }
    }

    dispatch(updateUser(params.id, userData));
    hideModal();
  }

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="56%"
      opened={modalOpened}
      onClose={hideModal}
    >
      <form action="" className="info-form" onSubmit={handleSubmit}>
        <h3>Your info</h3>

        <div className="input-group">
          <div className="input-item">
            <label htmlFor="firstName" className="input-label">First name</label>
            <input
              type="text"
              id="firstName"
              className="info-input"
              name="firstName"
              placeholder="First name"
              onChange={handleChange}
              value={formData.firstName}
            />
          </div>
          <div className="input-item">
            <label htmlFor="lastName" className="input-label">Last name</label>
            <input
              type="text"
              id="lastName"
              className="info-input"
              name="lastName"
              placeholder="Last name"
              onChange={handleChange}
              value={formData.lastName}
            />
          </div>
        </div>

        <div className="input-group">
          <div className="input-item">
            <label htmlFor="userName" className="input-label">User name</label>
            <input
              type="text"
              id="userName"
              className="info-input"
              name="userName"
              placeholder="User name"
              onChange={handleChange}
              value={formData.userName}
            />
          </div>
        </div>

        <div className="input-group">
          <div className="input-item">
            <label htmlFor="workAt" className="input-label">Work at</label>
            <input
              type="text"
              id="workAt"
              className="info-input"
              name="workAt"
              placeholder="Works at"
              onChange={handleChange}
              value={formData.workAt}
            />
          </div>
          <div className="input-item">
            <label htmlFor="liveIn" className="input-label">Live in</label>
            <input
              type="text"
              id="liveIn"
              className="info-input"
              name="liveIn"
              placeholder="Lives in"
              onChange={handleChange}
              value={formData.liveIn}
            />
          </div>
        </div>

        <div className="input-group">
          <div className="input-item">
            <label htmlFor="country" className="input-label">Country</label>
            <input
              type="text"
              id="country"
              className="info-input"
              name="country"
              placeholder="Country"
              onChange={handleChange}
              value={formData.country}
            />
          </div>
          <div className="input-item">
            <label htmlFor="relationship" className="input-label">Relationship</label>
            <input
              type="text"
              id="relationship"
              className="info-input"
              name="relationship"
              placeholder="Relationship Status"
              onChange={handleChange}
              value={formData.relationship}
            />
          </div>
        </div>

        <div className="input-group">
          <div className="input-item">
            <label htmlFor="about" className="input-label">About</label>
            <input
              type="text-area"
              id="about"
              className="info-input about-input"
              name="about"
              placeholder="About yourself"
              onChange={handleChange}
              value={formData.about}
            />
          </div>
        </div>

        <div className="input-group">
          Profile Image
          <input type="file" name="profilePicture" onChange={onImageChange} />
          Cover Image
          <input type="file" name="coverPicture" onChange={onImageChange} />
        </div>

        <button type='submit' className="button info-btn">Update</button>
      </form>
    </Modal>
  );
};

export default EditProfileModal;

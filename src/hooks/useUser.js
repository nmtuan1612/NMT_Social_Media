import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { UserApi } from "../redux/api";

function useUser(userId) {
  const [profileUser, setProfileUser] = useState(null);
  
  const { user } = useSelector((state) => state.authReducer.authData);
  const params = useParams();
  const location = useLocation();

  const profileUserId = params.id;

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (userId) {
        const profileData = await UserApi.getUser(userId);
        setProfileUser(profileData.data);
      } else {
        if (location.pathname.includes("profile") && profileUserId && profileUserId !== user._id) {
          const profileData = await UserApi.getUser(profileUserId);
          setProfileUser(profileData.data);
        } else {
          setProfileUser(user);
        }
      }
    };
    fetchProfileUser();
  }, [profileUserId, user, userId, location]);

  return profileUser;
}

export default useUser;

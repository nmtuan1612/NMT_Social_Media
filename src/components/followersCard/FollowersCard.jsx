import { useState, useEffect } from "react";
import User from "../User/User";
import "./FollowersCard.scss";
import { useSelector } from "react-redux";
import { getAllUsers } from "../../redux/api/UserRequest";
import { useUser } from "../../hooks";

const FollowerCard = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [people, setPeople] = useState([]);
  const [currentUser, setCurrentUser] = useState(user);

  const userData = useUser();

  useEffect(() => {
    if (userData) {
      setCurrentUser(userData);
    }
  }, [userData]);

  useEffect(() => {
    const fetchPeople = async () => {
      const { data } = await getAllUsers();
      setPeople(data);
    };
    fetchPeople();
  }, []);

  return (
    <div className="FollowersCard">
      <h3 className="followers-card-title">People you may know</h3>
      <div className="followers-list">
        {people.map((person, idx) => {
          if (person._id !== currentUser._id && person._id !== user._id && !user.following.includes(person._id)) {
            return <User data={person} key={idx} />;
          }
          return '';
        })}
      </div>
    </div>
  );
};

export default FollowerCard;

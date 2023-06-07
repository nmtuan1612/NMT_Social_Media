import { useState } from "react";
import Logo from "../../img/logo.png";
import { UilSearch } from "@iconscout/react-unicons";
import "./LogoSearch.scss";
import { getSearchResults } from "../../redux/api/UserRequest";
import { useSelector } from "react-redux";
import User from "../User/User";
import { Link } from "react-router-dom";
import SavedPost from "../savedPostList/SavedPost";

function LogoSearch() {
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const { user } = useSelector((state) => state.authReducer.authData);

  const inputChange = (e) => {
    setSearchKey(e.target.value);
    if (e.target.value) {
      console.log("true");
      const params = new URLSearchParams([["text", e.target.value]]);

      const fetchResult = async () => {
        const results = await getSearchResults(user._id, params);
        setSearchResults(results.data);
      };

      fetchResult();
    } else {
      setSearchResults(null);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams([["text", searchKey]]);

    const fetchResult = async () => {
      const results = await getSearchResults(user._id, params);
      setSearchResults(results.data);
    };

    fetchResult();
  };

  return (
    <div className="LogoSearch">
      <Link to="/home">
        <img src={Logo} alt="" />
      </Link>

      <div className="Search">
        <form className="search-form">
          <input
            type="text"
            placeholder="#Explore"
            value={searchKey}
            onChange={inputChange}
            style={{ paddingLeft: 8 }}
          />
          <button
            className="search-icon"
            disabled={searchKey === ""}
            onClick={handleSearch}
          >
            <UilSearch />
          </button>

          {searchResults?.length ? (
            <div className="search-result">
              {searchResults.map((result) => {
                if (result.userName) {
                  return (
                    <User data={result} showFollow={false} key={result._id} />
                  );
                } else {
                  return <SavedPost key={result._id} savedPost={result} />;
                }
              })}
            </div>
          ) : (
            ""
          )}
        </form>
      </div>
    </div>
  );
}

export default LogoSearch;

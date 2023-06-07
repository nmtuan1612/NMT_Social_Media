import { useEffect } from "react";
import { useSelector } from "react-redux";
import FixedBottomNavigation from "../../components/bottomNavigation/BottomNavigation";
import PostSide from "../../components/postSide/PostSide";
import ProfileSide from "../../components/profileSide/ProfileSide";
import RightSide from "../../components/rightSide/RightSide";
import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import "./Home.scss";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  const { sizeState } = useSelector((state) => state.appReducer);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className='home'>
      <Box
        sx={{
          display: "flex",
          // justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
          gap: 2
        }}
      >
        <Typography variant='h1'>404</Typography>
        <Typography variant='h6'>The page you’re looking for doesn’t exist.</Typography>
        <Link to='/home' className='button' style={{ width: 120, height: 48, textDecoration: "none" }}>
          Back Home
        </Link>
      </Box>
    </div>
  );
};

export default NotFoundPage;

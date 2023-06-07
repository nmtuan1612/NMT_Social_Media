import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import Auth from "./pages/auth/Auth";
import Home from "./pages/home/Home";
import PostView from "./pages/post/PostView";
import Profile from "./pages/profile/Profile";
import NotFoundPage from "./pages/notFound/NotFoundPage";

function App() {
  const user = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "CONNECT_SOCKET",
      payload: { chatID: "", otherUserId: "" }
    });
    dispatch({ type: "RESIZE_VIEWPORT", payload: window.innerWidth <= 1023 ? "tablet" : "desktop" });

    const handleResize = () => {
      if (window.innerWidth <= 1023) {
        dispatch({ type: "RESIZE_VIEWPORT", payload: "tablet" });
      } else {
        dispatch({ type: "RESIZE_VIEWPORT", payload: "desktop" });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className='App'>
      <div className='blur' style={{ top: "-18%", right: "0" }}></div>
      <div className='blur' style={{ top: "36%", left: "-8rem" }}></div>
      <ToastContainer />
      <div className='container'>
        <Routes>
          <Route path='/' index element={user ? <Navigate to='home' element={<Home />} /> : <Navigate to='auth' />} />

          <Route path='/home' element={user ? <Home /> : <Navigate to='../auth' />} />

          <Route path='/auth' element={user ? <Navigate to='../home' /> : <Auth />} />

          <Route path='/profile/:id' element={user ? <Profile /> : <Navigate to='../auth' />} />

          <Route path='/post/:id' element={user ? <PostView /> : <Navigate to='../auth' />} />

          <Route path='/*' element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

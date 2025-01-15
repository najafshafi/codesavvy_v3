import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";
import axios from "axios";

// -------------------------------------------------
import { AuthProvider } from "./Auth/AuthContext";
import PrivateRoute from "../src/Auth/PrivateRoute";

// ------------------------------------------------- Components
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Loading from "./Components/Loading";
import DefaultNavbar from "./Components/DefaultNavbar";
import Footer from "./Components/Footer";
import GetCertified from "./Components/GetCertified";
import Cards from "./Components/Cards";

// ------------------------------------------------- Pages
// import DashboardLayout2 from "./Pages/SavvyAI/dashboardLayout/DashboardLayout";
import DashboardPage2 from "./Pages/SavvyAI/dashboardPage/DashboardPage";
import Loginpage2 from "./Pages/SavvyAI/loginpage/Login";
import ChatPage2 from "./Pages/SavvyAI/chatPage/ChatPage";
import QueryDash2 from "./Pages/SavvyAI/QueryDash";
import QuizDashboard2 from "./Pages/QuizGame/QuizDashboard/QuizDashboard";
import QuizAllData2 from "./Pages/QuizGame/QuizAllData";
import QuizList2 from "./Pages/QuizGame/QuizList";
import QueryPost2 from "./Pages/PostCommunity/QueryPost";
import Workspace2 from "./Pages/workspace/page";
import Profile from "./Pages/Profile/ProfilePage";
import DashboardLayout from "./Pages/Profile/SavvyAI/dashboardLayout/DashboardLayout";
import DashboardPage from "./Pages/Profile/SavvyAI/dashboardPage/DashboardPage";
import Loginpage from "./Pages/Profile/SavvyAI/loginpage/Login";
import ChatPage from "./Pages/Profile/SavvyAI/chatPage/ChatPage";
import QueryDash from "./Pages/Profile/SavvyAI/QueryDash";
import QuizDashboard from "./Pages/Profile/QuizGame/QuizDashboard/QuizDashboard";
import QuizAllData from "./Pages/Profile/QuizGame/QuizAllData";
import QuizList from "./Pages/Profile/QuizGame/QuizList";
import QueryPost from "./Pages/Profile/PostCommunity/QueryPost";
import Workspace from "./Pages/Profile/workspace/page";
import Learning from "./Pages/learning/page";
import Exercises from "./Pages/exercises/page";
import ColorPicker from "./Pages/colorpicker/page";
import CodeGames from "./Pages/codegames/page";

// ------------------------------------------------- CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { ThemeProvider } from "./context/themeContext";

const queryClient = new QueryClient();

function App() {
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(
    localStorage.getItem("avatar") || "https://via.placeholder.com/150"
  );
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (token && storedUser) {
        try {
          const res = await axios.get("http://localhost:3003/api/verifyToken", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data.user);
        } catch (err) {
          console.error("Token verification failed", err);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
        }
      }
      setIsVerifying(false);
    };
    verifyToken();
  }, []);

  if (isVerifying) {
    return <Loading />;
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Router>
            <DefaultNavbar
              setUser={setUser}
              user={user}
              avatar={avatar}
              setAvatar={setAvatar}
            />
            <Routes>
              <Route path="/" element={<Home user={user} />} />
              <Route path="/login" element={<Login setUser={setUser} />} />
              <Route
                path="/profile/savvyai"
                element={<PrivateRoute element={<QueryDash />} user={user} />}
              />

              <Route
                path="/savvyai"
                element={<PrivateRoute element={<QueryDash2 />} user={user} />}
              />
              <Route
                path="/profile/settings"
                element={
                  <PrivateRoute element={<Profile user={user} />} user={user} />
                }
              />
              <Route path="/getCertified" element={<GetCertified />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/login" element={<Login setUser={setUser} />} />
              <Route path="/learn-coding" element={<Cards />} />
              <Route path="/colorpicker" element={<ColorPicker />} />
              <Route path="/coding-games" element={<CodeGames />} />
              <Route path="/exercises" element={<Exercises />} />
              <Route
                path="/profile/workspace"
                element={<PrivateRoute element={<Workspace />} user={user} />}
              />
              <Route
                path="/workspace"
                element={<PrivateRoute element={<Workspace2 />} user={user} />}
              />
              <Route path="/footer" element={<Footer />} />
              <Route path="/login-ai" element={<Loginpage />} />
              <Route path="/login-ai" element={<Loginpage2 />} />
              <Route
                path="/profile/quiz"
                element={<PrivateRoute element={<QuizList />} user={user} />}
              />
              <Route
                path="/quiz"
                element={<PrivateRoute element={<QuizList2 />} user={user} />}
              />
              <Route
                path="/profile/quiza"
                element={<PrivateRoute element={<QuizAllData />} user={user} />}
              />
              <Route
                path="/quiza"
                element={
                  <PrivateRoute element={<QuizAllData2 />} user={user} />
                }
              />
              <Route
                path="/profile/post"
                element={
                  <PrivateRoute
                    element={<QueryPost user={user} />}
                    user={user}
                  />
                }
              />
              <Route
                path="/post"
                element={<PrivateRoute element={<QueryPost2 />} user={user} />}
              />
              <Route
                path="/profile/quiz/:id"
                element={
                  <PrivateRoute element={<QuizDashboard />} user={user} />
                }
              />

              <Route
                path="/quiz/:id"
                element={
                  <PrivateRoute element={<QuizDashboard2 />} user={user} />
                }
              />

              <Route path="postLayout" />

              <Route element={<DashboardLayout />}>
                <Route path="/profile/dashboard" element={<DashboardPage />} />
                <Route path="/dashboard" element={<DashboardPage2 />} />
                <Route
                  path="/profile/dashboard/chats/:id"
                  element={<ChatPage />}
                />
                <Route path="/dashboard/chats/:id" element={<ChatPage2 />} />

                <Route
                  path="/quiz/:id"
                  element={
                    <PrivateRoute element={<QuizDashboard />} user={user} />
                  }
                />
              </Route>
              <Route
                path="/learning"
                element={
                  <MantineProvider>
                    <Learning />
                  </MantineProvider>
                }
              />
            </Routes>
          </Router>
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

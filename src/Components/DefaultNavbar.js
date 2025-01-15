import React, { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import { HiMenu, HiX } from "react-icons/hi";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { User } from "@nextui-org/react";
import MainLogo from "../MainLogo.png";
import "./DefaultNavbar.css";
import { Link } from "react-router-dom";
import SignInModel from "./Models/SignInModel";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import AxiosInstance from "../Auth/axiosInstance";
import SmartToyIcon from "@mui/icons-material/SmartToy"; // AI Icon
import Sidebar from "../Pages/Profile/Sidebar";

import Profile from "../Pages/Profile/ProfilePage";
// import DashboardLayout from "../Pages/Profile/SavvyAI/dashboardLayout/DashboardLayout";
import DashboardPage from "../Pages/Profile/SavvyAI/dashboardPage/DashboardPage";
import Loginpage from "../Pages/Profile/SavvyAI/loginpage/Login";
import ChatPage from "../Pages/Profile/SavvyAI/chatPage/ChatPage";
import QueryDash from "../Pages/Profile/SavvyAI/QueryDash";
import QuizDashboard from "../Pages/Profile/QuizGame/QuizDashboard/QuizDashboard";
import QuizAllData from "../Pages/Profile/QuizGame/QuizAllData";
import QuizList from "../Pages/Profile/QuizGame/QuizList";
import QueryPost from "../Pages/Profile/PostCommunity/QueryPost";
import Workspace from "../Pages/Profile/workspace/page";

export default function App({ avatar, setAvatar }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const [currentPage, setCurrentPage] = useState("SettingsPage"); // Default active page

  const renderPage = () => {
    switch (currentPage) {
      case "SettingsPage":
        return <Profile user={user} />;
      case "SavvyAIDashboardPage":
        return <DashboardPage />;
      case "SavvyAIPage":
        return <QueryDash />;
      case "PostPage":
        return <QueryPost />;
      case "WorkspacePage":
        return <Workspace />;
      case "QuizPage":
        return <QuizList />;
      case "QuizAllDataPage":
        return <QuizAllData />;
      case "QuizDashboardPage":
        return <QuizDashboard />;
      case "DashboardPage":
        return <DashboardPage />;
      case "ChatPage":
        return <ChatPage />;
      case "LoginAIPage":
        return <Loginpage />;
      default:
        return <Profile user={user} />;
    }
  };

  const [user, setUser] = useState(null);
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  // Load user data from localStorage on page load
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");
    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse saved user data:", error);
        setUser(null); // Reset to prevent errors
      }
    }
  }, []);

  const handleLogout = async () => {
    try {
      await AxiosInstance.post("/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      Cookies.remove("token");
      Cookies.remove("user");
      navigate("/");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  function changetheme() {
    setLogin(!login);
  }

  const shouldHideComponents = () => {
    const path = window.location.pathname;
    return path.startsWith("/profile");
  };

  return (
    <>
      {!shouldHideComponents() && (
        <div className="mybar z-40">
          <Navbar>
            <NavbarBrand justify="start">
              <Link className="nav-link" to="/">
                <img className="size-8" src={MainLogo} alt="Logo" />
              </Link>
            </NavbarBrand>

            <NavbarContent
              className="hidden sm:flex gap-4 mt-3"
              justify="center"
            >
              <Button
                style={{
                  background:
                    "linear-gradient(135deg, var(--gradColor1) 0%, var(--gradColor2) 100%)",
                  color: "#fff",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  textTransform: "none",
                  transition: "all 0.3s ease-in-out",
                }}
                onClick={() => {
                  changetheme();
                }}
              >
                <Link
                  to="/savvyai"
                  className="nav-link"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span>SavvyAI</span>
                  <SmartToyIcon
                    style={{ fontSize: "1.5rem", marginLeft: "5px" }}
                  />
                </Link>
              </Button>

              {/* <NavbarItem>
                <Link to="/post" className="nav-link">
                  PostCommunity
                </Link>
              </NavbarItem> */}

              <NavbarItem>
                <Link to="/WorkSpace" className="nav-link">
                  WorkSpace
                </Link>
              </NavbarItem>

              <NavbarItem className="hover-active-link">
                <Link to="/learning" className="nav-link">
                  Tutorials
                </Link>
              </NavbarItem>

              <NavbarItem>
                <Link to="/exercises" className="nav-link">
                  Exercises
                </Link>
              </NavbarItem>

              <NavbarItem className="hover-active-link">
                <Link to="/coding-games" className="nav-link">
                  Coding Games
                </Link>
              </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end" className="mt-3 ">
              {user ? (
                <div className="flex items-center gap-4 ">
                  <Dropdown placement="bottom-start">
                    <DropdownTrigger>
                      <User
                        avatarProps={{
                          isBordered: true,
                          src:
                            avatar ||
                            "https://mighty.tools/mockmind-api/content/human/41.jpg", // Default avatar
                        }}
                        className="transition-transform opacity-1 w-56"
                        name={user?.name || "Guest"}
                        description={user?.email || "Not logged in"}
                      />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="User Actions" variant="flat">
                      <DropdownItem key="profile">
                        Signed in as <b>{user.name}</b>
                        {/* <p>{user.name}</p> */}
                      </DropdownItem>
                      <DropdownItem key="Primary" color="danger">
                        <Link
                          to={{
                            pathname: "/profile/",
                            state: { user },
                          }}
                        >
                          Profile
                        </Link>
                      </DropdownItem>
                      <DropdownItem
                        key="logout"
                        color="danger"
                        onPress={handleLogout}
                      >
                        Logout
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              ) : (
                <div>
                  <div className="flex gap-3 items-center ">
                    <Button
                      color="primary"
                      variant="faded"
                      onPress={() => {
                        changetheme();
                      }}
                    >
                      <Link className="mybuton hover-active-link" to="/signup">
                        Sign up
                      </Link>
                    </Button>
                    <SignInModel setUser={setUser}>Login</SignInModel>
                  </div>
                </div>
              )}
            </NavbarContent>
          </Navbar>
        </div>
      )}

      {shouldHideComponents() && (
        <>
          <div className="mybar !fixed z-40 bg-white">
            <Navbar>
              <NavbarBrand justify="start">
                <div className="lg:hidden">
                  <button onClick={toggleSidebar} className="p-2">
                    {isSidebarOpen ? <HiX size={28} /> : <HiMenu size={28} />}
                  </button>
                </div>
                <div className="hidden lg:block">
                  <Link className="nav-link" to="/">
                    <img className="size-8" src={MainLogo} alt="Logo" />
                  </Link>
                </div>
              </NavbarBrand>

              <NavbarContent justify="center" className="mt-3">
                <div className="lg:hidden block">
                  <Link className="nav-link" to="/">
                    <img className="size-8" src={MainLogo} alt="Logo" />
                  </Link>
                </div>
              </NavbarContent>

              <NavbarContent justify="end" className="mt-3 ">
                {user ? (
                  <div className="flex items-center gap-4 ">
                    <Dropdown placement="bottom-start">
                      <DropdownTrigger>
                        <User
                          avatarProps={{
                            isBordered: true,
                            src:
                              avatar || // Fallback to user.avatar
                              "https://mighty.tools/mockmind-api/content/human/41.jpg", // Default avatar
                          }}
                          className="transition-transform opacity-1 w-56"
                          name={user?.name || "Guest"}
                          description={user?.email || "Not logged in"}
                        />
                      </DropdownTrigger>
                      <DropdownMenu aria-label="User Actions" variant="flat">
                        <DropdownItem key="profile">
                          Signed in as <b>{user.name}</b>
                        </DropdownItem>
                        <DropdownItem key="Primary" color="danger">
                          <Link
                            to={{
                              pathname: "/profile/",
                              state: { user },
                            }}
                          >
                            Profile
                          </Link>
                        </DropdownItem>
                        <DropdownItem
                          key="logout"
                          color="danger"
                          onPress={handleLogout}
                        >
                          Logout
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                ) : (
                  <div>
                    <div className="flex gap-3 items-center ">
                      <Button
                        color="primary"
                        variant="faded"
                        onClick={() => {
                          changetheme();
                        }}
                      >
                        <Link
                          className="mybuton hover-active-link"
                          to="/signup"
                        >
                          Sign up
                        </Link>
                      </Button>
                      <SignInModel setUser={setUser}>Login</SignInModel>
                    </div>
                  </div>
                )}
              </NavbarContent>
            </Navbar>
          </div>

          {/* Sidebar */}
          <aside
            className={`fixed top-[4rem] left-0 w-[15rem] xl:w-[17rem] 2xl:w-[19rem] h-[calc(100vh-4rem)] lg:h-[calc(100vh-3rem)] shadow-[rgba(0,_0,_0,_0.4)_0px_4px_8px] bg-Primary z-30 border-t-4 border-theme transform ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform lg:translate-x-0`}
          >
            <Sidebar setPage={setCurrentPage} currentPage={currentPage} />
          </aside>

          {/* Main Content */}
          <div className="w-full flex items-start justify-end">
            <main className="overflow-y-auto mt-16 w-full lg:w-[calc(100vw-15rem)] xl:w-[calc(100vw-17rem)] 2xl:w-[calc(100vw-19rem)]">
              {renderPage()}
            </main>
          </div>
        </>
      )}
    </>
  );
}

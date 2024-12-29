import React, { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
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
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SmartToyIcon from "@mui/icons-material/SmartToy"; // AI Icon




export default function App() {
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  // Load user data from localStorage on page load
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser)); // Set user data from localStorage
    }
  }, []);



  const handleLogout = async () => {
    try {
      // Make a request to the backend to clear the cookie
      await AxiosInstance.post("/logout");

      // Remove the token and user from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Remove the token and user from cookies
      Cookies.remove("token");
      Cookies.remove("user");

      // Refresh the page to ensure everything is reset
      window.location.reload();

      // Redirect to the login page
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  function changetheme() {
    setLogin(!login);
  }

  return (
    <div className="mybar">
      <Navbar>
        <NavbarBrand justify="start">
          <Link className="nav-link" to="/">
            <img className="size-8" src={MainLogo} alt="Logo" />
          </Link>
        </NavbarBrand>

        <NavbarContent className="hidden sm:flex gap-4 mt-3" justify="center">
          <Button
            style={{
              background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
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
              <SmartToyIcon style={{ fontSize: "1.5rem", marginLeft: "5px" }} />
            </Link>
          </Button>

          <NavbarItem>
            <Link to="/WorkSpace" className="nav-link">
              WorkSpace
            </Link>
          </NavbarItem>



          <NavbarItem>
            <Link to="/quiz" className="nav-link">
              Quiz
            </Link>
          </NavbarItem>
          {/* <NavbarItem>
            <Enrollment className="nav-link">
              Learn Coding
            </Enrollment>
          </NavbarItem> */}


          <Dropdown placement="bottom-start">
            <DropdownTrigger>
              <Button>   Learn Coding  <ArrowDropDownIcon style={{ fontSize: "1.5rem" }} /></Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat">
              <DropdownItem  >
                <Link to="/exercises" className="nav-link">
                  Exercises
                </Link>

              </DropdownItem>
              <DropdownItem  >
                <Link to="/learning" className="nav-link">
                  Learn Coding
                </Link>
              </DropdownItem>
              <DropdownItem  >
                <Link to="/coding-games" className="nav-link">
                  Coding Games
                </Link>

              </DropdownItem>
              {/* <DropdownItem
              >
                <Link to="/quiz" className="nav-link">
                  Quiz
                </Link>
              </DropdownItem> */}
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>


        <NavbarContent justify="end" className="mt-3 ">
          {user ? (
            <div className="flex items-center gap-4 ">
              <Dropdown placement="bottom-start">
                <DropdownTrigger>
                  <User
                    avatarProps={{
                      isBordered: true,
                      src: "https://mighty.tools/mockmind-api/content/human/41.jpg",
                    }}
                    className="transition-transform opacity-1  w-56"
                    name={user.name}
                    description={user.email}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="User Actions" variant="flat">
                  <DropdownItem key="profile" className="h-16 gap-2">
                    <p className="font-bold mt-3">Signed in as </p>
                    <p>{user.name}</p>
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    color="danger"
                    onClick={handleLogout}
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
                  <Link className="mybuton" to="/signup">
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
  );
}









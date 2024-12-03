import React, { useState, useEffect } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { Avatar, User } from "@nextui-org/react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import WebIcon from '@mui/icons-material/Web';
import JavascriptIcon from '@mui/icons-material/Javascript';
import StorageIcon from '@mui/icons-material/Storage';
import Enrollment from "./Models/Enrollment"
import MainLogo from "../MainLogo.png"
import "./DefaultNavbar.css"
import axios from 'axios';

import { Link } from "react-router-dom";
import SignInModel from "./Models/SignInModel";
import fetchUserData from '../Components/Models/fetchUserData';

export default function App({ user, setUser }) {
  const [username, setUsername] = useState('');


  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await axios.get('http://localhost:3005/api/verifyToken', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data.user);
        } catch (err) {
          console.error(err);
        }
      }
    };

    fetchUserData();
  }, [setUser]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const [login, setlogin] = useState(false);

  function changetheme() {
    setlogin(!login)
  }

  return (
    <div className="mybar">

      <Navbar>
        <NavbarBrand justify="start"  >
          <Link className="nav-link" to="/">
            <img className="size-8" src={MainLogo} alt="Logo" />

          </Link>

        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4 mt-3" justify="center">
          {/* <NavbarItem>
            <Dropdown >
              <DropdownTrigger>
                <Button
                  variant="shadow"
                >
                  Courses
                  <KeyboardArrowDownIcon />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Example with disabled actions" disabledKeys={["edit", "copy"]}>


                <DropdownItem key="new" startContent={<WebIcon />} >
                  Web Developmemt
                </DropdownItem>
                <DropdownItem key="edit" startContent={< JavascriptIcon />}  >Backend Courses</DropdownItem>
                <DropdownItem key="copy" startContent={<StorageIcon />} >Learn Java</DropdownItem>
              </DropdownMenu>
            </Dropdown>

          </NavbarItem> */}

          <Button className="bg-white" color="primary" variant="faded" onClick={() => { changetheme() }}>
            <a href="http://localhost:5173">
              <span> Try SavvyAI</span>
            </a>

          </Button>

          <NavbarItem>
            <Link to="/WorkSpace" className="nav-link">
              WorkSpace
            </Link>
          </NavbarItem>

          <NavbarItem>
            <Link to="/exercises" className="nav-link">
              Exercises
            </Link>
          </NavbarItem>

          <NavbarItem>
            <Link to="/colorpicker" className="nav-link">
              Color Picker           </Link>
          </NavbarItem>

          <NavbarItem>

            <Enrollment>Learn Coding</Enrollment>

          </NavbarItem>

        </NavbarContent>
        <NavbarContent justify="end" className="mt-3 ">
          {user ? <div className="flex items-center gap-4 ">
            <Dropdown placement="bottom-start">
              <DropdownTrigger>
                <User
                  // as="button"
                  avatarProps={{
                    isBordered: true,
                    src: "https://mighty.tools/mockmind-api/content/human/41.jpg",
                  }}
                  className="transition-transform opacity-1"
                  name={user.name}
                  description={user.email}
                />

              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem key="profile" className="h-16 gap-2">
                  <p className="font-bold mt-3">Sign in as </p>
                  {user ? <p>{user.name}</p> : <p>Loading...</p>}
                </DropdownItem>
                <DropdownItem key="settings">
                  My Settings
                </DropdownItem>
                <DropdownItem key="team_settings">Team Settings</DropdownItem>
                <DropdownItem key="analytics">
                  Analytics
                </DropdownItem>
                <DropdownItem key="system">System</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem>
                <DropdownItem key="help_and_feedback">
                  Help & Feedback
                </DropdownItem>
                <DropdownItem key="logout" color="danger" onClick={() => { changetheme() }}>
                  <button onClick={handleLogout}>Logout</button>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div> : <div>
            <div className="flex gap-3 items-center ">
              <Button className="" color="primary" variant="faded" onClick={() => { changetheme() }}>
                <Link className="mybuton" to="/signup">
                  Sign up
                </Link>
              </Button>
              <SignInModel setUser={setUser} >Login</SignInModel>
            </div>
          </div>}
        </NavbarContent>
      </Navbar >


    </div>

  );
}

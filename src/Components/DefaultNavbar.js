// import React, { useState, useEffect } from "react";
// import { Navbar, NavbarBrand, NavbarContent, NavbarItem, } from "@nextui-org/react";
// import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
// import { User } from "@nextui-org/react";
// import Enrollment from "./Models/Enrollment"
// import MainLogo from "../MainLogo.png"
// import "./DefaultNavbar.css"
// import axios from 'axios';

// import { Link } from "react-router-dom";
// import SignInModel from "./Models/SignInModel";

// export default function App({ user, setUser }) {


//   useEffect(() => {
//     const fetchUserData = async () => {
//       const token = localStorage.getItem('token');
//       if (token) {
//         try {
//           const res = await axios.get('http://localhost:3003/api/verifyToken', {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           setUser(res.data.user);
//         } catch (err) {
//           console.error(err);
//         }
//       }
//     };

//     fetchUserData();
//   }, [setUser]);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setUser(null);
//   };

//   const [login, setlogin] = useState(false);

//   function changetheme() {
//     setlogin(!login)
//   }

//   return (
//     <div className="mybar">

//       <Navbar>
//         <NavbarBrand justify="start"  >
//           <Link className="nav-link" to="/">
//             <img className="size-8" src={MainLogo} alt="Logo" />

//           </Link>

//         </NavbarBrand>
//         <NavbarContent className="hidden sm:flex gap-4 mt-3" justify="center">
//           {/* <NavbarItem>
//             <Dropdown >
//               <DropdownTrigger>
//                 <Button
//                   variant="shadow"
//                 >
//                   Courses
//                   <KeyboardArrowDownIcon />
//                 </Button>
//               </DropdownTrigger>
//               <DropdownMenu aria-label="Example with disabled actions" disabledKeys={["edit", "copy"]}>


//                 <DropdownItem key="new" startContent={<WebIcon />} >
//                   Web Developmemt
//                 </DropdownItem>
//                 <DropdownItem key="edit" startContent={< JavascriptIcon />}  >Backend Courses</DropdownItem>
//                 <DropdownItem key="copy" startContent={<StorageIcon />} >Learn Java</DropdownItem>
//               </DropdownMenu>
//             </Dropdown>

//           </NavbarItem> */}

//           <Button className="bg-white" color="primary" variant="faded" onClick={() => { changetheme() }}>
//             <a href="http://localhost:5173">
//               <span> Try SavvyAI</span>
//             </a>

//           </Button>

//           <NavbarItem>
//             <Link to="/WorkSpace" className="nav-link">
//               WorkSpace
//             </Link>
//           </NavbarItem>

//           <NavbarItem>
//             <Link to="/exercises" className="nav-link">
//               Exercises
//             </Link>
//           </NavbarItem>

//           <NavbarItem>
//             <Link to="/colorpicker" className="nav-link">
//               Color Picker           </Link>
//           </NavbarItem>

//           <NavbarItem>

//             <Enrollment>Learn Coding</Enrollment>

//           </NavbarItem>

//         </NavbarContent>
//         <NavbarContent justify="end" className="mt-3 ">
//           {user ? <div className="flex items-center gap-4 ">
//             <Dropdown placement="bottom-start">
//               <DropdownTrigger>
//                 <User
//                   // as="button"
//                   avatarProps={{
//                     isBordered: true,
//                     src: "https://mighty.tools/mockmind-api/content/human/41.jpg",
//                   }}
//                   className="transition-transform opacity-1"
//                   name={user.name}
//                   description={user.email}
//                 />

//               </DropdownTrigger>
//               <DropdownMenu aria-label="User Actions" variant="flat">
//                 <DropdownItem key="profile" className="h-16 gap-2">
//                   <p className="font-bold mt-3">Sign in as </p>
//                   {user ? <p>{user.name}</p> : <p>Loading...</p>}
//                 </DropdownItem>
//                 <DropdownItem key="settings">
//                   My Settings
//                 </DropdownItem>
//                 <DropdownItem key="team_settings">Team Settings</DropdownItem>
//                 <DropdownItem key="analytics">
//                   Analytics
//                 </DropdownItem>
//                 <DropdownItem key="system">System</DropdownItem>
//                 <DropdownItem key="configurations">Configurations</DropdownItem>
//                 <DropdownItem key="help_and_feedback">
//                   Help & Feedback
//                 </DropdownItem>
//                 <DropdownItem key="logout" color="danger" onClick={() => { changetheme() }}>
//                   <button onClick={handleLogout}>Logout</button>
//                 </DropdownItem>
//               </DropdownMenu>
//             </Dropdown>
//           </div> : <div>
//             <div className="flex gap-3 items-center ">
//               <Button className="" color="primary" variant="faded" onClick={() => { changetheme() }}>
//                 <Link className="mybuton" to="/signup">
//                   Sign up
//                 </Link>
//               </Button>
//               <SignInModel setUser={setUser} >Login</SignInModel>
//             </div>
//           </div>}
//         </NavbarContent>
//       </Navbar >


//     </div>

//   );
// }

import React, { useState, useEffect } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { User } from "@nextui-org/react";
import Enrollment from "./Models/Enrollment";
import MainLogo from "../MainLogo.png";
import "./DefaultNavbar.css";
import { Link } from "react-router-dom";
import SignInModel from "./Models/SignInModel";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import AxiosInstance from "../Auth/axiosInstance";
import SmartToyIcon from "@mui/icons-material/SmartToy"; // AI Icon

export default function App() {
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  // Load user data from localStorage on page load
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));  // Set user data from localStorage
    }
  }, []);

  const handleLogout = async () => {
    try {
      // Make a request to the backend to clear the cookie
      await AxiosInstance.post('/logout');

      // Remove the token and user from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // Remove the token and user from cookies
      Cookies.remove('token');
      Cookies.remove('user');

      // Refresh the page to ensure everything is reset
      window.location.reload();

      // Redirect to the login page
      navigate('/');
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
          {/* <Button className="bg-white" color="primary" variant="faded" onClick={() => { changetheme() }}>
            <Link to="/savvyai" className="nav-link">
              <span> Try SavvyAI</span>
            </Link>
          </Button> */}
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
              style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center" }}
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
            <Link to="/exercises" className="nav-link">
              Exercises
            </Link>
          </NavbarItem>

          <NavbarItem>
            <Link to="/colorpicker" className="nav-link">
              Color Picker
            </Link>
          </NavbarItem>

          <NavbarItem>
            <Enrollment>Learn Coding</Enrollment>
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
                  <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          ) : (
            <div>
              <div className="flex gap-3 items-center ">
                <Button color="primary" variant="faded" onClick={() => { changetheme() }}>
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

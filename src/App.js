import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Home from "./Components/Home";
import GetCertified from "./Components/GetCertified";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import DefaultNavbar from "./Components/DefaultNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { MantineProvider } from '@mantine/core';
import { useState, useEffect } from "react";
import Cards from "./Components/Cards"
// import PrivateRoute from "./Components/Private/PrivateRoute"
import ColorPicker from './Components/colorpicker/page'
import Learning from './Components/learning/page'
import Exercises from './Components/exercises/page'
import Workspace from './Components/workspace/page'
import Footer from './Components/Footer';
import QueryDash from './Components/SavvyAI/QueryDash';
import Loginpage from "./Components/SavvyAI/loginpage/Login"

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (token && storedUser) {
        try {
          const res = await axios.get('http://localhost:5001/api/auth/verifyToken', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          setUser(res.data.user);
        } catch (err) {
          console.error('Token verification failed', err);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
        }
      }
    };
    verifyToken();
  }, []);

  return (
    <>



      <Router>
        <DefaultNavbar setUser={setUser} user={user} />
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/getCertified" element={<GetCertified />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/learn-coding" element={< Cards />} />
          <Route path="/colorpicker" element={< ColorPicker />} />
          <Route path="/exercises" element={< Exercises />} />
          <Route path="/workspace" element={<Workspace />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/login-ai" element={<Loginpage />} />
          <Route path="/savvy-ai" element={<QueryDash />} />










          {/* 
        <Route
          path="/workspace"
          element={
            <PrivateRoute user={user}>
              <Workspace/>
            </PrivateRoute>
          }
        /> */}



          < Route
            path="/learning"
            element={
              <MantineProvider>
                <Learning />
              </MantineProvider>
            }
          />
        </Routes>
      </Router>
    </>

  );
}

export default App;

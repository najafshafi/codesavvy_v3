
// import { AuthProvider } from "./Auth/AuthContext"; // Import AuthProvider
// import "./App.css";
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import axios from 'axios';
// import Home from "./Components/Home";
// import GetCertified from "./Components/GetCertified";
// import QueryDash from "./Components/SavvyAI/QueryDash";
// import SignUp from "./Components/SignUp";
// import Login from "./Components/Login";
// import DefaultNavbar from "./Components/DefaultNavbar";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { MantineProvider } from '@mantine/core';
// import { useState, useEffect } from "react";
// import Cards from "./Components/Cards";
// import ColorPicker from './Components/colorpicker/page';
// import Learning from './Components/learning/page';
// import Exercises from './Components/exercises/page';
// import Workspace from './Components/workspace/page';
// import Footer from './Components/Footer';
// import Loginpage from "./Components/SavvyAI/loginpage/Login";
// import DashboardPage from "./Components/SavvyAI/dashboardPage/DashboardPage";
// import ChatPage from "./Components/SavvyAI/chatPage/ChatPage";
// import DashboardLayout from "./Components/SavvyAI/dashboardLayout/DashboardLayout";

// // React Query setup
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// const queryClient = new QueryClient();

// function App() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const verifyToken = async () => {
//       const token = localStorage.getItem('token');
//       const storedUser = JSON.parse(localStorage.getItem('user'));
//       if (token && storedUser) {
//         try {
//           const res = await axios.get('http://localhost:3003/api/verifyToken', {
//             headers: { 'Authorization': `Bearer ${token}` }
//           });
//           setUser(res.data.user);
//         } catch (err) {
//           console.error('Token verification failed', err);
//           localStorage.removeItem('token');
//           localStorage.removeItem('user');
//           setUser(null);
//         }
//       }
//     };
//     verifyToken();
//   }, []);

//   return (
//     <AuthProvider>
//       <QueryClientProvider client={queryClient}>
//         <Router>
//           <DefaultNavbar setUser={setUser} user={user} />
//           <Routes>
//             {/* CodeSavvy Routes */}
//             <Route path="/" element={<Home user={user} />} />
//             <Route path="/savvyai" element={<QueryDash />} />
//             <Route path="/getCertified" element={<GetCertified />} />
//             <Route path="/signUp" element={<SignUp />} />
//             <Route path="/login" element={<Login setUser={setUser} />} />
//             <Route path="/learn-coding" element={<Cards />} />
//             <Route path="/colorpicker" element={<ColorPicker />} />
//             <Route path="/exercises" element={<Exercises />} />
//             <Route path="/workspace" element={<Workspace />} />
//             <Route path="/footer" element={<Footer />} />
//             <Route path="/login-ai" element={<Loginpage />} />
//             {/* <Route path="/dashboard" element={<DashboardPage />} />
//             <Route path="/dashboard/chats/:id" element={<ChatPage />} /> */}
//             {/* Savvy AI Routes */}

//             <Route element={<DashboardLayout />}>
//               <Route path="/dashboard" element={<DashboardPage />} />
//               <Route path="/dashboard/chats/:id" element={<ChatPage />} />
//             </Route>

//             {/* Mantine-Specific Route */}
//             <Route
//               path="/learning"
//               element={
//                 <MantineProvider>
//                   <Learning />
//                 </MantineProvider>
//               }
//             />
//           </Routes>
//         </Router>
//       </QueryClientProvider>
//     </AuthProvider>
//   );
// }

// export default App;

import { AuthProvider } from "./Auth/AuthContext";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Home from "./Components/Home";
import GetCertified from "./Components/GetCertified";
import QueryDash from "./Components/SavvyAI/QueryDash";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import DefaultNavbar from "./Components/DefaultNavbar";
import CodeGames from "./Components/codegames/page"
import "bootstrap/dist/css/bootstrap.min.css";
import { MantineProvider } from '@mantine/core';
import { useState, useEffect } from "react";
import Cards from "./Components/Cards";
import ColorPicker from './Components/colorpicker/page';
import Learning from './Components/learning/page';
import Exercises from './Components/exercises/page';
import Workspace from './Components/workspace/page';
import Footer from './Components/Footer';
import Loginpage from "./Components/SavvyAI/loginpage/Login";
import DashboardPage from "./Components/SavvyAI/dashboardPage/DashboardPage";
import ChatPage from "./Components/SavvyAI/chatPage/ChatPage";
import DashboardLayout from "./Components/SavvyAI/dashboardLayout/DashboardLayout";
import QuizList from "./Components/QuizGame/QuizList";
// PrivateRoute component import
import PrivateRoute from '../src/Auth/PrivateRoute';

// React Query setup
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import CardQuiz from "./Components/QuizGame/CardQuiz";
// import QuizAllData from "./Components/QuizGame/QuizAllData";

import QuizDashboard from "./Components/QuizGame/QuizDashboard/QuizDashboard";

const queryClient = new QueryClient();

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (token && storedUser) {
        try {
          const res = await axios.get('http://localhost:3003/api/verifyToken', {
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
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <DefaultNavbar setUser={setUser} user={user} />
          <Routes>
            {/* CodeSavvy Routes */}
            <Route path="/" element={<Home user={user} />} />
            <Route path="/savvyai" element={<PrivateRoute element={<QueryDash />} user={user} />} />
            <Route path="/getCertified" element={<GetCertified />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/learn-coding" element={<Cards />} />
            <Route path="/colorpicker" element={<ColorPicker />} />
            <Route path="/coding-games" element={<CodeGames/>} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/workspace" element={<PrivateRoute element={<Workspace />} user={user} />} />
            <Route path="/footer" element={<Footer />} />
            <Route path="/login-ai" element={<Loginpage />} />
            {/* <Route path="/quiz" element={<QuizList />} /> */}
            <Route path="/quiz" element={<QuizList />} />
            {/* <Route path="/quiz/:id" element={<PrivateRoute element={<CardQuiz />} user={user} />} /> */}
            <Route path="/quiz/:id" element={<PrivateRoute element={<QuizDashboard />} user={user} />} />


            {/* Savvy AI Routes */}
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/dashboard/chats/:id" element={<ChatPage />} />
            </Route>

            {/* Mantine-Specific Route */}
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
  );
}

export default App;

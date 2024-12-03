// import { Outlet } from "react-router-dom";
import "./dashboardLayout.css";
import ChatList from "../chatList/ChatList";
import DashboardPage from "../dashboardPage/DashboardPage";
const DashboardLayout = () => {
  return (
    <div className="dashboardLayout">
      <div className="menu">
        <ChatList />
      </div>
      <div className="content">
        {/* <Outlet /> */}
        <DashboardPage />
      </div>
    </div>
  );
};

export default DashboardLayout;

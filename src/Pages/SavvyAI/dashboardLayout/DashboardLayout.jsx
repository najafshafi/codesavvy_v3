import { Outlet } from "react-router-dom";
import "./dashboardLayout.css";
import ChatList from "../chatList/ChatList";

const DashboardLayout = () => {
  return (
    <div className="dashboardLayouts">
      <div className="menu">
        <ChatList />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;

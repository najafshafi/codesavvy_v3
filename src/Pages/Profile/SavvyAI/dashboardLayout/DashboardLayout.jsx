import { Outlet } from "react-router-dom";
import "./dashboardLayout.css";
import ChatList from "../chatList/ChatList";

const DashboardLayout = () => {
  // const { user, loading } = useContext(AuthContext);
  // const navigate = useNavigate();

  // // Redirect to login if not authenticated
  // useEffect(() => {
  //   if (!loading && !user) {
  //     navigate("/login");
  //   }
  // }, [user, loading, navigate]);

  // if (loading) return <div>Loading...</div>;

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

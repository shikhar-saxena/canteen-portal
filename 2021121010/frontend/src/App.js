import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import UsersList from "./components/users/UsersList";
import Home from "./components/common/Home";
import Register from "./components/common/Register";
import Navbar from "./components/templates/Navbar";
import BuyerNavbar from "./components/users/buyer/Navbar";
import VendorNavbar from "./components/users/vendor/Navbar";
import Profile from "./components/users/Profile";
import Login from "./components/common/Login";
import VendorDashboard from "./components/users/vendor/Dashboard";
import BuyerDashboard from "./components/users/buyer/Dashboard";

const Layout = ({ value }) => {
  return (
    <div>
      {(() => {
        if (value === 1)
          return (
            <>
              <Navbar />
            </>
          );
        else if (value === 2)
          return (
            <>
              <BuyerNavbar />
            </>
          );
        else
          return (
            <>
              <VendorNavbar />
            </>
          );
      })()}
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout value={1} />}>
          <Route path="/" element={<Home />} />
          <Route path="users" element={<UsersList />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="/buyer" element={<Layout value={2} />}>
          <Route path="/buyer" element={<BuyerDashboard />} />
          {/*<Route path="users" element={<UsersList />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} /> */}
        </Route>
        {/* 
        <Button color="inherit" onClick={() => navigate("/buyer")}>
          Dashboard
        </Button>
        <Button color="inherit" onClick={() => navigate("/buyer/profile")}>
          Profile
        </Button>
        <Button color="inherit" onClick={() => navigate("/buyer/orders")}>
          My Orders
        </Button> */}

        <Route path="/vendor" element={<Layout value={3} />}>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/vendor" element={<VendorDashboard />} />
          {/*<Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} /> */}
        </Route>
        {/* 
        <Button color="inherit" onClick={() => navigate("/vendor")}>
          Dashboard
        </Button>
        <Button color="inherit" onClick={() => navigate("/vendor/profile")}>
          Profile
        </Button>
        <Button color="inherit" onClick={() => navigate("/vendor/orders")}>
          Orders
        </Button>
        <Button color="inherit" onClick={() => navigate("/vendor/statistics")}>
          Statistics
        </Button> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

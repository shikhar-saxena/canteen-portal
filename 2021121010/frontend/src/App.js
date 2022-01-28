import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import Register from "./components/common/Register";
import Navbar from "./components/templates/Navbar";
import BuyerNavbar from "./components/users/buyer/Navbar";
import VendorNavbar from "./components/users/vendor/Navbar";
import Profile from "./components/users/Profile";
import Login from "./components/common/Login";
import VendorDashboard from "./components/users/vendor/Dashboard";
import BuyerDashboard from "./components/users/buyer/Dashboard";
import Bla from "./components/users/vendor/bla";
import Statistics from "./components/users/vendor/Statistics";
import AddItem from "./components/users/vendor/AddItem";
import TableDemo from "./components/TableDemo";
import UsersList from "./components/users/UsersList";

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
          <Route path="/" element={<Register />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="bla" element={<TableDemo />} />
          {/* TODO: */}
          <Route path="users" element={<UsersList />} />
        </Route>

        <Route path="/buyer" element={<Layout value={2} />}>
          <Route path="/buyer" element={<BuyerDashboard />} />
          <Route path="/buyer/profile" element={<Profile choice={"buyer"} />} />
          {/* /profile and /orders */}
        </Route>
        <Route path="/vendor" element={<Layout value={3} />}>
          <Route path="/vendor" element={<AddItem />} />
          <Route path="/vendor/statistics" element={<Statistics />} />
          <Route path="/vendor/bla" element={<Bla />} />
          <Route
            path="/vendor/Profile"
            element={<Profile choice={"vendor"} />}
          />
          {/* TODO: */}
          {/* /profile /orders /statistics */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

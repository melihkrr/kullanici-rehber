import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./assets/companents/Navbar";
import Home from "./assets/companents/Home";
import CreateUser from "./assets/companents/CreateUser";
import ViewUser from "./assets/companents/ViewUser";
import EditUser from "./assets/companents/EditUser";
import Groups from "./assets/companents/Groups";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path={"/"} element={<Navigate to={"/users/list"} />} />
        <Route path={"/users/list"} element={<Home />} />
        <Route path={"/users/create"} element={<CreateUser />} />
        <Route path={"/users/groups"} element={<Groups />} />
        <Route path={"/users/view/:userId"} element={<ViewUser />} />
        <Route path={"/users/edit/:userId"} element={<EditUser />} />
      </Routes>
    </>
  );
}

export default App;

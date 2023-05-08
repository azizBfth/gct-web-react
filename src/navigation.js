import { Routes, Route } from "react-router-dom";

import App from "./App";
import LoginPage from "./login/LoginPage";
import AccidentsPage from "./pages/AccidentsPage";
import AccidentPage from "./pages/AccidentPage";

import UsersPage from "./pages/UsersPage";
import UserPage from "./pages/UserPage";

import PageNotFound from "./pages/PageNotFound";
import Simulation from "./pages/simulation/simulation";

const Navigation = () => {
  return (
    <Routes>
      <Route path="*" element={<PageNotFound />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="gct">
        <Route path="simulation" element={<Simulation />} />

          </Route>
      <Route path="/" element={<App />}>
        <Route index element={<AccidentsPage />} />
       
        <Route path="settings">
          <Route path="accidents" element={<AccidentsPage />} />
          <Route path="accident/:id" element={<AccidentPage />} />
          <Route path="accident" element={<AccidentPage />} />

          <Route path="users" element={<UsersPage />} />
          <Route path="user/:id" element={<UserPage />} />
          <Route path="user" element={<UserPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Navigation;

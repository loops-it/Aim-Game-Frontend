import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";


import { MainContextProvider } from "./context/MainContext";

//Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import LoginWorkspace from "./pages/LoginWorkspace";
import LoginWorkspaceSelect from "./pages/LoginWorkspaceSelect";

import PasswordResetSend from "./pages/PasswordReset/PasswordResetSend";
import PasswordResetVerify from "./pages/PasswordReset/PasswordResetVerify";
import PasswordReset from "./pages/PasswordReset/PasswordReset";

import CreateWorkspacePersonal from "./pages/CreateWorkspace/CreateWorkspacePersonal";
import CreateWorkspaceOrganization from "./pages/CreateWorkspace/CreateWorkspaceOrganization";
import CreateWorkspaceInvite from "./pages/CreateWorkspace/CreateWorkspaceInvite";
import Dashboard from "./pages/Dashboard";
import Opportunities from "./pages/Opportunities";
import Clients from "./pages/Clients";
import Partners from "./pages/Partners";
import Events from "./pages/Events";
import Tasks from "./pages/Tasks";
import Workspaces from "./pages/Workspaces";
import Teams from "./pages/Teams";
import ClientOpportunities from "./pages/ClientOpportunities";
import Presales from "./pages/Presales";

export default function App() {
  const [isRemember, setIsRemember] = useState(false);

  useEffect(() => {
    const remembered = localStorage.getItem("remember");
    const loggedIn = localStorage.getItem("userID");
    if (remembered === "true" && loggedIn != false) {
      setIsRemember(true);
    }
  }, []);
  return (
    <MainContextProvider>
      <BrowserRouter>
        <Routes >
        <Route path="/" element={isRemember ? <Navigate to="/dashboard" /> : <Login title={"Aimgame | Login"} />} />
          <Route path="/register" element={<Register title={"Aimgame | Register"} />} />
          <Route path="/login/workspace" element={<LoginWorkspace title={"Aimgame | Login Workspace"} />} />
          <Route path="/login/workspace-select" element={<LoginWorkspaceSelect title={"Aimgame | Select Workspace"} />} />

          <Route path="/password-reset/send" element={<PasswordResetSend title={"Aimgame | Password Forgot"} />} />
          <Route path="/password-reset/verify" element={<PasswordResetVerify title={"Aimgame | Password Forgot Verify"} />} />
          <Route path="/password-reset" element={<PasswordReset title={"Aimgame | Password Reset"} />} />

          <Route path="/register-workspace/personal" element={<CreateWorkspacePersonal title={"Aimgame | Workspace Personal"} />} />
          <Route path="/register-workspace/organization" element={<CreateWorkspaceOrganization title={"Aimgame | Workspace Organization"} />} />
          <Route path="/register-workspace/invite" element={<CreateWorkspaceInvite title={"Aimgame | Workspace Invite"} />} />

          <Route path="/dashboard" element={<Dashboard title={"Aimgame | Dashboard"} />} />
          <Route path="/opportunities" element={<Opportunities title={"Aimgame | Opportunities"} />} />
          <Route path="/clients" element={<Clients title={"Aimgame | Clients"} />} />
          <Route path="/client/:clientId" element={<ClientOpportunities title={"Aimgame | Client Opportunities"} />} />
          <Route path="/partners" element={<Partners title={"Aimgame | Partners"} />} />

          <Route path="/events" element={<Events title={"Aimgame | Events"} />} />

          <Route path="/tasks" element={<Tasks title={"Aimgame"} />} />
          <Route path="/teams" element={<Teams title={"Aimgame | Teams"} />} />
          <Route path="/workspaces" element={<Workspaces title={"Aimgame | Workspaces"} />} />
          <Route path="/presales" element={<Presales title={"Aimgame | Presales"} />} />
        </Routes>
      </BrowserRouter>
    </MainContextProvider>
  )
}

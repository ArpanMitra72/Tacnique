import React from "react";
import "./App.css";
import UsersList from "./components/Users/UsersList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const UsersPage = () => {
  return <UsersList />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </Router>
  );
}

export default App;

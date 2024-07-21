import { useState, useEffect} from "react";
import { Route, Routes, Navigate  } from "react-router-dom";
import contentService from "./services/contentService"
import "./App.css";

import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import CreateForm from "./components/CreateForm/CreateForm";

function App() {
  const [content, setContent] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await contentService.getAll()
      setContent(data);
    }
    fetchData();
  }, [])

  return (
    <div>
      <Nav isAuthenticated={isAuthenticated}/>
      <Routes>
        <Route path="/" element={<Home content={content} /> } />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/dashboard" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/create" element={<CreateForm/> } />
      </Routes>

    </div>
  );
}

function ProtectedRoute({ isAuthenticated, children }) {
  return isAuthenticated ? children : <Navigate to="/dashboard" />;
}

export default App;

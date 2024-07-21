import { useState, useEffect } from "react";

const Dashboard = () => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      setEmail(userEmail);
    }
  }, []);

  return (
    <div>
      <h1>Welcome to your Dashboard</h1>
      {email && <p>Logged in as: {email}</p>}
    </div>
  );
};

export default Dashboard;
import React from "react";
import { useAuth } from "react-oidc-context";

function Dashboard() {
  const auth = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Dashboard</h1>
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-600 text-center mb-4">
          Welcome to your personal dashboard,{" "}
          {auth.user?.profile.name || auth.user?.profile.email}!
        </p>
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-bold mb-2">Your Profile</h2>
          <p>
            <strong>Email:</strong> {auth.user?.profile.email}
          </p>
          {auth.user?.profile.name && (
            <p>
              <strong>Name:</strong> {auth.user.profile.name}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

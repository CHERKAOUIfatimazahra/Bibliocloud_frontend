import React from "react";
import { useAuth } from "react-oidc-context";

function ProfilePage() {
  const auth = useAuth();

  return (
    <div>
      <h2>User Profile</h2>
      <pre>Hello: {auth.user?.profile.email}</pre>
      <pre>ID Token: {auth.user?.id_token}</pre>
      <pre>Access Token: {auth.user?.access_token}</pre>
      <pre>Refresh Token: {auth.user?.refresh_token}</pre>
    </div>
  );
}

export default ProfilePage;

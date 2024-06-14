import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const navigate = useNavigate();

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      audience="this is layout index identifier"
    >
      <Auth0DefaultPermissions>{children}</Auth0DefaultPermissions>
    </Auth0Provider>
  );
};

const Auth0DefaultPermissions = ({ children }) => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      const setDefaultPermissions = async () => {
        const token = await getAccessTokenSilently();
        const userPermissions = user["permissions"] || [];
        console.log(userPermissions);

        const defaultPermissions = ["admin"];
        const permissionsToAdd = defaultPermissions.filter(
          (permission) => !userPermissions.includes(permission)
        );

        if (permissionsToAdd.length > 0) {
          // Assuming you have an endpoint to update user permissions
          await fetch("/api/set-permissions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ permissions: permissionsToAdd }),
          });
        }
      };

      setDefaultPermissions();
    }
  }, [isAuthenticated, getAccessTokenSilently, user]);

  return <>{children}</>;
};

export default Auth0ProviderWithHistory;

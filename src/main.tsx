import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { BrowserRouter } from "react-router-dom";
import { PianoApp } from "./PianoApp.tsx";
import { Auth0Provider } from "@auth0/auth0-react";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <BrowserRouter>
        <PianoApp />
      </BrowserRouter>
    </Auth0Provider>
  // </StrictMode>
);

//createRoot(document.getElementById("root")!).render(<WorkSpace />);

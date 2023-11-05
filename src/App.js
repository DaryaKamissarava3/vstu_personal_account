import React from 'react';
import {AppRoutes} from "./routes/AppRoutes";
import {useSelector} from "react-redux";

function App() {
  const auth = useSelector((state) => state.auth);

  return (
    <AppRoutes isAuthenticated={auth.userToken} roles={auth.roles}/>
  );
}

export default App;

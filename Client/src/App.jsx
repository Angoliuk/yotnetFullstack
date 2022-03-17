import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import "./Constants/colors.css";
import RoutesList from "./Pages/Routes";
import { autoLogin } from "./ReduxStorage/actions/userActions";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => dispatch(autoLogin()));

  return <RoutesList />;
};

export default App;

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.scss";
import "./Constants/colors.scss";
import RoutesList from "./Pages/Routes";
import { autoLogin } from "./ReduxStorage/actions/userActions";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => dispatch(autoLogin()));

  return <RoutesList />;
};

export default App;

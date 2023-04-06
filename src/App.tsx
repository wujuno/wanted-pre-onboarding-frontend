import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./Signup";
import SignIn from "./Signin";
import Home from "./Home";

function App() {
  const isLogin = true;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

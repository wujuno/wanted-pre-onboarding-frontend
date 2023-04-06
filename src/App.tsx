import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./Signup";
import SignIn from "./Signin";
import Todo from "./Todo";
import { useState } from "react";

function App() {
  const [isLogin, setIsLogin] = useState<boolean>(
    Boolean(localStorage.getItem("access_token"))
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isLogin ? (
              <Navigate replace to={"/todo"} />
            ) : (
              <SignIn setIsLogin={setIsLogin} />
            )
          }
        />

        <Route
          path="/signin"
          element={
            isLogin ? (
              <Navigate replace to={"/todo"} />
            ) : (
              <SignIn setIsLogin={setIsLogin} />
            )
          }
        />

        <Route
          path="/signup"
          element={isLogin ? <Navigate replace to={"/todo"} /> : <SignUp />}
        />

        <Route
          path="/todo"
          element={isLogin ? <Todo /> : <Navigate replace to={"/signin"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

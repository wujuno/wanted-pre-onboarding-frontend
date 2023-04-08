import { Box, Button, Container, Typography } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert, AlertTitle } from "@mui/material";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [emailError, setEmailError] = useState(true);
  const [pwdError, setPwdError] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [isFail, setIsFail] = useState<boolean>();

  const navigate = useNavigate();

  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowAlert(false);
    setIsFail(false);
    const e = event.currentTarget.value;
    if (e.includes("@")) {
      setEmail(e);
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };
  const pwdChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowAlert(false);
    setIsFail(false);
    const p = event.currentTarget.value;
    if (p.length >= 8) {
      setPwd(p);
      setPwdError(false);
    } else {
      setPwdError(true);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await axios
      .post(
        "https://www.pre-onboarding-selection-task.shop/auth/signup",
        {
          email,
          password: pwd,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status === 201) {
          setShowAlert(true);
          setIsFail(false);
          setTimeout(
            () =>
              navigate("/signin", {
                state: {
                  email,
                  pwd,
                },
              }),
            2500
          );
        }
      })
      .catch((err) => {
        setIsFail(true);
        setShowAlert(true);
        console.log(err);
      });
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 4, width: "100%" }}
        >
          <input
            required
            style={{ width: "100%", padding: "1em", fontSize: "18px" }}
            placeholder="Email"
            data-testid="email-input"
            id="email"
            name="email"
            type="email"
            onChange={emailChangeHandler}
          />
          <input
            style={{
              width: "100%",
              padding: "1em",
              fontSize: "18px",
              marginTop: "1em",
            }}
            placeholder="Password"
            required
            data-testid="password-input"
            name="password"
            type="password"
            id="password"
            onChange={pwdChangeHandler}
          />
          <Button
            data-testid="signup-button"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!emailError && !pwdError ? false : true}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
      {showAlert && (
        <Alert
          severity={isFail ? "error" : "success"}
          onClose={() => setShowAlert(false)}
        >
          <AlertTitle>{isFail ? "가입 실패!" : "가입 성공!"}</AlertTitle>
          {isFail ? "중복된 비밀번호 입니다." : "로그인 페이지로 이동합니다."}
        </Alert>
      )}
    </Container>
  );
};

export default SignUp;

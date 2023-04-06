import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface ILocationState {
  email: string;
  pwd: string;
}

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [emailError, setEmailError] = useState(true);
  const [pwdError, setPwdError] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [isFail, setIsFail] = useState<boolean>();
  const [failM, setFailM] = useState("");

  const navigate = useNavigate();

  const location = useLocation();
  const locationState: ILocationState | null = location.state;

  //locationState가 존재하면 submit 버튼 활성화
  useEffect(() => {
    locationState && setEmailError(false);
    locationState && setPwdError(false);
  }, []);

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
        "https://www.pre-onboarding-selection-task.shop/auth/signin",
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
        if (res.status === 200) {
          setShowAlert(true);
          setIsFail(false);
          localStorage.setItem("access_token", res.data.access_token);
          navigate("/todo");
        }
      })
      .catch((err) => {
        setIsFail(true);
        setShowAlert(true);
        setFailM(err.response.data.message);
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
          Sign In
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 4, width: "100%" }}
        >
          <TextField
            required
            fullWidth
            data-testid="email-input"
            id="email"
            label="Email Address"
            name="email"
            type="email"
            defaultValue={locationState ? locationState.email : ""}
            onChange={emailChangeHandler}
          />
          <TextField
            sx={{ mt: 2 }}
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            defaultValue={locationState ? locationState.pwd : ""}
            onChange={pwdChangeHandler}
          />
          <Button
            data-testid="signin-button"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!emailError && !pwdError ? false : true}
          >
            Sign In
          </Button>
        </Box>
      </Box>
      {showAlert && isFail && (
        <Alert severity="error" onClose={() => setShowAlert(false)}>
          <AlertTitle> 로그인 실패!</AlertTitle>
          {failM}
          {failM.includes("해") ? (
            <Link to={"/signup"}>가입하러 가기</Link>
          ) : (
            "  이메일이나 비밀번호가 틀렸습니다."
          )}
        </Alert>
      )}
    </Container>
  );
};

export default SignIn;

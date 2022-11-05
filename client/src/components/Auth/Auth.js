import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container
} from "@material-ui/core";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./style";
import Input from "./Input";
import Icon from "./Icon";
import { AUTH } from "../../constants/actionTypes";
import { signup, signin } from "../../actions/auth";

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPasword: '' };

const Auth = () => {

  const classes = useStyles();
  const [showPasword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const [formData, setFormData] = useState(initialState);

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(isSignUp) {
      dispatch(signup(formData, history));
    }
    else {
      dispatch(signin(formData, history));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setIsSignUp((prevSignUp) => !prevSignUp);
  };

  const googleSuccess = async (resposnse) => {
    const result = resposnse?.profileObj;
    const token = resposnse?.tokenId;
    try {
      dispatch({ type: AUTH, data: { result, token } });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In was unsuccessful. Try Again Later");
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPasword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <>
                <Input
                  name="confirmPasword"
                  label="Repeat Password"
                  handleChange={handleChange}
                  type="password"
                  handleShowPassword={handleShowPassword}
                />
              </>
            )}
          </Grid>
          <Button
            type="Submit"
            fullWidth
            variant="contained"
            color="primary" 
            className={classes.submit}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="<CLIENT_ID>"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                startIcon={<Icon />}
                variant="contained"
              >Google Sign In</Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? "Already have an Account?  Sign In"
                  : "Don't have an Account? Signup"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;

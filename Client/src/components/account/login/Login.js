import React, { useEffect, useMemo, useState } from "react";
import { Redirect, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { Form } from "reactstrap";
import { css } from "@emotion/css";
import BounceLoader from "react-spinners/BounceLoader";
import Modal from "react-modal";
import loginQuery from "../../../graphql/queries/loginQuery";
import getClientsQuery from "../../../graphql/queries/getClientsQuery";
import LoginEmail from "./LoginEmail/LoginEmail";
import LoginPassword from "./LoginPassword/LoginPassword";
import ACTION_LOGIN_IS_NOT_ACTIVE from "../../../actions/Login/ACTION_LOGIN_IS_NOT_ACTIVE";
import ACTION_LOGIN_IS_ACTIVE from "../../../actions/Login/ACTION_LOGIN_IS_ACTIVE";
import ACTION_LOGIN_EMAIL_INVALID from "../../../actions/Login/LoginEmail/Invalid/ACTION_LOGIN_EMAIL_INVALID";
import ACTION_LOGIN_PASSWORD_INVALID from "../../../actions/Login/LoginPassword/Invalid/ACTION_LOGIN_PASSWORD_INVALID";
import ACTION_LOGIN_EMAIL_NOT_INVALID from "../../../actions/Login/LoginEmail/Invalid/ACTION_LOGIN_EMAIL_NOT_INVALID";
import ACTION_REGISTERED_CLIENT_FOUND from "../../../actions/Login/RegisteredClientFound/ACTION_REGISTERED_CLIENT_FOUND";
import ACTION_REGISTERED_CLIENT_FOUND_RESET from "../../../actions/Login/RegisteredClientFound/ACTION_REGISTERED_CLIENT_FOUND_RESET";
import ACTION_LOGIN_PASSWORD_NOT_INVALID from "../../../actions/Login/LoginPassword/Invalid/ACTION_LOGIN_PASSWORD_NOT_INVALID";
import ACTION_SPLASH_SCREEN_COMPLETE from "../../../actions/SplashScreenComplete/ACTION_SPLASH_SCREEN_COMPLETE";
import ACTION_SPLASH_SCREEN_HALFWAY from "../../../actions/SplashScreenHalfway/ACTION_SPLASH_SCREEN_HALFWAY";
import "./Login.css";

const Login = (props) => {
  let location = useLocation();
  const dispatch = useDispatch();
  const splashScreenHalfway = useSelector(
    (state) => state.splashScreenHalfway.splashScreenHalfway
  );
  const splashScreenComplete = useSelector(
    (state) => state.splashScreenComplete.splashScreenComplete
  );
  const loginEmail = useSelector((state) => state.loginEmail.login_email);
  const loginEmailInvalid = useSelector(
    (state) => state.loginEmailInvalid.login_email_invalid
  );
  const loginPassword = useSelector(
    (state) => state.loginPassword.login_password
  );
  const loginPasswordInvalid = useSelector(
    (state) => state.loginPasswordInvalid.login_password_invalid
  );
  const registeredClientFound = useSelector(
    (state) => state.registeredClientFound.registered_client_found
  );
  const userAuthenticated = useSelector(
    (state) => state.userAuthenticated.user_authenticated
  );
  const facebookCompleteRegistration = useSelector(
    (state) =>
      state.facebookCompleteRegistration.facebook_complete_registration_active
  );

  const handleClientLogin = () => {
    changeSignInLoading(false);

    if (registeredClientFound) {
      if (loginEmailInvalid) {
        dispatch(ACTION_LOGIN_EMAIL_NOT_INVALID());
      }

      if (loginPasswordInvalid) {
        dispatch(ACTION_LOGIN_PASSWORD_NOT_INVALID());
      }
    }
  };

  const handleClientLoginError = () => {
    if (error) {
      changeSignInLoading(false);
      if (error.message) {
        if (error.message.includes("email")) {
          dispatch(ACTION_LOGIN_EMAIL_INVALID());
          dispatch(ACTION_LOGIN_PASSWORD_NOT_INVALID());
        } else {
          dispatch(ACTION_LOGIN_PASSWORD_INVALID());
          dispatch(ACTION_LOGIN_EMAIL_NOT_INVALID());
        }
      }
    }
  };

  const [loginClient, { error }] = useLazyQuery(loginQuery, {
    fetchPolicy: "no-cache",
    onCompleted: handleClientLogin,
    onError: handleClientLoginError,
  });

  const { data: getClientsData } = useQuery(getClientsQuery, {
    fetchPolicy: "no-cache",
  });

  const [signInLoading, changeSignInLoading] = useState(false);

  const override = css`
    display: block;
    position: absolute;
    left: 25%;
    right: 25%;
  `;

  useMemo(() => {
    if (getClientsData) {
      for (let i = 0; i < getClientsData.clients.length; i++) {
        if (getClientsData.clients[i].email === loginEmail) {
          if (getClientsData.clients[i].password !== null) {
            dispatch(ACTION_REGISTERED_CLIENT_FOUND());
          } else {
            if (registeredClientFound) {
              dispatch(ACTION_REGISTERED_CLIENT_FOUND_RESET());
            }
          }
        }
      }
    }
  }, [getClientsData, loginEmail, registeredClientFound, dispatch]);

  const redirectToClientProfile = () => {
    if (userAuthenticated) {
      return <Redirect to="/account/clientprofile" />;
    }
  };

  const redirectToUpcomingAppointments = () => {
    if (userAuthenticated) {
      return (
        <Redirect
          to={{
            pathname: "/account/clientprofile/upcomingappointments",
            state: { successful_auth: true },
          }}
        />
      );
    }
  };

  const redirectToFacebookCompleteRegistration = () => {
    if (facebookCompleteRegistration) {
      return <Redirect to="/account/completeregistration" />;
    }
  };

  useEffect(() => {
    if (!splashScreenComplete) {
      dispatch(ACTION_SPLASH_SCREEN_COMPLETE());
    }
    if (!splashScreenHalfway) {
      dispatch(ACTION_SPLASH_SCREEN_HALFWAY());
    }
  }, [dispatch, splashScreenComplete, splashScreenHalfway]);

  useEffect(() => {
    if (location.pathname) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  const handleCreateClick = () => {
    dispatch(ACTION_LOGIN_IS_ACTIVE());
  };

  const handleLoginClick = () => {
    loginClient({
      variables: {
        email: loginEmail,
        password: loginPassword,
      },
    });
    changeSignInLoading(true);
  };

  // When account screen unmounts, allow navbar
  useEffect(() => {
    dispatch(ACTION_LOGIN_IS_ACTIVE());
    return () => {
      dispatch(ACTION_LOGIN_IS_NOT_ACTIVE());
    };
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(ACTION_LOGIN_PASSWORD_NOT_INVALID());
      dispatch(ACTION_LOGIN_EMAIL_NOT_INVALID());
    };
  }, [dispatch]);

  return (
    <div className="login_page_background">
      <div className="login_page_background_blurry" />
      <div className="login_container">
        {!props.currentScreenSize
          ? props.initialScreenSize >= 1200
            ? redirectToUpcomingAppointments()
            : redirectToClientProfile()
          : props.currentScreenSize >= 1200
          ? redirectToUpcomingAppointments()
          : redirectToClientProfile()}
        {redirectToFacebookCompleteRegistration()}
        <header className="login_logo_container">
         <h1>NC Karnany & Co.</h1>
        </header>
        <div className="login_section_designator">
          <h2 style={{color: '#0081b1'}}>Sign In to Your Account</h2>
        </div>
        <div className="login_facebook_container">
          <a
            className="continue_with_facebook_button"
            href={`${
              process.env.REACT_APP_ENV === "production"
                ? process.env.REACT_APP_PRODUCTION_SERVER_URL
                : "http://localhost:4000"
            }/api/auth/facebook/callback`}
          >
            <FontAwesomeIcon icon={faFacebook} />
            <p>Continue with Facebook</p>
          </a>
        </div>
        <div className="login_or_container">
          <p className="or_dash">——————</p>
          <p className="or_capital_letters">OR</p>
          <p className="or_dash">——————</p>
        </div>
        <Form className="login_form_container">
          <LoginEmail />
          <LoginPassword handleLoginClick={handleLoginClick} />
        </Form>
        <div className="bottom_buttons_container">
          <Link
            className="log_in_button"
            to="/account/login"
            style={{
              display: "block",
              pointerEvents: loginEmail && loginPassword ? "auto" : "none",
              background:
                loginEmail && loginPassword ? "rgb(44, 44, 52)" : "#f0f0f0",
              color:
                loginEmail && loginPassword
                  ? "rgb(255, 255, 255)"
                  : "rgb(201, 201, 201)",
              transition: "background 0.5s ease, color 0.5s ease",
            }}
            onClick={handleLoginClick}
          >
            <p>Log In</p>
          </Link>
          <div className="dont_have_an_account_question">
            <p>Don't have an account?</p>
          </div>
          <Link
            to="/account/signup"
            className="create_account_redirect_button"
            onClick={handleCreateClick}
          >
            <p>Create Account</p>
          </Link>
        </div>
      </div>
      <Modal
        isOpen={signInLoading}
        style={{
          content: {
            position: "fixed",
            zIndex: "10000",
            height: "100%",
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
            paddingBottom: "10%",
            borderRadius: "none",
            width: "100vw",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            border: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <BounceLoader
          size={100}
          css={override}
          color={"rgb(44, 44, 52)"}
          loading={signInLoading}
        />
      </Modal>
      <div className="login_page_descriptive_text">
        <h2>Your Account and.</h2>
        <h2>Your way.</h2>
        <ul>
          <li>Keep track of upcoming appointments</li>
          <li>Review past appointments</li>
          <li>Manage consent form information</li>
          {/* 
          <li>Keep track of appointments</li>
          <li>Get skincare product recommendations</li>
          <li>Track skin progress with before/after photos</li>
          <li>Build your skin profile</li> */}
        </ul>
      </div>
    </div>
  );
};

export default Login;

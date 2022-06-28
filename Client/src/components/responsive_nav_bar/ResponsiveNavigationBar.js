import React, { useState, useEffect, useMemo, useRef } from "react";
import { GrCart } from "react-icons/gr";
import { FaCircle, FaUser } from "react-icons/fa";
import { FcHome, FcPlus, FcAbout, FcLike, FcPaid } from "react-icons/fc";
import { toast } from "react-toastify";
import BurgerMenu from "./Burger/BurgerMenuComponent";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { useQuery } from "@apollo/react-hooks";
import getEmployeeQuery from "../../graphql/queries/getEmployeeQuery";
import getClientQuery from "../../graphql/queries/getClientQuery";
import Menu from "react-burger-menu/lib/menus/slide";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";
import {
  faMapMarkerAlt,
  faPhoneSquare,
} from "@fortawesome/free-solid-svg-icons";
import ACTION_LOG_OUT_CLICKED from "../../actions/LogOut/ACTION_LOG_OUT_CLICKED";
import ACTION_CART_IS_NOT_ACTIVE from "../../actions/CartIsActive/ACTION_CART_IS_NOT_ACTIVE";
import ACTION_CART_IS_ACTIVE from "../../actions/CartIsActive/ACTION_CART_IS_ACTIVE";
import ACTION_CART_PAGE_OPENED from "../../actions/InCart/CartPageOpened/ACTION_CART_PAGE_OPENED";
import ACTION_LOGIN_IS_ACTIVE from "../../actions/Login/ACTION_LOGIN_IS_ACTIVE";
import ACTION_NAVBAR_TOGGLE_RESET from "../../actions/Nav/ACTION_NAVBAR_TOGGLE_RESET";
import ACTION_BODY_SCROLL_ALLOW from "../../actions/Body_Scroll/ACTION_BODY_SCROLL_ALLOW";
import ACTION_BODY_SCROLL_RESET from "../../actions/Body_Scroll/ACTION_BODY_SCROLL_RESET";
import "./NavigationBar.css";
import "./ResponsiveNavigationBar.css";
import "../landing_page/LandingPage.css";

const ResponsiveNavigationBar = React.forwardRef((props, ref) => {
  const {
    LandingPageRef,
    Treatments1Ref,
    AddOnsRef,
    InstagramRef,
    ContactRef,
  } = ref;

  const Nav_Ref = useRef(null);

  const location = useLocation();
  const dispatch = useDispatch();

  const counter = useSelector((state) => state.counterReducer.counter);
  const loginIsActive = useSelector(
    (state) => state.loginIsActive.login_is_active
  );
  const userAuthenticated = useSelector(
    (state) => state.userAuthenticated.user_authenticated
  );
  const logoutClicked = useSelector(
    (state) => state.logoutClicked.log_out_clicked
  );
  const cancelAppointmentClicked = useSelector(
    (state) => state.cancelAppointmentClicked.cancelAppointmentClicked
  );
  const imageLoading = useSelector((state) => state.imageLoading.image_loading);
  const dummyToken = useSelector((state) => state.dummyToken.dummy_token);
  const cartIsActive = useSelector((state) => state.cartIsActive.cartIsActive);
  const cartPageOpened = useSelector(
    (state) => state.cartPageOpened.cart_page_opened
  );
  const addProfilePhotoClicked = useSelector(
    (state) => state.addProfilePhotoClicked.add_profile_photo_clicked
  );
  const splashScreenHalfway = useSelector(
    (state) => state.splashScreenHalfway.splashScreenHalfway
  );

  const navbarToggle = useSelector((state) => state.navbarToggle.toggle);

  const [homeClicked, changeHomeClicked] = useState(false);

  const { data } = useQuery(getClientQuery, {
    fetchPolicy: "no-cache",
    variables: {
      _id: dummyToken ? dummyToken.id : null,
    },
  });

  const { data: getEmployeeData } = useQuery(getEmployeeQuery, {
    fetchPolicy: "no-cache",
    variables: {
      _id: props.adminDummyToken ? props.adminDummyToken.id : null,
    },
  });

  const changeNavBarColor = () => {
    if (props.currentScreenSize === "") {
      if (
        props.initialScreenSize >= 600 &&
        props.initialScreenSize > props.initialScreenHeight
      ) {
        if (
          cartIsActive ||
          location.pathname.includes("account") ||
          location.pathname.includes("admin") ||
          location.pathname.includes("privacy") ||
          location.pathname.includes("termsandconditions")
        ) {
          return "rgb(44,44,52)";
        } else {
          if (navbarToggle) {
            return "rgb(44,44,52)";
          } else {
            if (props.scrollValue > 5) {
              return "rgb(44,44,52)";
            } else {
              return "linear-gradient(to right, rgb(251, 251, 251) 0%, rgb(251, 251, 251) 50%, rgb(224, 224, 232) 50.05%, rgb(224, 224, 232) 100%)";
            }
          }
        }
      } else {
        return "rgb(44,44,52)";
      }
    } else {
      if (
        props.currentScreenSize >= 600 &&
        props.currentScreenSize > props.currentScreenHeight
      ) {
        if (
          cartIsActive ||
          location.pathname.includes("account") ||
          location.pathname.includes("admin") ||
          location.pathname.includes("privacy") ||
          location.pathname.includes("termsandconditions")
        ) {
          return "rgb(44,44,52)";
        } else {
          if (navbarToggle) {
            return "rgb(44,44,52)";
          } else {
            if (props.scrollValue > 5) {
              return "rgb(44,44,52)";
            } else {
              return "linear-gradient(to right, rgb(251, 251, 251) 0%, rgb(251, 251, 251) 50%, rgb(224, 224, 232) 50.05%, rgb(224, 224, 232) 100%)";
            }
          }
        }
      } else {
        return "rgb(44,44,52)";
      }
    }
  };

  const cartActivated = () => {
    dispatch(ACTION_CART_IS_ACTIVE());
    document.body.style.setProperty("background", "rgb(255, 255, 255)");
    toast.dismiss();
  };

  const cartDeactivated = () => {
    dispatch(ACTION_CART_IS_NOT_ACTIVE());
  };

  const handleShoppingCartClick = () => {
    if (props.currentScreenSize === "") {
      if (props.initialScreenSize >= 1200) {
        if (cartIsActive) {
          cartDeactivated();
        } else {
          cartActivated();
          if (!cartPageOpened) {
            dispatch(ACTION_CART_PAGE_OPENED());
          }
        }
      } else {
        cartActivated();
        if (!cartPageOpened) {
          dispatch(ACTION_CART_PAGE_OPENED());
        }
      }
    } else {
      if (props.currentScreenSize >= 1200) {
        if (cartIsActive) {
          cartDeactivated();
        } else {
          cartActivated();
          if (!cartPageOpened) {
            dispatch(ACTION_CART_PAGE_OPENED());
          }
        }
      } else {
        cartActivated();
        if (!cartPageOpened) {
          dispatch(ACTION_CART_PAGE_OPENED());
        }
      }
    }
  };

  const handleLogoutClicked = () => {
    toast.dismiss();

    if (
      !location.pathname.includes("/account/clientprofile") &&
      !location.pathname.includes("/admin")
    ) {
      dispatch(ACTION_LOGIN_IS_ACTIVE());
      if (cartIsActive) {
        dispatch(ACTION_CART_IS_NOT_ACTIVE());
      }
    } else {
      dispatch(ACTION_LOG_OUT_CLICKED());
    }
  };

  const clientNavbarCircleRender = () => {
    if (data) {
      if (data.client !== null) {
        if (dummyToken) {
          if (dummyToken.picture) {
            return (
              <img
                className="nav_bar_profile_picture_thumbnail"
                src={`${dummyToken.picture}`}
                alt="facebook_profile_picture"
              />
            );
          } else {
            return (
              data.client.firstName[0].toUpperCase() +
              data.client.lastName[0].toUpperCase()
            );
          }
        } else {
          return (
            data.client.firstName[0].toUpperCase() +
            data.client.lastName[0].toUpperCase()
          );
        }
      } else {
        return "";
      }
    } else {
      if (dummyToken) {
        if (dummyToken.picture) {
          return (
            <img
              className="nav_bar_profile_picture_thumbnail"
              src={`${dummyToken.picture}`}
              alt="facebook_profile_picture"
            />
          );
        } else {
          if (data) {
            if (data.client) {
              if (data.client.firstName[0]) {
                if (data.client.lastName[0]) {
                  return (
                    data.client.firstName[0].toUpperCase() +
                    data.client.lastName[0].toUpperCase()
                  );
                } else {
                  return data.client.firstName[0].toUpperCase();
                }
              }
            }
          }
        }
      } else {
        return "";
      }
    }
  };

  useEffect(() => {
    const burgerMenuIcon = document.getElementsByClassName("nav_burger_menu");
    const burgerMenuIconPath = burgerMenuIcon[0].getElementsByTagName("path");

    if (burgerMenuIconPath.length > 0) {
      if (burgerMenuIcon.length > 0) {
        if (navbarToggle) {
          burgerMenuIcon[0].firstChild.classList.remove(
            "navbar_cart_icon_dark"
          );
          burgerMenuIcon[0].firstChild.classList.add("navbar_cart_icon_light");

          burgerMenuIconPath[0].classList.remove("navbar_cart_icon_path_dark");
          burgerMenuIconPath[0].classList.add("navbar_cart_icon_path_light");
        } else {
          if (props.currentScreenSize === "") {
            if (
              props.initialScreenSize >= 768 &&
              props.initialScreenSize > props.initialScreenHeight
            ) {
              if (props.scrollValue <= 5) {
                if (
                  cartIsActive ||
                  location.pathname.includes("account") ||
                  location.pathname.includes("admin") ||
                  location.pathname.includes("privacy") ||
                  location.pathname.includes("termsandconditions")
                ) {
                  burgerMenuIcon[0].firstChild.classList.remove(
                    "navbar_cart_icon_dark"
                  );
                  burgerMenuIcon[0].firstChild.classList.add(
                    "navbar_cart_icon_light"
                  );

                  burgerMenuIconPath[0].classList.remove(
                    "navbar_cart_icon_path_dark"
                  );
                  burgerMenuIconPath[0].classList.add(
                    "navbar_cart_icon_path_light"
                  );
                } else {
                  burgerMenuIcon[0].firstChild.classList.remove(
                    "navbar_cart_icon_light"
                  );
                  burgerMenuIcon[0].firstChild.classList.add(
                    "navbar_cart_icon_dark"
                  );

                  burgerMenuIconPath[0].classList.remove(
                    "navbar_cart_icon_path_light"
                  );
                  burgerMenuIconPath[0].classList.add(
                    "navbar_cart_icon_path_dark"
                  );
                }
              } else {
                burgerMenuIcon[0].firstChild.classList.remove(
                  "navbar_cart_icon_dark"
                );
                burgerMenuIcon[0].firstChild.classList.add(
                  "navbar_cart_icon_light"
                );

                burgerMenuIconPath[0].classList.remove(
                  "navbar_cart_icon_path_dark"
                );
                burgerMenuIconPath[0].classList.add(
                  "navbar_cart_icon_path_light"
                );
              }
            } else {
              burgerMenuIcon[0].firstChild.classList.remove(
                "navbar_cart_icon_dark"
              );
              burgerMenuIcon[0].firstChild.classList.add(
                "navbar_cart_icon_light"
              );

              burgerMenuIconPath[0].classList.remove(
                "navbar_cart_icon_path_dark"
              );
              burgerMenuIconPath[0].classList.add(
                "navbar_cart_icon_path_light"
              );
            }
          } else {
            if (
              props.currentScreenSize >= 768 &&
              props.currentScreenSize > props.currentScreenHeight
            ) {
              if (props.scrollValue <= 5) {
                if (
                  cartIsActive ||
                  location.pathname.includes("account") ||
                  location.pathname.includes("admin") ||
                  location.pathname.includes("privacy") ||
                  location.pathname.includes("termsandconditions")
                ) {
                  burgerMenuIcon[0].firstChild.classList.remove(
                    "navbar_cart_icon_dark"
                  );
                  burgerMenuIcon[0].firstChild.classList.add(
                    "navbar_cart_icon_light"
                  );

                  burgerMenuIconPath[0].classList.remove(
                    "navbar_cart_icon_path_dark"
                  );
                  burgerMenuIconPath[0].classList.add(
                    "navbar_cart_icon_path_light"
                  );
                } else {
                  burgerMenuIcon[0].firstChild.classList.remove(
                    "navbar_cart_icon_path_light"
                  );
                  burgerMenuIcon[0].firstChild.classList.add(
                    "navbar_cart_icon_dark"
                  );

                  burgerMenuIconPath[0].classList.remove(
                    "navbar_cart_icon_path_light"
                  );
                  burgerMenuIconPath[0].classList.add(
                    "navbar_cart_icon_path_dark"
                  );
                }
              } else {
                burgerMenuIcon[0].firstChild.classList.remove(
                  "navbar_cart_icon_dark"
                );
                burgerMenuIcon[0].firstChild.classList.add(
                  "navbar_cart_icon_light"
                );

                burgerMenuIconPath[0].classList.remove(
                  "navbar_cart_icon_path_dark"
                );
                burgerMenuIconPath[0].classList.add(
                  "navbar_cart_icon_path_light"
                );
              }
            } else {
              burgerMenuIcon[0].firstChild.classList.remove(
                "navbar_cart_icon_dark"
              );
              burgerMenuIcon[0].firstChild.classList.add(
                "navbar_cart_icon_light"
              );

              burgerMenuIconPath[0].classList.remove(
                "navbar_cart_icon_path_dark"
              );
              burgerMenuIconPath[0].classList.add(
                "navbar_cart_icon_path_light"
              );
            }
          }
        }
      }
    }
  }, [
    cartIsActive,
    location.pathname,
    props.currentScreenSize,
    props.initialScreenSize,
    props.scrollValue,
    navbarToggle,
    props.currentScreenHeight,
    props.initialScreenHeight,
  ]);

  useEffect(() => {
    const cartIcon = document.getElementsByClassName("navbar_cart_icon");

    if (cartIcon.length > 0) {
      if (navbarToggle) {
        cartIcon[0].firstChild.classList.remove("navbar_cart_icon_dark");
        cartIcon[0].firstChild.classList.add("navbar_cart_icon_light");
      } else {
        if (props.currentScreenSize === "") {
          if (
            props.initialScreenSize >= 768 &&
            props.initialScreenSize > props.initialScreenHeight
          ) {
            if (props.scrollValue <= 5) {
              if (
                cartIsActive ||
                location.pathname.includes("account") ||
                location.pathname.includes("admin") ||
                location.pathname.includes("privacy") ||
                location.pathname.includes("termsandconditions")
              ) {
                cartIcon[0].firstChild.classList.remove(
                  "navbar_cart_icon_dark"
                );
                cartIcon[0].firstChild.classList.add("navbar_cart_icon_light");
              } else {
                cartIcon[0].firstChild.classList.remove(
                  "navbar_cart_icon_light"
                );
                cartIcon[0].firstChild.classList.add("navbar_cart_icon_dark");
              }
            } else {
              cartIcon[0].firstChild.classList.remove("navbar_cart_icon_dark");
              cartIcon[0].firstChild.classList.add("navbar_cart_icon_light");
            }
          } else {
            cartIcon[0].firstChild.classList.remove("navbar_cart_icon_dark");
            cartIcon[0].firstChild.classList.add("navbar_cart_icon_light");
          }
        } else {
          if (
            props.currentScreenSize >= 768 &&
            props.currentScreenSize > props.currentScreenHeight
          ) {
            if (props.scrollValue <= 5) {
              if (
                cartIsActive ||
                location.pathname.includes("account") ||
                location.pathname.includes("admin") ||
                location.pathname.includes("privacy") ||
                location.pathname.includes("termsandconditions")
              ) {
                cartIcon[0].firstChild.classList.remove(
                  "navbar_cart_icon_dark"
                );
                cartIcon[0].firstChild.classList.add("navbar_cart_icon_light");
              } else {
                cartIcon[0].firstChild.classList.remove(
                  "navbar_cart_icon_light"
                );
                cartIcon[0].firstChild.classList.add("navbar_cart_icon_dark");
              }
            } else {
              cartIcon[0].firstChild.classList.remove("navbar_cart_icon_dark");
              cartIcon[0].firstChild.classList.add("navbar_cart_icon_light");
            }
          } else {
            cartIcon[0].firstChild.classList.remove("navbar_cart_icon_dark");
            cartIcon[0].firstChild.classList.add("navbar_cart_icon_light");
          }
        }
      }
    }
  }, [
    cartIsActive,
    location.pathname,
    props.currentScreenSize,
    props.initialScreenSize,
    props.scrollValue,
    navbarToggle,
    props.currentScreenHeight,
    props.initialScreenHeight,
  ]);

  const navbarItemSelect = () => {
    dispatch(ACTION_NAVBAR_TOGGLE_RESET());
    dispatch(ACTION_BODY_SCROLL_ALLOW());
  };

  useMemo(() => {
    const NavRefTarget = Nav_Ref.current;
    clearAllBodyScrollLocks();

    if (navbarToggle) {
      dispatch(ACTION_BODY_SCROLL_RESET());
      const handleDisableScroll = (el) => {
        disableBodyScroll({ targetElement: el });
      };

      handleDisableScroll(NavRefTarget);
    } else {
      dispatch(ACTION_BODY_SCROLL_ALLOW());
      const handleEnableScroll = (el) => {
        enableBodyScroll({ targetElement: el });
      };

      handleEnableScroll(NavRefTarget);
    }
  }, [navbarToggle, dispatch]);

  useEffect(() => {
    if (homeClicked) {
      const clickedReset = setTimeout(() => {
        changeHomeClicked(false);
      }, 100);

      return () => {
        clearTimeout(clickedReset);
      };
    }
  }, [homeClicked, location.pathname]);

  const navMenuScrollToHome = () => {
    navbarItemSelect();
    dispatch(ACTION_CART_IS_NOT_ACTIVE());

    setTimeout(() => {
      props.handleClickToScrollToHome(LandingPageRef);
    }, 300);

    changeHomeClicked(true);

    document.body.classList.remove("no_scroll");
    document.body.style.setProperty("overflow", "scroll");
  };

  const navMenuScrollToTreatments = () => {
    navbarItemSelect();
    changeHomeClicked(true);

    dispatch(ACTION_CART_IS_NOT_ACTIVE());
    setTimeout(() => {
      props.handleClickToScrollToTreatments(Treatments1Ref);
    }, 300);
  };

  const navMenuScrollToAddOns = () => {
    navbarItemSelect();
    changeHomeClicked(true);

    dispatch(ACTION_CART_IS_NOT_ACTIVE());
    setTimeout(() => {
      props.handleClickToScrollToAddOns(AddOnsRef);
    }, 300);
  };

  const navMenuScrollToInstagram = () => {
    navbarItemSelect();
    changeHomeClicked(true);

    dispatch(ACTION_CART_IS_NOT_ACTIVE());
    setTimeout(() => {
      props.handleClickToScrollToInstagram(InstagramRef);
    }, 300);
  };

  const navMenuScrollToContact = () => {
    navbarItemSelect();
    changeHomeClicked(true);

    dispatch(ACTION_CART_IS_NOT_ACTIVE());
    setTimeout(() => {
      props.handleClickToScrollToContact(ContactRef);
    }, 300);
  };

  return (
    <nav
      className="navbar"
      style={{
        background: changeNavBarColor(),
        filter: navbarToggle
          ? "none"
          : props.scroll
          ? "drop-shadow(0 0 3px rgba(0, 0, 0, 0.4))"
          : cancelAppointmentClicked ||
            logoutClicked ||
            addProfilePhotoClicked ||
            imageLoading
          ? "blur(5px) brightness(50%)"
          : "none",
        transition: "background 0.5s ease, filter 0.5s ease",
        display: loginIsActive || !splashScreenHalfway ? "none" : "flex",
      }}
    >
      <div className="left_nav">
        <Menu
          customBurgerIcon={
            <BurgerMenu
              location={location}
              cartIsActive={cartIsActive}
              currentScreenSize={props.currentScreenSize}
              currentScreenHeight={props.currentScreenHeight}
              initialScreenSize={props.initialScreenSize}
              initialScreenHeight={props.initialScreenHeight}
              scrollValue={props.scrollValue}
            />
          }
          className={
            navbarToggle
              ? "nav_burger_menu"
              : "nav_burger_menu nav_burger_menu_no_shadow"
          }
          disableAutoFocus
          onOpen={props.handleNavbarToggle}
          isOpen={navbarToggle}
          onClose={props.handleNavbarToggle}
          width={
            props.currentScreenSize === ""
              ? props.initialScreenSize >= 768
                ? "60%"
                : "85%"
              : props.currentScreenSize >= 768
              ? "60%"
              : "85%"
          }
        >
          <div className="nav_burger_menu_logo_container">
            <h1 style={{color: '#0081b1'}}>NC Karnany & Co.</h1>
          </div>
          <ul className="nav_burger_menu_items">
            <li tabIndex={0} onClick={() => navMenuScrollToHome()}>
              <FcHome />
              Home
            </li>
            <li tabIndex={0} onClick={() => navMenuScrollToTreatments()}>
              <FcPaid />
              About
            </li>
            <li tabIndex={0} onClick={() => navMenuScrollToAddOns()}>
              <FcPlus />
              Services
            </li>
            <li tabIndex={0} onClick={() => navMenuScrollToInstagram()}>
              <FcLike />
              Follow Us
            </li>
            <li tabIndex={0} onClick={() => navMenuScrollToContact()}>
              <FcAbout />
              Contact Us
            </li>
            <li className="navbar_social_media_icons">
              <FontAwesomeIcon
                icon={faInstagram}
                onClick={() =>
                  window.open("https://instagram.com/", "_blank")
                }
              />

              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://google.com/maps?cid=14723157819510648635"
              >
                <FontAwesomeIcon icon={faMapMarkerAlt} />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://facebook.com/"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="tel:1 (600) 200-45855">
                <FontAwesomeIcon icon={faPhoneSquare} />
              </a>
            </li>
          </ul>
        </Menu>

        <div className="navbar_logo_container">
          <a href="/" aria-label="Logo Site Refresh">
           <h1 style={{color : '#0081b1'}}>NC Karnany & Co.</h1>
          </a>
        </div>
      </div>
      <div className="right_nav">
        <h2
          onClick={props.handleClickToScrollToHome}
          style={{
            color:
              props.currentScreenSize === ""
                ? props.initialScreenSize >= 1200
                  ? props.scrollValue <= 1
                    ? cartIsActive ||
                      location.pathname.includes("account") ||
                      location.pathname.includes("admin") ||
                      location.pathname.includes("privacy") ||
                      location.pathname.includes("termsandconditions")
                      ? "rgb(239, 240, 243)"
                      : "rgb(44, 44, 52)"
                    : "rgb(239, 240, 243)"
                  : "rgb(239, 240, 243)"
                : props.currentScreenSize >= 1200
                ? props.scrollValue <= 1
                  ? cartIsActive ||
                    location.pathname.includes("account") ||
                    location.pathname.includes("admin") ||
                    location.pathname.includes("privacy") ||
                    location.pathname.includes("termsandconditions")
                    ? "rgb(239, 240, 243)"
                    : "rgb(44, 44, 52)"
                  : "rgb(239, 240, 243)"
                : "rgb(239, 240, 243)",
          }}
        >
          HOME
        </h2>
        <h2
          onClick={props.handleClickToScrollToTreatments}
          style={{
            color:
              props.currentScreenSize === ""
                ? props.initialScreenSize >= 1200
                  ? props.scrollValue <= 1
                    ? cartIsActive ||
                      location.pathname.includes("account") ||
                      location.pathname.includes("admin") ||
                      location.pathname.includes("privacy") ||
                      location.pathname.includes("termsandconditions")
                      ? "rgb(239, 240, 243)"
                      : "rgb(44, 44, 52)"
                    : "rgb(239, 240, 243)"
                  : "rgb(239, 240, 243)"
                : props.currentScreenSize >= 1200
                ? props.scrollValue <= 1
                  ? cartIsActive ||
                    location.pathname.includes("account") ||
                    location.pathname.includes("admin") ||
                    location.pathname.includes("privacy") ||
                    location.pathname.includes("termsandconditions")
                    ? "rgb(239, 240, 243)"
                    : "rgb(44, 44, 52)"
                  : "rgb(239, 240, 243)"
                : "rgb(239, 240, 243)",
          }}
        >
          ABOUT
        </h2>
        <h2
          style={{
            color:
              props.currentScreenSize === ""
                ? props.initialScreenSize >= 1200
                  ? props.scrollValue <= 1
                    ? cartIsActive ||
                      location.pathname.includes("account") ||
                      location.pathname.includes("admin") ||
                      location.pathname.includes("privacy") ||
                      location.pathname.includes("termsandconditions")
                      ? "rgb(239, 240, 243)"
                      : "rgb(44, 44, 52)"
                    : "rgb(239, 240, 243)"
                  : "rgb(239, 240, 243)"
                : props.currentScreenSize >= 1200
                ? props.scrollValue <= 1
                  ? cartIsActive ||
                    location.pathname.includes("account") ||
                    location.pathname.includes("admin") ||
                    location.pathname.includes("privacy") ||
                    location.pathname.includes("termsandconditions")
                    ? "rgb(239, 240, 243)"
                    : "rgb(44, 44, 52)"
                  : "rgb(239, 240, 243)"
                : "rgb(239, 240, 243)",
          }}
          
          onClick={props.handleClickToScrollToAddOns}
        >
          SERVICES
        </h2>
        <h2
          onClick={props.handleClickToScrollToInstagram}
          style={{
            color:
              props.currentScreenSize === ""
                ? props.initialScreenSize >= 1200
                  ? props.scrollValue <= 1
                    ? cartIsActive ||
                      location.pathname.includes("account") ||
                      location.pathname.includes("admin") ||
                      location.pathname.includes("privacy") ||
                      location.pathname.includes("termsandconditions")
                      ? "rgb(239, 240, 243)"
                      : "rgb(44, 44, 52)"
                    : "rgb(239, 240, 243)"
                  : "rgb(239, 240, 243)"
                : props.currentScreenSize >= 1200
                ? props.scrollValue <= 1
                  ? cartIsActive ||
                    location.pathname.includes("account") ||
                    location.pathname.includes("admin") ||
                    location.pathname.includes("privacy") ||
                    location.pathname.includes("termsandconditions")
                    ? "rgb(239, 240, 243)"
                    : "rgb(44, 44, 52)"
                  : "rgb(239, 240, 243)"
                : "rgb(239, 240, 243)",
          }}
        >
          FOLLOW US
        </h2>
        <div
          className="nav_login_container"
          style={{
            background:
              props.currentScreenSize === ""
                ? props.initialScreenSize >= 768 &&
                  props.initialScreenHeight >= props.initialScreenSize
                  ? "rgb(239, 240, 243)"
                  : props.initialScreenSize >= 600
                  ? props.initialScreenHeight >= props.initialScreenSize
                    ? "rgb(239, 240, 243)"
                    : cartIsActive ||
                      location.pathname.includes("account") ||
                      location.pathname.includes("admin") ||
                      location.pathname.includes("privacy") ||
                      location.pathname.includes("termsandconditions")
                    ? "rgb(239, 240, 243)"
                    : props.scrollValue <= 5
                    ? "rgb(44, 44, 52)"
                    : "rgb(239, 240, 243)"
                  : "rgb(239, 240, 243)"
                : props.currentScreenSize >= 768 &&
                  props.currentScreenHeight >= props.currentScreenSize
                ? "rgb(239, 240, 243)"
                : props.currentScreenSize >= 600
                ? props.currentScreenHeight >= props.currentScreenSize
                  ? "rgb(239, 240, 243)"
                  : cartIsActive ||
                    location.pathname.includes("account") ||
                    location.pathname.includes("admin") ||
                    location.pathname.includes("privacy") ||
                    location.pathname.includes("termsandconditions")
                  ? "rgb(239, 240, 243)"
                  : props.scrollValue <= 5
                  ? "rgb(44, 44, 52)"
                  : "rgb(239, 240, 243)"
                : "rgb(239, 240, 243)",
          }}
        >
          <Link
            onClick={handleLogoutClicked}
            className="nav_sign_in_link_container"
            to={
              location.pathname.includes("/account/clientprofile")
                ? location.pathname
                : location.pathname.includes("/admin/")
                ? location.pathname
                : props.adminDummyToken
                ? "/admin/menu"
                : "/account/login"
            }
            style={{
              pointerEvents:
                logoutClicked || cancelAppointmentClicked ? "none" : "auto",
              paddingLeft:
                userAuthenticated || props.adminDummyToken
                  ? dummyToken && dummyToken.picture
                    ? "0.5rem"
                    : "1rem"
                  : "0rem",
            }}
          >
            {userAuthenticated || props.adminDummyToken ? (
              <span
                className="fa-layers fa-fw letter_circle"
                style={{
                  background:
                    dummyToken && dummyToken.picture
                      ? "transparent"
                      : props.currentScreenSize === ""
                      ? props.initialScreenSize >= 768 &&
                        props.initialScreenHeight >= props.initialScreenSize
                        ? "rgb(44, 44, 52)"
                        : props.initialScreenSize >= 600
                        ? props.initialScreenHeight >= props.initialScreenSize
                          ? "rgb(44, 44, 52)"
                          : cartIsActive ||
                            location.pathname.includes("account") ||
                            location.pathname.includes("admin") ||
                            location.pathname.includes("privacy") ||
                            location.pathname.includes("termsandconditions")
                          ? "rgb(44, 44, 52)"
                          : props.scrollValue <= 5
                          ? "rgb(239, 240, 243)"
                          : "rgb(44, 44, 52)"
                        : "rgb(44, 44, 52)"
                      : props.currentScreenSize >= 768 &&
                        props.currentScreenHeight >= props.currentScreenSize
                      ? "rgb(44, 44, 52)"
                      : props.currentScreenSize >= 600
                      ? props.currentScreenHeight >= props.currentScreenSize
                        ? "rgb(44, 44, 52)"
                        : cartIsActive ||
                          location.pathname.includes("account") ||
                          location.pathname.includes("admin") ||
                          location.pathname.includes("privacy") ||
                          location.pathname.includes("termsandconditions")
                        ? "rgb(44, 44, 52)"
                        : props.scrollValue <= 5
                        ? "rgb(239, 240, 243)"
                        : "rgb(44, 44, 52)"
                      : "rgb(44, 44, 52)",
                }}
              >
                <p
                  style={{
                    color:
                      props.currentScreenSize === ""
                        ? props.initialScreenSize >= 768 &&
                          props.initialScreenHeight >= props.initialScreenSize
                          ? "rgb(239, 240, 243)"
                          : props.initialScreenSize >= 600
                          ? props.initialScreenHeight >= props.initialScreenSize
                            ? "rgb(239, 240, 243)"
                            : cartIsActive ||
                              location.pathname.includes("account") ||
                              location.pathname.includes("admin") ||
                              location.pathname.includes("privacy") ||
                              location.pathname.includes("termsandconditions")
                            ? "rgb(239, 240, 243)"
                            : props.scrollValue <= 5
                            ? "rgb(44, 44, 52)"
                            : "rgb(239, 240, 243)"
                          : "rgb(239, 240, 243)"
                        : props.currentScreenSize >= 768 &&
                          props.currentScreenHeight >= props.currentScreenSize
                        ? "rgb(239, 240, 243)"
                        : props.currentScreenSize >= 600
                        ? props.currentScreenHeight >= props.currentScreenSize
                          ? "rgb(239, 240, 243)"
                          : cartIsActive ||
                            location.pathname.includes("account") ||
                            location.pathname.includes("admin") ||
                            location.pathname.includes("privacy") ||
                            location.pathname.includes("termsandconditions")
                          ? "rgb(239, 240, 243)"
                          : props.scrollValue <= 5
                          ? "rgb(44, 44, 52)"
                          : "rgb(239, 240, 243)"
                        : "rgb(239, 240, 243)",
                    marginLeft: "0rem",
                  }}
                >
                  {getEmployeeData
                    ? getEmployeeData.employee
                      ? getEmployeeData.employee.firstName &&
                        getEmployeeData.employee.lastName
                        ? getEmployeeData.employee.firstName[0].toUpperCase() +
                          getEmployeeData.employee.lastName[0].toUpperCase()
                        : getEmployeeData.employee.firstName
                        ? getEmployeeData.employee.firstName[0].toUpperCase()
                        : clientNavbarCircleRender()
                      : clientNavbarCircleRender()
                    : clientNavbarCircleRender()}
                </p>
                <FaCircle
                  style={{
                    color:
                      props.currentScreenSize === ""
                        ? props.initialScreenSize >= 768 &&
                          props.initialScreenHeight >= props.initialScreenSize
                          ? "rgb(44, 44, 52)"
                          : props.initialScreenSize >= 600
                          ? props.initialScreenHeight >= props.initialScreenSize
                            ? "rgb(44, 44, 52)"
                            : props.scrollValue <= 5
                            ? "rgb(239, 240, 243)"
                            : "rgb(44, 44, 52)"
                          : "rgb(44, 44, 52)"
                        : props.currentScreenSize >= 768 &&
                          props.currentScreenHeight >= props.currentScreenSize
                        ? "rgb(44, 44, 52)"
                        : props.currentScreenSize >= 600
                        ? props.currentScreenHeight >= props.currentScreenSize
                          ? "rgb(44, 44, 52)"
                          : props.scrollValue <= 5
                          ? "rgb(239, 240, 243)"
                          : "rgb(44, 44, 52)"
                        : "rgb(44, 44, 52)",
                  }}
                  className="sign_in_circle_icon"
                />
              </span>
            ) : (
              <FaUser
                style={{
                  color:
                    props.currentScreenSize === ""
                      ? props.initialScreenSize >= 768 &&
                        props.initialScreenHeight >= props.initialScreenSize
                        ? "rgb(44, 44, 52)"
                        : props.initialScreenSize >= 600
                        ? props.initialScreenHeight >= props.initialScreenSize
                          ? "rgb(44, 44, 52)"
                          : props.scrollValue <= 5 &&
                            !location.pathname.includes("privacy") &&
                            !location.pathname.includes("termsandconditions")
                          ? "rgb(239, 240, 243)"
                          : "rgb(44, 44, 52)"
                        : "rgb(44, 44, 52)"
                      : props.currentScreenSize >= 768 &&
                        props.currentScreenHeight >= props.currentScreenSize
                      ? "rgb(44, 44, 52)"
                      : props.currentScreenSize >= 600
                      ? props.currentScreenHeight >= props.currentScreenSize
                        ? "rgb(44, 44, 52)"
                        : props.scrollValue <= 5 &&
                          !location.pathname.includes("privacy") &&
                          !location.pathname.includes("termsandconditions")
                        ? "rgb(239, 240, 243)"
                        : "rgb(44, 44, 52)"
                      : "rgb(44, 44, 52)",
                }}
                className="sign_in_user_icon"
              />
            )}
            <p
              style={{
                color:
                  props.currentScreenSize === ""
                    ? props.initialScreenSize >= 768 &&
                      props.initialScreenHeight >= props.initialScreenSize
                      ? "rgb(44, 44, 52)"
                      : props.initialScreenSize >= 600
                      ? props.initialScreenHeight >= props.initialScreenSize
                        ? "rgb(44, 44, 52)"
                        : cartIsActive ||
                          location.pathname.includes("account") ||
                          location.pathname.includes("admin") ||
                          location.pathname.includes("privacy") ||
                          location.pathname.includes("termsandconditions")
                        ? "rgb(44, 44, 52)"
                        : props.scrollValue <= 5
                        ? "rgb(239, 240, 243)"
                        : "rgb(44, 44, 52)"
                      : "rgb(44, 44, 52)"
                    : props.currentScreenSize >= 768 &&
                      props.currentScreenHeight >= props.currentScreenSize
                    ? "rgb(44, 44, 52)"
                    : props.currentScreenSize >= 600
                    ? props.currentScreenHeight >= props.currentScreenSize
                      ? "rgb(44, 44, 52)"
                      : cartIsActive ||
                        location.pathname.includes("account") ||
                        location.pathname.includes("admin") ||
                        location.pathname.includes("privacy") ||
                        location.pathname.includes("termsandconditions")
                      ? "rgb(44, 44, 52)"
                      : props.scrollValue <= 5
                      ? "rgb(239, 240, 243)"
                      : "rgb(44, 44, 52)"
                    : "rgb(44, 44, 52)",
                marginLeft: dummyToken
                  ? dummyToken.picture
                    ? "0.5rem"
                    : "0.5rem"
                  : props.adminDummyToken
                  ? "1.5rem"
                  : "0.5rem",
              }}
            >
              {location.pathname.includes("/account/clientprofile") ||
              location.pathname.includes("/admin")
                ? userAuthenticated || props.adminDummyToken
                  ? "Log Out"
                  : "Log In"
                : userAuthenticated
                ? "Menu"
                : props.adminDummyToken
                ? "Admin"
                : "Log In"}
            </p>
          </Link>
        </div>
        <Link
          to={
            cartIsActive
              ? location.pathname
              : cartPageOpened === "Cart"
              ? "/cart"
              : cartPageOpened === "Availability"
              ? "/availability"
              : cartPageOpened === "TimePreference"
              ? "/availability/timepreference"
              : cartPageOpened === "GuestCheckout"
              ? "/checkout"
              : cartPageOpened === "PaymentInfo"
              ? "/paymentinfo"
              : cartPageOpened === "ConfirmationPage"
              ? "/checkout/confirmation"
              : "/cart"
          }
          aria-label="Shopping Cart"
          onClick={handleShoppingCartClick}
        >
          <div className="nav_cart_container">
            <div
              className="nav_cart_number_circle_container"
              style={{ display: counter < 1 ? "none" : "block" }}
            >
              <FaCircle className="navbar_cart_number_circle" />
              <p
                style={{
                  right: !props.currentScreenSize
                    ? props.initialScreenSize >= 1200
                      ? counter > 9
                        ? "-0.2vw"
                        : counter > 6
                        ? "-0.015vw"
                        : "0.1vw"
                      : counter > 9
                      ? props.initialScreenSize >= 768
                        ? "-0.3vw"
                        : "-0.8vw"
                      : counter > 6
                      ? "-0.15vw"
                      : "0.1vw"
                    : props.currentScreenSize >= 1200
                    ? counter > 9
                      ? "-0.2vw"
                      : counter > 6
                      ? "-0.015vw"
                      : "0.1vw"
                    : counter > 9
                    ? props.currentScreenSize >= 768
                      ? "-0.3vw"
                      : "-0.8vw"
                    : counter > 6
                    ? "-0.15vw"
                    : "0.1vw",
                }}
              >
                {counter}
              </p>
            </div>
            <GrCart className="navbar_cart_icon" />
          </div>
        </Link>
      </div>
    </nav>
  );
});

export default ResponsiveNavigationBar;

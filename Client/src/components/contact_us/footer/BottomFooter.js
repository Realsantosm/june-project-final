import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import {
  faPhoneSquare,
  faEnvelopeSquare,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./BottomFooter.css";
import "./Footer.css";

const BottomFooter = (props) => {
  return (
    <div className="bottom_footer_container">
      <div className="bottom_footer_all_icons_container">
        <div className="bottom_footer_insta_wrapping">
          <div onClick={() => window.open("https://instagram.com/", "_blank")}>
            <FontAwesomeIcon
              className="footer_icon"
              icon={faInstagram}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
        <div className="bottom_footer_facebook_wrapping">
          <div onClick={() => window.open("https://facebook.com/", "_blank")}>
            <FontAwesomeIcon
              className="footer_icon"
              icon={faFacebookSquare}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
        {!props.currentScreenSize ? (
          props.initialScreenSize >= 600 ? null : (
            <div className="bottom_footer_phone_wrapping">
              <a href="tel:1 (600) 200-45855">
                <FontAwesomeIcon className="footer_icon" icon={faPhoneSquare} />
              </a>
            </div>
          )
        ) : props.currentScreenSize >= 600 ? null : (
          <div className="bottom_footer_phone_wrapping">
            <a href="tel:1 (600) 200-45855">
              <FontAwesomeIcon className="footer_icon" icon={faPhoneSquare} />
            </a>
          </div>
        )}
        <div className="bottom_footer_email_wrapping">
          <a href="mailto:santosmmu@gmail.com?subject=Help! What do I book?">
            <FontAwesomeIcon className="footer_icon" icon={faEnvelopeSquare} />
          </a>
        </div>
      </div>
      <div className="bottom_footer_policy_links_container">
        <Link to="privacy">
          <p>PRIVACY POLICY</p>
        </Link>
        <p>|</p>
        <Link to="/termsandconditions">
          <p>TERMS AND CONDITIONS</p>
        </Link>
      </div>
      <div className="bottom_footer_company_details">
        <p>&copy; {new Date().getFullYear()} NC Karnany & Co, LLC</p>
        <p>Christian Basti, India</p>
      </div>
      <div className="bottom_footer_logo_container">
        <h4>NC Karnany & Co.</h4>
      </div>
    </div>
  );
};

export default BottomFooter;

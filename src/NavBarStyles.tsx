import styled from "styled-components";
import { Button, Image } from "react-bootstrap";

export const NavBarLayout = styled.nav`
  top: 0;
  position: -webkit-sticky; /* For Safari */
  position: sticky;
  z-index: 1;
  border: none;
  box-shadow: 0px 0px 20px -9px rgba(0, 0, 0, 0.4);

  background-color: white;

  display: flex;
  flex: 0 0 auto;
  flex-flow: column nowrap;
  justify-content: start;
  align-items: flex-start;

  height: 100vh;
  width: 150px;
  margin-right: 40px;

  padding-left: 16px;
  padding-right: 16px;
`;

export const MobileNavBar = styled.nav`
  top: 0;
  height: 35pt;
  position: -webkit-sticky; /* For Safari */
  position: sticky;
  z-index: 1;
  background-color: white;
  border-bottom: 0.1rem solid #ececec;
`;

export const HamburgerWrapper = styled.span`
  position: fixed;
  z-index: 2;

  /* Position and sizing of burger button */
  .bm-burger-button {
    position: fixed;
    width: 25pt;
    height: 18pt;
    left: 8pt;
    top: 8pt;
  }

  /* Color/shape of burger icon bars */
  .bm-burger-bars {
    background: #373a47;
  }

  /* Color/shape of burger icon bars on hover*/
  .bm-burger-bars-hover {
    background: #a90000;
  }

  /* Position and sizing of clickable cross button */
  .bm-cross-button {
    height: 24px;
    width: 24px;
  }

  /* Color/shape of close button cross */
  .bm-cross {
    background: #bdc3c7;
  }

  .bm-menu-wrap {
    position: fixed;
    height: 100%;
    transition-duration: 0.3s !important;
  }

  /* General sidebar styles */
  .bm-menu {
    background: white;
    padding: 2.5em 1.5em 0;
    font-size: 1.15em;
  }

  /* Morph shape necessary with bubble or elastic */
  .bm-morph-shape {
    fill: #373a47;
  }

  /* Wrapper for item list */
  .bm-item-list {
    color: #b8b7ad;
    padding: 0.8em;
  }

  .bm-item-list > *:last-child {
  }

  /* Individual item */
  .bm-item {
    padding: 10pt;
    display: inline-block;
    outline: none;
  }

  .bm-item:hover {
    transition-duration: 0.2s;
    box-shadow: 0 0 0pt 1pt rgba(78, 162, 245, 0.7);
    text-decoration: none;
  }

  /* Styling of overlay */
  .bm-overlay {
    background: rgba(0, 0, 0, 0.3);
  }
`;

export const Logo = styled(Image)`
  display: inline-block;
  object-fit: contain;
  width: 100%;
  padding: 10px;
  margin-bottom: 30px;
  margin-top: 40px;
`;

export const MobileLogo = styled(Image)`
  display: inline-block;
  object-fit: contain;
  width: 100%;
  padding: 5pt;
`;

export const MobileTextLogo = styled(Image)`
  display: block;
  object-fit: contain;
  height: 100%;
  max-width: 100%;
  padding: 8px;
  padding-left: 60px;
  margin: auto;
`;

export const LogoutButton = styled(Button)`
  position: absolute;
  bottom: 8pt;
`;

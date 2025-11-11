
import React, { useState, useEffect } from "react";
import SimpleBar from 'simplebar-react';
import { useLocation, useHistory } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBoxOpen, faChartPie, faCog, faFileAlt, faHandHoldingUsd, faSignOutAlt, faTable, faTimes, faCalendarAlt, faMapPin, faInbox, faRocket, faChevronDown, faChevronUp, faBars, faSearch, faUsers } from "@fortawesome/free-solid-svg-icons";
import { Nav, Badge, Image, Button, Dropdown, Accordion, Navbar, Form, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "../routes";
import ThemesbergLogo from "../assets/img/themesberg.svg";
// import ReactHero from "../assets/img/technologies/react-hero-logo.svg";
import VoltLogo from "../assets/img/favicon/apple-touch-icon.png";
import ProfilePicture from "../assets/img/team/profile-picture-3.jpg";
import ApiService from "../services/api";
import { useSidebar } from "../contexts/SidebarContext";

export default (props = {}) => {
  const location = useLocation();
  const history = useHistory();
  const { pathname } = location;
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { sidebarCollapsed, toggleSidebar } = useSidebar();
  const showClass = show ? "show" : "";

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const userProfile = localStorage.getItem('userProfile');
    if (userProfile) {
      setUser(JSON.parse(userProfile));
    }
  }, []);

  const handleLogout = () => {
    ApiService.logout();
    localStorage.removeItem('userProfile');
    history.push(Routes.Login.path);
  };

  const onCollapse = () => setShow(!show);

  const CollapsableNavItem = (props) => {
    const { eventKey, title, icon, children = null } = props;
    const defaultKey = pathname.indexOf(eventKey) !== -1 ? eventKey : "";
    const [isExpanded, setIsExpanded] = useState(defaultKey === eventKey);

    return (
      <Accordion as={Nav.Item} defaultActiveKey={defaultKey}>
        <Accordion.Item eventKey={eventKey}>
          <Accordion.Button 
            as={Nav.Link} 
            className="d-flex justify-content-between align-items-center"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span>
              <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /> </span>
              <span className="sidebar-text">{title}</span>
            </span>
            <FontAwesomeIcon 
              icon={isExpanded ? faChevronUp : faChevronDown} 
              className="sidebar-dropdown-icon ms-2" 
            />
          </Accordion.Button>
          <Accordion.Body className="multi-level">
            <Nav className="flex-column">
              {children}
            </Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  };

  const NavItem = (props) => {
    const { 
      title, 
      link, 
      external, 
      target, 
      icon, 
      image, 
      badgeText, 
      badgeBg = "secondary", 
      badgeColor = "primary",
      className // <- ambil className dari props
    } = props;

    const classNames = badgeText 
      ? "d-flex justify-content-start align-items-center justify-content-between" 
      : "";

    const navItemClassName = link === pathname ? "active" : "";

    const linkProps = external ? { href: link } : { as: Link, to: link };

    return (
      <Nav.Item 
        className={`${navItemClassName} ${className || ""}`} // <- gabungkan className props
        onClick={() => setShow(false)}
      >
        <Nav.Link {...linkProps} target={target} className={classNames}>
          <span>
            {icon && <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /></span>}
            {image && <Image src={image} width={20} height={20} className="sidebar-icon svg-icon" />}
            <span className="sidebar-text">{title}</span>
          </span>
          {badgeText && (
            <Badge pill bg={badgeBg} text={badgeColor} className="badge-md notification-count ms-2">
              {badgeText}
            </Badge>
          )}
        </Nav.Link>
      </Nav.Item>
    );
  };

  return (
    <>
      <Navbar expand={false} collapseOnSelect variant="dark" className="navbar-theme-primary px-4 d-md-none w-100" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1060 }}>
        <Navbar.Brand className="me-lg-5" as={Link} to={Routes.DashboardOverview.path}>
          <Image src={ThemesbergLogo} className="navbar-brand-light" />
        </Navbar.Brand>
        <Navbar.Toggle as={Button} aria-controls="main-navbar" onClick={onCollapse}>
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
      </Navbar>
      {/* Desktop Sidebar Toggle & Search */}
      <div className="d-none d-lg-flex align-items-center position-fixed" style={{ top: '20px', left: sidebarCollapsed ? '20px' : '300px', zIndex: 1070, transition: 'left 0.3s' }}>
        <Button 
          id="sidebar-toggle" 
          type="button" 
          className="sidebar-toggle align-items-center justify-content-center me-3 btn btn-icon-only btn-lg"
          onClick={toggleSidebar}
        >
          <FontAwesomeIcon icon={faBars} className="toggle-icon" />
        </Button>
        <Form className="navbar-search form-inline">
          <Form.Group id="topbarSearch">
            <InputGroup className="input-group-merge search-bar">
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} className="icon icon-xs" />
              </InputGroup.Text>
              <Form.Control placeholder="Search" type="text" />
            </InputGroup>
          </Form.Group>
        </Form>
      </div>

      <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
        <SimpleBar className={`collapse ${showClass} sidebar d-md-block bg-primary text-white position-fixed`} style={{ top: 0, left: isMobile ? 0 : (sidebarCollapsed ? '-280px' : 0), height: '100vh', width: isMobile ? '100%' : '280px', zIndex: 1050, transition: 'left 0.3s' }}>
          <div className="sidebar-inner px-4 pt-3">
            <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
              <div className="d-flex align-items-center">
                <div className="user-avatar lg-avatar me-4">
                  <Image src={ProfilePicture} className="card-img-top rounded-circle border-white" />
                </div>
                <div className="d-block">
                  <h6>Hi, {user ? user.firstName : 'User'}</h6>
                  <Button variant="secondary" size="xs" onClick={handleLogout} className="text-dark">
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> Sign Out
                  </Button>
                </div>
              </div>
              <Nav.Link className="collapse-close d-md-none" onClick={onCollapse}>
                <FontAwesomeIcon icon={faTimes} />
              </Nav.Link>
            </div>
            <Nav className="flex-column pt-3 pt-md-0">
              <NavItem title="Volt React" link={Routes.Presentation.path} image={ThemesbergLogo} className="d-none d-md-block"/>
              <Dropdown.Divider className="my-3 border-indigo d-none d-md-block" />

              <NavItem title="Overview" link={Routes.DashboardOverview.path} icon={faChartPie} />
              <NavItem title="Products" icon={faBoxOpen} link={Routes.Products.path} />
              <NavItem title="Characters" icon={faUsers} link={Routes.Characters.path} />
              <NavItem title="Transactions" icon={faHandHoldingUsd} link={Routes.Transactions.path} />
              <NavItem title="Settings" icon={faCog} link={Routes.Settings.path} />

              <CollapsableNavItem eventKey="tables/" title="Tables" icon={faTable}>
                <NavItem title="Bootstrap Table" link={Routes.BootstrapTables.path} />
              </CollapsableNavItem>

              <CollapsableNavItem eventKey="examples/" title="Page Examples" icon={faFileAlt}>
                <NavItem title="Sign In" link={Routes.Signin.path} />
                <NavItem title="Sign Up" link={Routes.Signup.path} />
                <NavItem title="Forgot password" link={Routes.ForgotPassword.path} />
                <NavItem title="Reset password" link={Routes.ResetPassword.path} />
                <NavItem title="Lock" link={Routes.Lock.path} />
                <NavItem title="404 Not Found" link={Routes.NotFound.path} />
                <NavItem title="500 Server Error" link={Routes.ServerError.path} />
              </CollapsableNavItem>

              <Dropdown.Divider className="my-3 border-indigo" />

              <CollapsableNavItem eventKey="documentation/" title="Getting Started" icon={faBook}>
                <NavItem title="Overview" link={Routes.DocsOverview.path} />
                <NavItem title="Download" link={Routes.DocsDownload.path} />
                <NavItem title="Quick Start" link={Routes.DocsQuickStart.path} />
                <NavItem title="License" link={Routes.DocsLicense.path} />
                <NavItem title="Folder Structure" link={Routes.DocsFolderStructure.path} />
                <NavItem title="Build Tools" link={Routes.DocsBuild.path} />
                <NavItem title="Changelog" link={Routes.DocsChangelog.path} />
              </CollapsableNavItem>
              <CollapsableNavItem eventKey="components/" title="Components" icon={faBoxOpen}>
                <NavItem title="Accordion" link={Routes.Accordions.path} />
                <NavItem title="Alerts" link={Routes.Alerts.path} />
                <NavItem title="Badges" link={Routes.Badges.path} />
                <NavItem title="Breadcrumbs" link={Routes.Breadcrumbs.path} />
                <NavItem title="Buttons" link={Routes.Buttons.path} />
                <NavItem title="Forms" link={Routes.Forms.path} />
                <NavItem title="Modals" link={Routes.Modals.path} />
                <NavItem title="Navbars" link={Routes.Navbars.path} />
                <NavItem title="Navs" link={Routes.Navs.path} />
                <NavItem title="Pagination" link={Routes.Pagination.path} />
                <NavItem title="Popovers" link={Routes.Popovers.path} />
                <NavItem title="Progress" link={Routes.Progress.path} />
                <NavItem title="Tables" link={Routes.Tables.path} />
                <NavItem title="Tabs" link={Routes.Tabs.path} />
                <NavItem title="Toasts" link={Routes.Toasts.path} />
                <NavItem title="Tooltips" link={Routes.Tooltips.path} />
              </CollapsableNavItem>
            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};

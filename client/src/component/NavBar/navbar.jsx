import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Badge } from "react-bootstrap";
import { getMemoizedUserData } from "../../redux/Selectors/users";
import { getMemoizedAdminData } from "../../redux/Selectors/admin";
import { getMemoizedCartData } from "../../redux/Selectors/cart";
import { LinkWrapper } from "./styles";
import { clearUserLoginData } from "../../redux/Actions/users";
import { clearAdminLoginData } from "../../redux/Actions/admin";

const NavBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { userLogin } = useSelector(getMemoizedUserData);
  const { adminLogin } = useSelector(getMemoizedAdminData);
  const { cartData } = useSelector(getMemoizedCartData);

  let totalCartProducts = cartData.reduce((memo, currentvalue) => {
    return memo + currentvalue.productCount;
  }, 0);
  const userData =
    JSON.parse(localStorage.getItem("userData")) || userLogin.user;
  const adminData =
    JSON.parse(localStorage.getItem("adminData")) || adminLogin.admin;
  const googleUser =
    JSON.parse(localStorage.getItem("googleUserData")) || userLogin.user;

  let dropDownTitle = "";

  if (userData && Object.keys(userData).length > 0) {
    dropDownTitle = userData.name;
  } else if (adminData && Object.keys(adminData).length > 0) {
    dropDownTitle = adminData.name;
  } else if (googleUser && Object.keys(googleUser).length > 0) {
    dropDownTitle = googleUser.name;
  }
  // userData && Object.keys(userData).length > 0
  //   ? `${userData.name}`
  //   : adminData && Object.keys(adminData).length > 0
  //   ? `${adminData.name}`
  //   : googleUser && Object.keys(googleUser).length > 0
  //   ? `${googleUser.name}`
  //   : "Dropdown";

  const handleLogout = () => {
    if (userData && Object.keys(userData).length > 0) {
      localStorage.clear();
      history.push("/signIn");
      dispatch(clearUserLoginData());
    } else if (adminData && Object.keys(adminData).length > 0) {
      localStorage.clear();
      history.push("/adminSignIn");
      dispatch(clearAdminLoginData());
    }
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand style={{ cursor: "pointer" }}>O-Shop</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link>
            <Link className="link-style" to="/home">
              Home
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link className="link-style" to="/cart">
              Cart
            </Link>
            {/* showing total different products in cart */}
            {totalCartProducts > 0 ? (
              <Badge pill variant="warning">
                {totalCartProducts}
              </Badge>
            ) : null}
          </Nav.Link>
          {userData || adminData ? (
            <NavDropdown title={dropDownTitle} id="basic-nav-dropdown">
              <NavDropdown.Item>
                <Link className="link-style" to="/my/orders">
                  Orders
                </Link>
              </NavDropdown.Item>
              {adminData && adminData.userType && (
                <React.Fragment>
                  <NavDropdown.Item>
                    <Link className="link-style" to="/admin/orders">
                      Manage Orders
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link className="link-style" to="/admin/products">
                      Manage Products
                    </Link>
                  </NavDropdown.Item>
                </React.Fragment>
              )}
              <NavDropdown.Divider />
              <NavDropdown.Item>
                {(userData || adminData) && (
                  <LinkWrapper onClick={handleLogout}>Logout</LinkWrapper>
                )}
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav.Link>
              <Link className="link-style" to="/signIn">
                Login
              </Link>
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;

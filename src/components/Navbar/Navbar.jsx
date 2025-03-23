import React from "react";

import { Nav, Container, Logo, Links, NavLink } from "./Navbar.styles";

const Navbar = () => {
  return (
    <Nav>
      <Container>
        <Logo to="/">Questionnaire</Logo>
        <Links>
          <NavLink to="/">Catalog</NavLink>
          <NavLink to="/create">Create</NavLink>
        </Links>
      </Container>
    </Nav>
  );
};

export default Navbar;

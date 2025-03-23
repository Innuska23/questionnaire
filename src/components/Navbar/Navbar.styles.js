import styled from "styled-components";
import { Link } from "react-router-dom";

export const Nav = styled.nav`
  background: white;
  padding: 1rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
`;

export const Links = styled.div`
  display: flex;
  gap: 1.5rem;
`;

export const NavLink = styled(Link)`
  color: #4a90e2;
  font-weight: 500;
  &:hover {
    color: #357abd;
  }
`;

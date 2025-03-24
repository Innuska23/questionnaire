import styled from "styled-components";
import { Link } from "react-router-dom";

export const Nav = styled.nav`
  background: white;
  padding: 1rem 0;
  box-shadow: var(--box-shadow);
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
  color: var(--text-color);
`;

export const Links = styled.div`
  display: flex;
  gap: 1.5rem;
`;

export const NavLink = styled(Link)`
  color: var(--primary-color);
  font-weight: var(--font-weight-500);
  font-size: 1.2rem;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
  transition: color 0.3s ease, text-shadow 0.3s ease;

  &:hover {
    color: var(--hover-color);
    text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
  }
`;

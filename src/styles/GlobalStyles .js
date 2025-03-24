import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
 :root {
    --primary-color: #4a90e2;
    --secondary-color: #666;
    --hover-color: #357abd;
    --text-color: #333;  
    --box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    --font-weight-500: 500;
    --font-weight-600: 600;
    --error-color: #e74c3c;
    --error-color-focus: #c0392b;
    --background-color: #f9f9f9;
  }
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Segoe UI', sans-serif;
    background-color: #f4f6f8;
    color: #333;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    min-height: 100vh;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }
`;

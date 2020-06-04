import { DefaultTheme } from "styled-components";

export interface Theme {
  marginHuge: string;
  marginLarge: string;
  marginMedium: string;
  marginSmall: string;

  smallViewport: string;
  mediumViewport: string;
  largeViewport: string;
}

const theme: DefaultTheme = {
  marginHuge: "24px",
  marginLarge: "16px",
  marginMedium: "12px",
  marginSmall: "8px",

  smallViewport: "576px",
  mediumViewport: "768px",
  largeViewport: "992px",
};

export default theme;

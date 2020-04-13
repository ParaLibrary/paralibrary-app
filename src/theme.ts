import { DefaultTheme } from "styled-components";

export interface Theme {
  marginHuge: string;
  marginLarge: string;
  marginMedium: string;
  marginSmall: string;

  smallViewport: string;
}

const theme: DefaultTheme.DefaultTheme = {
  marginHuge: "24px",
  marginLarge: "16px",
  marginMedium: "12px",
  marginSmall: "8px",

  smallViewport: "480px",
};

export default theme;

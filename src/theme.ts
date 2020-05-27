import { DefaultTheme } from "styled-components";

export interface Theme {
  marginHuge: string;
  marginLarge: string;
  marginMedium: string;
  marginSmall: string;

  smallViewport: string;
}

// Not sure why DefaultTheme is a namespace here...
// didn't appear in any examples online so it might
// be part of reason the theme isn't usable
const theme: DefaultTheme = {
  marginHuge: "24px",
  marginLarge: "16px",
  marginMedium: "12px",
  marginSmall: "8px",

  smallViewport: "480px",
};

export default theme;

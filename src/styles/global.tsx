import React, { FunctionComponent } from "react";
import {
  css, Global,
} from "@emotion/react";
import darkTheme from "./themes/dark";
import baseTheme from "./themes/base";

export const globalStyles = css({
  "body, html": {
    margin: 0,
  },
});

/**
 * A global stylesheet, providing the universal CSS variables. It has dark theme support! 🌑
 *
 * @returns {React.ReactElement} An `@emotion/react` `Global` component.
 */
export const GlobalStyles: FunctionComponent = () => (
  <Global styles={[globalStyles, {
    ":root": {
      ...baseTheme,

      "@media (prefers-color-scheme: dark)": darkTheme,
    },
  }]}
  />
);

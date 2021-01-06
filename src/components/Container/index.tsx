import { css } from "@emotion/react";
import React, { FunctionComponent } from "react";

export const containerStyles = css({
  maxWidth: "1280px",
  margin: "0 auto",
  padding: "0 var(--page-gutter)",
});

/**
 * A container to contain contained content.
 *
 * @param props
 */
const Container: FunctionComponent = (props) => (
  <div css={containerStyles} {...props} />
);

export default Container;

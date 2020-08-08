import React from "react";
import { Layout } from "../components/basic/Layout";
import * as Icon from "react-feather";
import { AutoLink } from "../components/basic/Link";
import { Hero } from "../components/layout/Hero";
import { Navigation } from "../components/basic/Navigation";
import { NormalWidth } from "../components/grid/Col";
import { LeadText } from "../components/basic/Typography";
import { Row } from "../components/grid/Row";

export default class NotFound extends React.Component {
  render() {
    return (
      <Layout title="Sidan hittades inte">
        <Navigation />
        <Hero>
          <Row>
            <NormalWidth>
              <h1>Sidan hittades inte</h1>
              <LeadText>Vi ber om ursäkt.</LeadText>
            </NormalWidth>
          </Row>
        </Hero>
      </Layout>
    );
  }
}

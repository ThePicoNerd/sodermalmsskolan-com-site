import React from "react";
import { Layout } from "../../components/layout/Layout";
import { PostGridAuto } from "../../components/blog/PostGrid";
import { Section } from "../../components/layout/Section";
import { Navigation } from "../../components/layout/Navigation";
import FeaturedPost from "../../components/blog/FeaturedPost";
import { Base } from "../../components/grid/Base";
import { Hero } from "../../components/layout/Hero";

const Page: React.FunctionComponent = () => {
  return (
    <Layout metadata={{ title: "Blogg" }}>
      <Navigation />
      <Hero>
        <Base>
          <FeaturedPost />
        </Base>
      </Hero>
      <Section>
        <PostGridAuto skip={1} />
      </Section>
    </Layout>
  );
};

export default Page;

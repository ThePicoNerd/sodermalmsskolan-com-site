import { NextPage } from "next";
import React from "react";
import Base from "../../components/Base";
import BlogHeader from "../../components/blog/Header";
import PostListSection from "../../components/blog/PostListSection";
import Footer from "../../components/footer/Footer";

const Page: NextPage = () => (
  <Base>
    <BlogHeader />
    <PostListSection />
    <Footer />
  </Base>
);

export default Page;

import { NextPage } from "next";
import React from "react";
import Base from "../../components/Base";
import Footer from "../../components/footer/Footer";
import MenuHeader from "../../components/menu/Header";

const Page: NextPage = () => (
  <Base metadata={{
    title: "Meny",
  }}
  >
    <MenuHeader />
    <Footer />
  </Base>
);

export default Page;

import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Layout({ InnerComponent }) {
  return (
    <>
      {/*<MetaTag />*/}
      <Header />
      <InnerComponent />
      <Footer />
    </>
  );
}

export default Layout;
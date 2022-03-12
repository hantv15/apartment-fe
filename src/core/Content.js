import React from "react";
import Header from "./Header";
import Menu from "./Menu";
import Footer from "./Footer";
const Content = ({ title = "Dashboard", subName = "Admin", children }) => {
  return (
    <div>
      <Header />
      <Menu />
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">{title}</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <p href="#">Admin</p>
                  </li>
                  <li className="breadcrumb-item active">{title}</li>
                </ol>
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </div>
        {/* /.content-header */}
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            {/* Small boxes (Stat box) */}
            {children}
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
      <Footer />
    </div>
  );
};

export default Content;

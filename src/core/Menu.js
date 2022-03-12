import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavLink, useHistory } from "react-router-dom";
import { isAuthenticate, sigOut } from "../auth";

const Menu = () => {
  const history = useHistory();
  const { data } = isAuthenticate();
  const logout = async () => {
    let headersList = {
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Authorization": `Bearer ${data.data.token}`
    }

    fetch("http://apartment-system.xyz/api/logout", {
      method: "POST",
      headers: headersList
    }).then(function (response) {
      history.push("/");
    }).then(function (data) {
      console.log(data);
    })
    sigOut();
  }
  return (
    <>
      {/* Main Sidebar Container */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a href="index3.html" className="brand-link">
          <img
            src={process.env.PUBLIC_URL + "/dist/img/AdminLTELogo.png"}
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          />
          <span className="brand-text font-weight-light">AdminLTE 3</span>
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src={data.data.avatar ? data.data.avatar : process.env.PUBLIC_URL + "/dist/img/user2-160x160.jpg"}
                className="img-circle elevation-2"
                alt="User Image"
              />
            </div>
            <div className="info">
              <a href="#" className="d-block">
                {data.data.name}
              </a>
            </div>
          </div>
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* Add icons to the links using the .nav-icon class
           with font-awesome or any other icon font library */}
              <li className="nav-item">
                <Link
                  exact
                  activeClassName="active"
                  to="/admin/dashboard"
                  className="nav-link"
                >
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>
                    Dashboard
                    {/* <span className="right badge badge-danger">New</span> */}
                  </p>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  exact
                  activeClassName="active"
                  to="/admin/department"
                  className="nav-link"
                >
                  <i className="nav-icon fas fa-building" />
                  <p>
                    Căn hộ
                    {/* <span className="right badge badge-danger">New</span> */}
                  </p>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  exact
                  activeClassName="active"
                  to="/admin/user"
                  className="nav-link"
                >
                  <i className="nav-icon fas fa-users" />
                  <p>
                    Người dùng
                    {/* <span className="right badge badge-danger">New</span> */}
                  </p>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  exact
                  activeClassName="active"
                  to="/admin/service"
                  className="nav-link"
                >
                  <i className="nav-icon fas fa-check" />
                  <p>
                    Dịch vụ
                    {/* <span className="right badge badge-danger">New</span> */}
                  </p>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="#" className="nav-link">
                  <i className="nav-icon fas fa-table" />
                  <p>
                    Thông báo
                    <i className="fas fa-angle-left right" />
                  </p>
                </Link>
                <ul className="nav nav-treeview" style={{ display: 'none' }}>
                  <li className="nav-item">
                    <Link to="/admin/fire_notification" className="nav-link">
                      <i className="fa fa-solid fa-fire nav-icon" />
                      <p>Báo cháy</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a href="../tables/data.html" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Báo diễn tập</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="../tables/jsgrid.html" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>jsGrid</p>
                    </a>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <a
                  exact
                  activeClassName="active"
                  className="nav-link"
                  onClick={() => logout()}
                >
                  <i className="nav-icon fa fa-share" />
                  <p>
                    Đăng xuất
                    {/* <span className="right badge badge-danger">New</span> */}
                  </p>
                </a>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    </>
  );
};

export default Menu;

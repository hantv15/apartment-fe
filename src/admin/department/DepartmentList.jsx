import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import querystring from "query-string";
import Swal from "sweetalert2";
// ES6 Modules or TypeScript
import Content from "../../core/Content";
import DepartmentDetail from "./DepartmentDetail";
import axios from "axios";
import { get, NoGetPage } from "../../common/apartment";
import SelectOption from "../../components/SelectOption";
import InputSearch from "../../components/InputSearch";
import { getBuildings } from "../../api/buildingAPI";
const DepartmentList = () => {
  const [apartments, setApartments] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [curPage, setCurPage] = useState(1);
  const [file, setFile] = useState({});
  const [filters, setFilters] = useState({
    page_size: 10,
    page: 1,
    building_id: "",
    keyword: "",
  });
  const [filtersNoPage, setFiltersNoPage] = useState({
    building_id: "",
    keyword: "",
  });
  const pageSize = [
    {
      label: "Hiển thị 10 mục",
      value: 10,
    },
    {
      label: "Hiển thị 2 mục",
      value: 2,
    },
    {
      label: "Hiển thị 5 mục",
      value: 5,
    },

    {
      label: "Hiển thị 15 mục",
      value: 15,
    },
    {
      label: "Hiển thị 20 mục",
      value: 20,
    },
  ];
  const statusOptions = [
    {
      value: 1,
      name: "Hoạt động",
    },
    {
      value: 0,
      name: "Không hoạt động",
    },
  ];

  const paramString = querystring.stringify(filters);
  const paramNoPageSize = querystring.stringify(filtersNoPage);

  useEffect(() => {
    try {
      const getApartments = async () => {
        const { data } = await NoGetPage(paramNoPageSize);
        console.log(data.data);
        const countData = Math.ceil(data.data.length / filters.page_size);
        setPageCount(countData);
      };
      getApartments();
    } catch (error) {
      console.log(error.message);
    }
  }, [filters]);

  console.log(pageCount);
  useEffect(() => {
    try {
      const getApartments = async () => {
        const { data } = await get(paramString);
        setApartments(data.data);
      };
      getApartments();
    } catch (error) {
      console.log(error.message);
    }
  }, [filters]);

  useEffect(() => {
    try {
      const getBuildingList = async () => {
        const { data } = await getBuildings();
        setBuildings(data.data);
      };
      getBuildingList();
    } catch (error) {
      console.log(error.response.message);
    }
  }, []);

  const handleChangePageSize = (value) => {
    setFilters({
      ...filters,
      page_size: value,
    });
  };

  const handleGetValue = (value) => {
    setFilters({
      ...filters,
      keyword: value,
    });
    setFiltersNoPage({
      ...filtersNoPage,
      keyword: value,
    });
  };
  const handlePageClick = (data) => {
    const currentPage = data.selected + 1;
    setCurPage(currentPage);
    setFilters({
      ...filters,
      page: currentPage,
    });
    console.log("currentPage: ", currentPage);
  };

  const handleSelectBuilding = (e) => {
    console.log(e.target.value);
    setFilters({
      ...filters,
      building_id: e.target.value,
    });
    setFiltersNoPage({
      ...filtersNoPage,
      building_id: e.target.value,
    });
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      const data = new FormData();
      data.append("file_upload", file);
      console.log("excel");
      axios
        .post("http://apartment-system.xyz/api/apartment/upload-excel", data)
        .then(() => {
          var Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
          });
          Toast.fire({
            icon: "success",
            title: "Import excel thành công.",
          });
        });
    } else {
      var Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
      });
      Toast.fire({
        icon: "error",
        title:
          "Import excel không thành công, vui lòng xem lại định dạng file.",
      });
    }
  };

  return (
    <Content title="Căn Hộ">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h3>Danh sách căn hộ</h3>
            </div>
            <div className="card-body">
              <div className="row ">
                <div className="col-sm-6">
                  <div className="input-group my-2 ms-2">
                    <div className="custom-file ">
                      <form
                        id="quickForm"
                        method="post"
                        onSubmit={submitHandler}
                        encType="multipart/form-data"
                        noValidate="novalidate d-flex"
                      >
                        <div className="d-flex form-outline pt-3">
                          <div className="form-group">
                            <div className="custom-file">
                              <input
                                type="file"
                                className="custom-file-input"
                                id="customFile"
                                onChange={handleChange}
                              />
                              <label
                                className="custom-file-label"
                                htmlFor="customFile"
                              >
                                Choose file
                              </label>
                            </div>
                          </div>

                          <div className="form-group ml-2">
                            <button
                              type="submit"
                              className="btn btn-block btn-outline-primary"
                            >
                              Import
                            </button>
                          </div>
                        </div>
                        {/* /.card-body */}
                      </form>
                      <div className="form-outline ml-2">
                        <a
                          type="button"
                          href="http://localhost:8000/api/apartment-export"
                          className="btn btn-block btn-outline-primary"
                        >
                          Export
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="input-group d-flex flex-row-reverse rounded my-2 ms-2">
                    <div className="form-outline ">
                      {/* <DepartmentSearch onSubmit={handleSearchChange} /> */}
                      <InputSearch handleGetValue={handleGetValue} />
                    </div>
                    <div className="form-outline mr-2">
                      <SelectOption
                        array={pageSize}
                        handleGetValue={handleChangePageSize}
                      />
                    </div>
                    <div className="form-outline mr-2">
                      <select
                        onChange={handleSelectBuilding}
                        className="form-control"
                      >
                        <option selected value="">
                          Chọn tòa
                        </option>
                        {buildings.map((item) => (
                          <option value={item.id}>{item.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Mã căn hộ</th>
                        <th scope="col">Tòa</th>
                        <th scope="col">Diện tích</th>
                        <th scope="col">Chủ sở hữu</th>
                        <th scope="col">Số điện thoại</th>
                        <th scope="col">Trạng thái</th>
                        <th>
                          <Link
                            className="btn btn-sm btn-outline-success btn-flat"
                            to="/admin/department/add"
                          >
                            Thêm mới
                          </Link>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {apartments.map((department, index) => (
                        <tr key={department.id}>
                          <th scope="row">
                            {(curPage - 1) * filters.page_size + (index + 1)}
                          </th>
                          <td>{department.apartment_id}</td>
                          <td>{department.building_id}</td>
                          <td>{department.square_meters}m2</td>
                          <td>{department.name}</td>
                          <td>{department.phone_number}</td>
                          <td>
                            {statusOptions.map((status) =>
                              status.value == department.status
                                ? status.name
                                : ""
                            )}
                          </td>
                          <td>
                            <Link
                              className="btn btn-sm btn-outline-primary btn-flat"
                              to={`/admin/department/detail/${department.id}`}
                            >
                              Chi tiết
                            </Link>
                            <Link
                              className="ml-1 btn btn-sm btn-outline-success btn-flat"
                              to={`/admin/department/edit/${department.id}`}
                            >
                              Sửa
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <ReactPaginate
                    forcePage={0}
                    previousLabel={"previous"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={3}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination justify-content-center"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Content>
  );
};

export default DepartmentList;

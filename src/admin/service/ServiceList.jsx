import React, { useEffect, useState } from "react";
import Content from "../../core/Content";
import axios from "axios";
import querystring from "query-string";
import ReactPaginate from "react-paginate";
import SelectOption from "../../components/SelectOption";
import { get } from "../../common/service";
const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [pageCount, setPageCount] = useState("");
  const [filters, setFilters] = useState({
    page_size: 10,
    page: 1,
    sort: "",
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

  const options = [
    {
      label: "Sắp xếp",
      value: "",
    },
    {
      label: "Giảm dần",
      value: 1,
    },
    {
      label: "Tăng dần",
      value: 2,
    },
  ];

  const paramString = querystring.stringify(filters);

  useEffect(() => {
    try {
      const getServices = async () => {
        const { data } = await get();
        const countData = data.data.length;
        setPageCount(Math.ceil(countData / filters.page_size));
      };
      getServices();
    } catch (error) {
      console.log(error.message);
    }
  }, [filters.page_size]);

  useEffect(() => {
    try {
      const getAllService = async () => {
        const { data } = await get(paramString);
        setServices(data.data);
        console.log(data.data);
      };
      getAllService();
    } catch (error) {
      console.log(error.message);
    }
  }, [paramString]);

  const handleArrange = (value) => {
    setFilters({
      ...filters,
      sort: value,
    });
  };

  const handleChangePageSize = (value) => {
    setFilters({
      ...filters,
      page_size: value,
      page: 1,
    });
    console.log(paramString);
  };

  const handlePageClick = (data) => {
    console.log("data: ", data);
    let currentPage = data.selected + 1;
    setFilters({
      ...filters,
      page: currentPage,
    });
  };
  console.log(filters);
  return (
    <>
      <Content title="Danh sách dịch vụ" subName="Dịch vụ">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="d-flex flex-row-reverse rounded my-2 ms-2">
                      {/* <div className="form-outline ">
                        <input
                          placeholder="Tìm kiếm"
                          className="form-control justify-content-rig justify-content-right"
                          type="text"
                        />
                      </div> */}
                      {/* desc asc */}
                      <SelectOption
                        array={options}
                        handleGetValue={handleArrange}
                      />
                      {/* desc asc */}
                      {/* pagesize */}
                      <SelectOption
                        array={pageSize}
                        handleGetValue={handleChangePageSize}
                      />
                      {/* end pagesize */}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">STT</th>
                          <th scope="col">Tên dịch vụ</th>
                          <th scope="col">Giá</th>
                          <th scope="col">Mô tả</th>
                          <th>
                            <a
                              className="btn btn-sm btn-outline-success btn-flat"
                              href="/admin/service/add"
                            >
                              Thêm mới
                            </a>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {services
                          ? services.map((item, index) => (
                              <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.price}đ</td>
                                <td>{item.description}</td>
                                <td>
                                  {/* <a
                              className="btn btn-sm btn-outline-primary btn-flat"
                              href="/admin/department/detail/13"
                            >
                              Chi tiết
                            </a> */}
                                  <a
                                    className="btn btn-sm btn-outline-success btn-flat"
                                    href="/admin/department/edit/13"
                                  >
                                    Sửa
                                  </a>
                                  <button className="btn btn-sm btn-outline-danger btn-flat">
                                    Xóa
                                  </button>
                                </td>
                              </tr>
                            ))
                          : "Không có dữ liệu"}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <ReactPaginate
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
                      activeClassName={"active"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </>
  );
};

export default ServiceList;

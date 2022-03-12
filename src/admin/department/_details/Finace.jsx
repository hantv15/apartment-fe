import React, { useState,useEffect } from "react";
import ReactPaginate from "react-paginate";
import PaymentHistory from "./PaymentHistory";
import { useParams } from "react-router-dom";
import { get,getBill } from "../../../common/departmentAPI";
import { Button, Modal } from "react-bootstrap";
import BillModal from "../Modal/BillModal";
import { Link } from "react-router-dom";

const Finace = () => {
  const [showPaymentHistory, setShowPaymentHistory] = useState(false);
  const [show, setShow] = useState(false);
  const [departments, setDepartments] = useState([]);
  const handleClose = () => setShow(false);
  const handleShows = () => setShow(true);
  const handleShow = () => {
    setShowPaymentHistory(!showPaymentHistory);
  };
  const statusOptions = [
    {
      value: 1,
      name: "Trả",
    },
    {
      value: 0,
      name: "Chưa trả",
    },
  ];
  const { id } = useParams();
  useEffect(() => {
    const getDepartments = async () => {
      try {
        const { data } = await getBill(id);
        
        setDepartments(data.data);
        console.log(data);
        // console.log(datas);
      } catch (error) {
        console.log(error);
      }
    };

    getDepartments();
  }, []);
  console.log(id);
  return (
    <>
      <div className="row mb-3">
        <div className="tab-content col-sm-12">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div class="card-header">
                  <h3 class="card-title">Thông tin hóa đơn</h3>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-12">
                      <table className="table table-bordered dataTable dtr-inline">
                        <thead>
                          <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Tên hóa đơn</th>
                            <th scope="col">Tên chủ hộ</th>
                            
                            <th scope="col">Tổng tiền</th>
                            <th scope="col">Trạng thái</th>
                            <th className="d-flex justify-content-center">
                              {/* <a
                                className="btn btn-sm btn-outline-success btn-flat"
                                to="/admin/department/add"
                              >
                                Thêm mới
                              </a> */}
                              Chức năng
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                        {departments.map((item,index)=>(
                              <tr key={item.id}>                          
                              <th scope="row">{index + 1}</th>
                              <td>{item.ten_hoa_don}</td>
                              <td>{item.ten_chu_ho}</td>
                              <td>{item.amount}</td>
                              
                              <td>
                            {statusOptions.map((status) =>
                              status.value == item.status
                                ? status.name
                                : ""
                            )}
                          </td>
                              <td className="d-flex justify-content-center">
                                <Link
                                  variant="btn btn-sm btn-outline-primary btn-flat"
                                  to={`/admin/department/modal/${item.id}`}
                                >
                                  Chi tiết
                                </Link>
                                <Link
                                  className="btn btn-sm btn-outline-success btn-flat"
                                  variant="btn btn-sm btn-outline-primary btn-flat"
                                  to={`/admin/department/modalAdd/${item.id}`}
                                >
                                  Thêm
                                </Link>
                              </td>
                            </tr>
                              ))}
                          
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/* <div className="row">
                    <div className="col-sm-12">
                      <ReactPaginate
                        previousLabel={"previous"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        pageCount={10}
                        marginPagesDisplayed={3}
                        pageRangeDisplayed={3}
                        // onPageChange={}
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
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <button
          onClick={() => {
            handleShow();
          }}
          className="btn btn-sm btn-outline-success btn-flat"
        >
          {showPaymentHistory
            ? "Ẩn hiển thị lịch sử thanh toán"
            : "Hiển thị lịch sử thanh toán"}
        </button>
      </div>
      {showPaymentHistory && (
        <PaymentHistory
          handleClose={handleClose}
          show={show}
          handleShows={handleShows}
        />
      )}
      {/* {show && <BillModal handleClose={handleClose} show={show} />} */}
    </>
  );
};

export default Finace;

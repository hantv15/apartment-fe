import { Button } from "react-bootstrap";
import BillModal from "../Modal/BillModal";
import React, {useEffect, useState} from "react";
import { get,getBills } from "../../../common/departmentAPI";

import { Link,useParams } from "react-router-dom";
const PaymentHistory = () => {
  const [departments, setDepartments] = useState([]);
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
        const { data } = await getBills(id);
        
        setDepartments(data.data);
        console.log(data);
        // console.log(datas);
      } catch (error) {
        console.log(error);
      }
    };

    getDepartments();
  }, []);
  return (
    <>
      <div className="row mb-3 mt-4">
        <div className="tab-content col-sm-12">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div class="card-header">
                  <h3 class="card-title">Lịch sử hóa đơn đã thanh toán</h3>
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
      {/* Modal */}
      {/* {show && <BillModal handleClose={handleClose} show={show} />} */}
    </>
  );
};

export default PaymentHistory;

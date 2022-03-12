
import React, { useState,useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useParams } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import BillModal from "../Modal/BillModal";
import { Link } from "react-router-dom";
import { get,getCard } from "../../../common/departmentAPI";

const Card = () => {
  const statusOptions = [
    {
      value: 1,
      name: "Active",
    },
    {
      value: 0,
      name: "InActive",
    },
  ];
  const [departments, setDepartments] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const getDepartments = async () => {
      try {
        const { data } = await getCard(id);
        
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
      <div className="row mb-3">
        <div className="tab-content col-sm-12">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="row "></div>
                  <div className="row">
                    <div className="col-sm-12">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Mã thẻ</th>
                            <th scope="col">Chủ thẻ</th>
                            <th scope="col">Han</th>
                            <th scope="col">Trang thai</th>
                            <th scope="col">Biển xe</th>
                            <th scope="col">Loại</th>
                          </tr>
                        </thead>
                        <tbody>
                        {departments.map((item,index)=>(
                              <tr key={item.id}>                          
                              <th scope="row">{index + 1}</th>
                              <td>{item.number}</td>
                              <td>{item.name}</td>
                              <td>{item.expire_time}</td>
                              
                              <td>
                            {statusOptions.map((status) =>
                              status.value == item.status
                                ? status.name
                                : ""
                            )}
                          </td>
                          <td>{item.plate_number}</td>
                          <td>{item.loai_phuong_tien}</td>
                              <td className="d-flex justify-content-center">
                                <Button
                                  variant="btn btn-sm btn-outline-primary btn-flat"
                                  
                                >
                                  Them
                                </Button>
                                <Link
                                  className="btn btn-sm btn-outline-success btn-flat"
                                  variant="btn btn-sm btn-outline-primary btn-flat"
                                  to="/admin/department/invoice"
                                >
                                  In
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
                      {/* <ReactPaginate
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
                      /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;

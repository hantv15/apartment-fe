import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { getBillDetail } from "../../common/departmentAPI";
const BillModal = () => {
  const [departments, setDepartments] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getDepartments = async () => {
      try {
        const { data } = await getBillDetail(id);

        setDepartments(data.data);
        console.log(data);
        // console.log(datas);
      } catch (error) {
        console.log(error);
      }
    };
    getDepartments();
  }, []);
  console.log(departments);
  // đổi san
  return (
    <>
      <div className="card-body">
        <div className="row">
          <div className="col-sm-12">
            <table className="table table-bordered dataTable dtr-inline">
              <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Tên dịch vụ</th>
                  <th scope="col">Số lượng</th>
                  <th scope="col">Giá</th>

                  <th scope="col">Giá tổng</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((item, index) => (
                  <tr key={item.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.ten_dich_vu}</td>
                    <td>{item.quantity}</td>
                    <td>{item.don_gia}</td>
                    <td>{item.total_price}</td>
                    <td className="d-flex justify-content-center">
                      <Link
                        variant="btn btn-sm btn-outline-primary btn-flat"
                        to={`/admin/department/modaledit/${item.bill_id}`}
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
        {/* <div className="row">
              <div className="col-sm-12">
                
              </div>
            </div> */}
      </div>
    </>
  );
};
export default BillModal;

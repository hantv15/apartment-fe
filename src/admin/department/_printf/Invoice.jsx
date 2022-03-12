import React from "react";
import InvoiceContent from "../../../core/Invoice";

const Invoice = () => {
  return (
    <>
      <InvoiceContent>
        <div className="d-flex justify-content-between">
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
                    <tr>
                      <th scope="row">1</th>
                      <td>Tiền nước</td>
                      <td>1</td>
                      <td>500.000đ</td>
                      <td>500.000đ</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* <div className="row">
              <div className="col-sm-12">
                
              </div>
            </div> */}
          </div>
        </div>
      </InvoiceContent>
    </>
  );
};

export default Invoice;

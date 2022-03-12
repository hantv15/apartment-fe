import { Button } from "react-bootstrap";
import BillModal from "../Modal/BillModal";
const PaymentHistory = ({ handleClose, handleShows, show }) => {
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
                            <th scope="col">Địa chỉ</th>
                            <th scope="col">Tổng tiền</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col">Chức năng</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">1</th>
                            <td>Phiếu thu tiền phí tháng 02/2022</td>
                            <td>Nguyễn Văn A</td>
                            <td>P02711</td>
                            <td>500.000đ</td>
                            <td>Đã thanh toán</td>
                            <td className="d-flex justify-content-center">
                              <Button
                                variant="btn btn-sm btn-outline-primary btn-flat"
                                onClick={handleShows}
                              >
                                Chi tiết
                              </Button>
                            </td>
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
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      {show && <BillModal handleClose={handleClose} show={show} />}
    </>
  );
};

export default PaymentHistory;

import React from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import Content from "../../../core/Content";
const ServiceFormAdd = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAddService = async (item) => {};
  const onSubmit = (item) => {
    handleAddService(item);
  };
  const addService = () => {
    const demo = () => {
      console.log(1);
    };
    return (
      <div className="col-md-12">
        <div className="card card-primary">
          {/* /.card-header */}
          {/* form start */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Mã căn hộ</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Nhập mã căn hộ"
                      {...register("department_id", {
                        required: true,
                        pattern: /^[a-zA-Z0-9_.-]*$/i,
                      })}
                    />
                    {errors?.department_id?.type === "required" && (
                      <p className="text-danger">Hãy nhập trường này</p>
                    )}
                    {errors?.department_id?.type === "pattern" && (
                      <p className="text-danger">Hãy nhập các ký từ A-z</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Tên tòa nhà</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Nhập mã căn hộ"
                      {...register("tower", {
                        required: true,
                      })}
                    />
                    {errors?.tower?.type === "required" && (
                      <p className="text-danger">Hãy nhập trường này</p>
                    )}
                    {errors?.tower?.type === "pattern" && (
                      <p className="text-danger">Hãy nhập các ký từ A-z</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">
                      Kích thước căn hộ
                    </label>
                    <input
                      {...register("square_meter", {
                        pattern: /^[0-9]*$/,
                      })}
                      type="text"
                      className="form-control"
                      id="number"
                      name="square_meter"
                      placeholder="Nhập kích thước căn hộ"
                    />
                    {errors?.square_meters?.type === "pattern" && (
                      <p className="text-danger">Hãy nhập các ký từ là số</p>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div class="form-group">
                    <label>Chủ sở hữu</label>
                    <select {...register("user_id")} class="form-control">
                      <option value="1">Hân</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Trạng thái</label>
                    <select {...register("status")} class="form-control">
                      <option value="1">Active</option>
                      <option value="2">InActive</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            {/* /.card-body */}
            <div class="card-footer">
              <Link
                to="/admin/department"
                type="submit"
                class="btn btn-default float-left"
              >
                Quay lại
              </Link>
              <button type="submit" class="btn btn-info float-right">
                Thêm mới
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  return <Content title="Thêm dịch vụ">{addService()}</Content>;
};

export default ServiceFormAdd;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import Content from "../../../core/Content";

const ServiceFormEdit = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const options = [
    {
      label: "Hoạt động",
      value: 1,
    },
    {
      label: "Không hoạt động",
      value: 0,
    },
  ];

  const [service, setService] = useState({});
  const history = useHistory();
  const { id } = useParams();
  useEffect(() => {
    try {
      const getService = async () => {
        await axios
          .get(`http://apartment-system.xyz/api/service/${id}`)
          .then((response) => setService(response.data.data))
          .then((response) => {
            reset(response);
          });
      };
      getService();
    } catch (error) {
      console.log(error);
    }
  }, []);
  console.log(id);
  const onSubmit = (item) => {
    try {
      axios
        .post(`http://apartment-system.xyz/api/service/edit/${id}`, item)
        .then(() => {
          var Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
          });
          Toast.fire({
            icon: "success",
            title: "Sủa dịch vụ thành công.",
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Content title="Chỉnh sửa dịch vụ">
      <div className="col-md-12">
        <div className="card card-primary">
          {/* /.card-header */}
          {/* form start */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Tên dịch vụ</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      defaultValue={service.name}
                      placeholder="Nhập tên dịch vụ"
                      {...register("name", {
                        required: true,
                      })}
                    />
                    {errors?.name?.type === "required" && (
                      <p className="text-danger">Hãy nhập trường này</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Giá</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      defaultValue={service.price}
                      placeholder="Nhập giá dịch vụ"
                      {...register("price", {
                        required: true,
                        pattern: /^[0-9]*$/,
                      })}
                    />
                    {errors?.price?.type === "required" && (
                      <p className="text-danger">Hãy nhập trường này</p>
                    )}
                    {errors?.price?.type === "pattern" && (
                      <p className="text-danger">Nhập ký tự là số</p>
                    )}
                  </div>
                  <div class="form-group">
                    <label>Trạng thái</label>
                    <select
                      defaultValue={service.status}
                      {...register("status")}
                      class="form-control"
                    >
                      {options.map((item) => (
                        <option
                          selected={item.value == service.status}
                          value={item.value}
                        >
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="exampleInputEmail1">Mô tả</label>
                  <textarea
                    {...register("description")}
                    className="form-control"
                    defaultValue={service.description}
                    rows={8}
                    placeholder="Mô tả ..."
                  />
                </div>
              </div>
            </div>
            {/* /.card-body */}
            <div class="card-footer">
              <button
                onClick={() => {
                  history.goBack();
                }}
                type="button"
                class="btn btn-default float-left"
              >
                Quay lại
              </button>
              <button type="submit" class="btn btn-info float-right">
                Lưu sửa
              </button>
            </div>
          </form>
        </div>
      </div>
    </Content>
  );
};

export default ServiceFormEdit;

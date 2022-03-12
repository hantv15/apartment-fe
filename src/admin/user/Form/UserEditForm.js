import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getUser } from "../../../api/userAPI";
import Content from "../../../core/Content";
const UserEditForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [apartmentNotOwned, setApartmentNotOwned] = useState([]);
  const [loadPage, setLoadPage] = useState(0);
  useEffect(() => {
    try {
      const getData = async () => {
        const { data } = await getUser(id);
        setUser(data.data[0]);
        reset(data);
      };
      getData();
    } catch (error) {
      console.log(error);
    }
  }, [loadPage]);

  useEffect(() => {
    try {
      const getDataA = () => {
        axios.get("http://apartment-system.xyz/api/apartment/not-owned").then((response) => setApartmentNotOwned(response.data.data))
      }
      getDataA();
    } catch (error) {
      console.log(error.message);
    }
  }, [])


  const option = {
    label: "P101",
    value: 13
  }
  const onSubmit = (item) => {
    axios.post(`http://apartment-system.xyz/api/user/edit/${id}`, item).then(() => {
      var Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
      });
      Toast.fire({
        icon: "success",
        title: "Sửa người dùng thành công.",
      });
    }).then(() => {
      setLoadPage(1);
    })
  }


  const options = [
    {
      label: "Hoạt động",
      value: 1,
    },
    {
      label: "Không hoạt động",
      value: 0,
    }
  ]

  console.log(user);
  const editUser = () => {
    return (
      <div className="col-md-12">
        <div className="card card-primary">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Tên</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Nhập tên"
                      defaultValue={user.user_name}
                      {...register('name', {
                        required: true,

                      })}
                    />
                    {errors?.name?.type === "required" && <p className="text-danger">Nhập tên</p>}

                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Số điện thoại</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Nhập số điện thoại"
                      defaultValue={user.phone_number}
                      {...register('phone_number', {
                        required: true,
                        pattern: /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
                      })}
                    />
                    {errors?.phone?.type === "required" && <p className="text-danger">số điênj thoại</p>}
                    {errors?.phone?.type === "pattern" && <p className="text-danger">Hãy nhập đúng ký tự</p>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Nhập email"
                      defaultValue={user.email}
                      {...register('email', {
                        required: true,
                        pattern: /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/
                      })}
                    />
                    {errors?.email?.type === "required" && <p className="text-danger">Hãy nhập trường này</p>}
                    {errors?.email?.type === "pattern" && <p className="text-danger">Hãy nhập các ký từ A-z</p>}
                  </div>

                </div>
                <div className="col-md-6">
                  <div class="form-group">
                    <label>Chọn căn hộ</label>
                    <select {...register('apartment_id')} class="form-control">
                      <option selected value={user.id}>{user.apartment_id}</option>
                      {apartmentNotOwned.map((item) => (
                        <option value={item.id}>{item.apartment_id}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Ngày sinh</label>
                    <input
                      type="date"
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Nhập ngày sinh"
                      defaultValue={user.dob}
                      {...register('dob', {
                        required: true,
                      })}
                    />
                    {errors?.phone?.type === "required" && <p className="text-danger">sNhập ngày sinh</p>}

                  </div>
                  <div class="form-group">
                    <label>Trạng thái</label>
                    <select {...register('status')} class="form-control">
                      {options.map((item) => (
                        <option selected={item.value == user.status} value={item.value}>{item.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            {/* /.card-body */}
            <div class="card-footer">
              <Link to="/admin/user" type="button" class="btn btn-default float-left">
                Quay lại
              </Link>
              <button type="submit" class="btn btn-info float-right">
                Lưu sửa
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  return <Content title="Sửa thông tin căn hộ">{editUser()}</Content>;
};

export default UserEditForm;

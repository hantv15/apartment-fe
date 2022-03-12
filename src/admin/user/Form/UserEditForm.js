import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { edit, get } from "../../../common/userApi";
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
  

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await get(id);
        setUser(data);
        reset(data);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, []);

//   console.log(typeof(department.department_id));
  const onSubmit = (item) => {
    const updateItem = {
      id,
      ...item
    };
    console.log(updateItem);
    edit(updateItem);
  }

  const editUser = () => {
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
                    <label htmlFor="exampleInputEmail1">Tên</label>
                    <input
                      type="text"
                      defaultValue={user.name}
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Nhập tên"
                      {...register('name', {
                        required: true,
                        
                      })}
                    />
                    {errors?.name?.type === "required" && <p className="text-danger">Nhập tên</p>}
                    
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Sdt</label>
                    <input
                      type="number"
                      defaultValue={user.phone}
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Nhập số điện thaoij"
                      {...register('phone', {
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
                      defaultValue={user.email}
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Nhập email"
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
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Ngày sinh</label>
                    <input
                      type="date"
                      defaultValue={user.birth}
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Nhập ngày sinh"
                      {...register('birth', {
                        required: true,
                      })}
                    />
                    {errors?.phone?.type === "required" && <p className="text-danger">sNhập ngày sinh</p>}
                    
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
  return <Content title="Sửa thông tin căn hộ">{editUser()}</Content>;
};

export default UserEditForm;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { add } from "../../../common/userApi";
import Content from "../../../core/Content";
const UserAddForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const { id } = useParams();
  console.log(id);
  
  const addUsers = async (item) => {
    console.log(item);
    try {
      alert('Thêm mới thành công');
      return await add(item);
    } catch (error) {
      console.log(error);
    }
  }
  const onSubmit = (item) => {
    addUsers(item)
  }
  const addUser = () => {
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
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Nhập ngày sinh"
                      {...register('birth', {
                        required: true,
                      })}
                    />
                    {errors?.phone?.type === "required" && <p className="text-danger">sNhập ngày sinh</p>}
                    
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Nhập mk"
                      {...register('password', {
                        required: true,
                        pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
                      })}
                    />
                    {errors?.password?.type === "required" && <p className="text-danger">Hãy nhập trường này</p>}
                    {errors?.password?.type === "pattern" && <p className="text-danger">Hãy nhập các ký từ A-z</p>}
                  </div>
                  
                  
                </div>
              </div>
            </div>
            {/* /.card-body */}
            <div class="card-footer">
              <Link to="/admin/user" type="submit" class="btn btn-default float-left">
                Quay lại
              </Link>
              <button type="submit" class="btn btn-info float-right">
                Thêm mới
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
  return (
    <Content title="Thêm mới căn hộ">
      {addUser()}
    </Content>
  );
};

export default UserAddForm;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { get } from "../../../common/service";
import Content from "../../../core/Content";
const DepartmentFormAdd = () => {
    const [departments, setDepartments] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  

  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const getDepartments = async () => {
      try {
        const { data } = await get();
        
        setDepartments(data.data);
        console.log(data);
        // console.log(datas);
      } catch (error) {
        console.log(error);
      }
    };

    getDepartments();
  }, []);
  // hahhahufhuaghai

  const addDepartments = async (item) => {
    console.log(item);
    try {
      alert('Thêm mới thành công');
      return await add(item);
    } catch (error) {
      console.log(error);
    }
  }
  const onSubmit = (item) => {
    addDepartments(item)
  }
  const addDepartment = () => {
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
                    <label htmlFor="exampleInputEmail1">Tên dịch vụ</label>
                  
                        {departments.map((item)=>(
                              <select {...register('ten_dich_vu')} class="form-control">
                            <option value={item.name}>{item.name}</option>
                            
                            </select>
                        ))}
                      
                    
                    {errors?.department_id?.type === "required" && <p className="text-danger">Hãy nhập trường này</p>}
                    {errors?.department_id?.type === "pattern" && <p className="text-danger">Hãy nhập các ký từ A-z</p>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Nhập số lượng</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Nhập mã căn hộ"
                      {...register('tower', {
                        required: true,
                      })}
                    />
                    {errors?.tower?.type === "required" && <p className="text-danger">Hãy nhập trường này</p>}
                    {errors?.tower?.type === "pattern" && <p className="text-danger">Hãy nhập các ký từ A-z</p>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Kích thước căn hộ</label>
                    <input
                      {...register('square_meter', {
                        pattern: /^[0-9]*$/
                      })}
                      type="text"
                      className="form-control"
                      id="number"
                      name="square_meter"
                      placeholder="Nhập kích thước căn hộ"
                    />
                    {errors?.square_meters?.type === "pattern" && <p className="text-danger">Hãy nhập các ký từ là số</p>}
                  </div>
                </div>
                <div className="col-md-6">
                  <div class="form-group">
                    <label>Chủ sở hữu</label>
                    <select {...register('user_id')} class="form-control">
                      <option value="1">Hân</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Trạng thái</label>
                    <select {...register('status')} class="form-control">
                      <option value="1">Active</option>
                      <option value="2">InActive</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            {/* /.card-body */}
            <div class="card-footer">
              <Link to="/admin/department" type="submit" class="btn btn-default float-left">
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
    <Content title="Thêm mới hoá đơn chi tiết">
      {addDepartment()}
    </Content>
  );
};

export default DepartmentFormAdd;

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import {
  fetchPagination,
  getAll,
  getPagination,
  remove,
  searchName,
} from "../../common/userApi";
import Content from "../../core/Content";
const UserList= () => {
    const [users,setUsers]=useState([]);
    const [pageCount, setPageCount] = useState(0);
   const [searchTerm, setSearchTerm] = useState("");
   const typingTimeoutRef = useRef(null);
    const limit = 10;
    useEffect(() => {
        const getAllUsers = async () => {
          const res = await fetch(
            `https://61fe3d3aa58a4e00173c978d.mockapi.io/users`
          );
          const data = await res.json();
          setPageCount(Math.ceil(data.length / 10));
        };
    
        getAllUsers();
    
        const getUsers = async () => {
          try {
            const { data } = await getPagination(1, limit);
            setUsers(data);
          } catch (error) {
            console.log(error);
          }
        };
    
        getUsers();
      }, []);
    
      const fetchUsers = async (currentPage) => {
        try {
          const { data } = await fetchPagination(currentPage, limit);
          setUsers(data);
        } catch (error) {
          console.log(error);
        }
      };
    
      const handlePageClick = async (data) => {
        console.log(data.selected);
        const currentPage = data.selected + 1;
        fetchUsers(currentPage);
      };
      const deleteUser = async (id) => {
        try {
          const { data } = await remove(id);
          const newUser = users.filter((item) => item.id !== data.id);
          setUsers(newUser);
        } catch (error) {
          console.log(error);
        }
      };
    return(
        <Content title="Căn Hộ">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h3>Danh sách căn hộ</h3>
              </div>
              <div className="card-body">
                <div className="row ">
                  <div className="col-sm-12">
                    <div className="input-group rounded my-2 ms-2 d-flex flex-row-reverse">
                      <div className="form-outline">
                        <input
                          id="search-input-sidenav"
                          type="search"
                          placeholder="Mã căn hộ"
                          className="form-control justify-content-rig justify-content-right"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">STT</th>
                          
                          <th scope="col">Tên</th>
                          <th scope="col">Ảnh</th>
                          <th scope="col">Email</th>
                          <th scope="col">Sdt</th>
                          
                          <th scope="col">Ngày sinh</th>
                          <th>
                            <Link
                              className="btn btn-sm btn-success btn-flat"
                              to="/admin/user/add"
                            >
                              Thêm mới
                            </Link>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user, index) => (
                          <tr key={user}>
                            <th scope="row">{index + 1}</th>
                           
                            <td>
                              {user.name}
                            </td>
                            <td><img src={"user.avatar"}  alt="" /></td>
                            <td>{user.email? user.email
                              : "Trống"}</td>
                            <td>{user.phone}</td>
                            
                            <td>{user.birth}</td>
                            <td>
                              <button
                                onClick={() => deleteUser(user.id)}
                                className="btn btn-sm btn-danger btn-flat"
                              >
                                Xóa
                              </button>
                              <Link
                                className="btn btn-sm btn-success btn-flat"
                                to={`/admin/user/edit/${user.id}`}
                                onId={user.id}
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
                <div className="row">
                  <div className="col-sm-12">
                    <ReactPaginate
                      previousLabel={"previous"}
                      nextLabel={"next"}
                      breakLabel={"..."}
                      pageCount={pageCount}
                      marginPagesDisplayed={3}
                      pageRangeDisplayed={3}
                      onPageChange={handlePageClick}
                      containerClassName={"pagination justify-content-center"}
                      pageClassName={"page-item"}
                      pageLinkClassName={"page-link"}
                      previousClassName={"page-item"}
                      previousLinkClassName={"page-link"}
                      nextClassName={"page-item"}
                      nextLinkClassName={"page-link"}
                      activeClassName={"active"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Content>
    )
};
export default UserList;
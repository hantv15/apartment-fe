import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useParams } from "react-router-dom";
import { get, getBill } from "../../common/departmentAPI";
import Content from "../../core/Content";
import Card from "./_details/card";
import Finace from "./_details/Finace";
import { Information } from "./_details/Information";
const DepartmentDetail = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState({});

  const [showBasic, setShowBasic] = useState(true);
  const [showFiance, setShowFiance] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const statusOptions = [
    {
      value: 1,
      name: "Active",
    },
    {
      value: 2,
      name: "InActive",
    },
  ];

  useEffect(() => {
    const getDepartment = async () => {
      try {
        const { data } = await get(id);
        console.log(data, data[0]);
        setDepartment(data.data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    getDepartment();
  }, []);

  const addDepartment = () => {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header p-2">
              <ul className="nav nav-pills">
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="javascript:void(0)"
                    data-toggle="tab"
                    onClick={() => {
                      setShowBasic(true);
                      setShowCard(false);
                      setShowFiance(false);
                    }}
                  >
                    Thông tin cơ bản
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="javascript:void(0)"
                    data-toggle="tab"
                    onClick={() => {
                      setShowFiance(true);
                      setShowCard(false);
                      setShowBasic(false);
                    }}
                  >
                    Tài chính
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="javascript:void(0)"
                    data-toggle="tab"
                    onClick={() => {
                      setShowFiance(false);
                      setShowBasic(false);
                      setShowCard(true);
                    }}
                  >
                    Thẻ cư dân
                  </a>
                </li>
              </ul>
            </div>
            {/* /.card-header */}
            <div className="card-body">
              {showBasic && (
                <Information
                  department={department}
                  statusOptions={statusOptions}
                  id={id}
                />
              )}
              {showFiance && <Finace statusOptions={statusOptions} id={id} />}
              {showCard && <Card />}
            </div>
            {/* /.card-body */}
          </div>
          {/* /.card */}
        </div>
      </div>
    );
  };
  return <Content title="Chi tiết căn hộ">{addDepartment()}</Content>;
};

export default DepartmentDetail;

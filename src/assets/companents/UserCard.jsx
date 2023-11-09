import React, { useState } from "react";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserService } from "../services/UserService";

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
};

const UserCard = ({ user }) => {
  let [state, setState] = useState({
    loading: false,
    users: [],
    errorMessage: "",
  });

  let clickDelete = async (userId) => {
    try {
      let response = await UserService.deleteUser(userId);
      if (response) {
        setState({ ...state, loading: true });
        window.location.reload();
        setState({
          ...state,
          loading: false,
          users: response.data,
        });
      }
    } catch (error) {
      setState({ ...state, loading: false, errorMessage: error.message });
    }
  };

  return (
    <>
      <div className="userCard col-lg-6 pb-3 px-0">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="user-avatar col-md-3 d-flex justify-content-center align-items-center">
                <Avatar className="p-5 fs-1 bg-primary">
                  {user.ad.charAt(0).toUpperCase()}
                  {user.soyad.charAt(0).toUpperCase()}
                </Avatar>
              </div>
              <div className="col-md-7 px-0">
                <ul className="list-group">
                  <div className="row">
                    <div className="col-6 pe-0">
                      <li className="list-group-item fw-semibold">
                        Ad :{" "}
                        <span className="fw-lighter">
                          {truncateText(user.ad, 10)}
                        </span>
                      </li>
                    </div>
                    <div className="col-6 ps-0">
                      <li className="list-group-item fw-semibold">
                        Soyad :{" "}
                        <span className="fw-lighter">
                          {truncateText(user.soyad, 8)}
                        </span>
                      </li>
                    </div>
                  </div>

                  <li className="list-group-item fw-semibold">
                    Telefon Numarası :{" "}
                    <span className="fw-lighter">
                      {truncateText(user.numara, 15)}
                    </span>
                  </li>
                  <li className="list-group-item fw-semibold">
                    Çalıştığı Şirket :{" "}
                    <span className="fw-lighter">
                      {truncateText(user.şirket, 15)}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="horizontal-links col-md-2 d-flex flex-column align-items-center justify-content-center ps-3">
                <Link
                  to={`/users/view/${user.id}`}
                  className="btn btn-warning mb-1"
                >
                  <RemoveRedEyeIcon />
                </Link>
                <Link
                  to={`/users/edit/${user.id}`}
                  className="btn btn-primary mb-1"
                >
                  <EditIcon />
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => clickDelete(user.id)}
                >
                  <DeleteIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;

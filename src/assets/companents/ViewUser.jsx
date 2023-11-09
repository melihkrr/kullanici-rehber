import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import yellowBird from "../images/yellow-bird.png";
import { UserService } from "../services/UserService";
import Spinner from "./Spinner";

const ViewUser = () => {
  let { userId } = useParams();

  let [state, setState] = useState({
    loading: false,
    user: {},
    errorMessage: "",
    group: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({ ...state, loading: true });
        let response = await UserService.getUser(userId);
        let groupResponse = await UserService.getGroup(response.data);
        setState({
          ...state,
          loading: false,
          user: response.data,
          group: groupResponse.data,
        });
      } catch (error) {
        setState({ ...state, loading: false, errorMessage: error.message });
      }
    };

    fetchData();
  }, [userId]);

  let { loading, user, errorMessage, group } = state;
  return (
    <>
      <section className="view-user pt-4">
        <div className="container">
          <p className="h3 text-warning">Kişiyi İncele </p>
        </div>
      </section>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {Object.keys(user).length > 0 && (
            <section className="view-user mt-3">
              <div className="container">
                <div className="row">
                  <div className="col-md-6 col-lg-4">
                    <ul className="list-group text-break">
                      <li className="list-group-item fw-semibold py-3">
                        Ad : <span className="fw-lighter">{user.ad}</span>
                      </li>
                      <li className="list-group-item fw-semibold py-3">
                        Soyad : <span className="fw-lighter">{user.soyad}</span>
                      </li>
                      <li className="list-group-item fw-semibold py-3">
                        Telefon Numarası :
                        <span className="fw-lighter"> {user.numara}</span>
                      </li>

                      <li className="list-group-item fw-semibold py-3">
                        Adresi :{" "}
                        <span className="fw-lighter">{user.adres}</span>
                      </li>
                      <li className="list-group-item fw-semibold py-3">
                        Çalıştığı Şirket :{" "}
                        <span className="fw-lighter">{user.şirket}</span>
                      </li>

                      <li className="list-group-item fw-semibold py-3">
                        Grup Adı :{" "}
                        <span className="fw-lighter">{group.ad}</span>
                      </li>
                    </ul>
                    <div className="mt-4 d-flex justify-content-end">
                      <Link
                        to={`/users/edit/${userId}`}
                        className="btn btn-primary me-3"
                      >
                        Düzenle
                      </Link>
                      <Link
                        to={"/users/list"}
                        className="btn btn-warning py-1 px-2"
                      >
                        Geri Dön
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4 mx-auto mt-5">
                    <img
                      src={yellowBird}
                      alt=""
                      style={{
                        width: "380px",
                      }}
                      className="d-none d-md-block"
                    />
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default ViewUser;

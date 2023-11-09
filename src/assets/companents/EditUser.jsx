import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import blueBird from "../images/blue-bird.png";
import { UserService } from "../services/UserService";
import Spinner from "./Spinner";

const EditUser = () => {
  let navigate = useNavigate();

  let { userId } = useParams();

  let [state, setState] = useState({
    loading: false,
    user: {
      ad: "",
      soyad: "",
      numara: "",
      adres: "",
      şirket: "",
      groupId: "",
    },
    groups: [],
    errorMessage: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({ ...state, loading: true });
        let response = await UserService.getUser(userId);
        let groupResponse = await UserService.getGroups();
        setState({
          ...state,
          loading: false,
          user: response.data,
          groups: groupResponse.data,
        });
      } catch (error) {
        setState({ ...state, loading: false, errorMessage: error.message });
      }
    };

    fetchData();
  }, [userId]);

  let updateInput = (event) => {
    const { name, value } = event.target;

    if (name === "ad" || name === "soyad") {
      const regex = /^[a-zA-ZğüşıöçĞÜŞİÖÇ]+$/;
      if (value === "" || regex.test(value)) {
        setState({
          ...state,
          user: {
            ...state.user,
            [name]: value,
          },
        });
      }
    } else {
      setState({
        ...state,
        user: {
          ...state.user,
          [name]: value,
        },
      });
    }
  };

  let submitForm = async (event) => {
    event.preventDefault();
    try {
      let response = await UserService.updateUser(state.user, userId);
      if (response) {
        navigate("/users/list", { replace: true });
      }
    } catch (error) {
      setState({ ...state, errorMessage: error.message });
      navigate(`/users/edit/${userId}`, { replace: false });
    }
  };

  let { loading, user, groups, errorMessage } = state;

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {
            <section className="create-user p-4">
              <div className="container">
                <p className="h3 text-primary">Kişiyi Düzenle</p>
                <div className="row">
                  <div className="col-md-6 col-lg-4">
                    <form onSubmit={submitForm}>
                      <div className="mb-4 pt-2">
                        <input
                          required={true}
                          name="ad"
                          value={user.ad}
                          onChange={updateInput}
                          type="text"
                          className="form-control"
                          placeholder="Ad"
                        />
                      </div>
                      <div className="mb-4">
                        <input
                          required={true}
                          name="soyad"
                          value={user.soyad}
                          onChange={updateInput}
                          type="text"
                          className="form-control"
                          placeholder="Soyad"
                        />
                      </div>
                      <div className="mb-4">
                        <input
                          required={true}
                          name="numara"
                          value={user.numara}
                          onChange={updateInput}
                          type="number"
                          className="form-control"
                          placeholder="Telefon Numarası"
                        />
                      </div>
                      <div className="mb-4">
                        <input
                          required={true}
                          name="adres"
                          value={user.adres}
                          onChange={updateInput}
                          type="text"
                          className="form-control"
                          placeholder="Adres"
                        />
                      </div>
                      <div className="mb-4">
                        <input
                          required={true}
                          name="şirket"
                          value={user.şirket}
                          onChange={updateInput}
                          type="text"
                          className="form-control"
                          placeholder="Çalıştığı Şirket"
                        />
                      </div>
                      <div className="mb-4">
                        <select
                          className="form-control"
                          required={true}
                          name="groupId"
                          value={user.groupId}
                          onChange={updateInput}
                        >
                          <option value="">Grup seçiniz</option>
                          {groups.length > 0 &&
                            groups.map((group) => {
                              const displayValue =
                                group.ad.length > 20
                                  ? `${group.ad.slice(0, 20)}...`
                                  : group.ad;
                              return (
                                <option key={group.id} value={group.id}>
                                  {displayValue}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                      <div className="mb-4 d-flex justify-content-end">
                        <input
                          type="submit"
                          className="btn btn-primary me-3 px-3"
                          value="Düzenle"
                        />
                        <Link
                          to={"/users/list"}
                          className="btn btn-danger px-4"
                        >
                          İptal
                        </Link>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-6 col-lg-8 d-flex justify-content-center align-items-start mt-5">
                    <img
                      src={blueBird}
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
          }
        </>
      )}
    </>
  );
};

export default EditUser;

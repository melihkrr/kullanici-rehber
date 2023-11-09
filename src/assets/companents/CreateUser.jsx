import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import greenBird from "../images/green-bird.png";
import { UserService } from "../services/UserService";

const CreateUser = () => {
  let navigate = useNavigate();

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({ ...state, loading: true });
        let response = await UserService.getGroups();

        setState({
          ...state,
          loading: false,
          groups: response.data,
        });
      } catch (error) {
        setState({ ...state, loading: false, errorMessage: error.message });
      }
    };

    fetchData();
  }, []);

  let submitForm = async (event) => {
    event.preventDefault();
    try {
      let response = await UserService.createUser(state.user);
      if (response) {
        navigate("/users/list", { replace: true });
      }
    } catch (error) {
      setState({ ...state, errorMessage: error.message });
      navigate("/users/create", { replace: false });
    }
  };

  let { loading, user, errorMessage } = state;

  return (
    <>
      <section className="create-user p-4">
        <div className="container">
          <p className="h3 text-success">Yeni Kişi Oluştur</p>
          <div className="row">
            <div className="col-md-4">
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

                <div className="mb-4 position-relative">
                  <select
                    required={true}
                    name="groupId"
                    value={user.groupId}
                    onChange={updateInput}
                    className="form-control"
                    style={{ paddingRight: "40px" }}
                  >
                    <option value="">Grup seçiniz</option>
                    {state.groups.length > 0 &&
                      state.groups.map((group) => {
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
                  <button
                    className="btn btn-primary position-absolute"
                    onClick={() => navigate("/users/groups")}
                    style={{
                      top: 0,
                      right: 0,
                      height: "100%",
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    }}
                    type="button"
                  >
                    Ekle
                  </button>
                </div>

                <div className="mb-4 d-flex justify-content-end">
                  <input
                    type="submit"
                    className="btn btn-success me-3 px-3"
                    value="Oluştur"
                  />
                  <Link to={"/users/list"} className="btn btn-danger px-4">
                    İptal
                  </Link>
                </div>
              </form>
            </div>
            <div className="col-md-8 d-flex justify-content-center align-items-start">
              <img
                src={greenBird}
                alt=""
                style={{
                  width: "500px",
                }}
                className="d-none d-md-block"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreateUser;

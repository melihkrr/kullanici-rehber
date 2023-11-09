import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import UserCard from "./UserCard";
import { UserService } from "../services/UserService";
import Spinner from "./Spinner";

const Home = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await UserService.getGroups();
        setGroups(response.data);
      } catch (error) {
        console.error("Grup adları alınamadı: ", error);
      }
    };
    fetchGroups();
  }, []);

  const handleGroupFilter = (groupId) => {
    const selectedGroupId = parseInt(groupId);
    const selected = groupId
      ? groups.find((group) => group.id === selectedGroupId)
      : null;
    setSelectedGroup(selected);

    const filteredUsers = selected
      ? state.users.filter(
          (user) => user.groupId.toString() === selectedGroupId.toString()
        )
      : state.users;

    setQuery({ ...query, text: "" });
    setState({ ...state, filteredUsers });
  };

  let [query, setQuery] = useState({
    text: "",
  });

  let [state, setState] = useState({
    loading: false,
    users: [],
    filteredUsers: [],
    errorMessage: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({ ...state, loading: true });
        let response = await UserService.getAllUsers();
        setState({
          ...state,
          loading: false,
          users: response.data,
          filteredUsers: response.data,
        });
      } catch (error) {
        setState({ ...state, loading: false, errorMessage: error.message });
      }
    };
    fetchData();
  }, []);

  const searchUser = (event) => {
    event.preventDefault();

    setQuery({
      ...query,
      text: event.target.value,
    });

    const searchText = event.target.value.toLowerCase();

    const searchedUsers = state.users.filter((user) => {
      const fullName = `${user.ad} ${user.soyad}`;
      const fullNameLowerCase = fullName.toLowerCase();

      return (
        fullNameLowerCase.includes(searchText) ||
        fullNameLowerCase.includes(searchText.replace(/ı/g, "i")) ||
        fullNameLowerCase.includes(searchText.replace(/i/g, "ı"))
      );
    });

    const filteredUsers = selectedGroup
      ? searchedUsers.filter(
          (user) => user.groupId.toString() === selectedGroup.id.toString()
        )
      : searchedUsers;

    setState({
      ...state,
      filteredUsers,
    });
  };

  let { loading, filteredUsers, errorMessage } = state;

  return (
    <>
      <section className="user-search p-4">
        <div className="container">
          <div className="grid">
            <div className="row">
              <div className="col">
                <p className="h3 text-success">
                  Yeni Kişi Oluştur
                  <Link
                    to={"/users/create"}
                    className="btn btn-success ms-2 p-1"
                  >
                    <AddCircleIcon className="fs-6 me-1" />
                    yeni
                  </Link>
                  <Link
                    to={"/users/groups"}
                    className="btn btn-primary ms-2 p-1"
                  >
                    Gruplarım
                  </Link>
                </p>
                <p className="fst-italic pt-1 fs-6">
                  Yeni kişi oluşturarak rehberinizi büyütebilir, oluşturduğunuz
                  kişileri Ad Soyad bilgisine göre veya eklediğiniz Grup ismine
                  göre filtreleyerek bulabilir ve düzenleyebilirsiniz. Hadi,
                  yeni bir kişi oluşturmakla başlayalım!
                </p>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-12 col-sm-3 pe-2">
                <form>
                  <div className="mb-2">
                    <input
                      name="text"
                      value={query.text}
                      onChange={searchUser}
                      onKeyPress={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                        }
                      }}
                      type="text"
                      className="form-control fw-bold"
                      placeholder="İsimle Arama"
                    />
                  </div>
                </form>
              </div>

              <div className="col-12 col-sm-9 d-flex justify-content-end p-2 pt-0">
                <select
                  className="btn btn-primary "
                  onChange={(e) => handleGroupFilter(e.target.value)}
                  value={selectedGroup ? selectedGroup.id : ""}
                >
                  <option value="">Tüm Gruplar</option>
                  {groups.map((group) => {
                    const displayValue =
                      group.ad.length > 10
                        ? `${group.ad.slice(0, 10)}...`
                        : group.ad;
                    return (
                      <option key={group.id} value={group.id}>
                        {displayValue}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>
      {loading ? (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner />
        </div>
      ) : (
        <section className="user-list">
          <div className="container">
            <div className="col-12 px-0 col-md-12 d-flex flex-wrap justify-content-between">
              {filteredUsers.length > 0 &&
                filteredUsers.map((user) => {
                  return <UserCard key={user.id} user={user} />;
                })}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Home;

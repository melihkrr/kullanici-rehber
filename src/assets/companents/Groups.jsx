import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserService } from "../services/UserService";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import groupBird from "../images/group-bird.png";

function Groups() {
  const [groups, setGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState("");
  const [editGroup, setEditGroup] = useState({ id: null, ad: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserService.getGroups();
        setGroups(response.data);
      } catch (error) {
        console.error("Grup verileri alınamadı: ", error);
      }
    };
    fetchData();
  }, []);

  const handleAddGroup = async () => {
    if (newGroupName.trim() === "") {
      return;
    }
    try {
      const newGroup = { ad: newGroupName };
      const response = await UserService.createGroup(newGroup);
      setGroups([...groups, response.data]);
      setNewGroupName("");
    } catch (error) {
      console.error("Grup eklenirken hata oluştu: ", error);
    }
  };

  const handleEditGroup = async (group) => {
    try {
      const updatedGroup = { ad: editGroup.ad };
      const response = await UserService.updateGroup(updatedGroup, group.id);
      const updatedGroups = groups.map((g) =>
        g.id === group.id ? response.data : g
      );
      setGroups(updatedGroups);
      setEditGroup({ id: null, ad: "" });
    } catch (error) {
      console.error("Grup güncellenirken hata oluştu: ", error);
    }
  };

  const handleDeleteGroup = async (group) => {
    try {
      await UserService.deleteGroup(group.id);
      const updatedGroups = groups.filter((g) => g.id !== group.id);
      setGroups(updatedGroups);
    } catch (error) {
      console.error("Grup silinirken hata oluştu: ", error);
    }
  };

  return (
    <div className="container pt-4">
      <h3 className="text-success">Yeni Grup Oluştur</h3>
      <div className="row">
        <div className="col-md-6 col-lg-4">
          <div className="input-group mt-3 mb-3">
            <input
              className="form-control"
              type="text"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleAddGroup();
                }
              }}
            />
            <button
              className="btn btn-success text-white"
              onClick={handleAddGroup}
            >
              Ekle
            </button>
          </div>

          <h3 className="text-primary pt-1">Gruplar</h3>

          <p className="fst-italic pt-2 fs-6">
            {groups.length === 0
              ? "Henüz hiçbir grup oluşturmadınız."
              : "Gruplarınızı dilediğinizce düzenleyebilir, oluşturmuş olduğunuz kişileri, ait oldukları grubu silerek toplu bir şekilde silebilirsiniz."}
          </p>

          <ul className="list-group">
            {groups.map((group) => (
              <li className="list-group-item fw-semibold" key={group.id}>
                <div className="d-flex justify-content-between align-items-center">
                  <div
                    style={{
                      flex: 1,
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {editGroup.id === group.id ? (
                      <>
                        <input
                          type="text"
                          value={editGroup.ad}
                          onChange={(e) =>
                            setEditGroup({
                              ...editGroup,
                              ad: e.target.value,
                            })
                          }
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              handleEditGroup(group);
                            }
                          }}
                          style={{ width: "calc(83%)" }}
                        />
                        <button
                          className="btn btn-success px-2"
                          onClick={() => handleEditGroup(group)}
                        >
                          <DoneOutlineIcon />
                        </button>
                      </>
                    ) : (
                      <>{group.ad}</>
                    )}
                  </div>
                  <div className="ms-auto">
                    <button
                      className="btn btn-primary px-2"
                      onClick={() =>
                        setEditGroup((prevGroup) =>
                          prevGroup.id === group.id
                            ? { id: null, ad: "" }
                            : { id: group.id, ad: group.ad }
                        )
                      }
                    >
                      <EditIcon />
                    </button>

                    <button
                      className="btn btn-danger px-2 ms-2 me-0"
                      onClick={() => handleDeleteGroup(group)}
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mb-4 d-flex justify-content-end">
            <Link className="btn btn-warning px-1 mt-4" to={"/users/list"}>
              Geri Dön
            </Link>
          </div>
        </div>
        <div
          className="col-md-6 col-lg-8 d-flex justify-content-center align-items-start"
          style={{ marginTop: "50px" }}
        >
          <img
            src={groupBird}
            alt=""
            style={{
              width: "380px",
            }}
            className="d-none d-md-block"
          />
        </div>
      </div>
    </div>
  );
}

export default Groups;

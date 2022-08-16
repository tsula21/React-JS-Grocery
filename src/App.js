import React, { useState } from "react";
import List from "./Components/List";
import Alert from "./Components/Alert";

const App = () => {
  const [name, setName] = useState(""); // input value
  const [list, setList] = useState([]); // input value list arr
  const [isEditing, setIsEditing] = useState(false); // editing mode
  const [editId, setEditId] = useState(null);
  const [popUp, setPopUp] = useState({
    show: false,
    msg: "",
    type: "",
  }); // form

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      // editing mode
      showPopUp(true, "Please enter value", "danger");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...list, title: name };
          }
          return item;
        })
      );
      setIsEditing(false);
      setName("");
      setEditId(null);
      showPopUp(true, "value changed", "success");
    } else {
      // submit
      showPopUp(true, "item added to the list", "success");
      const newItem = {
        id: Math.floor(Math.random() * 10001 + 1),
        title: name,
      };
      setList([...list, newItem]);
      setName("");
    }
  };

  const showPopUp = (show = false, msg = "", type = "") => {
    setPopUp({ show, msg, type });
  };

  const clearList = () => {
    showPopUp(true, "empty list", "danger");
    setList([]);
  };

  const removeItem = (id) => {
    showPopUp(true, "item removed", "danger");
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const specific = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(specific.title);
  };

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {popUp.show && <Alert {...popUp} showPopUp={showPopUp} list={list} />}
        <h3>Grocery Bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="add..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List list={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={() => clearList()}>
            Clear items
          </button>
        </div>
      )}
    </section>
  );
};

export default App;

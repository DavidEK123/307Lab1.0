import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  const fetchUsers = () =>
    fetch("http://localhost:8000/users");

  const postUser = (person) =>
    fetch("http://localhost:8000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(person),
    });

  const updateList = (person) => {
    postUser(person)
      .then((res) => {
        if (res.status === 201) return res.json();
        throw new Error("Failed to create");
      })
      .then((newUser) =>
        setCharacters((prev) => [...prev, newUser])
      )
      .catch((error) => console.error(error));
  };

  const removeOneCharacter = (id) => {
    fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status === 204) {
          setCharacters((prev) =>
            prev.filter((ch) => ch._id !== id)
          );
        } else {
          throw new Error("Delete failed");
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json.users_list))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;

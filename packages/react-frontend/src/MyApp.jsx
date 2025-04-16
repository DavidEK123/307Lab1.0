import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function fetchUsers() {
    return fetch("http://localhost:8000/users");
  }

  function postUser(person) {
    return fetch("http://localhost:8000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(person)
    });
  }

  function updateList(person) {
    postUser(person)
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        } else {
          throw new Error("Failed to create");
        }
      })
      .then((newUser) =>
        setCharacters((prevCharacters) => [...prevCharacters, newUser])
      )
      .catch((error) => console.error(error));
  }

  function removeOneCharacter(id) {
    fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE"
    })
      .then((res) => {
        if (res.status === 204) {
          setCharacters((prevCharacters) =>
            prevCharacters.filter((ch) => ch.id !== id)
          );
        } else {
          throw new Error("Delete failed");
        }
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json.users_list))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;

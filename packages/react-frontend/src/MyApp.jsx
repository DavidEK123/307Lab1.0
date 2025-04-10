import React, { useState } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  //const [characters, setCharacters] = useState([]);
  const [characters, setCharacters] = useState([
    { name: "Charlie", job: "Janitor" },
    { name: "Mac", job: "Bouncer" },
    { name: "Dee", job: "Aspiring actress" },
    { name: "Dennis", job: "Bartender" }
  ]);

  function updateList(person) {
    setCharacters([...characters, person]);
  }

  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => i !== index);
    setCharacters(updated);
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;

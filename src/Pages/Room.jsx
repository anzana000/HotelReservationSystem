import React, { useState, useEffect } from "react";

const Room = () => {
  const [inDate, setInDate] = useState("");
  const [outDate, setOutDate] = useState("");
  const [type, setType] = useState(0);

  const getRooms = (indate, outdate, rtype) => {
    console.log(indate, outdate, type);
    const rooms = fetch(
      `https://localhost:7101/api/Rooms?roomType=${rtype}&checkInDate=${indate}&checkOutDate=${outdate}`
    )
      .then((response) => response.json())
      .then((data) => data);
    console.log("rooms", rooms);
  };

  return (
    <main>
      <input
        type="date"
        placeholder="enter checkin date"
        value={inDate}
        onChange={(e) => setInDate(e.target.value)}
      />
      <input
        type="date"
        placeholder="enter checkout date"
        value={outDate}
        onChange={(e) => setOutDate(e.target.value)}
      />
      <select
        name=""
        id=""
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="Single">Single</option>
        <option value="Double">Double</option>
        <option value="Suit">Suit</option>
      </select>
      <button onClick={() => getRooms(inDate, outDate, type)}>Get Rooms</button>
    </main>
  );
};

export default Room;

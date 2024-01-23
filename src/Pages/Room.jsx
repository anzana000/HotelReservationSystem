import React, { useState, useEffect } from "react";

const Room = () => {
  const [inDate, setInDate] = useState("");
  const [outDate, setOutDate] = useState("");
  const [type, setType] = useState(0);
  const [rooms, setRooms] = useState([]); // State to hold fetched rooms
  const [error, setError] = useState(null); // State to hold potential errors

  // const getRooms = (indate, outdate, rtype) => {
  //   console.log(typeof indate, typeof outdate, type);
  //   const rooms = fetch(
  //     `https://localhost:7101/api/Rooms?roomType=${rtype}&checkInDate=${indate}&checkOutDate=${outdate}`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => data);
  //   console.log("rooms", rooms);
  // };

  const getRooms = async (roomType, checkInDate, checkOutDate) => {
    console.log(
      "types",
      typeof roomType,
      typeof checkInDate,
      typeof checkOutDate
    );
    try {
      const formattedInDate = checkInDate
        ? checkInDate.toISOString().slice(0, 10)
        : "";
      const formattedOutDate = checkOutDate
        ? checkOutDate.toISOString().slice(0, 10)
        : "";

      const response = await fetch(
        `https://localhost:7101/api/Rooms?roomType=${roomType}&checkInDate=${formattedInDate}&checkOutDate=${formattedOutDate}`
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      setRooms(data);
      console.log("rooms", rooms);
    } catch (error) {
      setError(error);
      console.log("error", error);
    }
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
        <option value="0">Single</option>
        <option value="1">Double</option>
        <option value="2">Suit</option>
      </select>
      <button
        onClick={() => getRooms(type, new Date(inDate), new Date(outDate))}
      >
        Get Rooms
      </button>
    </main>
  );
};

export default Room;

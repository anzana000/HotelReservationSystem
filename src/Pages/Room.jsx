import React, { useState, useEffect } from "react";
import RoomItem from "../Components/RoomItem";
// import single from "../assets/single.jpg";

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

  const getRooms = async (roomType, date) => {
    console.log("types", typeof roomType);
    try {
      const formattedOutDate = date ? date.toISOString().slice(0, 10) : "";
      const response = await fetch(
        `https://localhost:7101/api/Rooms?roomType=${roomType}&date=${formattedOutDate}`
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
    <main className="main">
      <h1 className="main-title">Hotel Reservation System</h1>
      <p className="main-welcome-text">Find your perfect room!</p>
      <div className="main-input-container">
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
          <option value="2">Suite</option>
        </select>
        <button onClick={() => getRooms(type, new Date(outDate))}>
          Get Rooms
        </button>
      </div>
      <div className="main-rooms-container">
        {rooms.length === 0 ? (
          <p className="rooms-error">
            Sorry,There are no rooms available at the moment!
          </p>
        ) : (
          rooms.map((room) => {
            return <RoomItem room={room} key={room.id} />;
          })
        )}
      </div>
    </main>
  );
};

export default Room;

import React, { useState } from "react";
import axios from "axios";
import single from "../assets/single.jpg";
import double from "../assets/double.jpg";
import suite from "../assets/suite.jpg";

const RoomItem = ({ room, checkInDate }) => {
  const [show, setShow] = useState(false);

  //book room
  const bookRoom = async (roomId, userId, checkInDate, days) => {
    console.log("book room clicked");

    try {
      console.log(typeof roomId, typeof userId);
      const data = {
        roomId: roomId,
        userId: userId,
        checkInDate: checkInDate,
        days: days,
      };

      // const jsonParam = JSON.stringify(data);

      // const response = fetch(`https://localhost:7101/api/Rooms/book`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: jsonParam,
      // })
      const response = await axios
        .post(`https://localhost:7101/api/Rooms/book`, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success!", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      console.log("book response", response.data);
    } catch (error) {
      console.error("error", error);
    }
    setShow(true);
  };

  return (
    <div className="roomitem">
      <div className="roomitem-overlay"></div>
      <img
        className="roomitem-img"
        src={
          room.roomType === 0 ? single : room.roomType === 1 ? double : suite
        }
        alt={
          room.roomType === 0
            ? "single room"
            : room.roomType === 1
            ? "double room "
            : "suite room"
        }
      />
      <div className="roomitem-info">
        <h1 className="roomitem-info-price">Nrs.{room.price}</h1>
        <h2 className="roomitem-info-type">
          {room.roomType === 0
            ? "Single"
            : room.roomType === 1
            ? "Double"
            : "Suite"}
        </h2>
      </div>

      <button
        className="roomitem-button"
        onClick={() => {
          bookRoom(
            room.id,
            1,
            checkInDate,
            parseInt(prompt("enter number of days"))
          );
        }}
      >
        Book now
      </button>
    </div>
  );
};

export default RoomItem;

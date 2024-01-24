import React from "react";
import axios from "axios";
import single from "../assets/single.jpg";
import double from "../assets/double.jpg";
import suite from "../assets/suite.jpg";

const RoomItem = ({ room }) => {
  //book room
  const bookRoom = (roomId, userId, checkInDate, checkOutDate) => {
    console.log("book room clicked");
    try {
      console.log(typeof roomId, typeof userId);

      const formattedInDate = checkInDate?.toISOString().slice(0, 10);
      const formattedOutDate = checkOutDate?.toISOString().slice(0, 10);

      const data = {
        roomId: roomId,
        userId: userId,
        checkInDate: formattedInDate,
        checkOutDate: formattedOutDate,
      };

      const response = axios.post(
        `https://localhost:7101/api/Rooms/book`,
        data
      );

      console.log("book response", response.data);
    } catch (error) {
      console.error("error", error);
    }
  };

  //get invoice
  const getInvoice = async (roomId) => {
    try {
      const response = await fetch(
        `https://localhost:7101/api/Rooms/${roomId}/invoice`
      );

      // if (!response.ok) {
      //   throw new Error(`API request failed with status ${response.status}`);
      // }

      const data = await response.json();

      console.log("invoice response", data);
    } catch (error) {
      console.log("error", error);
    }
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
            room.userId,
            new Date(room.checkInDate),
            new Date(room.checkOutDate)
          );
        }}
      >
        Book now
      </button>
      {/* <button onClick={() => getInvoice(6)}>Get details</button> */}
    </div>
  );
};

export default RoomItem;

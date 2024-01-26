import React, { useState } from "react";
import RoomItem from "../Components/RoomItem";
import single from "../assets/single.jpg";
import double from "../assets/double.jpg";
import suite from "../assets/suite.jpg";

const Room = () => {
  const [outDate, setOutDate] = useState("");
  const [type, setType] = useState();
  const [rooms, setRooms] = useState([]);
  const [invoice, setInvoice] = useState({});
  const [showInvoice, setShowInvoice] = useState(false);
  const [error, setError] = useState();

  //get available rooms
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

  //get user details(invoice)
  const getInvoice = async (roomId) => {
    setShowInvoice(true);
    try {
      const response = await fetch(
        `https://localhost:7101/api/Rooms/${roomId}/invoice`
      );

      const data = await response.json();
      console.log("invoice response", data);
      setInvoice(data);
    } catch (error) {
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
        <button onClick={() => getInvoice(1)} id="invoice-btn">
          Get Invoice
        </button>
        <div
          className="main-invoice-container"
          style={{ display: showInvoice ? "flex" : "none" }}
        >
          <div className="user-details">
            <h1>{invoice.customerName}</h1>
            <p>Number of Rooms booked: {invoice.totalRooms}</p>
            <p>Gross Amount: {invoice.grossAmount}</p>
            <p>Discount: {invoice.discount}</p>
            <p>Net Amount: {invoice.netAmount}</p>
          </div>
          <div className="user-rooms">
            {invoice.bookingDetails?.map((detail) => {
              return (
                <div key={detail.id}>
                  <img
                    width={300}
                    height={300}
                    src={
                      detail.roomType === 0
                        ? single
                        : detail.roomType === 1
                        ? double
                        : suite
                    }
                  />

                  <h3>Nrs.{detail.price}</h3>
                </div>
              );
            })}
          </div>
          <button onClick={() => setShowInvoice(false)} className="close-btn">
            Close
          </button>
        </div>
      </div>
      <div className="main-rooms-container">
        {rooms.length === 0 ? (
          <p className="rooms-error">
            Sorry,There are no rooms available at the moment!
          </p>
        ) : (
          rooms.map((room) => {
            return <RoomItem room={room} key={room.id} checkInDate={outDate} />;
          })
        )}
      </div>
    </main>
  );
};

export default Room;

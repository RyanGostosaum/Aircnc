//eslint-disable-next-line
import React, { useEffect, useState, useMemo } from "react";
import { Link } from 'react-router-dom';
import api from "../../service/api";
import './index.css';
// import socketio from 'socket.io-client';

export default function Dashboard() {
  const [spots, setSpots] = useState([]);

  // const user_id = localStorage.getItem('user');
  // const [requests, setRequests] = useState([]);

  // const socket = useMemo(() => socketio('http://192.168.0.114:8080', {
  //   query: { user_id },
  // }), [user_id]);

  // useEffect(() => {
  //   socket.on('booking_request', data => {
  //     setRequests([...requests, data]);
  //   })
  // }, [requests, socket]);

  useEffect(() => {
    async function loadSpots() {
      const user_id = localStorage.getItem("user");
      const response = await api.get("/dashboard", {
        headers: { user_id }
      });
      setSpots(response.data);
      console.log(response.data);
    }
    loadSpots();
  }, []);

  return (
    <>
      <ul className="spot-list">
        {spots.map(spot => (
          <li key={spot._id}>
            <header style={{
              backgroundImage: `url(${spot.thumbnail_url})`
            }} />
            <strong>{spot.company}</strong>
            <span>{spot.price ? `R$${spot.price},00/dia` : `GRATUITO`}</span>
          </li>
        ))}
      </ul>

      <Link to="/new">
        <button className="btn">Cadastrar novo spot</button>
      </Link>
    </>
  );
}
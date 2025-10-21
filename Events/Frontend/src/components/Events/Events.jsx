import React, { useEffect, useState } from "react";
import styles from "./Events.module.css";
import { url } from "../../url";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${url}/all-events`); 
        if (!res.ok) throw new Error("Failed to fetch events");

        const data = await res.json();
        if (data.success) setEvents(data.events);
        else throw new Error(data.message || "No events found");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner}></div>
      <p>Loading events...</p>
    </div>
  );

  if (error) return (
    <div className={styles.errorContainer}>
      <p className={styles.errorMessage}>Error: {error}</p>
      <button onClick={() => window.location.reload()} className={styles.retryButton}>
        Retry
      </button>
    </div>
  );

  if (!events.length) return (
    <div className={styles.emptyContainer}>
      <p>No events available.</p>
    </div>
  );

 return (

  <div className={styles.pageWrapper}> {/* new wrapper */}

   <h4>Register Now!!</h4>
    <div className={styles.eventList}>
      {events.map((event) => (
        <div className={styles.eventCard} key={event._id}>
          <img
            src={`http://localhost:5000${event.banner}`}
            alt={event.name}
            className={styles.bannerImage}
            onError={(e) => {
              e.target.src = '/placeholder-image.jpg';
            }}
          />
          <div className={styles.details}>
            <h2>{event.name}</h2>
           
            
            <p className={styles.description}>{event.description?.slice(0, 200)}...</p>
             <p>{new Date(event.date).toLocaleDateString()}</p>
            <p className={styles.registerLink}><Link to={`/events/${event._id}`}>Click Here to register!</Link></p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

};

export default Events;

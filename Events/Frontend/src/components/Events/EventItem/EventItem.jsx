import React, { useEffect, useState } from 'react';
import styles from './EventItem.module.css';
import { useParams } from 'react-router-dom';
import { url } from '../../../url';

const EventItem = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`${url}/all-events/${id}`);
        if (!res.ok) throw new Error(`Failed to load event`);
        const data = await res.json();
        setEvent(data.event);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p className={styles.loadingText}>Loading event details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorIcon}>⚠️</div>
        <p className={styles.errorMessage}>{error}</p>
        <button onClick={() => window.location.reload()} className={styles.retryButton}>
          <span>🔄</span> Try Again
        </button>
      </div>
    );
  }

  if (!event) {
    return (
      <div className={styles.emptyContainer}>
        <div className={styles.emptyIcon}>📭</div>
        <p>Event not found.</p>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        {event.banner && (
          <div className={styles.bannerWrapper}>
            <img
              src={`http://localhost:5000${event.banner}`}
              alt={event.name}
              className={styles.banner}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/placeholder-event.jpg';
              }}
            />
            <div className={styles.bannerOverlay}></div>
          </div>
        )}

        <div className={styles.contentWrapper}>
          <div className={styles.header}>
            <div className={styles.dateBadge}>
             
              <span className={styles.dateText}>
                {new Date(event.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <h1 className={styles.title}>{event.name}</h1>
          </div>

          <div className={styles.content}>
            <div className={styles.descriptionLabel}>
              <span className={styles.labelIcon}>📋</span>
              <span>About This Event</span>
            </div>
            <p className={styles.description}>{event.description}</p>
          </div>

          <div className={styles.footer}>
            <a 
              href={event.registrationLink || '#'} 
              className={styles.registerBtn} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              
              <span className={styles.btnText}>Register Now</span>
              <span className={styles.btnArrow}>→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventItem;
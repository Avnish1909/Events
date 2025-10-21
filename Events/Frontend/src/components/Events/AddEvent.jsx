import React, { useState } from 'react';
import styles from './AddEvents.module.css';
import { url } from '../../url';

const FormInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  type = 'text',
  rows = 4,
}) => {
  return (
    <label className={styles.label}>
      {label}{required && <span className={styles.required}>*</span>}
      {type === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className={styles.textarea}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={styles.input}
        />
      )}
    </label>
  );
};

const AddEvent = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    tags: '',
    banner: '',
    bannerFile: null,
    adminPassword: '' // ✅ New field
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'banner') {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        bannerFile: file,
        banner: file ? URL.createObjectURL(file) : '',
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fd = new FormData();
      fd.append('name', formData.name);
      fd.append('description', formData.description);
      fd.append('date', formData.date);
      fd.append('tags', formData.tags);
      fd.append('adminPassword', formData.adminPassword); // ✅ Add to request
      if (formData.bannerFile) fd.append('banner', formData.bannerFile);

      const res = await fetch(url, {
        method: 'POST',
        body: fd,
      });

      const data = await res.json();

      if (data.success) {
        setMessage('✅ Event added successfully!');
        setFormData({
          name: '',
          description: '',
          date: '',
          tags: '',
          banner: '',
          bannerFile: null,
          adminPassword: ''
        });
      } else {
        setMessage(`❌ ${data.message || 'Failed to add event.'}`);
      }
    } catch (error) {
      setMessage('❌ Error adding event.');
    }
  };

  const inputs = [
    { label: 'Event Name', name: 'name', placeholder: 'Enter event name', required: true },
    { label: 'Description', name: 'description', placeholder: 'Enter event description', required: true, type: 'textarea', rows: 5 },
    { label: 'Date & Time', name: 'date', type: 'datetime-local', required: true },
    { label: 'Tags (comma separated)', name: 'tags', placeholder: 'e.g. workshop, online, free' },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Add New Event</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {inputs.map(({ label, name, placeholder, required, type, rows }) => (
          <FormInput
            key={name}
            label={label}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            placeholder={placeholder}
            required={required}
            type={type}
            rows={rows}
          />
        ))}

        {/* ✅ Admin Password */}
        <label className={styles.label}>
          Admin Password<span className={styles.required}>*</span>
          <input
            type="password"
            name="adminPassword"
            value={formData.adminPassword}
            onChange={handleChange}
            placeholder="Enter admin password"
            required
            className={styles.input}
          />
        </label>

        {/* ✅ Banner file input */}
        <label className={styles.label}>
          Banner Image
          <input
            type="file"
            name="banner"
            accept="image/*"
            onChange={handleChange}
            className={styles.input}
          />
        </label>

        {/* ✅ Image preview */}
        {formData.banner && (
          <img
            src={formData.banner}
            alt="banner preview"
            className={styles.previewImage}
          />
        )}

        <button type="submit" className={styles.button}>Add Event</button>
      </form>

      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default AddEvent;

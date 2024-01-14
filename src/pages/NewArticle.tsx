import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const ArticleForm: React.FC = () => {
  const [payload, setPayload] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    title: '',
    body: '',
  });

  const [validity, setValidity] = useState({
    name: true,
    email: true,
    phone: true,
    website: true,
    title: true,
    body: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });

    setValidity({
      ...validity,
      [e.target.name]: true,
    });
  };

  const validateForm = () => {
    const newValidity = {
      name: payload.name.trim() !== '',
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email),
      phone: /^[0-9+-]+$/.test(payload.phone),
      website: /^(ftp|http|https):\/\/[^ "]+$/.test(payload.website),
      title: payload.title.trim() !== '',
      body: payload.body.trim() !== '',
    };

    setValidity(newValidity);
    return Object.values(newValidity).every((value) => value);
  };

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validateForm();

    if (!isValid) return;
  };
  return (
    <div className="form-holder">
      <Link to="/">
        {' '}
        <button className="h-11 w-11 rounded-full bg-primary-white flex items-center justify-center">
          <img src="/src/assets/images/caret-left.svg" alt="caret" />
        </button>
      </Link>

      <form className="card" onSubmit={handleForm}>
        <h2 className="header">Create New Article</h2>
        {/* Name - Email */}
        <div className="flex gap-8 w-full">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className={`input ${validity.name ? '' : 'invalid'}`}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className={`input ${validity.email ? '' : 'invalid'}`}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Phone - Website */}
        <div className="flex gap-8 w-full">
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className={`input ${validity.phone ? '' : 'invalid'}`}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="url">Website</label>
            <input
              type="url"
              id="url"
              name="website"
              className={`input ${validity.website ? '' : 'invalid'}`}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="title"
            id="title"
            name="title"
            className={`input ${validity.title ? '' : 'invalid'}`}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="article">Article</label>
          <textarea
            name="body"
            id="article"
            className={`input ${validity.body ? '' : 'invalid'}`}
            onChange={handleChange}
          />
        </div>

        <button className="button w-full h-14">Create</button>
      </form>
    </div>
  );
};

export default ArticleForm;

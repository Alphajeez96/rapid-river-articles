import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Payload {
  name: string;
  email: string;
  phone: string;
  website: string;
  title: string;
  body: string;
}

const defaultPayload: Payload = {
  name: '',
  email: '',
  phone: '',
  website: '',
  title: '',
  body: '',
};
const ArticleForm: React.FC = () => {
  const MAX_LENGTH = 250;
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState<Payload>(defaultPayload);

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

  const validateForm = (): boolean => {
    const newValidity = {
      name: !!payload.name.trim().length,
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email),
      phone: /^[0-9+-]+$/.test(payload.phone),
      website: /^(ftp|http|https):\/\/[^ "]+$/.test(payload.website),
      title: !!payload.title.trim().length,
      body: !!payload.body.trim().length && payload.body.length <= MAX_LENGTH,
    };

    setValidity(newValidity);
    return Object.values(newValidity).every((value) => value);
  };

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) return;

    handleCreation();
  };

  const handleCreation = async () => {
    try {
      setLoading(true);

      await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      // test purpose, should be replaced by a proper notification system
      alert('Article Created!');
      setPayload(defaultPayload);
    } catch (err) {
      console.log('err::', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
                value={payload.name}
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
                value={payload.email}
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
                value={payload.phone}
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
                value={payload.website}
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
              value={payload.title}
              className={`input ${validity.title ? '' : 'invalid'}`}
              onChange={handleChange}
            />
          </div>

          <div className="form-group relative">
            <label htmlFor="article">Article</label>
            <textarea
              name="body"
              id="article"
              value={payload.body}
              className={`input ${validity.body ? '' : 'invalid'}`}
              onChange={handleChange}
            />

            <div className="absolute bottom-3 right-3">
              <p className="text-primary-grey text-xs font-medium">
                {' '}
                {payload.body.length} /{MAX_LENGTH}
              </p>
            </div>
          </div>

          <button className="button w-full h-14" disabled={loading}>
            {loading ? <img src="/src/assets/images/loader.svg" alt="loader" /> : 'Create'}
          </button>
        </form>
      </div>
    </>
  );
};

export default ArticleForm;

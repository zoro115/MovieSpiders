import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import Loading from '../loading/Loading';
import style from './Register.module.css';

export function Register() {
  const { setUser } = useOutletContext();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [joiErorrs, setJoiErorrs] = useState({});
  const [apiMessage, setApiMessage] = useState('');
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    age: 0,
    email: '',
    password: '',
  });

  function getUser(e) {
    let inputValue = e.target.value;
    let newUser = { ...userData };
    let propertyName = e.target.id;
    newUser[propertyName] = inputValue;
    setUserData(newUser);
    setJoiErorrs({});
    setApiMessage('');
  }

  //send data with post
  async function sendUser() {
    try {
      // 1️⃣ get all users
      let { data } = await axios.get('http://localhost:5000/users');
      setIsLoading(true);

      // 2️⃣ check if email exists
      let isExist = data.find((u) => u.email === userData.email);

      if (isExist) {
        setIsLoading(false);
        setApiMessage('Email already exists');
        return;
      }

      // 3️⃣ if not exist → register
      await axios.post('http://localhost:5000/users', userData);
      setUser(userData);
      // when the user registerd we send it to the home page with the useNavigate hook
      setTimeout(() => {
        navigate('/home');
      }, 3000);
    } catch (error) {
      setIsLoading(false);

      setApiMessage('Something went wrong ');
    }
  }

  function submitUser(e) {
    e.preventDefault();

    const schema = Joi.object({
      first_name: Joi.string().alphanum().min(3).max(10).required().messages({
        'string.empty': 'First name is required',
        'string.min': 'First name must be at least 3 characters',
        'string.max': 'First name must be at most 10 characters',
        'string.alphanum': 'First name must contain only letters and numbers',
      }),
      last_name: Joi.string().alphanum().min(3).max(10).required().messages({
        'string.empty': 'Last name is required',
        'string.min': 'Last name must be at least 3 characters',
        'string.max': 'Last name must be at most 10 characters',
        'string.alphanum': 'Last name must contain only letters and numbers',
      }),
      age: Joi.number().min(1).max(99).required().messages({
        'number.base': 'Age must be a number',
        'number.min': 'Age must be at least 1',
        'number.max': 'Age must be at most 99',
        'any.required': 'Age is required',
      }),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
        .messages({
          'string.empty': 'Email is required',
          'string.email': 'Email must be valid (e.g., user@example.com)',
        }),
      password: Joi.string()
        .pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        )
        .required()
        .messages({
          'string.empty': 'Password is required',
          'string.pattern.base':
            'Password must contain at least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special character',
        }),
    });

    let valid = schema.validate(userData, { abortEarly: false });
    if (valid.error === undefined) {
      //call api
      sendUser();
    } else {
      let newErrors = {};
      valid.error.details.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setJoiErorrs(newErrors);

    }
  }

  if (isLoading === true) {
    return <Loading />;
  }

  return (
    <>
      <div className={style.body}>
        <div>
          <div className={style.card}>
            <h2 className="mb-2">Registration form</h2>
            <form onSubmit={submitUser}>
              <div className="mb-2">
                <label htmlFor="first_name">First name</label>
                <input
                  type="text"
                  id="first_name"
                  placeholder="First name"
                  className="form-control"
                  onChange={getUser}
                />
                {joiErorrs.first_name && (
                  <small className="text-danger d-block mt-1">
                    {joiErorrs.first_name}
                  </small>
                )}
              </div>

              <div className="mb-2">
                <label htmlFor="last_name">Last name</label>
                <input
                  type="text"
                  id="last_name"
                  placeholder="last name"
                  className="form-control"
                  onChange={getUser}
                />
                {joiErorrs.last_name && (
                  <small className="text-danger d-block mt-1">
                    {joiErorrs.last_name}
                  </small>
                )}
              </div>

              <div className="mb-2">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  id="age"
                  placeholder="age"
                  className="form-control no-arrows"
                  onChange={getUser}
                />
                {joiErorrs.age && (
                  <small className="text-danger d-block mt-1">
                    {joiErorrs.age}
                  </small>
                )}
              </div>

              <div className="mb-2">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  placeholder="e-mail"
                  className="form-control"
                  onChange={getUser}
                />
                {joiErorrs.email && (
                  <small className="text-danger d-block mt-1">
                    {joiErorrs.email}
                  </small>
                )}
              </div>

              <div className="mb-2">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="password"
                  className="form-control"
                  onChange={getUser}
                />
                {joiErorrs.password && (
                  <small className="text-danger d-block mt-1">
                    {joiErorrs.password}
                  </small>
                )}
              </div>
              <button className="btn btn-outline-info ">Register</button>
            </form>
            {apiMessage && (
              <small className="text-danger d-block mt-1">{apiMessage}</small>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

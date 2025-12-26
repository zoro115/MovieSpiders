import React, { useState } from 'react';
import Joi from 'joi';
import axios from 'axios';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import Loading from '../loading/Loading';
import style from './Login.module.css';

export function Login() {
  const { setUser } = useOutletContext();

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [apiMessage, setApiMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState({});
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  async function checkUser() {
    try {
      setIsLoading(true);
      let { data } = await axios.get('http://localhost:5000/users');
      let isExist = data.find(
        (e) => e.email === userData.email && e.password === userData.password
      );
      if (isExist) {
        setUser(isExist);
        navigate('/home');
      }
    } catch {
      setIsLoading(false);
      setApiMessage('Something went wrong ❌');
    }
  }

  function submit(e) {
    e.preventDefault();
    const schema = Joi.object({
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
      checkUser();
    } else {
      let newErrors = {};
      valid.error.details.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrorMessage(newErrors);
    }
  }

  function getUser(e) {
    let userValue = e.target.value;
    let newUser = { ...userData };
    let userId = e.target.id;
    newUser[userId] = userValue;
    setUserData(newUser);
    setErrorMessage({});
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className={style.body}>
        <div>
          {apiMessage && <div className="alert alert-danger">{apiMessage}</div>}
          <div className={style.card}>
            <form onSubmit={submit}>
              <h2 className="mb-4">Login form</h2>
              <div className=" mb-4">
                <label htmlFor="email">E-mail</label>
                <input
                  type="e-mail"
                  id="email"
                  className="form-control"
                  placeholder="e-mail"
                  onChange={getUser}
                />
                {errorMessage.email && (
                  <small className="text-danger d-block mt-1">
                    {errorMessage.email}
                  </small>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="password"
                  onChange={getUser}
                />
                {errorMessage.password && (
                  <small className="text-danger d-block mt-1">
                    {errorMessage.password}
                  </small>
                )}
              </div>
              <div className="d-flex justify-content-between">
                <button className="btn btn-outline-info ">Login</button>
                <p className={style.p}>
                  you have no email?
                  <Link className={style.link} to="/register">
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

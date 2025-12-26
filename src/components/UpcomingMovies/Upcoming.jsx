import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import style from './Upcoming.module.css';
import { Link } from 'react-router-dom';

export function Upcoming() {
  let [MoviesData, setMoviesData] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);
  async function getMdata() {
    let { data } = await axios.get(
      'https://api.themoviedb.org/3/movie/upcoming?api_key=18e0bc50cb7abd5bcf6b443d37298c79'
    );
    MoviesData = data.results;
    setMoviesData(MoviesData);
  }
  useEffect(function () {
    setIsLoading(true);
    getMdata();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return (
    <>
    <div className={style.body}>
      {IsLoading ? (
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="container mt-4">
            <hr />
            <div className="row">
              <div className={style.UpcomingM}>
                <hr />
                <h2>Upcoming movies</h2>
                <p>this is the Upcoming movies</p>
                <hr />
              </div>

              {MoviesData.map((Upcoming, index) => (
                <div key={index} className="col-md-2">
                  <Link
                    to={'/upcoming/' + Upcoming.id}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div className="movie">
                      <img
                        className="w-100"
                        src={
                          'https://image.tmdb.org/t/p/original/' +
                          Upcoming.poster_path
                        }
                        alt="not found"
                      />
                      <h6>{Upcoming.title}</h6>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <hr />
          </div>
        </>
      )}
      </div>
    </>
  );
}

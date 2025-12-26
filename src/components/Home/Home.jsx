import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './Home.module.css';
import Loading from '../loading/Loading';

export function Home() {
  let [terndData, setTrendData] = useState([]);
  let [topData, setTopData] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);

  async function getTdata() {
    let { data } = await axios.get(
      'https://api.themoviedb.org/3/trending/movie/week?api_key=18e0bc50cb7abd5bcf6b443d37298c79'
    );
    terndData = data.results;
    setTrendData(terndData);
  }

  async function getTopdata() {
    let { data } = await axios.get(
      'https://api.themoviedb.org/3/movie/top_rated?api_key=18e0bc50cb7abd5bcf6b443d37298c79'
    );
    topData = data.results;
    setTopData(topData);
  }

  useEffect(function () {
    setIsLoading(true);
    getTdata();
    getTopdata();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <div className={style.body}>
        {IsLoading ? (
          <Loading />
        ) : (
          <>
            <div className="container">
              <hr />
              <div className="row">
                <div className={style.trending}>
                  <hr />
                  <h2>trending movies</h2>
                  <p>this is trending movies to watch</p>
                  <hr />
                </div>
                {terndData.map((trending, index) => (
                  <div key={index} className="col-md-2">
                    <Link
                      to={'/home/' + trending.id}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <div className="movie">
                        <img
                          className="w-100"
                          src={
                            'https://image.tmdb.org/t/p/original/' +
                            trending.poster_path
                          }
                          alt="not found"
                        />
                        <h6>{trending.title}</h6>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
              <div className="container mt-4">
                <div className="row">
                  <div className={style.movies}>
                    <hr />
                    <h2>top rated movies</h2>
                    <p>this is the top rated movies to watch</p>
                    <hr />
                  </div>
                  {topData.map((movies, index) => (
                    <div key={index} className="col-md-2">
                      <Link
                        to={'/home/' + movies.id}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        <div className="movie">
                          <img
                            className="w-100"
                            src={
                              'https://image.tmdb.org/t/p/original/' +
                              movies.poster_path
                            }
                            alt="not found"
                          />
                          <h6>{movies.title}</h6>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              <hr />
            </div>
          </>
        )}
      </div>
    </>
  );
}

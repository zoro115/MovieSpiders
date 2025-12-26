import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import style from './Tv.module.css';
import { Link } from 'react-router-dom';
import Loading from '../loading/Loading';

export function Tv() {
  let [TvData, setTvData] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);

  async function getTvdata() {
    let { data } = await axios.get(
      'https://api.themoviedb.org/3/tv/popular?api_key=18e0bc50cb7abd5bcf6b443d37298c79'
    );
    TvData = data.results;
    setTvData(TvData);
  }
  useEffect(function () {
    setIsLoading(true);
    getTvdata();
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
          <div className="container mt-4">
            <hr />
            <div className="row">
              <div className={style.Tv}>
                <hr />
                <h2>Tv Shows</h2>
                <p>this is the popular Tv</p>
                <hr />
              </div>
              {TvData.map((Tv) => (
                <div key={Tv.id} className="col-md-2">
                  <Link
                    to={'/tv/' + Tv.id}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div className="Tv">
                      <img
                        className="w-100"
                        src={
                          'https://image.tmdb.org/t/p/original/' +
                          Tv.poster_path
                        }
                        alt="not found"
                      />
                      <h6>{Tv.original_name}</h6>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <hr />
          </div>
        )}
      </div>
    </>
  );
}

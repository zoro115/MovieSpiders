import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import style from './Details.module.css';

export function Details() {
  
  const { id } = useParams();
  let [details, setdetails] = useState(null);
  async function getTvdata() {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}?api_key=18e0bc50cb7abd5bcf6b443d37298c79&language=en-US`
    );
    setdetails(data);
  }
  useEffect(
    function () {
      setTimeout(() => {
        getTvdata();
      }, 2000);
    },
    [id]
  );
  if (!details) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border text-info" role="status"></div>
      </div>
    );
  }
  return (
    <div className={style.details}>
      <div
        className={style.backdrop}
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${details.backdrop_path})`,
        }}
      ></div>

      <div className={style.content + 'container'}>
        <div className="row mt-4">
          <div className="col-md-4">
            <img
              className={style.poster}
              src={'https://image.tmdb.org/t/p/original/' + details.poster_path}
              alt={details.name}
            />
          </div>
          <div className="col-md-8 text-white">
            <h1>{details.name}</h1>
            <p>
              <strong>First Air Date:</strong> {details.first_air_date}
            </p>
            <p>
              <strong>Original Language:</strong> {details.original_language}
            </p>
            <p className={style.generP}>
              <strong>Genres:</strong>
            </p>
            <div className={style.genres}>
              {details.genres
                ? details.genres.map(function (g) {
                    return (
                      <span key={g.id} className={style.box}>
                        {g.name}
                      </span>
                    );
                  })
                : details.genre_ids.map(function (id) {
                    return (
                      <span key={id} className={style.box}>
                        {id}
                      </span>
                    );
                  })}
            </div>
            <p>
              <strong>Overview:</strong> {details.overview}
            </p>
            <p>
              <strong>Vote Average:</strong> {details.vote_average} (
              {details.vote_count} votes)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import style from './BackToTop.module.css';
import { useState, useEffect } from 'react';

export function BackToTop() {
  const [Visable, setVisable] = useState(false);

  function goUp() {
    if (window.scrollY > 90) {
      setVisable(true);
    } else {
      setVisable(false);
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', goUp);
    return () => {
      window.removeEventListener('scroll', goUp);
    };
  }, []);

  function scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  return (
    <>
      {Visable ? (
        <div className={style.BackToTop} onClick={scrollTop}>
          <i class="fa-solid fa-angles-up"></i>
        </div>
      ) : null}
    </>
  );
}

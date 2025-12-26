import React from 'react';

export default function Loading() {
  return (
    <>
          <div className="vh-100 d-flex justify-content-center align-items-center flex-column">
            <div className="spinner-border text-info" role="status"></div>
          </div>
    </>
  );
}

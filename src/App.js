import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/js/bootstrap.bundle"



const App = () => {

  const url = 'https://restcountries.com/v2/all'

  const [data, setData] = useState([])

  const [search, setSearch] = useState('')

  useEffect(() => {
    axios.get(url)
      .then(response => {
        setData(response.data)
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  console.log(data);

  return (
    <>
      {/* NAV */}
      <nav className="navbar navbar-expand-lg navbar-light bg-warning">
        <div className="container d-flex align-items-center justify-content-center">
          {/* INPUT SEARCH */}
          <input className="form-control mr-sm-2 w-25" type="search" placeholder="Search" aria-label="Search" onChange={event => setSearch(event.target.value)} />
          {/* DROPDOWN */}
          <div className="dropdown">
            <button className="btn btn-dark text-warning dropdown-toggle ms-5" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              Filter by Continent
            </button>
            <ul className="dropdown-menu bg-dark" aria-labelledby="dropdownMenuButton1">
              <li><a className="dropdown-item text-warning" href="#">Asia</a></li>
              <li><a className="dropdown-item text-warning" href="#">Europe</a></li>
              <li><a className="dropdown-item text-warning" href="#">America</a></li>
              <li><a className="dropdown-item text-warning" href="#">Africa</a></li>
              <li><a className="dropdown-item text-warning" href="#">Oceania</a></li>
            </ul>
          </div>
        </div>
      </nav>
      {/* CARD */}
      <div className="row m-0 d-flex">
        {data.filter((item) => {
          if (search == '') {
            return item
          } else if (item.name.toLowerCase().includes(search.toLowerCase())) {
            return item
          }
        }).map((item, i) => {
          return (
            <div key={i} className="col-3">
              <div className="card bg-dark d-flex flex-column align-items-center justify-content-center p-3 m-3">
                <img src={item.flags.png} alt="" className="card-img" />
                <h3 className='text-center text-warning text-uppercase pt-3 mb-0'>{item.name} ({item.cioc})</h3>
                <ul className="py-3">
                  <li className='text-warning'><span className="fw-bold text-warning">Capitale</span> : {item.capital}</li>
                  <li className='text-warning'><span className="fw-bold text-warning">Population</span> : {item.population}</li>
                  <li className='text-warning'><span className="fw-bold text-warning">Continent </span>: {item.region}</li>
                </ul>
                <button className="btn btn-warning text-dark">INFOS</button>
              </div>
            </div>
          )
        })}
      </div>
    </>
  );
};

export default App;
import React from 'react';
import { Link } from 'react-router-dom';

const Dependencies = ({ dependencies }) => {
    return (
        <div>
          <h4>{dependencies.length > 0 ? 'Dependencies' : 'I have no dependencies'}</h4>
          <ul>
            {dependencies.map((dp, i) => {
              return (
                <li key={i}>
                  {dp.included ? 
                    <div className='info-list-div'>
                      <Link className='info' to={'/' + dp.link}>{dp.name}</Link>
                    </div>
                    : 
                    <div className='info-list-div'>
                      <p>{dp.name + " --> not listed as a package :D"}</p>
                    </div>
                  }
                </li>
              );
            })}
          </ul>            
        </div>
    );
}

export default Dependencies;
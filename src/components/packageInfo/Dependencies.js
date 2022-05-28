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
                  <div className='info-list-div'>
                    <Link className='info' to={'/' + dp}>{dp}</Link>
                  </div>
                </li>
              );
            })}
          </ul>            
        </div>
    );
}

export default Dependencies;
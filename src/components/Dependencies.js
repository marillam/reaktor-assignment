import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

const Dependencies = ({ dependencies }) => {
    return (
        <div>
          <h4>{dependencies.length > 0 ? 'Dependencies' : 'I have no dependencies'}</h4>
          <ul>
            {dependencies.map((dp, i) => {
              return (
                <li key={i}>
                  <div className='info-list-div'>
                    <Link className='info' to={'#' + dp} smooth>{dp}</Link>
                  </div>
                </li>
              );
            })}
          </ul>            
        </div>
    );
}

export default Dependencies;
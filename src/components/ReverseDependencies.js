import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

const ReverseDependencies = ({ reverseDependencies }) => {
    return (
        <div>
          <h4>{reverseDependencies.length > 0 ? 'Reverse dependencies' : 'No package here depends on me'}</h4>
          <ul>
            {reverseDependencies.map((rdp, i) => {
              return (
                <li key={i}>
                  <div className='info-list-div'>
                    <Link className='info' to={'#' + rdp} smooth>{rdp}</Link>
                  </div>
                </li>
              );
            })}
          </ul>       
        </div>
    );
}

export default ReverseDependencies;
import React from 'react';
import { Link } from 'react-router-dom';

const ReverseDependencies = ({ reverseDependencies }) => {
    return (
        <div>
          <h4>{reverseDependencies.length > 0 ? 'Reverse dependencies' : 'No package here depends on me'}</h4>
          <ul>
            {reverseDependencies.map((rdp, i) => {
              return (
                <li key={i}>
                  <div className='info-list-div'>
                    <Link className='info' to={'/' + rdp}>{rdp}</Link>
                  </div>
                </li>
              );
            })}
          </ul>       
        </div>
    );
}

export default ReverseDependencies;
import React from 'react';
import { Link } from 'react-router-dom';

const OptionalDependencies = ({ optionalDependencies }) => {
    return (
      <div>
        <h4>{optionalDependencies.length > 0 ? 'Optional Dependencies' : 'I have no optional dependencies'}</h4>
        <ul>{optionalDependencies.map((odp, i) => {
          return (
            <li key={i}>
              {odp.included ? 
                <div className='info-list-div'>
                  <Link className='info' to={'/' + odp.link}>{odp.name}</Link>
                </div>
                : 
                <div className='info-list-div'>
                  <p>{odp.name}</p>
                </div>
              }
            </li>
          );})}
        </ul>              
      </div>
    );
}

export default OptionalDependencies;
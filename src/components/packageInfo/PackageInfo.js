import React from 'react';
import OptionalDependencies from './OptionalDependencies';
import Dependencies from './Dependencies';
import ReverseDependencies from './ReverseDependencies';

const PackageInfo = ({ p, name }) => {
  return ( name && p &&
    <div className='main-content-info'>
      <div className='Package-Info-Container' id={p.name}>
        <h2>{p.name}</h2>
        <p>{p.description}</p>
        <Dependencies dependencies={p.dependencies}/>
        <OptionalDependencies optionalDependencies={p.optionalDependencies}/>
        <ReverseDependencies reverseDependencies={p.reverseDependencies}/>
      </div>
    </div>
  );
}

export default PackageInfo;
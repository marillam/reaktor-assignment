import React from 'react';
import OptionalDependencies from './OptionalDependencies';
import Dependencies from './Dependencies';
import ReverseDependencies from './ReverseDependencies';

const PackageInfo = ({ p }) => {
    return (
        <div className='Package-Info-Container' id={p.name}>
          <h2>{p.name}</h2>
          <p>{p.description}</p>
          <Dependencies dependencies={p.dependencies}/>
          <OptionalDependencies optionalDependencies={p.optionalDependencies}/>
          <ReverseDependencies reverseDependencies={p.reverseDependencies}/>
        </div>
    );
}

export default PackageInfo;
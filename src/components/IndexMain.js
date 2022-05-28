import React from 'react';
import PackageListComponent from './PackageListComponent';

const IndexMain = ({ packages }) => {
  return (
    <div className='main-content'>
      <ul className='package-list'>
        {packages.map((p, i) => {
          return (
            <li key={p.name}>
              <PackageListComponent p={p}/>
            </li>);
        })}
      </ul> 
    </div>
  );
}

export default IndexMain;
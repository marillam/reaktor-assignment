import React from 'react';
import { useParams } from 'react-router-dom';
import PackageListComponent from './PackageListComponent'
import PackageInfo from './packageInfo/PackageInfo'

const PackageInfoMain = ({ packages }) => {
  let { name } = useParams();
  const p = packages?.find(pack => pack.name === name);
  return ( name && p &&
    <>
      <div className='sidebar'>
        <ul className='package-list'>
          {packages.map((p, i) => {
            return (
              <li key={p.name}>
                <PackageListComponent p={p}/>
              </li>);
          })}
        </ul> 
      </div>
      <PackageInfo p={p} name={name}/>
    </>
  );
}

export default PackageInfoMain;
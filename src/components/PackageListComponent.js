import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

const PackageListComponent = ({ p, i }) => {
    return (
        <div className='basicContainer'>
          <Link to={'#' + p.name} smooth>{p.name + ' ' + i}</Link>
        </div>
    );
}

export default PackageListComponent;
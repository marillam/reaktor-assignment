import React from 'react';
import { Link } from 'react-router-dom';

const PackageListComponent = ({ p }) => {
    return (
        <div className='basicContainer'>
          <Link to={'/' + p.name}>{p.name}</Link>
        </div>
    );
}

export default PackageListComponent;
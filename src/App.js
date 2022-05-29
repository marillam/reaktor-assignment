import './css/App.css';
import { useState, useEffect } from 'react';
import FileInput from './components/FileInput';
import { parse } from './parser';
import { Routes, Route, Link } from 'react-router-dom';
import IndexMain from './components/IndexMain';
import PackageInfoMain from './components/PackageInfoMain';
import Title from './components/Title'

function App() {
  let possibleData = sessionStorage.getItem('package-string');
  let startData;
  possibleData !== null ? startData = possibleData : startData = '';
  const [ text, setText ] = useState(startData);
  const [ packages, setPackages ] = useState([]);

  useEffect(() => {
    const array = parse(text);
    setPackages(array);
  }, [text]);      

  return (
    <div className='Poetry-parser'>
      <header className="App-header">
        <Link className='title-link' to={'/'}>{<Title/>}</Link>
        <FileInput text={text} setText={setText}/>
      </header>
      <Routes>
        <Route path='/:name' element={<PackageInfoMain packages={packages}/>}/>
        <Route path='/' element={<IndexMain packages={packages}/>}/>
      </Routes>
    </div>
  );
}

export default App;

import './css/App.css';
import { useState, useEffect } from 'react';
import FileInput from './components/FileInput';
import { parse } from './parser';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import IndexMain from './components/IndexMain';
import PackageInfoMain from './components/PackageInfoMain';
import Title from './components/Title'

function App() {
  const [ text, setText ] = useState('');
  const [ packages, setPackages ] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    console.log('useEffect working');
    const array = parse(text);
    setPackages(array);
    navigate('/');
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

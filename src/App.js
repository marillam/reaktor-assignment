import './App.css';
import { useState, useEffect } from 'react';
import FileInput from './FileInput';
import { parse } from './parser';
import { BrowserRouter } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import PackageInfo from './components/PackageInfo';
import PackageListComponent from './components/PackageListComponent';

function App() {
  const [ text, setText ] = useState('');
  const [ packages, setPackages ] = useState([]);
  const [ focused, setFocused ] = useState('');

  useEffect(() => {
    console.log('useEffect working');
    const array = parse(text);
    setPackages(array);
  }, [text]);

  return (
    <BrowserRouter>
      <div className='Poetry-parser'>
        <header className="App-header">
          <p>
            Take a tour of your dependencies.
            {window.location.href}
          </p>
          <FileInput text={text} setText={setText}/>
        </header>
        <ul className='package-list'>
          {packages.map((p, i) => {
            return (
              <li key={p.name}>
                <PackageListComponent p={p} i={i}/>
              </li>);
          })}
        </ul> 
        <ul className='package-list'>
          {packages.map((p, i) => {
            return (
              <li key={p.name+'tarkka'}>
                <PackageInfo p={p}/>
              </li>
            );
          })}
        </ul>
      </div>
    </BrowserRouter>
  );
}

/*
{packages.forEach(p => {
        <div>
          <h4>{p.name}</h4>
          <p>{p.description}</p>
          <br/>
        </div>
      })}*/

export default App;

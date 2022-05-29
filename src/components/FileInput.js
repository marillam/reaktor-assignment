import React from 'react';
import { useNavigate } from 'react-router-dom';

const FileInput = ({ text, setText }) => {
    const fileInput = React.createRef();
    let string = '';
    let navigate = useNavigate();

    const onFileSelected = async(e) => {
        e.preventDefault();
        string = await new Response(fileInput.current.files[0]).text();
        setText(string);
        sessionStorage.setItem('package-string', string);
        navigate('/');
    }

    return(
        <>
          <form onSubmit={onFileSelected}>
              <input type='file' ref={fileInput} accept='.lock'/>
              <button type='submit'>Submit</button>
          </form>
        </>
    );
};

export default FileInput;
import React from 'react';

const FileInput = ({ text, setText }) => {
    const fileInput = React.createRef();
    let string = '';

    const onFileSelected = async(e) => {
        e.preventDefault();
        string = await new Response(fileInput.current.files[0]).text();
        setText(string);
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
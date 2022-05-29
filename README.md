
This is a poetry.lock file parser. 
Interaction with this happens through an html interface where the user selects a file from their computer. Index page is a listing of all packages where the names link to details. The whole div would have been nice as a link but the instruction was to use the name. The front is implemented with React. SessionStorage is used to keep the package information from the last selected and submitted file.

All parsing logic is inside the parser.js file. Some things to note:
    - Optional dependecies are separated from the 'mandatory' dependecies because I wasn't sure if they should be and figured it couldn't do any harm
    - Dependencies/extra dependecies in style coverage[toml] caused some confusion (as in which package should be taken from that) so this assumes the outer, e.g. here coverage
    - Noticed that one listed dependency (poetry for poetry-plugin-export) wasn't in the packages. I'm assuming this is a special case but since it won't work as a link I added a similar check to dependencies as there is in optional and extras
    - For reverse dependencies I counted optional dependencies too
    - Works for format of version 1.1
    - Tested on this file: https://github.com/python-poetry/poetry/blob/70e8e8ed1da8c15041c3054603088fce59e05829/poetry.lock

The file is read as a string. This is done with the assumption that these files aren't huge based on what they should contain. Just a note that this approach would likely cause a crash on big files. 




This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Useful Scripts

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

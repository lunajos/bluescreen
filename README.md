# Penn State Wilkes-Barre Blue Screen/Cancelation Messages


## Obtaining

There are a few ways to get this template:

If you use [Git](http://www.git-scm.com/):


````bash
git clone https://github.com/lunajos/bluescreen.git
````


## Code walkthrough

The `manifest.json`  file contains metadata about the app, such as its name, description, icon and required permissions for running under Firefox OS and the `manifest.webmanifest` for the PWA .

Moving over to `bluescreen.html`, this is the starting point for the app when it's launched, and also where the layout is defined and the JavaScript files with the functionality and logic are loaded.

The appearance is defined in `css/app.css`. There are just some very basic rules.

We define the app's behaviour in `js/app.js`. 

## Security
Need to change `innerHTML` => `textContent`

This way, angle brackents and special chars do not get parsed. They get interpreted as is.

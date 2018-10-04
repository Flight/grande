# Grande

## Quick start for developers
Project uses node + gulp for fast developing.

To install node: https://nodejs.org/en/

Then open your favorite Terminal and run these commands.
```
npm install --global gulp-cli
npm install
```

### To compile everything:
`
gulp
`

### To watch everything (html + scss + assets + js):
`
gulp watch
`

### To regenerate sprite:
The generation script will put the files into the sources folder, so be sure to run `gulp scss` and `gulp assets` to update the compiled folder. Or just run `gulp` to update everything.
`
gulp sprite
`

### To run webserver with livereload:
Install [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) VS Code extension by Ritwick Dey and press Go Live button.

## To push changes to github pages

`git subtree push origin gh-pages`

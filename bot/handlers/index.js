module.exports = (app) => {
  require("fs").readdir(__dirname, (err, files) => {
    if (err) {
      console.log(err);
      process.exit();
    } else {
      for (var file in files) {
        if (files[file].endsWith("js")) {
          file = files[file].slice(0, files[file].length - 3);
          if (file != "index") {
            app.use(require(`./${file}`));
          }
        }
      }
    }
  });
};

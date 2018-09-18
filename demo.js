const cp = require("child_process")
const express = require("express");
const app = express();  

app.get('/', (req, res) => res.sendFile(`${__dirname}/demo.html`));
app.use('/build', express.static('build'));
app.use('/demo', express.static('demo'));

app.listen(1337, () => cp.exec("xdg-open http://localhost:1337"));
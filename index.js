const app = require('./config/express')();
const port = app.get('port');

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
});

app.get('/campanha', function (req, res) {
  res.render(__dirname + "/pages/campanha");
});
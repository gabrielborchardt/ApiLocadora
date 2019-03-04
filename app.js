var app = require('./config/appConfig');
var login = require('./routes/loginRouter');
var usuarios = require('./routes/usuarioRouter');
var filmes = require('./routes/filmeRouter');
var locacao = require('./routes/locacaoRouter');
var dbInit = require('./database/init.js')

//Acesso inicial
app.get('/', (req, res) =>{
    res.end('Bem-vindo a API da Locadora.');
})

//Rota de Login
app.use('/login', login);

//Rota de Usuarios
app.use('/usuarios', usuarios);

//Rota de Filmes
app.use('/filmes', filmes);

//Rota de Locação
app.use('/locacao', locacao);
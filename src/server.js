

// Chamar o servidor express
const express = require('express') // cria server
const server = express() // usando a funcionalidade de server

//importar os dados das pages
const {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
} = require('./pages')

// importar nunjucks (Template engine)
const nunjucks = require('nunjucks')
//configurar nunjucks
nunjucks.configure('src/views', {    
    express: server,
    oncache: true,
})//qual servidor estamos usando server = require('express')

//Servidor
server
//receber os dados do req.body
.use(express.urlencoded({ extended: true }))

// configurar arquivos estaticos (css, scripts, imagens)
.use(express.static("public")) //configuração do servidor criando var "express" atalho para require usando a pasta correta com as propriedades

// cadastrar a rota do arquivo do get ("/study") --dirname diretório - respectivo a cada function acima
//rota da aplicação
.get("/", pageLanding)

.get("/study", pageStudy) 

.get("/give-classes", pageGiveClasses) 

//rota para esconder infos da url
.post("/save-classes", saveClasses)


//rota do servidor - Start server
.listen(5500) //porta do server

/* Após ateração precisa restartar o servidor ferramenta nodemon -
Sempre resetar o servidor após alteração $npm install nodemon -D*/

//-------------------------------------------


const http = require('http');
const app = require('./app/App')

const PORT = process.env.PORT || 2020;


//servidor
const server = http.createServer(app);
server.listen(PORT, console.log(`Servidor rodando na porta ${PORT}`));
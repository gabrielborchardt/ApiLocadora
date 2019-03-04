var db = require('../config/dbConfig'); 

// connection para fazer uma conexão e 
//   em caso de sucesso, imprimir uma mensagem de sucesso. 
//   Caso contrário, se der erro, uma mensagem de falha
db.connect(function(err){

    createTableUsuario(db);

    createTableFilme(db);

    createTableLocacao(db);

    db.end;
})
    
//Criação da tabela de usuários
function createTableUsuario(conn){
 
      const sql = "CREATE TABLE IF NOT EXISTS PES_USUARIO (\n"+
                  "CODUSUARIO int NOT NULL AUTO_INCREMENT COMMENT 'Código do usuário',\n"+
                  "DSCNOME varchar(150) NOT NULL COMMENT 'Nome do usuário',\n"+
                  "DSCEMAIL varchar(150) NOT NULL COMMENT 'Email do usuário',\n"+
                  "DSCSENHA char(32) NOT NULL COMMENT 'Senha do usuário',\n"+
                  "PRIMARY KEY (CODUSUARIO)\n"+
                  ");";
      
      conn.query(sql, function (error, results, fields){
          if(error) return console.log(error);
          console.log('criou a tabela PES_USUARIO!');
      });
}

function deleteUsuarios(conn){
    const sql = "DELETE FROM PES_USUARIO";
    conn.query(sql, function (error, results, fields){
            if(error) return console.log(error);
            console.log('Deletou Usuários!');
            //conn.end();//fecha a conexão
        });
}

function addUsuarios(conn){
    const sql = "INSERT INTO PES_USUARIO(DSCNOME,DSCEMAIL,DSCSENHA) VALUES ?";
    const values = [
          ['Admin','admin@locadora.com.br','admin@123'],
          ['Manoel','man@hotmail.com.br','man@123'],
          ['Rafael','raf@hotmail.com.br','raf@123']
        ];
    conn.query(sql, [values], function (error, results, fields){
            if(error) return console.log(error);
            console.log('Adicionou Usuários!');
            //conn.end();//fecha a conexão
        });
}

//Criação da tabela de Filmes
function createTableFilme(conn){
 
    const sql = "CREATE TABLE IF NOT EXISTS PRD_FILME (\n"+
                "CODFILME int NOT NULL AUTO_INCREMENT COMMENT 'Código do filme',\n"+
                "DSCTITULO varchar(150) NOT NULL COMMENT 'Título do filme',\n"+
                "DSCDIRETOR varchar(150) NOT NULL COMMENT 'Diretor do filme',\n"+
                "DATLANCAMENTO date NOT NULL COMMENT 'Data de lançamento do filme',\n"+
                "DSCSINOPSE varchar(1000) COMMENT 'Sinopse do filme',\n"+
                "QTDCOPIA int COMMENT 'Quantidade de cópias do filme',\n"+
                "PRIMARY KEY (CODFILME)\n"+
                ");";
    
    conn.query(sql, function (error, results, fields){
        if(error) return console.log(error);
        console.log('criou a tabela PRD_FILME!');
    });
}

function deleteFilmes(conn){
    const sql = "DELETE FROM PRD_FILME";
    conn.query(sql, function (error, results, fields){
            if(error) return console.log(error);
            console.log('Deletou Filmes!');
            //conn.end();//fecha a conexão
        });
}

function addFilmes(conn){
    const sql = "INSERT INTO PRD_FILME(DSCTITULO,DSCDIRETOR,DATLANCAMENTO,DSCSINOPSE,QTDCOPIA) VALUES ?";
    const values = [
          ['Green Book: O Guia','Peter Farrelly','2018-11-21'
            ,'Tony Lip, um dos maiores fanfarrões de Nova York, precisa de trabalho após sua discoteca fechar. Ele conhece um pianista que o convida para uma turnê. Enquanto os dois se chocam no início, um vínculo finalmente cresce à medida que eles viajam.'
            ,5
          ],
          ['Pantera Negra','Ryan Coogler','2018-02-15'
            ,'Conheça a história de TChalla, príncipe do reino de Wakanda, que perde o seu pai e viaja para os Estados Unidos, onde tem contato com os Vingadores. Entre as suas habilidades estão a velocidade, inteligência e os sentidos apurados.'
            ,3
          ],
          ['Nasce Uma Estrela','Bradley Cooper','2018-10-11'
            ,'A jovem cantora Ally ascende ao estrelato enquanto seu parceiro Jackson Maine, um renomado artista de longa carreira, cai no esquecimento por problemas com o álcool. Os momentos opostos acabam por minar o relacionamento amoroso dos dois.'
            ,2
          ]
        ];
    conn.query(sql, [values], function (error, results, fields){
            if(error) return console.log(error);
            console.log('Adicionou filmes!');
            //conn.end();//fecha a conexão
        });
}

//Criação da tabela de Locação de filmes por usuário
function createTableLocacao(conn){
 
    const sql = "CREATE TABLE IF NOT EXISTS LOC_USUARIO_FILME (\n"+
                "CODUSUARIO int NOT NULL COMMENT 'Código do usuario',\n"+
                "CODFILME int NOT NULL COMMENT 'Código do filme',\n"+
                "QTDLOCACAO int DEFAULT 1 COMMENT 'Quantidade de cópias locadas',\n"+
                "DATLOCACAO date NOT NULL COMMENT 'Data de locação do filme',\n"+
                "DATPREVISAO date NOT NULL COMMENT 'Data de previsão de entrega do filme',\n"+
                "DATDEVOLUCAO date COMMENT 'Data de devolução do filme',\n"+
                "FOREIGN KEY(CODUSUARIO) REFERENCES PES_USUARIO(CODUSUARIO),\n"+
                "FOREIGN KEY(CODFILME) REFERENCES PRD_FILME(CODFILME)\n"+
                ");";
    
    conn.query(sql, function (error, results, fields){
        if(error) return console.log(error);
        console.log('criou a tabela LOC_USUARIO_FILME!');
    });
}
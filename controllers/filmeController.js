'user strict';
var db = require('../config/dbConfig'); 

var Filmes = {
    //Listar Filmes
    ObterFilmes: function(titulo, result) {
        
        var sql = " SELECT PRD_FILME.*, "
            sql += "    PRD_FILME.QTDCOPIA - SUM(CASE WHEN LOC_USUARIO_FILME.QTDLOCACAO IS NULL THEN 0 ELSE LOC_USUARIO_FILME.QTDLOCACAO END) AS QTDDISPONIVEL "
            sql += "    FROM PRD_FILME "
            sql += "        LEFT JOIN LOC_USUARIO_FILME ON LOC_USUARIO_FILME.CODFILME = PRD_FILME.CODFILME "
            sql += "            AND LOC_USUARIO_FILME.DATLOCACAO >= " + formatDate(Date.now())
            sql += "            AND LOC_USUARIO_FILME.DATDEVOLUCAO IS NULL "

            if(titulo !== "")
                sql += " WHERE PRD_FILME.DSCTITULO LIKE('%" + titulo + "%')"

            sql += "    GROUP BY PRD_FILME.CODFILME, PRD_FILME.DSCTITULO, PRD_FILME.DSCDIRETOR, "
            sql += "        PRD_FILME.DATLANCAMENTO, PRD_FILME.QTDCOPIA "

        //Executa Query
        db.query(sql, function (err, res) {
                
            if(err) {
                console.log("error: ", err);
                result(err);
            }
            else{
                console.log('filmes : ', res);  
                result(res);
            }
        });
    },
    //Cadastrar
    Cadastrar: function(dsctitulo,dscdiretor,datlancamento,dscsinopse,qtdcopia, result) {    
    
        db.query(`INSERT INTO PRD_FILME 
                    (DSCTITULO,DSCDIRETOR,DATLANCAMENTO,DSCSINOPSE,QTDCOPIA) 
                    VALUES 
                    ('${dsctitulo}','${dscdiretor}','${datlancamento}','${dscsinopse}',${qtdcopia})`
            ,function (err, res) {
            
            if(err) {
                console.log("error: ", err);
                result(err);
            }
            else{
                console.log(res.insertId);
                result(res.insertId);
            }
        });
    },
};

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

module.exports = Filmes;
'user strict';
var db = require('../config/dbConfig'); 

var Locacao = {
    //Alugar
    Alugar: function(codusuario,codfilme,qtdlocacao,datlocacao,datprevisao, result) {    
        
        VerificaQuantidadeDisponivel(codfilme, qtdlocacao, function(quantidade){
            
            if(quantidade > 0){
                result(false);
                return;
            }
    
            db.query(`INSERT INTO LOC_USUARIO_FILME 
                        (CODUSUARIO,CODFILME,QTDLOCACAO,DATLOCACAO,DATPREVISAO,DATDEVOLUCAO) 
                        VALUES 
                        (${codusuario},${codfilme},${qtdlocacao},'${datlocacao}','${datprevisao}',null)`
                ,function (err, res) {
                
                if(err) {
                    console.log("error: ", err);
                    result(false);
                }
                else{
                    result(true);
                }
            });
        });
    },
    Devolver: function(codusuario, codfilme, result){

        var sql = " UPDATE LOC_USUARIO_FILME SET DATDEVOLUCAO = '" + formatDate(Date.now()) + "'"
            sql += " WHERE CODUSUARIO = " + codusuario
            sql += " AND CODFILME = " + codfilme

            console.log("SQL: ", sql);

            db.query(sql,function (err, res) {
            if(err) {
                console.log("error: ", err);
                result(err);
            }
            else{
                console.log("sucess: OK");
                result("OK");
            }
        });
    }
};

function VerificaQuantidadeDisponivel(codfilme,qtdLocacao, callback)
{
    var sql = " SELECT "
    sql += "    PRD_FILME.QTDCOPIA - SUM(CASE WHEN LOC_USUARIO_FILME.QTDLOCACAO IS NULL THEN 0 ELSE LOC_USUARIO_FILME.QTDLOCACAO END) AS QTDDISPONIVEL "
    sql += "    FROM PRD_FILME "
    sql += "        LEFT JOIN LOC_USUARIO_FILME ON LOC_USUARIO_FILME.CODFILME = PRD_FILME.CODFILME "
    sql += "            AND LOC_USUARIO_FILME.DATLOCACAO >= " + formatDate(Date.now())
    sql += "            AND LOC_USUARIO_FILME.DATDEVOLUCAO IS NULL "
    sql += " WHERE PRD_FILME.CODFILME = " + codfilme
    sql += "    GROUP BY PRD_FILME.CODFILME, PRD_FILME.DSCTITULO, PRD_FILME.DSCDIRETOR, "
    sql += "        PRD_FILME.DATLANCAMENTO, PRD_FILME.QTDCOPIA "

    db.query(sql,function(err,[filme]){
        if(err){
            console.log("erro: ",err);
            callback(0);
        }else{
            callback(qtdLocacao - filme.QTDDISPONIVEL);
        }
    });
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

module.exports = Locacao;
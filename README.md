# NodeJs - API Locadora de Filmes

# Documentação Postman
https://documenter.getpostman.com/view/1261739/S11LsxTQ

# Configurações
config/appConfig - Porta(3000)

# DataBase
config/dbConfig - String de Conexão

# Init
Ao iniciar o app.js, é criada as tabelas necessárias da API.

# Especificações de Utilização

##**Usuários**
	Listar:
		GET http://localhost:3000/usuarios
		Retorna todos usuários cadastrados.
	
		GET http://localhost:3000/usuarios/31
		Retorna usuário por ID.
	
	Cadastrar:
		POST http://localhost:3000/usuarios/cadastrar
		Exemplo: { "dscnome": "Joaquim", "dscemail": "joaquim@gmail.com", "dscsenha": "joaquim@123" }
			dscnome = nome do usuarios;
			dscemail = email do usuário (utilizado para login);
			dscsenha = senha do usuário para login;
		Result: Status 200 - OK - ID Usuário 
				Status 400 - Erro - err.description
		
	Login:
		POST http://localhost:3000/login
		Passar login (email) e senha.
		Exemplo: { "dscemail": "gab@hotmail.com", "dscsenha": "gab@123" }
		Result: Status 200 (OK) 
				Status 500 (Login inválido!)
				
##**Filmes**
	Listar:
		GET http://localhost:3000/filmes
		Retorna a lista de filmes, com suas informações e quantidade de cópias disponíveis para locação.
		
		GET http://localhost:3000/filmes/tropa
		Retorna filme pesquisando pelo titulo

	Cadastrar:
		POST http://localhost:3000/filmes/cadastrar
		Exemplo: { "dsctitulo": "Tropa de Elite", "dscdiretor": "José Padilha", "datlancamento": "2007-10-05", "dscsinopse": "O capitão da força especial da Polícia Militar do Rio de Janeiro treina dois recrutas novatos para que possam sucedê-lo.", "qtdcopia": 5 }
				dsctitulo: Título do filme;
				dscdiretor: Diretor do filme;
				datlancamento: Data de lançamento do filme;
				dscsinopse: Sinopse do filme;
				qtdcopia: Quantidade de cópias do filme;
		Result: Status 200 - OK - ID 
				Status 400 - Erro
				
##**Locação**
	Alugar:
		http://localhost:3000/locacao/alugar
		Realizar a locação do filme.
		Exemplo: { "codusuario": 31, "codfilme": 11, "qtdlocacao": 2, "datlocacao": "2018-03-01", "datprevisao": "2018-03-10" }
				codusuario: Código do usuário que irá locar o filme;
				codfilme: Codigo do filme para locação;
				qtdlocacao: Quantidade de cópias para locação;
				datlocacao: Data de locação;
				datprevisao: Data de previsão para entrega;
		Result: Status 200 - OK 
				Status 400 - Erro Status 500 - Não foi possível realizar a locação do filme!

	Devolver:
		POST http://localhost:3000/locacao/devolver
		Devolução dos filmes.
		Exemplo:{ "codusuario": 31, "codfilme": 11 }
				codusuario: Código do usuario que esta devolvendo o filme;
				codfilme: Código do filme que está sendo devolvido;
		Result: Status 200 - OK 
		Status 400 - Erro
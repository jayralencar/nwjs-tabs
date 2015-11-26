module.exports.controller = function(res, req){
	var users = [
		{id: 1, name: "Jayr", email: "jayralencarpereira@gmail.com"},
		{id: 2, name: "José", email: "jose@gmail.com"},
		{id: 3, name: "Maria", email: "maria@gmail.com"},
		{id: 4, name: "João", email: "joao@gmail.com"}
	]
	res.renderFile("teste", {users:users})
}
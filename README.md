
## Como iniciar o projeto

Primeiro rode o comando

```bash
Yarn ou npm install
```

## como instalar banco da dados:
```
crie um arquivo .env com seguintes dados dentro.

DATABASE_URL="postgresql://"usuario":"senha do usuario"@localhost:5432/"nome do banco de dados"?schema=public"
SECRET_KEY="secreto"
```

```
Após isso rode o comando:
yarn prisma migrate dev
ou
npm prisma migrate dev
```

```
Depois rode o comando para iniciar o projeto em localHost
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

## Rotas Api
```bash

Metodo: Post
Login User: /api/auth/login
Dados: {
	"email": "",
	"password": ""
}


Metodo: Post
Register User: /api/users/register
Dados: {
	"email": "",
	"password": "",
	"name": "",
	"phone": ""
}


Metodo: Pacth
Precisa está autenticado.
Update User: /api/users/
Dados: {
	"email": "",
	"password": "",
	"name": "",
	"phone": ""
}



Metodo: Get
Precisa está autenticado.
Get Contact: /api/contact/{id}


Metodo: Pacth
Precisa está autenticado.
Update Contact: /api/contact/{id}
Dados: {
	"email": "",
	"name": "",
	"phone": ""
}


Metodo: Post
Register Contact: /api/contact/register
Dados: {
	"email": "",
	"password": "",
	"name": "",
	"phone": ""
}
```

## Front end 

```bash 
Pagina incial: http://localhost:3000/

Pagina login: http://localhost:3000/login

Pagina Registro http://localhost:3000/register 

Pagina principal http://localhost:3000/dashbord
```

## Ideia do projeto:
Uma agenda de contatos online onde voce pode adicionar contatos, podendo alterar e remover

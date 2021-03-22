# bipcarroschallenge

# /backend

Tecnologias usadas:

- TypeORM
- Postgres
- Typescript

A api utiliza a api oficial do twitter para pegar as os tweets mais recentes da hashtag desejada e salva as hashtags e os tweets na database.

Variáveis locais utilizadas :

São configurações do typeORM, apikey que o twitter fornece(Bearer Token) e a porta que você quer que rode localmente o server.

TYPEORM_CONNECTION
TYPEORM_HOST
TYPEORM_USERNAME
TYPEORM_PASSWORD
TYPEORM_DATABASE
TYPEORM_PORT
TYPEORM_ENTITIES
TYPEORM_SYNCHRONIZE
TYPEORM_LOGGING
TYPEORM_DRIVER_EXTRA
TYPEORM_ENTITIES_DIR
TYPEORM_MIGRATIONS
TYPEORM_SUBSCRIBERS
TYPEORM_MIGRATIONS_DIR
TYPEORM_SUBSCRIBERS_DIR
PORT
API_KEY

Scripts:

npm run dev -- rodar o server localmente em modo de desenvolvilmento com o nodemon .
npm run build -- compila para js e faz a build de produção
npm start -- roda o server compilado

Rotas:
backend: https://hashtagsapi.herokuapp.com/hashtag

POST -> precisa de um body nesse formato :

o count é opcional, é o número de tweets que você quer que retorne
ex:

```json
{
	"hashtag": "snydercut",
	"count": 20
}
```

E ele retorna os tweets daquela hashtag

GET -> https://hashtagsapi.herokuapp.com/hashtag
retorna todas as hashtags e resultados que estão na db

GET -> https://hashtagsapi.herokuapp.com/hashtag?q=snydercut

retorna todos os resultados da hashtag snydercut

# /frontend

Tecnologias:

- ReactJS
- Material/Ui

Interface para o sistema feita em ReactJS

Variável local utilizada:

(Link da api)
REACT_APP_BASE_URL

frontend: https://hashtagchallenge.vercel.app/

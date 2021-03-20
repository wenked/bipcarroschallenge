# bipcarroschallenge

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

frontend: https://hashtagchallenge.vercel.app/

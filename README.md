# bipcarroschallenge

backend: https://hashtagsapi.herokuapp.com/hashtag

POST -> precisa de um body nesse formato :
ex:
{
hashtag: 'snydercut'
}

GET -> https://hashtagsapi.herokuapp.com/hashtag
retorna todas as hashtags e resultados que estão na db

GET -> https://hashtagsapi.herokuapp.com/hashtag?q=snydercut

retorna todos os resultados da hashtag snydercut

frontend: https://hashtagchallenge.vercel.app/

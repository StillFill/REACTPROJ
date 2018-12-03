Antes de começar a rodar esta aplicação, rode o mongoDB e a restAPI

Rodando MONGODB


Você precisará ter o mongodb instalado no seu computador

Para instalar o mongodb rode:

- Para instalar o pacote do MONGODB
```
sudo apt update

sudo apt install -y mongodb
```


No terminal, use o comando
```
mongod
```

- Para iniciar a API

Clone o seguinte repositório:

```
https://github.com/StillFill/RESTAPI
```

Para rodar a api basta usar o comando

```
npm install
```

e logo em seguida

```
nodemon dist/main.js
```

Com isso temos o mongodb e nossa api rodando, basta rodar a aplicação

- Rodando a aplicação

No terminal rode:

```
npm install
```

e em seguida 

```
npm start
```
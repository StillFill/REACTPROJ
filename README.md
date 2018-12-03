Antes de começar a rodar esta aplicação, rode o mongoDB e a restAPI

Rodando MONGODB


Você precisará ter o mongodb instalado no seu computador

Para instalar o mongodb rode:


- Para dar update na lista de pacotes para os pacotes mais recentes
```
sudo apt update
```

- Para instalar o pacote do MONGODB
```
sudo apt install -y mongodb
```


No terminal, use o comando
```
mongod
```

Com ele rodando, você pode inicializar a API

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

No terminal rode:

```
npm install
```

e em seguida 

```
npm start
```
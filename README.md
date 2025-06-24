# Relatório de Projeto

Esse é o projeto de uma livraria virtual desenvolvido para
a disciplina Introdução de Desenvolvimento Web (SCC0219).
Os seguintes alunos participaram do projeto:
- Gabriel Martins Monteiro, N°USP: 14572099
- Hélio Márcio Cabral Santos, N°USP: 14577862
- Murilo Fonseca de Matos, N°USP: 13719065

## Requisitos

O projeto necessitará dois usuários:
- **Administrador**: responsável por gerenciar os recursos, nesse caso os produtos da loja.
- **Cliente**: esses são os usuários que usufruiram do serviço.

É preciso armazenar os seguintes dados:
- **Administrador**: id, nome completo, nome de usuário, email, cep, telefone, senha, carrinho.
- **Cliente**: id, nome completo, nome de usuário, email, cep, telefone, senha, carrinho.
- **Produto**: id, autor, imagem, título, preço, gênero, editora, descrição, quantidade no estoque, quantidade vendida.
- **Vendas**: id, comprador, livros, preço total, data.

Os administradores teram livre acesso para gerenciar os recursos, como adicionar e remover livros.

## Descrição
O projeto é uma livraria online que tem como objetivo oferecer as seguintes funcionalidades:
- Cadastro de perfis e Login.
- Adicionar ou remover produtos do carrinho.
- Finalização de compras.
- Filtrar por gênero, autor, editora.
- Busca por nome.
- Adicionar ou remover novos produtos no catálogo (administrador).

Para que as funcionalidades sejam implementadas de maneira adequadas, é preciso
que os registros descrito no tópico "Requisitos" sejam devidamente armazenados.

## Diagrama de navegação
<img src="diagrama.png" alt="navigation diagram" width="700"/>

Todos os mockups estão na pasta "mockup/".

## Comentários sobre o código

### Frontend

Utilizamos algumas bibliotecas, como react-router-dom para fazer as ligações
entre as páginas e a navbar, e também a toastify, biblioteca para notificações.
Utilizamos notificações para ter feedback ao usuário de que os livros foram
adicionados no carrinho, por exemplo.

O código está organizado na seguinte estrutura:
- **frontend/src/pages**: Equivalente às páginas html.
- **frontend/src/componentes**: Componentes modulares, que são reutilizados ao decorrer do código.
- **frontend/src/contexts**: Parte que utiliza a função createContext() do react para guardar contexto
da aplicação, de forma que informações como itens no carrinho e contas também são salvas mesmo
que a página seja trocada. É nessa parte também que todas as chamadas às APIs estão
implementadas.

Nessa etapa do projeto, as funções de API já foram devidamente implementadas. 
Foi utilizada a biblioteca axios para fazer as requisições ao backend.

### Backend

Para o backend, foi utilizado o mongoDB para gerenciamento da base de dados,
e a biblioteca mongoose para gerenciar a conexão entre o javascript e o mongoDB.
O código está organizado nos seguintes arquivos:

- **backend/server.js**: Contém todas as chamadas de API definidas. Há 3 APIs principais:
API de users, sales, books. A API de users é responsável pelo registro de dados de usuários.
A API de sales é responsável pelo histórico de venda de produtos. Já a API de books é responsável
por armazenar os livros no catálogo.
- **backend/seed.js**: Contém a "seed", com os dados iniciais para serem enviados ao banco de dados.
- **backend/models/**: Contém os Schemas, ou modelos, definidos para cada tipo de dados, User, Sale e Book.
Os dados estão organizados na maneira descrita nos requisitos.

## Plano de testes

Nós fizemos alguns testes manuais. Eles são:
- Comprar um produto
- Adicionar novo produto
- Remover um produto
- Atualizar um produto
- Criar novo usuário
- Login
- Busca
- Filtro

Para o backend foram feitos testes usando o postman, todas as tabelas (Usuários, Livros e Vendas) foram testadas para todas as operações do CRUD. Conforme mostrado no final dos resultados dos testes.

## Resultado dos testes

### Comprar um produto

![comprar01](screenshots/comprar_01.png)
![comprar02](screenshots/comprar_02.png)
![comprar03](screenshots/comprar_03.png)

### Adicionar novo produto

![adicionar01](screenshots/adicionarlivro_01.png)
![adicionar02](screenshots/adicionarlivro_02.png)

### Remover um produto

![remover01](screenshots/remover_01.png)
![remover02](screenshots/remover_02.png)

### Atualizar um produto

![atualizar01](screenshots/atualizar_01.png)
![atualizar02](screenshots/atualizar_02.png)
![atualizar03](screenshots/atualizar_03.png)

### Criar novo usuário

![screen01](screenshots/criar_01.png)
![screen02](screenshots/criar_02.png)

### Login

![login01](screenshots/login_01.png)
![login02](screenshots/login_02.png)

### Busca

![busca01](screenshots/busca_01.png)
![busca02](screenshots/busca_02.png)

### Filtro

![filtro01](screenshots/filtro_01.png)
![filtro02](screenshots/filtro_02.png)

### Teste CRUD Usuários
Antes dos testes a tabela de usuários era:
```JSON
[
    {
        "_id": "6859bce2e5f8f9d3d36c767d",
        "fullname": "Admin",
        "username": "admin",
        "email": "admin@adm.adm",
        "cep": "12345-678",
        "address": "Admin",
        "phone": "16 888888888",
        "password": "admin",
        "cart": "{}",
        "__v": 0
    },
    {
        "_id": "6859bce2e5f8f9d3d36c767e",
        "fullname": "Teste teste teste teste",
        "username": "teste",
        "email": "tst@tst.tst",
        "cep": "12345-678",
        "address": "teste teste",
        "phone": "16 999999999",
        "password": "123456",
        "cart": "{}",
        "__v": 0
    }
]
```

#### GET /users/all  – lista todos os users
http://localhost:5000/users/all
![image](https://github.com/user-attachments/assets/626354f0-8c9e-4a01-8c18-73f0f445eb17)

#### GET /users  – busca um usuário 
http://localhost:5000/users/?username=teste&password=123456
![image](https://github.com/user-attachments/assets/a5389811-7e80-4088-bfc7-8c0d4e094278)

#### POST /users  – cria um novo user e retorna ele
http://localhost:5000/users
![image](https://github.com/user-attachments/assets/8896e7e7-128f-4b46-a80a-b5cce7ca013b)

#### PUT /users/:username  – altera um user existente e retorna ele
http://localhost:5000/users/helio
![image](https://github.com/user-attachments/assets/4ec6e527-af91-463b-b9d5-37f022ca4803)

#### PUT /users/cart/:username  – altera os itens do carrinho do usuário dado o seu username
http://localhost:5000/users/cart/helio
![image](https://github.com/user-attachments/assets/2c80f13d-395f-4625-9ec2-e71edfd1df88)

#### DELETE /users/:username  – deleta um user e retorna o restante
http://localhost:5000/users/teste
![image](https://github.com/user-attachments/assets/80d2812f-8024-457f-a773-c3bbc435ddbe)

### Teste CRUD Livros
Antes dos testes o começo da tabela de livros (a tabela não foi mostrada por completo por ser muito grande) era:
```JSON
[
    {
        "_id": "6859bce2e5f8f9d3d36c7680",
        "id": 1,
        "author": "George Orwell",
        "img_link": "https://m.media-amazon.com/images/I/819js3EQwbL._AC_UF1000,1000_QL80_.jpg",
        "title": "1984",
        "price": 29.9,
        "genre": "Distopia",
        "publisher": "Companhia das Letras",
        "description": "Publicada originalmente em 1949, a distopia futurista 1984 é um dos romances mais influentes do século XX, um inquestionável clássico moderno. Lançada poucos meses antes da morte do autor, é uma obra magistral que ainda se impõe como uma poderosa reflexão ficcional sobre a essência nefasta de qualquer forma de poder totalitário.",
        "amount": 4,
        "sales": 0,
        "__v": 0
    },
    {
        "_id": "6859bce2e5f8f9d3d36c7681",
        "id": 2,
        "author": "Karl Marx",
        "img_link": "https://boitempoeditorial.fbitsstatic.net/img/p/o-capital-livro-1-152742/338393.jpg?w=290&h=420&v=no-value",
        "title": "O Capital",
        "price": 89.9,
        "genre": "Filosofia",
        "publisher": "Boitempo Editorial",
        "description": "O primeiro livro de O capital: crítica da economia política, intitulado O processo de produção do capital, é o único volume da principal obra de maturidade de Karl Marx publicado durante a vida do autor, morto em 1883. Esta terceira edição marca os 10 anos da publicação desta tradução no Brasil, feita diretamente do alemão. A edição se insere em um histórico esforço intelectual coletivo de trazer ao público brasileiro, em seu todo ou em versões reduzidas, a principal obra marxiana de crítica da economia política.",
        "amount": 4,
        "sales": 0,
        "__v": 0
    },
{
        "_id": "6859bce2e5f8f9d3d36c7682",
        "id": 3,
        "author": "Karl Marx",
        "img_link": "https://m.media-amazon.com/images/I/61D7dwT4jjL._AC_UF1000,1000_QL80_.jpg",
        "title": "A Ideologia Alemã",
        "price": 79.9,
        "genre": "Filosofia",
        "publisher": "Boitempo Editorial",
        "description": "Chega às livrarias a aguardada edição integral de A ideologia alemã, de Karl Marx e Friedrich Engels. Traduzida diretamente do alemão para o português por Rubens Enderle, Nélio Schneider e Luciano Martorano, com texto final de Rubens Enderle, a edição da Boitempo tem introdução escrita por Emir Sader e supervisão editorial de Leandro Konder, um dos maiores estudiosos do marxismo no Brasil. Além disso, será a versão mais fiel aos originais deixados pelos autores, pois é a primeira no mundo traduzida a partir da inovadora Mega-2.Essa nova edição cuidadosa, que se tornará referência para todos os interessados nos escritos de Marx e Engels, foi feita dentro da tradição de rigor com os livros desses autores estabelecida pela Boitempo.",
        "amount": 4,
        "sales": 0,
        "__v": 0
    },
]
```

#### GET /books  – lista todos os livros
http://localhost:5000/books
![image](https://github.com/user-attachments/assets/ea0003ae-74b0-4905-a897-ce41f835f05a)

#### GET /books/:id  – busca um livro
http://localhost:5000/books/2
![image](https://github.com/user-attachments/assets/98f10b42-9085-4364-ac7b-54c8947be91f)

#### POST /books  – cria um novo livro e retorna todos os livros
http://localhost:5000/books
![image](https://github.com/user-attachments/assets/c8316cb7-bd9a-45e1-aa97-903226c599de)

#### PUT /books/:id  – altera um livro existente e retorna todos os livros
http://localhost:5000/books/7
![image](https://github.com/user-attachments/assets/b02c60d5-0cd5-4dfb-97a2-da0ebbc1dbf1)

#### DELETE /books/:id  – deleta um livro e retorna todos os livros
http://localhost:5000/books/7
![image](https://github.com/user-attachments/assets/43c19f62-e4bf-49aa-8350-4ef9d69fba81)

### Teste CRUD Vendas
Antes dos testes a tabela de vendas era:
```JSON
[
	{
    "buyer": "teste",
    "books": "[\"teste\"]",
    "price": 29.9
  }
]
```

#### GET /sales  – lista todos as vendas
http://localhost:5000/sales                                   
![image](https://github.com/user-attachments/assets/6a871e52-9042-45bc-82d6-4131853cf406)

#### GET /sales/:buyer  – busca uma venda
http://localhost:5000/sales/teste
![image](https://github.com/user-attachments/assets/d8d90928-1548-40b2-88b1-6fbc5b15f7ff)

#### POST /sales  – cria uma nova venda e retorna todos as vendas
http://localhost:5000/sales
![image](https://github.com/user-attachments/assets/e6b5d999-c6a4-4e0b-aa3e-8672365ed3da)

#### PUT /sales/:_id  – altera uma venda existente e retorna todos as vendas
http://localhost:5000/sales/6859ee05dde5b58b95581305
![image](https://github.com/user-attachments/assets/474bb9dd-2020-4843-bbd4-91e4cd0ed93a)

#### DELETE /sales/:_id  – deleta uma venda e retorna todos as vendas
http://localhost:5000/sales/6859ee05dde5b58b95581305
![image](https://github.com/user-attachments/assets/df3d887e-9f2b-45ac-9276-c5415edfcd48)

## Procedimentos de build

O projeto depende do nodeJS, npm, git e o mongoDB.

Para a instalação do mongoDB, é necessário seguir
os passos [desse tutorial](https://www.mongodb.com/pt-br/docs/manual/installation/#std-label-tutorial-installation).
Caso você prefira instalar por docker, siga [esse tutorial](https://www.mongodb.com/pt-br/docs/manual/tutorial/install-mongodb-community-with-docker/).
Para fins de praticidade, no procedimento está incluído o procedimento de build com docker.

Para executar o projeto, instale primeiro o _nodejs_, o _npm_, o _git_ e o _docker_ (caso você 
queira utilizar o mongodb através do docker) através
do seu instalador de pacote. Depois, clone o repositório:

```
git clone https://github.com/GabrielMtins/scc0219web.git
```
Inicie o docker e o mongodb:
```
sudo systemctl start docker # válido para distros com systemd
sudo docker pull mongodb/mongodb-community-server:latest # extrai a imagem do docker do mongodb
sudo docker run --name mongodb -p 27017:27017 -d mongodb/mongodb-community-server:latest # executa a imagem em um container
```
Inicie a base de dados:
```
cd ssc0219web/backend
npm install
node server.js
```
Coloque os dados iniciais na base:
```
cd ssc0219web/backend
node seed.js
```
Por fim rode o site:
```
cd ssc0219web/frontend
npm install
npm start
```

## Problemas encontrados

## Comentários

A base de dados já vem com dois usuários por padrão: 
- **Usuário de teste**: login "teste" e senha "123456".
- **Administrador**: login "admin" e senha "admin".

Quando o usuário loga como administrador, a página de "profile" se torna
o dashboard do administrador.

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

Foi encontrando um problema na página de checkout, onde não é possível mais
sair dela após ela ser acessada.

## Comentários

A base de dados já vem com dois usuários por padrão: 
- **Usuário de teste**: login "teste" e senha "123456".
- **Administrador**: login "admin" e senha "admin".

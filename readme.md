# Grupo WB Agenda de clientes

Neste guia iremos configurar o ambiente de desenvolvimento, clonando o projeto e instalando suas dependências, além de mostrar como executá-lo. Ainda neste guia é possível encontrar uma breve explicação da estrutura das pastas adotada para a construção desse projeto.

### Links úteis (para antes de clonar o repositório)

- [Instalação das ferramentas](https://www.notion.so/Instala-o-das-ferramentas-405f3e8b014649cbb422dee6b5bd0535): como instalar o Node, NPM ou Yarn e o Visual Studio Code (tutoriais para Windows, MacOS e Linux)
- [Atualização (caso já tenha as ferramentas](https://www.notion.so/Atualiza-o-vers-es-diferentes-09abff4d88d44c459a7c7a925ad15bfa): se já passou pelo processo de instalação do Node, NPM e Yarn alguma vez, realize este tutorial para garantir as versões mais recentes das ferramentas (para Windows, MacOS e Linux)
- [Caso surja algum problema...](https://www.notion.so/Tive-problemas-e-agora-c67378e1319d4723a3211aad8eb987c6)

## Clonando projeto

Com todas as ferramentas necessárias devidamente instaladas, baixe ou clone este repositório pelo terminal seguindo passo a passo descrito abaixo.

```bash
# Baixe este repositório ou clone pelo Git usando o comando:
$ git clone https://github.com/ThHenrique/fa-wb-typescript.git

# Acesse a pasta do projeto
$ cd fa-wb-typescript

# Instale as dependências do projeto (são listadas no arquivo package.json)
$ npm install
# ou
$ yarn

# Para compilar o projeto você precisa ter o compilador TypeScript
$ npm install -g typescript

# ou pode usar npx ferramentas semelhantes se preferir executar a tsc partir de um node_modules pacote local .
$ npx tsc

# finalmente para executar o projeto
$ node out/main.js

```

Agora o projeto está sendo executado. Todas as operações serão feitas via CLI - Terminal

## Explicação da estrutura das pastas

| Pasta                                       | Definição                                                                             |
| :------------------------------------------ | :------------------------------------------------------------------------------------ |
| :open_file_folder: node_modules/            | Armazena as bibliotecas (dependências) usadas pelo projeto                            |
| :open_file_folder: src/domain/controllers   | Código fonte dos controladores (client, dashboard, order, product e service)          |
| :open_file_folder: src/domain/models        | Código fonte dos modelos (business, person, client, order, product e service)         |
| :open_file_folder: src/domain/shared        | Modelo e utilitários compartilhados, pode ser utilizado em outros locais da aplicação |
| :open_file_folder: src/domain/shared/utils  | Código fonte dos utilitários (groupBy, Input, RandomId, Search, ValuesDefault)        |
| :open_file_folder: src/domain/shared/models | Modelo compartilhado, que pode ser utilizado em outros locais da aplicação            |
| :open_file_folder: src/main                 | Arquivo responsável por executar a aplicação                                          |
| :page_facing_up: package.json               | Arquivo usado para gerenciar as dependências do projeto, scripts e versões            |

### Tecnologias utilizadas

As seguintes tecnologias e ferramentas estão sendo utilizadas neste projeto:

- [TypeScript](https://www.typescriptlang.org/)

### Diagrama de Classe:

![Diagrama de classes](./fa-wb-typescript.drawio.svg)

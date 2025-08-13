# Projeto: Hamburgueria xTudoviski

## Descrição

Um sistema de gerenciamento para uma hamburgueria, desenvolvido como projeto de estudo para aplicar conceitos de desenvolvimento front-end com React.   
O sistema permite o controle de cadastros essenciais como clientes, produtos e cidades, além da gestão completa de pedidos e seus itens.                           

> **Status:** Em Desenvolvimento 🚧

---

## Funcionalidades Principais

O sistema foi projetado para incluir as seguintes funcionalidades:

* **Cadastros:**
    * Gerenciamento completo de Cidades 
    * Gerenciamento completo de Clientes 
    * Gerenciamento completo de Produtos 
* **Pedidos:**
    * Lançamento de Pedidos associados a um cliente. 
    * Inclusão de múltiplos itens em cada pedido. 
    * Validação de dados para garantir a integridade (ex: não permitir excluir uma cidade em uso). 
* **Dados e Relatórios:**
    * Exportação de dados das tabelas em formato `.JSON` e `.CSV`. 
    * Geração de um arquivo JSON de pedidos para integração com sistemas externos. 
    * Emissão de relatórios de clientes e de pedidos detalhados. 
* **Interface:**
    * Navegação e manipulação de registros através de uma interface com botões de ação padronizados (`Adicionar`, `Modificar`, `Eliminar`, `Salvar`, etc.).

---

## Motivação do Projeto

O principal objetivo deste projeto é o aprendizado e a aplicação prática dos conceitos da biblioteca React e seu ecossistema. A ideia foi desenvolver um sistema funcional do início ao fim, passando por todas as etapas de um projeto de software, com o intuito de estudo e aprofundamento em tecnologias front-end modernas.

---

## Tecnologias Utilizadas

* **React:** Biblioteca principal para a construção da interface de usuário.
* **Vite:** Ferramenta de build para um desenvolvimento rápido e otimizado.
* **Material-UI (MUI):** Biblioteca de componentes para a criação de uma interface visual consistente e profissional.
* **React Router:** Para o gerenciamento das rotas e navegação entre as páginas da aplicação.

---

## Como Executar o Projeto Localmente

```bash
# 1. Clone o repositório
git clone [URL_DO_SEU_REPOSITÓRIO_NO_GITHUB]

# 2. Navegue para a pasta do projeto
cd XTUDOVISKI-FRONTEND

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
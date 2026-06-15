# Documentação resumida — Sistema de Gestão de Doação e Transplante de Órgãos

Relatório de MongoDB | Banco de Dados 2026.1 | UFPE



## Visão geral

Este repositório contém uma implementação e um conjunto de exemplos para modelagem e manipulação de dados relacionados ao fluxo de doação e transplante de órgãos, usando MongoDB. O modelo principal envolve cinco coleções principais: `doadores`, `receptores`, `hospitais`, `medicos` e `transplantes`.

O propósito do projeto é demonstrar modelagem, criação de índices, inserção de dados de exemplo, operações CRUD e consultas (incluindo agregações avançadas) em MongoDB.



## Estrutura do repositório

- **README.md**: visão geral e instruções principais.
- **docs/**: documentação complementar. Ver especialmente [docs/modelagem.md](modelagem.md) para o esquema e índices.
- **assets/**: recursos e arquivos de apoio (prints e imagens de execução). Este documento não inclui imagens.
- **scripts/**: scripts em JavaScript com exemplos prontos (descritos a seguir).



## Scripts principais (em `scripts/`)

- `01_setup.js` — cria o banco de dados, coleções e índices necessários.
- `02_insert.js` — insere dados de exemplo em cada coleção.
- `03_crud.js` — exemplos de operações de atualização, remoção e upsert.
- `04_queries_basic.js` — consultas básicas (find, filtro, projeção, ordenação, limites).
- `05_queries_advanced.js` — consultas/aggregations avançadas (aggregate, lookup, group, mapReduce, etc.).

Execução: os scripts são arquivos `.js`; execute com `node` ou conforme instruções do `README.md`/ambiente (ex.: `node scripts/01_setup.js`).



## Documentação e modelagem

Para detalhes sobre entidades, campos, relacionamentos e índices, consulte [docs/modelagem.md](modelagem.md). Este arquivo oferece a descrição completa do esquema e justificativas de modelagem.



## Uso rápido

1. Instale e rode uma instância do MongoDB.
2. Ajuste parâmetros de conexão nos scripts se necessário.
3. Execute `01_setup.js` para preparar o banco.
4. Execute `02_insert.js` para popular dados de exemplo.
5. Explore `03_crud.js`, `04_queries_basic.js` e `05_queries_advanced.js` para exemplos práticos.



## Objetivo deste documento

Este arquivo é uma versão resumida e organizada do projeto: indica a finalidade, estrutura e onde encontrar detalhes. Para exemplos de saída, capturas ou evidências, veja os arquivos em `assets/` e os scripts em `scripts/`.


## Autoria

- Philip
- Arthur
- Gabriel
- Vinicius
- Felipe Augusto
- Felipe Mateus


## Link para o relatório

[Link para edição do pdf](https://docs.google.com/document/d/1OpNp9pC0aQfOxjLjHVUq_AV2FeDUYhmdrf8GeS0Xe-I/edit?usp=sharing)
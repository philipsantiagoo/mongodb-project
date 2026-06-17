# 🫀 Sistema de Gestão de Doação e Transplante de Órgãos

Projeto MongoDB - Banco de Dados | UFPE 2026.1

Banco de dados orientado a documentos implementado com **MongoDB**, cobrindo inserção, atualização, remoção e consultas avançadas sobre um sistema hospitalar de doação e transplante de órgãos.

---

## 📋 Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Fases do Projeto](#fases-do-projeto)
- [Divisão de Tarefas](#divisão-de-tarefas)
- [Estrutura do Repositório](#estrutura-do-repositório)
- [Como Rodar](#como-rodar)
- [Checklist de Requisitos](#checklist-de-requisitos)
- [Contribuindo](#contribuindo)

---

## Sobre o Projeto

Modelagem e implementação de um sistema que gerencia:

- **Doadores** (vivos e post-mortem) e seus órgãos disponíveis
- **Receptores** em fila de espera com prioridade médica
- **Hospitais** e equipes médicas habilitadas
- **Transplantes** realizados com histórico e resultado
- **Compatibilidade** entre doador e receptor (tipo sanguíneo, HLA, etc.)

O esquema é propositalmente rico para explorar os 31 itens da checklist com consultas não-triviais.

---

## Fases do Projeto

| Fase | Descrição | Responsável |
|------|-----------|-------------|
| **1 - Modelagem** | Definir coleções, campos, relacionamentos e índices | Philip |
| **2 - Setup** | Configurar ambiente MongoDB, criar banco e coleções | Philip |
| **3 - Inserção** | Popular coleções com dados realistas | Vinícius |
| **4 - CRUD** | Scripts de update, delete, rename, save | Arthur |
| **5a - Consultas básicas** | find, findOne, sort, limit, filter, projection, exists | Gabriel |
| **5b - Consultas avançadas** | aggregate, match, group, sum, avg, max, lookup, mapReduce | Philip |
| **6 - Documentação** | Montar documento final com descrição | Felipe Augusto |
| **7 - Prints** | Estruturar os prints de comprovação dos resultados | Felipe Mateus |

> Preencher a coluna "Responsável" conforme a divisão acordada pelo grupo.

---

## Divisão de Tarefas

Cada membro do grupo assume uma fase. As fases 5a e 5b podem ser feitas por pessoas diferentes ou pela mesma pessoa dependendo da disponibilidade.

Sugestão de ordem de execução:

```
Fase 1 → Fase 2 → Fase 3 → Fase 4 → Fase 5a → Fase 5b → Fase 6 → Fase 7
```

As fases 4, 5a e 5b dependem da fase 3 estar concluída. Comunique no grupo antes de abrir PRs.

---

## Estrutura do Repositório

```
mongodb-organs/
├── assets/
│   ├── img/ # Screenshots dos processos
│   │   ├── 01_setup/ 
│   │   │   ├── setup_colecoes.png
│   │   │   └── setup_final.png
│   │   ├── 02_insert/ 
│   │   │   ├── 1.png
│   │   │   ├── 2.png
│   │   │   ├── 3.png
│   │   │   ├── 4.png
│   │   │   ├── 5.png
│   │   │   ├── 6.png
│   │   │   └── 7.png
│   │   ├── 03_crud/
│   │   │   ├── 1.png
│   │   │   ├── 2.png
│   │   │   └── 3.png
│   │   ├── 04_queries_basic/ 
│   │   │   ├── 1.png
│   │   │   ├── 2.png
│   │   │   └── 3.png
│   │   └── 05_queries_advanced/ 
│   │       ├── 1.png
│   │       ├── 2.png
│   │       ├── 3.png
│   │       ├── 4.png
│   │       └── 5.png
│   └── PRINTS.md
├── docs/
│   ├── Projeto FInal.pdf # Documento de entrega
│   ├── document.md
│   └── modelagem.md # Descrição das coleções e campos
├── scripts/
│   ├── 01_setup.js # Criação do banco e coleções
│   ├── 02_insert.js # Inserção de dados
│   ├── 03_crud.js # Update, delete, rename
│   ├── 04_queries_basic.js # find, findOne, sort, limit, exists...
│   └── 05_queries_advanced.js # aggregate, group, lookup, mapReduce...
├── CONTRIBUTING.md
└── README.md
```

---

## Como Rodar

### Instalação do MongoDB

**Ubuntu:**
```bash
curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg --dearmor

echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu noble/mongodb-org/8.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list

sudo apt update && sudo apt install -y mongodb-org
```

**Windows:**
1. Acesse https://www.mongodb.com/try/download/community
2. Selecione **Windows** → `.msi` → baixe e instale com as opções padrão
3. O `mongosh` já vem junto na instalação

### Verificar instalação

```bash
mongod --version
mongosh --version
```

### Iniciar o MongoDB

```bash
# Ubuntu
sudo systemctl start mongod

# Windows (PowerShell como administrador)
net start MongoDB
```

### Executar os scripts

```bash
# Conectar ao shell
mongosh

# Rodar um script específico
# (Linux)
mongosh < scripts/01_setup.js
mongosh < scripts/02_insert.js
mongosh < scripts/03_crud.js
mongosh < scripts/04_queries_basic.js
mongosh < scripts/05_queries_advanced.js

# Windows
load("scripts/01_setup.js")
load("scripts/02_insert.js")
load("scripts/03_crud.js")
load("scripts/04_queries_basic.js")
load("scripts/05_queries_advanced.js")
```

> ⚠️ Execute sempre na ordem numérica. Cada script depende do anterior.

---

## Checklist de Requisitos

| # | Comando | Script | ✅ |
|---|---------|--------|----|
| 1 | `USE` | 01_setup.js | ✅ |
| 2 | `FIND` | 04_queries_basic.js | ✅ |
| 3 | `SIZE` | 04_queries_basic.js | ✅ |
| 4 | `AGGREGATE` | 05_queries_advanced.js | ✅ |
| 5 | `MATCH` | 05_queries_advanced.js | ✅ |
| 6 | `PROJECT` | 04_queries_basic.js | ✅ |
| 7 | `GTE` | 04_queries_basic.js | ✅ |
| 8 | `GROUP` | 05_queries_advanced.js | ✅ |
| 9 | `SUM` | 05_queries_advanced.js | ✅ |
| 10 | `COUNTDOCUMENTS` | 04_queries_basic.js | ✅ |
| 11 | `MAX` | 05_queries_advanced.js | ✅ |
| 12 | `AVG` | 05_queries_advanced.js | ✅ |
| 13 | `EXISTS` | 04_queries_basic.js | ✅ |
| 14 | `SORT` | 04_queries_basic.js | ✅ |
| 15 | `LIMIT` | 04_queries_basic.js | ✅ |
| 16 | `$WHERE` | 04_queries_basic.js | ✅ |
| 17 | `MAPREDUCE` | 05_queries_advanced.js | ✅ |
| 18 | `FUNCTION` | 05_queries_advanced.js | ✅ |
| 19 | `PRETTY` | 04_queries_basic.js | ✅ |
| 20 | `ALL` | 04_queries_basic.js | ✅ |
| 21 | `SET` | 03_crud.js | ✅ |
| 22 | `TEXT` | 04_queries_basic.js | ✅ |
| 23 | `SEARCH` | 04_queries_basic.js | ✅ |
| 24 | `FILTER` | 05_queries_advanced.js | ✅ |
| 25 | `UPDATEONE/UPDATEMANY` | 03_crud.js | ✅ |
| 26 | `UPDATEONE/INSERTONE` (SAVE) | 03_crud.js | ✅ |
| 27 | `RENAMECOLLECTION` | 03_crud.js | ✅ |
| 28 | `COND` | 05_queries_advanced.js | ✅ |
| 29 | `LOOKUP` | 05_queries_advanced.js | ✅ |
| 30 | `FINDONE` | 04_queries_basic.js | ✅ |
| 31 | `ADDTOSET` | 05_queries_advanced.js | ✅ |

---

## Contribuindo

Veja [CONTRIBUTING.md](CONTRIBUTING.md) para o fluxo de branches, commits e PRs.

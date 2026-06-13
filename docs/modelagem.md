# Modelagem — Sistema de Gestão de Doação e Transplante de Órgãos

---

## Banco de Dados

```
orgaos_db
```

---

## Coleções

### 1. `doadores`

Pessoas que doaram ou estão disponíveis para doação de órgãos.

```json
{
  "_id": ObjectId,
  "nome": String,
  "cpf": String,
  "data_nascimento": Date,
  "tipo_sanguineo": String,        // "A+", "B-", "O+", "AB+", etc.
  "hla": [String],                 // antígenos de histocompatibilidade ex: ["A2", "B7", "DR4"]
  "tipo_doador": String,           // "vivo" | "post-mortem"
  "data_obito": Date,              // null se vivo
  "causa_morte": String,           // null se vivo
  "contato": {
    "telefone": String,
    "email": String,
    "endereco": {
      "cidade": String,
      "estado": String,
      "cep": String
    }
  },
  "orgaos_disponiveis": [
    {
      "orgao": String,             // "rim", "figado", "coracao", "pulmao", etc.
      "lado": String,              // "esquerdo" | "direito" | null
      "condicao": String,          // "excelente" | "boa" | "regular"
      "data_coleta": Date,
      "disponivel": Boolean
    }
  ],
  "hospital_origem": ObjectId,     // ref: hospitais
  "criado_em": Date
}
```

---

### 2. `receptores`

Pacientes aguardando transplante.

```json
{
  "_id": ObjectId,
  "nome": String,
  "cpf": String,
  "data_nascimento": Date,
  "tipo_sanguineo": String,
  "hla": [String],
  "orgao_necessario": String,
  "urgencia": Number,              // 1 (baixa) a 5 (crítica)
  "status": String,                // "aguardando" | "em_transplante" | "transplantado" | "obito"
  "data_entrada_fila": Date,
  "condicoes_medicas": [String],   // ex: ["insuficiencia_renal", "diabetes"]
  "medico_responsavel": ObjectId,  // ref: medicos
  "hospital": ObjectId,            // ref: hospitais
  "historico_tentativas": [
    {
      "data": Date,
      "doador_id": ObjectId,
      "motivo_rejeicao": String
    }
  ],
  "criado_em": Date
}
```

---

### 3. `hospitais`

Hospitais habilitados para realizar transplantes.

```json
{
  "_id": ObjectId,
  "nome": String,
  "cnpj": String,
  "tipo": String,                  // "publico" | "privado"
  "habilitacoes": [String],        // ["transplante_renal", "transplante_cardiaco", ...]
  "endereco": {
    "rua": String,
    "cidade": String,
    "estado": String,
    "cep": String
  },
  "contato": {
    "telefone": String,
    "email": String
  },
  "leitos_transplante": Number,
  "equipes": [ObjectId],           // ref: medicos
  "criado_em": Date
}
```

---

### 4. `medicos`

Médicos habilitados para realizar transplantes.

```json
{
  "_id": ObjectId,
  "nome": String,
  "crm": String,
  "especialidades": [String],      // ["cirurgia_transplante", "nefrologia", ...]
  "hospital": ObjectId,            // ref: hospitais
  "transplantes_realizados": Number,
  "disponivel": Boolean,
  "contato": {
    "telefone": String,
    "email": String
  },
  "criado_em": Date
}
```

---

### 5. `transplantes`

Registro de cada transplante realizado ou em andamento.

```json
{
  "_id": ObjectId,
  "doador_id": ObjectId,           // ref: doadores
  "receptor_id": ObjectId,         // ref: receptores
  "hospital_id": ObjectId,         // ref: hospitais
  "medico_responsavel": ObjectId,  // ref: medicos
  "orgao": String,
  "data_transplante": Date,
  "duracao_cirurgia_min": Number,
  "status": String,                // "realizado" | "em_andamento" | "cancelado"
  "resultado": String,             // "sucesso" | "rejeicao" | "obito" | null
  "compatibilidade": {
    "tipo_sanguineo": Boolean,
    "hla_score": Number,           // 0 a 6 (número de antígenos compatíveis)
    "crossmatch": String           // "negativo" | "positivo"
  },
  "observacoes": String,
  "criado_em": Date
}
```

---

## Relacionamentos

```
doadores        →  hospitais       (hospital_origem)
receptores      →  hospitais       (hospital)
receptores      →  medicos         (medico_responsavel)
medicos         →  hospitais       (hospital)
transplantes    →  doadores        (doador_id)
transplantes    →  receptores      (receptor_id)
transplantes    →  hospitais       (hospital_id)
transplantes    →  medicos         (medico_responsavel)
```

> No MongoDB não há foreign keys — os ObjectIds são referências manuais, resolvidas via `$lookup` nas queries.

---

## Índices planejados

```js
db.doadores.createIndex({ tipo_sanguineo: 1 })
db.doadores.createIndex({ "orgaos_disponiveis.orgao": 1 })
db.receptores.createIndex({ tipo_sanguineo: 1, orgao_necessario: 1 })
db.receptores.createIndex({ urgencia: -1, data_entrada_fila: 1 })
db.transplantes.createIndex({ data_transplante: -1 })
db.medicos.createIndex({ nome: "text" })   // necessário para $text / $search
db.hospitais.createIndex({ nome: "text" })
```

---

## Observações

- O campo `hla` como array em doadores e receptores permite usar `$all` para checar compatibilidade de antígenos.
- `historico_tentativas` em receptores é um array de subdocumentos — bom para `$filter` e `$size`.
- `orgaos_disponiveis` em doadores também é array de subdocumentos — explorado com `$elemMatch`, `$filter`, `$addToSet`.
- Os índices `text` em medicos e hospitais são necessários para os itens 22 (`TEXT`) e 23 (`SEARCH`) da checklist.
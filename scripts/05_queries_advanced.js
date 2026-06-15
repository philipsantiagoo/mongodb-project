// 05_queries_advanced.js — Consultas avançadas
// Checklist: AGGREGATE, MATCH, PROJECT, GROUP, SUM, MAX, AVG, FILTER, COND, LOOKUP, ADDTOSET, MAPREDUCE, FUNCTION

use("orgaos_db");

print("=== Script 05: Consultas avançadas ===");

// 1. AGGREGATE + MATCH + PROJECT — transplantes realizados com sucesso
print("1. aggregate + match + project: Transplantes com sucesso");
db.transplantes.aggregate([
  { $match: { resultado: "sucesso" } },
  { $project: { orgao: 1, data_transplante: 1, duracao_cirurgia_min: 1, resultado: 1, _id: 0 } }
]).pretty();

// 2. GROUP + SUM — total de transplantes por órgão
print("2. group + sum: Total de transplantes por órgão");
db.transplantes.aggregate([
  { $group: { _id: "$orgao", total: { $sum: 1 } } },
  { $sort: { total: -1 } }
]).pretty();

// 3. GROUP + MAX + AVG — duração máxima e média das cirurgias por órgão
print("3. group + max + avg: Duração máxima e média por órgão");
db.transplantes.aggregate([
  { $group: {
    _id: "$orgao",
    duracao_maxima: { $max: "$duracao_cirurgia_min" },
    duracao_media: { $avg: "$duracao_cirurgia_min" }
  }},
  { $sort: { duracao_media: -1 } }
]).pretty();

// 4. FILTER — dentro de aggregate, filtrar órgãos disponíveis de doadores
print("4. filter: Órgãos disponíveis dentro de cada doador");
db.doadores.aggregate([
  { $project: {
    nome: 1,
    tipo_sanguineo: 1,
    orgaos_disponiveis: {
      $filter: {
        input: "$orgaos_disponiveis",
        as: "orgao",
        cond: { $eq: ["$$orgao.disponivel", true] }
      }
    }
  }},
  { $match: { "orgaos_disponiveis.0": { $exists: true } } },
  { $limit: 5 }
]).pretty();

// 5. COND — classificar receptores por nível de urgência
print("5. cond: Classificação de urgência dos receptores");
db.receptores.aggregate([
  { $project: {
    nome: 1,
    urgencia: 1,
    orgao_necessario: 1,
    nivel: { $cond: {
      if: { $gte: ["$urgencia", 4] },
      then: "CRÍTICO",
      else: { $cond: {
        if: { $gte: ["$urgencia", 2] },
        then: "MODERADO",
        else: "BAIXO"
      }}
    }}
  }},
  { $sort: { urgencia: -1 } },
  { $limit: 10 }
]).pretty();

// 6. LOOKUP — transplantes com dados do doador e receptor
print("6. lookup: Transplantes com dados do doador");
db.transplantes.aggregate([
  { $lookup: {
    from: "doadores",
    localField: "doador_id",
    foreignField: "_id",
    as: "doador"
  }},
  { $lookup: {
    from: "receptores",
    localField: "receptor_id",
    foreignField: "_id",
    as: "receptor"
  }},
  { $project: {
    orgao: 1,
    resultado: 1,
    "doador.nome": 1,
    "doador.tipo_sanguineo": 1,
    "receptor.nome": 1,
    "receptor.tipo_sanguineo": 1
  }},
  { $limit: 5 }
]).pretty();

// 7. ADDTOSET — coletar órgãos únicos doados por hospital
print("7. addToSet: Órgãos únicos por hospital de origem");
db.doadores.aggregate([
  { $unwind: "$orgaos_disponiveis" },
  { $group: {
    _id: "$hospital_origem",
    orgaos_unicos: { $addToSet: "$orgaos_disponiveis.orgao" }
  }}
]).pretty();

// 8. MAPREDUCE — contar doadores por tipo sanguíneo
print("8. mapReduce: Contagem de doadores por tipo sanguíneo");
db.doadores.mapReduce(
  function() { emit(this.tipo_sanguineo, 1); },
  function(key, values) { return Array.sum(values); },
  { out: { inline: 1 } }
);

// 9. FUNCTION — usando $function para calcular score de compatibilidade HLA
print("9. function: Score de compatibilidade HLA entre doadores e receptor fixo");
const hlaReferencia = ["A2", "B7", "DR4"];
db.doadores.aggregate([
  { $project: {
    nome: 1,
    tipo_sanguineo: 1,
    score_hla: {
      $function: {
        body: function(hlaDoador, hlaRef) {
          return hlaDoador.filter(a => hlaRef.includes(a)).length;
        },
        args: ["$hla", hlaReferencia],
        lang: "js"
      }
    }
  }},
  { $sort: { score_hla: -1 } },
  { $limit: 5 }
]).pretty();
// 04_queries_basic.js — Consultas básicas
// Checklist: FIND, FINDONE, SORT, LIMIT, FILTER, PROJECT, EXISTS, GTE, SIZE, WHERE, PRETTY, ALL, TEXT, SEARCH, COUNTDOCUMENTS

use("orgaos_db");

print("=== Script 04: Consultas básicas ===");

// 1. FIND — listar doadores com tipo sanguíneo O+
print("1. find: Doadores com tipo sanguíneo O+");
db.doadores.find({ tipo_sanguineo: "O+" }).pretty();

// 2. FINDONE — retornar um receptor que está aguardando transplante
print("2. findOne: Um receptor aguardando transplante");
db.receptores.findOne({ status: "aguardando" });

// 3. SORT + LIMIT — ordenar receptores por urgência (fix: tudo em uma linha)
print("3. sort + limit: Top 5 receptores mais urgentes");
db.receptores.find({ status: "aguardando" }).sort({ urgencia: -1, data_entrada_fila: 1 }).limit(5).pretty();

// 4. FILTER — doadores com fígado disponível
print("4. filter: Doadores com fígado disponível");
const filtroDoadoresFigado = { "orgaos_disponiveis.orgao": "figado", "orgaos_disponiveis.disponivel": true };
db.doadores.find(filtroDoadoresFigado).pretty();

// 5. PROJECT — campos específicos de hospitais públicos
print("5. projection: Hospitais públicos com nome e tipo");
db.hospitais.find({ tipo: "publico" }, { nome: 1, tipo: 1, _id: 0 }).pretty();

// 6. EXISTS — transplantes com resultado preenchido (fix: exclui null)
print("6. exists: Transplantes com resultado registrado");
db.transplantes.find({ resultado: { $exists: true, $ne: null } }).pretty();

// 7. GTE — receptores com urgência >= 4
print("7. gte: Receptores com urgência >= 4");
db.receptores.find({ urgencia: { $gte: 4 } }).pretty();

// 8. SIZE — doadores com exatamente 2 órgãos disponíveis
print("8. size: Doadores com exatamente 2 órgãos disponíveis");
db.doadores.find({ orgaos_disponiveis: { $size: 2 } }).pretty();

// 9. $WHERE — receptores com mais de 2 tentativas no histórico
print("9. $where: Receptores com mais de 2 tentativas");
db.receptores.find({ 
  historico_tentativas: { $exists: true }, 
  $where: "this.historico_tentativas.length > 2" 
}).pretty();

// 10. PRETTY + COUNTDOCUMENTS — total de doadores post-mortem
print("10. countDocuments: Total de doadores post-mortem");
db.doadores.countDocuments({ tipo_doador: "post-mortem" });

// 11. ALL — doadores que possuem os antígenos A2 e B7
print("11. all: Doadores com HLA contendo A2 e B7");
db.doadores.find({ hla: { $all: ["A2", "B7"] } }).pretty();

// 12. TEXT + SEARCH — busca textual por nome em médicos
print("12. text + search: Médicos com 'nefrologia' nas especialidades");
db.medicos.find({ $text: { $search: "nefrologia" } }, { nome: 1, especialidades: 1, _id: 0 }).pretty();
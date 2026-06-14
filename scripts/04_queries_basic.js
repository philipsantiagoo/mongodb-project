// 04_queries_basic.js — Consultas básicas
// Checklist: find, findOne, sort, limit, filter, projection, exists
use("orgaos_db");

print("=== Script 04: Consultas básicas ===");

// 1. find — listar doadores com tipo sanguíneo O+
print("1. find: Doadores com tipo sanguíneo O+");
db.doadores.find({ tipo_sanguineo: "O+" }).pretty();

// 2. findOne — retornar um receptor que está aguardando transplante
print("2. findOne: Um receptor aguardando transplante");
db.receptores.findOne({ status: "aguardando" });

// 3. sort + limit — ordenar receptores por urgência e limitar os resultados
print("3. sort + limit: Top 5 receptores mais urgentes");
db.receptores
  .find({ status: "aguardando" })
  .sort({ urgencia: -1, data_entrada_fila: 1 })
  .limit(5)
  .pretty();

// 4. filter — aplicar filtro em doadores com fígado disponível
print("4. filter: Doadores com fígado disponível");
const filtroDoadoresFigado = {
  "orgaos_disponiveis.orgao": "figado",
  "orgaos_disponiveis.disponivel": true
};
db.doadores.find(filtroDoadoresFigado).pretty();

// 5. projection — projetar campos específicos de hospitais públicos
print("5. projection: Hospitais públicos com nome e tipo");
db.hospitais.find({ tipo: "publico" }, { nome: 1, tipo: 1, _id: 0 }).pretty();

// 6. exists — verificar transplantes que já têm resultado registrado
print("6. exists: Transplantes com resultado registrado");
db.transplantes.find({ resultado: { $exists: true } }).pretty();

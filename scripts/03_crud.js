// Scripts de update, delete, rename, save
// Checklist: SET, UPDATEONE, UPDATEMANY, DELETEONE, INSERTONE (SAVE), UPDATEONE (SAVE), RENAMECOLLECTION

use("orgaos_db");

print("=== Iniciando Operações CRUD (Script 03) ===");

// 1. UPDATEONE e $SET (Item 21 e 25)
// Atualiza o número de leitos de um hospital específico
db.hospitais.updateOne(
    { nome: /Hospital Santa Vida/i },
    { $set: { leitos_transplante: 55, "contato.email": "diretoria@santavida.com.br" } }
);
print("1. updateOne + $set: Hospital Santa Vida atualizado.");

// 2. UPDATEMANY e $SET (Item 21 e 25)
// Define todos os médicos com a especialidade 'cirurgia_transplante' como disponíveis
db.medicos.updateMany(
    { especialidades: "cirurgia_transplante" },
    { $set: { disponivel: true } }
);
print("2. updateMany + $set: Disponibilidade de cirurgiões atualizada.");

// 3. DELETEONE
// Remove um transplante que foi cancelado (limpeza de dados)
db.transplantes.deleteOne({ status: "cancelado" });
print("3. deleteOne: Removido primeiro registro de transplante cancelado.");

// 4. INSERTONE (Simulando a funcionalidade de SAVE - Item 26)
// Insere um novo receptor manualmente
db.receptores.insertOne({
    nome: "Novo Paciente de Teste",
    cpf: "99988877766",
    tipo_sanguineo: "O-",
    orgao_necessario: "rim",
    urgencia: 5,
    status: "aguardando",
    criado_em: new Date()
});
print("4. insertOne (SAVE): Novo receptor inserido.");

// 5. UPDATEONE com UPSERT (Simulando a funcionalidade de SAVE/Update - Item 26)
// Se o médico não existir pelo CRM, ele será criado. Se existir, será atualizado.
db.medicos.updateOne(
{ crm: "CRM-99999" },
{ 
    $set: { 
    nome: "Dr. Save Upsert", 
    especialidades: ["nefrologia"], 
    disponivel: true,
    hospital: db.hospitais.findOne()._id 
    } 
},
{ upsert: true }
);
print("5. updateOne (SAVE/UPSERT): Médico garantido no banco via upsert.");

// 6. RENAMECOLLECTION (Item 27)
// Renomeia a coleção para um padrão de histórico
db.transplantes.renameCollection("historico_transplantes");
print("6. renameCollection: Coleção transplantes renomeada temporariamente. Novo nome: 'historico_transplantes'.");

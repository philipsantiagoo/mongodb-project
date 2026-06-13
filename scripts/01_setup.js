// 01_setup.js — Criação do banco e coleções
// JavaScript não reconhece 'use' como comando, mas ele é interpretado pelo shell do MongoDB para selecionar o banco de dados.
use orgaos_db


// Cria as coleções com validação de schema
db.createCollection("doadores")
db.createCollection("receptores")
db.createCollection("hospitais")
db.createCollection("medicos")
db.createCollection("transplantes")


// Doadores
db.doadores.createIndex({ tipo_sanguineo: 1 })
db.doadores.createIndex({ "orgaos_disponiveis.orgao": 1 })
db.doadores.createIndex({ nome: "text" })

// Receptores
db.receptores.createIndex({ tipo_sanguineo: 1, orgao_necessario: 1 })
db.receptores.createIndex({ urgencia: -1, data_entrada_fila: 1 })

// Transplantes
db.transplantes.createIndex({ data_transplante: -1 })

// Médicos e Hospitais — índice text para $text / $search (itens 22 e 23 da checklist)
db.medicos.createIndex({ nome: "text", especialidades: "text" })
db.hospitais.createIndex({ nome: "text" })



print("=== Banco criado: orgaos_db ===")
print("Coleções:")
db.getCollectionNames().forEach(c => print("  -", c))
print("Setup concluído.")
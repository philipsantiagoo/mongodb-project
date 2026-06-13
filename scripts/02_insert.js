// 02_insert.js — Povoamento de dados para o sistema de doação e transplante
use orgaos_db

// Limpa quaisquer documentos existentes para permitir reexecução segura do script
db.doadores.deleteMany({})
db.receptores.deleteMany({})
db.hospitais.deleteMany({})
db.medicos.deleteMany({})
db.transplantes.deleteMany({})

function randomChoice(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function sample(array, count) {
  const copy = array.slice()
  const result = []
  while (result.length < count && copy.length) {
    const index = Math.floor(Math.random() * copy.length)
    result.push(copy.splice(index, 1)[0])
  }
  return result
}

function randomDate(startYear, endYear) {
  const start = new Date(startYear, 0, 1).getTime()
  const end = new Date(endYear, 11, 31).getTime()
  return new Date(randomInt(start, end))
}

function formatCPF(number) {
  return number.toString().padStart(11, "0")
}

const nomes = [
  "Ana Beatriz", "Carlos Eduardo", "Daniela Silva", "Eduardo Santos", "Fernanda Costa",
  "Gabriel Almeida", "Helena Rodrigues", "Igor Pereira", "Juliana Lima", "Kaio Martins",
  "Larissa Rios", "Mariana Nunes", "Nicolas Souza", "Olivia Freitas", "Patrick Oliveira",
  "Quésia Mendes", "Rafael Dias", "Sofia Carvalho", "Thais Azevedo", "Victor Souza",
  "Alice Moraes", "Bruno Fonseca", "Camila Rocha", "Diego Castro", "Elena Barbosa",
  "Felipe Teixeira", "Guilherme Pinto", "Heloisa Matos", "Isabela Cunha", "João Pedro",
  "Karen Lima", "Leonardo Andrade", "Marta Ferreira", "Natália Gomes", "Otávio Silva",
  "Pietro Oliveira", "Raissa Costa", "Samuel Marques", "Tainá Pires", "Ubirajara Rocha",
  "Vanessa Santos", "Wesley Ribeiro", "Ximena Dias", "Yara Lima", "Zezinho Alves",
  "Adriana Nogueira", "Bruno Cesar", "Cecília Santos", "Diego Martins", "Elaine Souza"
]

const cidades = [
  { cidade: "Recife", estado: "PE", cep: "50000-000" },
  { cidade: "Olinda", estado: "PE", cep: "53020-000" },
  { cidade: "Jaboatão dos Guararapes", estado: "PE", cep: "54000-000" },
  { cidade: "Caruaru", estado: "PE", cep: "55000-000" },
  { cidade: "Paulista", estado: "PE", cep: "53400-000" },
  { cidade: "Petrolina", estado: "PE", cep: "56300-000" },
  { cidade: "Salgueiro", estado: "PE", cep: "56000-000" },
  { cidade: "Garanhuns", estado: "PE", cep: "55200-000" },
  { cidade: "Santa Cruz do Capibaribe", estado: "PE", cep: "55190-000" },
  { cidade: "Igarassu", estado: "PE", cep: "53600-000" }
]

const tiposSanguineos = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]
const orgaosLista = ["rim", "figado", "coracao", "pulmao", "pancreas", "intestino"]
const condicoes = ["excelente", "boa", "regular"]
const tipoDoador = ["vivo", "post-mortem"]
const statusReceptor = ["aguardando", "em_transplante", "transplantado", "obito"]
const resultadoTransplante = ["sucesso", "rejeicao", "obito"]
const crossmatch = ["negativo", "positivo"]
const especialidades = [
  "cirurgia_transplante", "nefrologia", "cardiologia", "pneumologia", "imunologia",
  "hepatologia", "cirurgia_toracica", "anestesiologia"
]

const habilitacoesHospitais = [
  "transplante_renal", "transplante_cardiaco", "transplante_pulmonar",
  "transplante_hepatico", "transplante_pancreatico"
]

const hospitais = []
const medicos = []
const doadores = []
const receptores = []
const transplantes = []

// Hospitais — cria 10 hospitais com habilitações variadas
for (let i = 0; i < 10; i++) {
  const endereco = randomChoice(cidades)
  const habilitacoes = sample(habilitacoesHospitais, randomInt(2, 4))
  hospitais.push({
    _id: new ObjectId(),
    nome: `Hospital ${["Santa", "São", "Nossa Senhora", "Clínica", "Centro"] [i % 5]} ${["Vida", "Esperança", "Salvador", "Saúde", "Integrado"][i % 5]}`,
    cnpj: `${randomInt(10000000, 99999999)}0001${randomInt(10, 99)}`,
    tipo: i % 2 === 0 ? "publico" : "privado",
    habilitacoes,
    endereco: {
      rua: `Rua ${randomInt(1, 200)}`,
      cidade: endereco.cidade,
      estado: endereco.estado,
      cep: endereco.cep
    },
    contato: {
      telefone: `81 9${randomInt(9000, 9999)}-${randomInt(1000, 9999)}`,
      email: `contato${i + 1}@hospital${i + 1}.com.br`
    },
    leitos_transplante: randomInt(10, 40),
    equipes: [],
    criado_em: new Date()
  })
}

db.hospitais.insertMany(hospitais)

// Médicos — cria 50 médicos e distribui por hospitais
for (let i = 0; i < 50; i++) {
  const hospital = randomChoice(hospitais)
  const especialidadesMedico = sample(especialidades, randomInt(1, 3))
  const medico = {
    _id: new ObjectId(),
    nome: randomChoice(nomes),
    crm: `CRM-${randomInt(10000, 99999)}`,
    especialidades: especialidadesMedico,
    hospital: hospital._id,
    transplantes_realizados: randomInt(5, 120),
    disponivel: Math.random() > 0.18,
    contato: {
      telefone: `81 9${randomInt(8000, 9999)}-${randomInt(1000, 9999)}`,
      email: `dr${i + 1}@medicos.com.br`
    },
    criado_em: new Date()
  }
  medicos.push(medico)
  hospital.equipes.push(medico._id)
}

db.medicos.insertMany(medicos)

// Doadores — cria 50 doadores com órgãos disponíveis
for (let i = 0; i < 50; i++) {
  const tipo = randomChoice(tipoDoador)
  const cidade = randomChoice(cidades)
  const hla = sample(["A1", "A2", "A3", "B7", "B8", "B12", "DR4", "DR11", "DR15", "DQ2", "DQ6"], randomInt(3, 6))
  const orgaosDisponiveis = sample(orgaosLista, randomInt(1, 2)).map(orgao => ({
    orgao,
    lado: orgao === "rim" ? randomChoice(["direito", "esquerdo"]) : null,
    condicao: randomChoice(condicoes),
    data_coleta: randomDate(2024, 2026),
    disponivel: Math.random() > 0.2
  }))
  const doador = {
    _id: new ObjectId(),
    nome: randomChoice(nomes),
    cpf: formatCPF(randomInt(10000000000, 99999999999)),
    data_nascimento: randomDate(1955, 2005),
    tipo_sanguineo: randomChoice(tiposSanguineos),
    hla,
    tipo_doador: tipo,
    data_obito: tipo === "post-mortem" ? randomDate(2024, 2026) : null,
    causa_morte: tipo === "post-mortem" ? randomChoice(["acidente","aneurisma","AVC","trauma craniano"]) : null,
    contato: {
      telefone: `81 9${randomInt(7000, 9999)}-${randomInt(1000, 9999)}`,
      email: `doador${i + 1}@orgaos.com.br`,
      endereco: {
        cidade: cidade.cidade,
        estado: cidade.estado,
        cep: cidade.cep
      }
    },
    orgaos_disponiveis: orgaosDisponiveis,
    hospital_origem: randomChoice(hospitais)._id,
    criado_em: new Date()
  }
  doadores.push(doador)
}

db.doadores.insertMany(doadores)

// Receptores — cria 50 receptores em fila de espera
for (let i = 0; i < 50; i++) {
  const cidade = randomChoice(cidades)
  const hla = sample(["A1", "A2", "A3", "B7", "B8", "B12", "DR4", "DR11", "DR15", "DQ2", "DQ6"], randomInt(3, 6))
  const receptor = {
    _id: new ObjectId(),
    nome: randomChoice(nomes),
    cpf: formatCPF(randomInt(10000000000, 99999999999)),
    data_nascimento: randomDate(1960, 2010),
    tipo_sanguineo: randomChoice(tiposSanguineos),
    hla,
    orgao_necessario: randomChoice(orgaosLista),
    urgencia: randomInt(1, 5),
    status: randomChoice(statusReceptor),
    data_entrada_fila: randomDate(2023, 2026),
    condicoes_medicas: sample(["insuficiencia_renal", "diabetes", "hipertensao", "hepatite", "cardiopatia"], randomInt(1, 3)),
    medico_responsavel: randomChoice(medicos)._id,
    hospital: randomChoice(hospitais)._id,
    historico_tentativas: Array.from({ length: randomInt(0, 3) }, () => ({
      data: randomDate(2024, 2026),
      doador_id: randomChoice(doadores)._id,
      motivo_rejeicao: randomChoice(["incompatibilidade sanguínea", "hla insuficiente", "crossmatch positivo", "perda de janela cirúrgica"])
    })),
    criado_em: new Date()
  }
  receptores.push(receptor)
}

db.receptores.insertMany(receptores)

// Transplantes — cria 50 registros com referências cruzadas
for (let i = 0; i < 50; i++) {
  const receptor = randomChoice(receptores)
  const doador = randomChoice(doadores)
  const hospital = randomChoice(hospitais)
  const medico = randomChoice(medicos)
  const transplante = {
    _id: new ObjectId(),
    doador_id: doador._id,
    receptor_id: receptor._id,
    hospital_id: hospital._id,
    medico_responsavel: medico._id,
    orgao: receptor.orgao_necessario,
    data_transplante: randomDate(2024, 2026),
    duracao_cirurgia_min: randomInt(120, 480),
    status: randomChoice(["realizado", "em_andamento", "cancelado"]),
    resultado: Math.random() > 0.3 ? randomChoice(resultadoTransplante) : null,
    compatibilidade: {
      tipo_sanguineo: receptor.tipo_sanguineo === doador.tipo_sanguineo,
      hla_score: sample(receptor.hla, randomInt(0, receptor.hla.length)).length,
      crossmatch: randomChoice(crossmatch)
    },
    observacoes: randomChoice(["Procedimento dentro do previsto.", "Monitorar função renal.", "Paciente estável.", "Rejeição leve observada.", "Aguardando primeiros resultados." ]),
    criado_em: new Date()
  }
  transplantes.push(transplante)
}

db.transplantes.insertMany(transplantes)

print(`Inserção concluída:`)
print(`  - doadores: ${doadores.length}`)
print(`  - receptores: ${receptores.length}`)
print(`  - hospitais: ${hospitais.length}`)
print(`  - medicos: ${medicos.length}`)
print(`  - transplantes: ${transplantes.length}`)

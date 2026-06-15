# Guia de Contribuição

Leia antes de começar a codar. Seguir esse fluxo garante que ninguém sobrescreva o trabalho de ninguém.

---

## Branches

```
main          ← entrega final, só recebe merge via PR aprovado
develop       ← integração contínua, base para todas as features
feat/<nome>   ← sua branch de trabalho
```

### Criando sua branch

Sempre parta da `develop` atualizada:

```bash
git checkout develop
git pull origin develop
git checkout -b feat/fase-3-insert
```

Nomes de branch sugeridos por fase:

| Fase | Branch |
|------|--------|
| 1 - Modelagem | `feat/fase-1-modelagem` |
| 2 - Setup | `feat/fase-2-setup` |
| 3 - Inserção | `feat/fase-3-insert` |
| 4 - CRUD | `feat/fase-4-crud` |
| 5a - Consultas básicas | `feat/fase-5a-queries-basic` |
| 5b - Consultas avançadas | `feat/fase-5b-queries-advanced` |
| 6 - Documentação | `feat/fase-6-docs` |
| 7 - Prints | `feat/fase-7-prints` |

---

## Commits

Padrão simples mas consistente:

```
<tipo>: <descrição curta no imperativo>
```

| Tipo | Quando usar |
|------|-------------|
| `feat` | adicionando algo novo |
| `fix` | corrigindo um script que estava errado |
| `docs` | alterações só em documentação |
| `refactor` | reorganizando sem mudar funcionalidade |
| `chore` | configuração, dependências, etc |

**Exemplos:**

```bash
git commit -m "feat: adicionar inserção de doadores com órgãos disponíveis"
git commit -m "fix: corrigir campo tipo_sanguineo no script de insert"
git commit -m "docs: adicionar descrição das coleções em modelagem.md"
```

---

## Pull Requests

1. Finalizou sua fase? Push da branch:

```bash
git push origin feat/fase-3-insert
```

2. Abra um PR no GitHub: `feat/fase-3-insert` → `develop`

3. No PR, descreva:
   - O que foi feito
   - Quais itens da checklist foram cobertos (se aplicável)
   - Qualquer dependência que o próximo precisa saber

4. Pelo menos **1 pessoa do grupo** revisa e aprova antes do merge

5. Merge na `develop`. Quando tudo estiver pronto, a `develop` vai para `main`.

---

## Verificando os scripts no terminal

Sempre teste seu script antes de abrir o PR:

```bash
# Rodar e ver output completo
mongosh < scripts/02_insert.js

# Verificar quantos documentos foram inseridos
mongosh --eval "use orgaos_db; db.doadores.countDocuments()"

# Ver um documento de exemplo
mongosh --eval "use orgaos_db; db.doadores.findOne()"
```

Tire print do terminal mostrando o comando rodando e o resultado — vai para a pasta `assets/prints/` e será usado na documentação final.

---

## Regras gerais

- **Nunca commite direto na `main` ou `develop`**
- Sempre atualize sua branch antes de começar a trabalhar (`git pull origin develop`)
- Se precisar mudar algo que outra pessoa já fez, avise no grupo antes
- Conflito de merge? Resolva localmente, não force push
- Dúvida em algum comando MongoDB? Coloca no grupo antes de inventar — o professor penaliza consultas erradas ou triviais demais
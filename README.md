# Projeto Sara Coutinho - Landing Page com Triagem, Cadastro e Agenda

Landing page estatica para atendimento psicologico com foco em conversao humana, acolhimento e discricao.

O projeto foi desenvolvido em HTML5, CSS3 e JavaScript Vanilla, sem framework e sem build tool, para rodar facilmente em ambiente local e no GitHub Pages.

## Objetivo do projeto

Entregar uma jornada simples e objetiva para:

1. Fazer triagem inicial (anamnese dinamica e condicional).
2. Coletar cadastro com validacoes importantes (incluindo consentimento LGPD).
3. Permitir escolha de horario em agenda visual.
4. Gerar protocolo discreto para continuidade no WhatsApp.

## Stack tecnica

- HTML5 semantico
- CSS3 puro com variaveis em :root
- JavaScript Vanilla
- Persistencia local em localStorage

## Estrutura do repositorio

- index.html: estrutura da interface e secoes da jornada.
- style.css: identidade visual, layout responsivo e estados visuais.
- script.js: logica de fluxo, validacoes, persistencia, protocolo e decoder.
- prompt_sara.md: briefing base que orientou o produto.
- portifolio_cassio.md: documento legado de outro contexto (nao representa o produto atual).

## Ritmo recomendado para entender o projeto

Use esta ordem para onboarding rapido:

1. Leia index.html por secoes
   - Entenda Header, Hero, Etapa 1 (anamnese), Etapa 2 (cadastro), Etapa 3 (agenda), Etapa final.
   - Identifique os IDs usados como pontos de integracao do JavaScript.

2. Leia style.css por blocos
   - Comece em :root para paleta e tokens visuais.
   - Passe por estados de interface (is-hidden, is-selected, is-visible, animacoes).
   - Revise media queries para responsividade.

3. Leia script.js pelas constantes
   - Veja valores de configuracao, como telefone de WhatsApp, chave de armazenamento e tempos de seguranca.

4. Entenda o state global
   - Observe como state controla stage, questionId, responses, form, schedule e protocol.

5. Entenda o fluxo de triagem
   - Estude QUESTIONS e as ramificacoes: q2 define se vai para q3a ou q3b.

6. Entenda o fluxo de cadastro
   - Veja mascara de telefone, validacao, regra de menor de idade e campos de responsavel.

7. Entenda agenda e finalizacao
   - Veja renderizacao de slots, selecao unica, geracao de protocolo e atualizacao do link WhatsApp.

8. Entenda o decoder interno
   - Veja trigger discreto, desbloqueio por PIN (hash SHA-256), cooldown, relock e autoclear de saida.

Com esse ritmo, uma pessoa nova consegue navegar do visual para a logica sem se perder.

## Arquitetura funcional

### Jornada do usuario

1. Hero com CTA para iniciar.
2. Anamnese dinamica (uma pergunta por vez).
3. Cadastro com validacao de obrigatorios.
4. Agenda visual com escolha de 1 slot.
5. Geracao de protocolo.
6. Encaminhamento para WhatsApp com texto pre-preenchido.

### Fluxo condicional da anamnese

- q1 -> q2
- Se q2 = SIM -> q3a -> q4
- Se q2 = NAO -> q3b -> q4
- Depois de q4 -> etapa cadastro

## Modelo de estado e persistencia

O projeto usa localStorage com a chave:

- sara-landing-state-v1

O estado principal guarda:

- stage atual (anamnese, cadastro, agenda, final)
- pergunta atual e historico de navegacao
- respostas da anamnese
- dados do formulario
- slot de agenda selecionado
- protocolo e URL de WhatsApp

Regra importante:

- O consentimento LGPD persiste em state.form.consent.

## Protocolo discreto

Formato geral:

- SRA1|Q1=...|Q2=...|...|CK=...

Caracteristicas:

- Campos sensiveis sao ofuscados (XOR + base64 URL-safe).
- Integridade por checksum modulo 997.
- Decodificacao interna para uso operacional.

Observacao:

- O protocolo vai no texto do link WhatsApp. Evite incluir informacoes fora do fluxo previsto.

## Configuracoes principais (script.js)

- WHATSAPP_PHONE: numero destino do WhatsApp.
- STORAGE_KEY: chave do localStorage.
- PROTOCOL_VERSION: versao do protocolo (atualmente SRA1).
- OBFUSCATION_KEY: semente de ofuscacao dos dados.
- DECODER_PIN_HASH: hash SHA-256 do PIN interno.
- DECODER_COOLDOWN_MS: bloqueio apos tentativas invalidas.
- DECODER_RELOCK_MS: relock automatico por inatividade.
- DECODER_OUTPUT_AUTOCLEAR_MS: limpeza automatica da saida.

## Como executar localmente

Opcao 1 (mais simples):

1. Abra index.html no navegador.

Opcao 2 (recomendada para testes):

1. No PowerShell, entre na pasta do projeto.
2. Rode:

```bash
python -m http.server 8000
```

3. Acesse:

- http://localhost:8000

## Checklist rapido de validacao

1. Fluxo completo
   - Triagem -> Cadastro -> Agenda -> Final.

2. Ramificacao
   - q2 = SIM deve abrir q3a.
   - q2 = NAO deve abrir q3b.

3. Cadastro
   - Campos obrigatorios bloqueiam avanco quando vazios.
   - Consentimento LGPD precisa estar marcado.

4. Menor de idade
   - Campos de responsavel aparecem quando necessario.

5. Agenda
   - Apenas 1 slot selecionado por vez.

6. Protocolo
   - Gera texto em protocolo-output.
   - Botao Copiar funciona.

7. WhatsApp
   - Link abre com mensagem contendo protocolo.

8. Decoder
   - Trigger discreto por cliques no rodape.
   - PIN invalido respeita limite e cooldown.
   - Sessao desbloqueada sofre relock automatico.

## Deploy no GitHub Pages

1. Suba o repositorio no GitHub.
2. Abra Settings -> Pages.
3. Em Source, selecione branch principal e pasta root.
4. Salve e aguarde publicacao.

Como e um projeto estatico, nao exige build.

## Troubleshooting

1. Nao avanca do cadastro
   - Verifique obrigatorios e LGPD.
   - Confirme persistencia de state.form.consent.

2. Botao da agenda nao gera protocolo
   - Verifique se um slot foi selecionado.

3. WhatsApp abre sem mensagem
   - Verifique se state.protocol foi gerado antes do clique.

4. Decoder nao abre
   - Confirme trigger no rodape (5 cliques dentro da janela configurada).

5. Estado estranho no navegador
   - Limpe a chave sara-landing-state-v1 do localStorage e recarregue.

## Guia de manutencao rapida

### Trocar numero de WhatsApp

- Atualize WHATSAPP_PHONE em script.js.

### Trocar/expandir perguntas

- Edite o objeto QUESTIONS em script.js.
- Revise LABELS para manter legibilidade no decode.

### Trocar horarios da agenda

- Edite o array SLOTS em script.js.

### Ajustar identidade visual

- Edite variaveis em :root no style.css.

### Alterar PIN interno

1. Gere hash SHA-256 do novo PIN de 6 digitos.
2. Atualize DECODER_PIN_HASH em script.js.

## Escopo atual e proximos passos

Escopo atual:

- Jornada funcional completa com protocolo e integracao WhatsApp.
- Persistencia local para retomar preenchimento.
- Camada interna de decode para uso operacional.

Melhorias sugeridas:

1. Extrair documentacao tecnica complementar para docs/architecture.md.
2. Adicionar testes automatizados de funcoes criticas em script.js.
3. Criar processo de versionamento do protocolo para futuras evolucoes.

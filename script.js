/* ============================================================
   Constantes
   ============================================================ */
const WHATSAPP_PHONE = '5511920177895';
const WHATSAPP_BASE = `https://api.whatsapp.com/send/?phone=${WHATSAPP_PHONE}&text=&type=phone_number&app_absent=0&utm_source=ig`;
const STORAGE_KEY = 'sara-landing-state-v2';
const PROTOCOL_VERSION = 'SRA2';
const OBFUSCATION_KEY = 'sara-coutinho-2026';
const DECODER_PIN_HASH = 'af5b40bf6c81d9abea3d41349fb6120f56b3b707997ed620a137de68a177fccf';
const DECODER_PIN_REGEX = /^\d{6}$/;
const DECODER_TRIGGER_REQUIRED_CLICKS = 5;
const DECODER_TRIGGER_WINDOW_MS = 4000;
const DECODER_MAX_ATTEMPTS = 3;
const DECODER_COOLDOWN_MS = 2 * 60 * 1000;
const DECODER_RELOCK_MS = 5 * 60 * 1000;
const DECODER_OUTPUT_AUTOCLEAR_MS = 90 * 1000;

/* ============================================================
   Horários disponíveis (agenda visual)
   ============================================================ */
const SLOTS = [
  { code: 'SEG-MANHA', day: 'Segunda', label: 'Manhã',  detail: '08h30 - 10h'    },
  { code: 'SEG-TARDE', day: 'Segunda', label: 'Tarde',  detail: '14h - 16h'      },
  { code: 'TER-MANHA', day: 'Terça',   label: 'Manhã',  detail: '09h - 11h'      },
  { code: 'TER-NOITE', day: 'Terça',   label: 'Noite',  detail: '18h30 - 20h'    },
  { code: 'QUA-TARDE', day: 'Quarta',  label: 'Tarde',  detail: '13h30 - 15h30'  },
  { code: 'QUI-MANHA', day: 'Quinta',  label: 'Manhã',  detail: '08h30 - 10h'    },
  { code: 'QUI-NOITE', day: 'Quinta',  label: 'Noite',  detail: '18h - 20h'      },
  { code: 'SEX-TARDE', day: 'Sexta',   label: 'Tarde',  detail: '14h30 - 16h30'  }
];

/* ============================================================
   Passos do formulário de triagem (Anamnese Infantil/Adolescente)
   ============================================================ */
const TRIAGEM_STEPS = [
  {
    title: 'Identificação',
    kicker: 'Passo 1 de 6',
    description: 'Dados da criança ou adolescente e dos responsáveis.',
    fields: [
      { id: 'criancaNome',         label: 'Nome da criança / adolescente', type: 'text',   required: true,  placeholder: 'Nome completo' },
      { id: 'criancaNascimento',   label: 'Data de nascimento',             type: 'date',   required: true,  colSpan: 'half' },
      { id: 'responsavelNome',     label: 'Nome do(a) responsável',         type: 'text',   required: true,  placeholder: 'Nome completo do responsável' },
      { id: 'responsavelRelacao',  label: 'Parentesco / Relação',           type: 'select', required: true,
        options: ['', 'Mãe', 'Pai', 'Avó', 'Avô', 'Tia', 'Tio', 'Outro'], colSpan: 'half' },
      { id: 'responsavelTelefone', label: 'Telefone de contato',            type: 'tel',    required: true,  placeholder: '(11) 99999-9999', colSpan: 'half' },
      { id: 'responsavelEmail',    label: 'E-mail',                         type: 'email',  required: false, placeholder: 'voce@exemplo.com', colSpan: 'half' },
      { id: 'criancaCidade',       label: 'Cidade / Estado',                type: 'text',   required: true,  placeholder: 'Ex: São Paulo, SP' }
    ]
  },
  {
    title: 'Motivo da Busca',
    kicker: 'Passo 2 de 6',
    description: 'Nos conte o que motivou a busca por avaliação psicológica.',
    fields: [
      { id: 'queixaPrincipal',       label: 'Queixa principal — O que está observando?', type: 'textarea', required: true,
        placeholder: 'Descreva com suas palavras o que tem observado na criança ou adolescente...' },
      { id: 'tempoProblema',         label: 'Há quanto tempo percebeu isso?',             type: 'text',     required: false, placeholder: 'Ex: Há 6 meses, desde os 5 anos...' },
      { id: 'encaminhamento',        label: 'Foi indicado por alguém?',                   type: 'text',     required: false, placeholder: 'Ex: Pediatra, escola, familiar...' },
      { id: 'tratamentosAnteriores', label: 'Já realizou ou realiza algum tratamento?',   type: 'textarea', required: false,
        placeholder: 'Ex: Fonoaudiologia, psicólogo anterior, terapia ocupacional...' }
    ]
  },
  {
    title: 'Nascimento e Desenvolvimento',
    kicker: 'Passo 3 de 6',
    description: 'Informações sobre a gestação e o período perinatal.',
    fields: [
      { id: 'gravidezPlanejada',      label: 'A gravidez foi planejada?',                               type: 'radio',    required: false, options: ['Sim', 'Não', 'Prefiro não informar'] },
      { id: 'intercorrenciasGravid',  label: 'Houve intercorrências durante a gravidez? (Descreva se sim)', type: 'textarea', required: false,
        placeholder: 'Ex: hipertensão, estresse, infecções, uso de medicamentos...' },
      { id: 'tipoParto',              label: 'Tipo de parto',                                           type: 'radio',    required: false, options: ['Normal / Vaginal', 'Cesárea', 'Fórceps'] },
      { id: 'prematuridade',          label: 'A criança nasceu prematura?',                             type: 'radio',    required: false, options: ['Não, nasceu no tempo esperado', 'Sim, antes de 37 semanas'] },
      { id: 'pesoNascer',             label: 'Peso ao nascer (se souber)',                              type: 'text',     required: false, placeholder: 'Ex: 3,200 kg', colSpan: 'half' },
      { id: 'intercorrenciasParto',   label: 'Intercorrências no parto ou logo após? (Descreva se sim)', type: 'textarea', required: false,
        placeholder: 'Ex: APGAR baixo, icterícia, UTI neonatal, malformações...' }
    ]
  },
  {
    title: 'Primeira Infância e Marcos do Desenvolvimento',
    kicker: 'Passo 4 de 6',
    description: 'Marcos do desenvolvimento motor e de linguagem.',
    fields: [
      { id: 'amamentacao',         label: 'Amamentação',                                                       type: 'radio',          required: false,
        options: ['Aleitamento materno exclusivo', 'Fórmula', 'Misto', 'Não foi amamentada(o)'] },
      { id: 'idadeSentou',         label: 'Com que idade sentou sem apoio?',                                    type: 'text',           required: false, placeholder: 'Ex: 7 meses',  colSpan: 'half' },
      { id: 'idadeAndou',          label: 'Com que idade começou a andar?',                                     type: 'text',           required: false, placeholder: 'Ex: 12 meses', colSpan: 'half' },
      { id: 'idadePrimPalavras',   label: 'Primeiras palavras — com que idade?',                                type: 'text',           required: false, placeholder: 'Ex: 12 meses', colSpan: 'half' },
      { id: 'idadePrimFrases',     label: 'Primeiras frases — com que idade?',                                  type: 'text',           required: false, placeholder: 'Ex: 24 meses', colSpan: 'half' },
      { id: 'qualidadeFala',       label: 'Como avalia o desenvolvimento da fala atualmente?',                  type: 'radio',          required: false,
        options: ['Dentro do esperado', 'Atraso leve', 'Atraso significativo', 'Não fala ainda'] },
      { id: 'tratamentosRealizad', label: 'Realizou ou realiza algum dos tratamentos abaixo? (Marque todos que se aplicam)', type: 'checkbox-group', required: false,
        options: ['Fonoaudiologia', 'Terapia Ocupacional', 'Psicologia', 'Psiquiatria', 'Neurologia', 'Pediatria do desenvolvimento', 'Fisioterapia', 'Nenhum dos acima', 'Outro'] }
    ]
  },
  {
    title: 'Características e Comportamento',
    kicker: 'Passo 5 de 6',
    description: 'Marque as características que observa na criança ou adolescente. Pode marcar quantas quiser.',
    fields: [
      { id: 'comportamentos', label: '', type: 'checkbox-grid', required: false, options: [
        'Agitado(a) / Inquieto(a)',
        'Dificuldade de concentração ou atenção',
        'Impulsividade',
        'Agressividade (física ou verbal)',
        'Choro fácil / sensibilidade aumentada',
        'Dificuldade para dormir ou pesadelos frequentes',
        'Medos excessivos',
        'Comportamentos repetitivos ou rituais',
        'Dificuldade de socialização / poucos amigos',
        'Preferência por rotina rígida / resistência a mudanças',
        'Hipersensibilidade a sons, texturas ou cheiros',
        'Autolesão ou comportamentos de risco',
        'Baixa tolerância à frustração',
        'Comportamento oposicionista / desafiador',
        'Ansiedade excessiva',
        'Tristeza persistente / apatia',
        'Isolamento social',
        'Dificuldade de separação dos pais / cuidadores',
        'Enurese (xixi na cama) além da idade esperada',
        'Nenhuma das opções acima'
      ]}
    ]
  },
  {
    title: 'Histórico Educacional',
    kicker: 'Passo 6 de 6',
    description: 'Informações sobre a trajetória escolar. Ao final, confirme seu consentimento para envio.',
    fields: [
      { id: 'escolaAtual',            label: 'Nome da escola atual',                      type: 'text',     required: false, placeholder: 'Nome da escola',           colSpan: 'half' },
      { id: 'serieAtual',             label: 'Série / Ano escolar atual',                 type: 'text',     required: false, placeholder: 'Ex: 3º ano fundamental',   colSpan: 'half' },
      { id: 'dificuldadesAprender',   label: 'Apresenta dificuldades de aprendizagem?',   type: 'radio',    required: false,
        options: ['Não', 'Sim — leitura e/ou escrita', 'Sim — matemática', 'Sim — várias áreas', 'Não sei avaliar'] },
      { id: 'reprovacoes',            label: 'Já foi reprovado(a)?',                      type: 'radio',    required: false, options: ['Não', 'Sim — 1 vez', 'Sim — mais de uma vez'] },
      { id: 'relColegas',             label: 'Como é o relacionamento com os colegas?',   type: 'radio',    required: false,
        options: ['Muito bom', 'Bom', 'Regular', 'Difícil', 'Prefere isolamento'] },
      { id: 'apoioPedagogico',        label: 'Recebe algum apoio pedagógico?',            type: 'radio',    required: false,
        options: ['Não', 'Sim — na própria escola', 'Sim — reforço particular', 'Ambos'] },
      { id: 'obsEscolares',           label: 'Observações sobre a escola (relatos de professores, relatórios, etc.)', type: 'textarea', required: false,
        placeholder: 'Descreva quaisquer observações relevantes sobre o desempenho ou comportamento escolar...' },
      { id: 'lgpdConsent',            label: 'Li e concordo com o uso das informações fornecidas para fins de avaliação psicológica, conforme a LGPD.', type: 'consent', required: true }
    ]
  }
];

/* ============================================================
   Estado global
   ============================================================ */
const state = {
  triagemStep: 0,
  triagemData: {},
  triagemCompleted: false,
  schedule: { selectedSlot: '' },
  protocol: '',
  whatsappUrl: WHATSAPP_BASE
};

/* ============================================================
   Referências DOM — elementos fixos
   ============================================================ */
const finalStage      = document.getElementById('final-stage');
const protocolOutput  = document.getElementById('protocol-output');
const whatsappLink    = document.getElementById('whatsappLink');
const floatingWA      = document.getElementById('floatingWhatsapp');
const scheduleGrid    = document.getElementById('schedule-grid');
const footerCrp       = document.getElementById('footerCrp');
const decoderVault    = document.getElementById('decoderVault');
const closeDecoder    = document.getElementById('closeDecoder');
const decoderInput    = document.getElementById('decoderInput');
const decoderOutput   = document.getElementById('decoderOutput');
const decoderPin      = document.getElementById('decoderPin');
const unlockDecoder   = document.getElementById('unlockDecoder');
const decoderGateSt   = document.getElementById('decoderGateStatus');

const decoderState = {
  unlocked: false,
  attempts: 0,
  cooldownUntil: 0,
  triggerCount: 0,
  triggerStartedAt: 0,
  relockTimeoutId: null,
  clearOutputTimeoutId: null
};

/* ============================================================
   Persistência de estado
   ============================================================ */
function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      triagemStep: state.triagemStep,
      triagemData: state.triagemData,
      triagemCompleted: state.triagemCompleted,
      schedule: state.schedule
    }));
  } catch (_) { /* quota exceeded ou privado — ignorar */ }
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  try {
    const saved = JSON.parse(raw);
    state.triagemStep      = typeof saved.triagemStep === 'number' ? saved.triagemStep : 0;
    state.triagemData      = { ...state.triagemData, ...(saved.triagemData || {}) };
    state.triagemCompleted = Boolean(saved.triagemCompleted);
    state.schedule         = { ...state.schedule, ...(saved.schedule || {}) };
  } catch (err) {
    console.warn('Falha ao carregar estado salvo.', err);
  }
}

function clearState() {
  localStorage.removeItem(STORAGE_KEY);
}

/* ============================================================
   Utilitários
   ============================================================ */
function normalizeText(value) {
  return String(value || '').trim();
}

function maskPhone(value) {
  const digits = String(value || '').replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2)  return digits;
  if (digits.length <= 6)  return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ============================================================
   Menu mobile (hamburger)
   ============================================================ */
function initMobileMenu() {
  const hamburgerBtn   = document.getElementById('hamburgerBtn');
  const mobileMenu     = document.getElementById('mobileMenu');
  const closeMenuBtn   = document.getElementById('closeMobileMenu');
  const menuBackdrop   = document.getElementById('menuBackdrop');

  if (!hamburgerBtn || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.add('is-open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
    if (closeMenuBtn) closeMenuBtn.focus();
  }

  function closeMenu() {
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    hamburgerBtn.focus();
  }

  hamburgerBtn.addEventListener('click', openMenu);
  if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);
  if (menuBackdrop) menuBackdrop.addEventListener('click', closeMenu);

  document.querySelectorAll('[data-close-menu]').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
      closeMenu();
    }
  });
}

/* ============================================================
   Formulário multi-etapas — renderização
   ============================================================ */
function renderFieldHTML(field) {
  const saved = state.triagemData[field.id];
  const colClass = field.colSpan === 'half' ? 'field-split' : 'field-full';
  const reqLabel = field.required ? ' <abbr title="Obrigatório" aria-label="obrigatório">*</abbr>' : '';

  if (field.type === 'text' || field.type === 'email' || field.type === 'date') {
    return `<label class="field ${colClass}">
      <span>${escapeHtml(field.label)}${reqLabel}</span>
      <input id="${field.id}" name="${field.id}" type="${field.type}"
        ${field.placeholder ? `placeholder="${escapeHtml(field.placeholder)}"` : ''}
        ${field.required ? 'required' : ''}
        value="${escapeHtml(saved || '')}">
    </label>`;
  }

  if (field.type === 'tel') {
    return `<label class="field ${colClass}">
      <span>${escapeHtml(field.label)}${reqLabel}</span>
      <input id="${field.id}" name="${field.id}" type="tel" inputmode="tel"
        ${field.placeholder ? `placeholder="${escapeHtml(field.placeholder)}"` : ''}
        ${field.required ? 'required' : ''}
        value="${escapeHtml(maskPhone(saved || ''))}">
    </label>`;
  }

  if (field.type === 'textarea') {
    return `<label class="field field-full">
      <span>${escapeHtml(field.label)}${reqLabel}</span>
      <textarea id="${field.id}" name="${field.id}"
        ${field.placeholder ? `placeholder="${escapeHtml(field.placeholder)}"` : ''}
        ${field.required ? 'required' : ''}>${escapeHtml(saved || '')}</textarea>
    </label>`;
  }

  if (field.type === 'select') {
    const opts = (field.options || []).map((opt) => {
      const selected = saved === opt ? ' selected' : '';
      return `<option value="${escapeHtml(opt)}"${selected}>${opt ? escapeHtml(opt) : 'Selecione'}</option>`;
    }).join('');
    return `<label class="field ${colClass}">
      <span>${escapeHtml(field.label)}${reqLabel}</span>
      <select id="${field.id}" name="${field.id}" ${field.required ? 'required' : ''}>${opts}</select>
    </label>`;
  }

  if (field.type === 'radio') {
    const chips = (field.options || []).map((opt) => {
      const checked = saved === opt ? ' checked' : '';
      return `<label class="radio-chip">
        <input type="radio" name="${field.id}" value="${escapeHtml(opt)}"${checked}>
        ${escapeHtml(opt)}
      </label>`;
    }).join('');
    return `<fieldset class="fieldset-block field-full">
      <legend>${escapeHtml(field.label)}</legend>
      <div class="option-row">${chips}</div>
    </fieldset>`;
  }

  if (field.type === 'checkbox-group' || field.type === 'checkbox-grid') {
    const savedArr = Array.isArray(saved) ? saved : [];
    const gridClass = field.type === 'checkbox-grid' ? 'checkbox-grid-options' : 'checkbox-list-options';
    const labelHtml = field.label
      ? `<p class="fieldset-label">${escapeHtml(field.label)}</p>`
      : '';
    const chips = (field.options || []).map((opt) => {
      const checked = savedArr.includes(opt) ? ' checked' : '';
      return `<label class="checkbox-chip">
        <input type="checkbox" name="${field.id}" value="${escapeHtml(opt)}"${checked}>
        <span>${escapeHtml(opt)}</span>
      </label>`;
    }).join('');
    return `<div class="fieldset-block field-full">
      ${labelHtml}
      <div class="${gridClass}">${chips}</div>
    </div>`;
  }

  if (field.type === 'consent') {
    const checked = saved ? ' checked' : '';
    return `<label class="consent-card field-full">
      <input type="checkbox" id="${field.id}" name="${field.id}"${checked}
        ${field.required ? 'required' : ''}>
      <span>${escapeHtml(field.label)}${reqLabel}</span>
    </label>`;
  }

  return '';
}

function updateStepProgress(stepIndex) {
  const bar  = document.getElementById('stepProgressBar');
  const dots = document.getElementById('stepDots');
  const total = TRIAGEM_STEPS.length;
  const percent = Math.round(((stepIndex + 1) / total) * 100);

  if (bar) bar.style.width = `${percent}%`;

  if (dots) {
    dots.innerHTML = TRIAGEM_STEPS.map((step, i) => {
      let cls = '';
      if (i < stepIndex)  cls = 'is-done';
      if (i === stepIndex) cls = 'is-active';
      const dotLabel = i < stepIndex ? '✓' : String(i + 1);
      return `<li class="step-indicator ${cls}" role="listitem">
        <span class="step-indicator-dot" aria-hidden="true">${dotLabel}</span>
        <span class="step-indicator-label">${escapeHtml(step.title)}</span>
      </li>`;
    }).join('');
  }
}

function renderTriagemStep(stepIndex) {
  const step = TRIAGEM_STEPS[stepIndex];
  const contentEl  = document.getElementById('stepContent');
  const actionsEl  = document.getElementById('stepActions');
  if (!step || !contentEl || !actionsEl) return;

  const fieldsHTML = step.fields.map(renderFieldHTML).join('');

  contentEl.innerHTML = `
    <div class="step-header fade-in-slide-up">
      <p class="step-kicker">${escapeHtml(step.kicker)}</p>
      <h3 class="step-title">${escapeHtml(step.title)}</h3>
      <p class="step-desc">${escapeHtml(step.description)}</p>
    </div>
    <div class="form-grid">${fieldsHTML}</div>
  `;

  const isFirst = stepIndex === 0;
  const isLast  = stepIndex === TRIAGEM_STEPS.length - 1;

  actionsEl.innerHTML = `<div class="step-nav">
    ${!isFirst ? '<button type="button" class="ghost-button" id="stepBack">Voltar</button>' : ''}
    <button type="button" class="primary-button" id="stepNext">
      ${isLast ? 'Enviar triagem' : 'Próximo →'}
    </button>
  </div>`;

  const nextBtn = document.getElementById('stepNext');
  const backBtn = document.getElementById('stepBack');
  if (nextBtn) nextBtn.addEventListener('click', () => { advanceStep(stepIndex); });
  if (backBtn) backBtn.addEventListener('click', () => { goBackStep(stepIndex); });

  wireStepFields(stepIndex);
  updateStepProgress(stepIndex);
}

function wireStepFields(stepIndex) {
  const step = TRIAGEM_STEPS[stepIndex];

  step.fields.forEach((field) => {
    if (field.type === 'checkbox-group' || field.type === 'checkbox-grid') {
      document.querySelectorAll(`input[name="${field.id}"]`).forEach((input) => {
        input.addEventListener('change', () => {
          const checked = [...document.querySelectorAll(`input[name="${field.id}"]:checked`)]
            .map((el) => el.value);
          state.triagemData[field.id] = checked;
          saveState();
        });
      });
      return;
    }

    if (field.type === 'radio') {
      document.querySelectorAll(`input[name="${field.id}"]`).forEach((input) => {
        input.addEventListener('change', () => {
          state.triagemData[field.id] = input.value;
          saveState();
        });
      });
      return;
    }

    const el = document.getElementById(field.id);
    if (!el) return;

    const eventType = el.type === 'checkbox' ? 'change' : 'input';
    el.addEventListener(eventType, () => {
      if (el.type === 'checkbox') {
        state.triagemData[field.id] = el.checked;
      } else if (field.type === 'tel') {
        el.value = maskPhone(el.value);
        state.triagemData[field.id] = el.value;
      } else {
        state.triagemData[field.id] = el.value;
      }
      saveState();
    });
  });
}

/* ============================================================
   Validação e navegação entre etapas
   ============================================================ */
function validateStep(stepIndex) {
  const step = TRIAGEM_STEPS[stepIndex];
  for (const field of step.fields) {
    if (!field.required) continue;
    const val = state.triagemData[field.id];
    if (field.type === 'consent') {
      if (!val) return { valid: false, field };
    } else {
      if (!normalizeText(val)) return { valid: false, field };
    }
  }
  return { valid: true };
}

function scrollToTriagem() {
  const section = document.getElementById('triagem');
  if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function advanceStep(currentStep) {
  const result = validateStep(currentStep);
  if (!result.valid) {
    const el = result.field ? document.getElementById(result.field.id) : null;
    if (el) {
      el.focus();
      el.closest('.field, .consent-card, .fieldset-block')?.classList.add('fade-in-soft');
    }
    alert('Preencha os campos obrigatórios (*) antes de continuar.');
    return;
  }

  if (currentStep === TRIAGEM_STEPS.length - 1) {
    submitTriagem();
    return;
  }

  state.triagemStep = currentStep + 1;
  saveState();
  renderTriagemStep(state.triagemStep);
  scrollToTriagem();
}

function goBackStep(currentStep) {
  if (currentStep <= 0) return;
  state.triagemStep = currentStep - 1;
  saveState();
  renderTriagemStep(state.triagemStep);
  scrollToTriagem();
}

/* ============================================================
   Submissão da triagem
   ============================================================ */
function submitTriagem() {
  state.triagemCompleted = true;
  saveState();

  const nome  = normalizeText(state.triagemData.criancaNome)      || 'não informado';
  const resp  = normalizeText(state.triagemData.responsavelNome)  || 'não informado';
  const tel   = normalizeText(state.triagemData.responsavelTelefone) || 'não informado';
  const queixa = normalizeText(state.triagemData.queixaPrincipal) || 'não informada';

  const msg = [
    'Olá! Preenchi a ficha de triagem pelo site.',
    `Criança/Adolescente: ${nome}`,
    `Responsável: ${resp}`,
    `Telefone: ${tel}`,
    `Queixa: ${queixa}`
  ].join('\n');

  const triagemWA = document.getElementById('triagemWhatsapp');
  if (triagemWA) {
    triagemWA.href = `https://api.whatsapp.com/send/?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(msg)}&type=phone_number&app_absent=0&utm_source=ig`;
  }

  if (floatingWA) {
    floatingWA.href = triagemWA ? triagemWA.href : WHATSAPP_BASE;
    floatingWA.classList.add('is-visible');
  }

  const formEl  = document.getElementById('multistepForm');
  const finalEl = document.getElementById('triagemFinal');
  if (formEl)  formEl.classList.add('is-hidden');
  if (finalEl) finalEl.classList.remove('is-hidden');

  scrollToTriagem();
}

/* ============================================================
   Agenda visual
   ============================================================ */
function renderSchedule() {
  if (!scheduleGrid) return;
  scheduleGrid.innerHTML = SLOTS.map((slot) => `
    <button type="button" class="schedule-slot ${state.schedule.selectedSlot === slot.code ? 'is-selected' : ''}"
            data-slot="${slot.code}" role="option" aria-selected="${state.schedule.selectedSlot === slot.code}">
      <strong>${slot.day}</strong>
      <span>${slot.label}</span>
      <span>${slot.detail}</span>
    </button>
  `).join('');

  scheduleGrid.querySelectorAll('.schedule-slot').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.schedule.selectedSlot = btn.dataset.slot;
      scheduleGrid.querySelectorAll('.schedule-slot').forEach((item) => {
        const sel = item.dataset.slot === state.schedule.selectedSlot;
        item.classList.toggle('is-selected', sel);
        item.setAttribute('aria-selected', String(sel));
      });
      saveState();
    });
  });
}

/* ============================================================
   Protocolo discreto (agenda → WhatsApp)
   ============================================================ */
function obfuscateText(value, seed) {
  const input = normalizeText(value);
  if (!input) return '';
  const encoder = new TextEncoder();
  const bytes = encoder.encode(input);
  const keyBytes = encoder.encode(`${OBFUSCATION_KEY}:${seed}`);
  let binary = '';
  bytes.forEach((byte, index) => {
    binary += String.fromCharCode(byte ^ keyBytes[index % keyBytes.length]);
  });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function revealText(token, seed) {
  if (!token || token === '-') return '';
  const padded = token.replace(/-/g, '+').replace(/_/g, '/')
    .padEnd(Math.ceil(token.length / 4) * 4, '=');
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  const keyBytes = new TextEncoder().encode(`${OBFUSCATION_KEY}:${seed}`);
  const restored = bytes.map((byte, index) => byte ^ keyBytes[index % keyBytes.length]);
  return new TextDecoder().decode(restored);
}

function calculateChecksum(content) {
  let hash = 0;
  for (let i = 0; i < content.length; i += 1) {
    hash = (hash + content.charCodeAt(i) * (i + 1)) % 997;
  }
  return String(hash).padStart(3, '0');
}

function buildProtocol() {
  const body = [
    PROTOCOL_VERSION,
    `NM=${obfuscateText(state.triagemData.criancaNome || '-',           'nm')}`,
    `TL=${obfuscateText(state.triagemData.responsavelTelefone || '-',   'tl')}`,
    `RP=${obfuscateText(state.triagemData.responsavelNome || '-',       'rp')}`,
    `TR=${state.triagemCompleted ? '1' : '0'}`,
    `AG=${state.schedule.selectedSlot || ''}`
  ].join('|');
  return `${body}|CK=${calculateChecksum(body)}`;
}

function parseProtocol(protocol) {
  if (!protocol || !protocol.startsWith(PROTOCOL_VERSION)) return null;
  const parsed = {};
  protocol.split('|').forEach((part) => {
    const [key, ...rest] = part.split('=');
    parsed[key] = rest.length ? rest.join('=') : key;
  });
  return parsed;
}

function decodeProtocol(protocol) {
  const parsed = parseProtocol(protocol);
  if (!parsed) return 'Protocolo inválido ou vazio.';

  const bodyWithoutCK = protocol.replace(/\|CK=\d{3}$/, '');
  const integrity = calculateChecksum(bodyWithoutCK) === (parsed.CK || '')
    ? 'Checksum conferido ✓'
    : 'Checksum divergente ✗';

  const slot = SLOTS.find((s) => s.code === parsed.AG);

  return [
    `Versão: ${parsed[PROTOCOL_VERSION] || PROTOCOL_VERSION}`,
    `Criança / Adolescente: ${revealText(parsed.NM, 'nm') || '-'}`,
    `Responsável: ${revealText(parsed.RP, 'rp') || '-'}`,
    `Telefone: ${revealText(parsed.TL, 'tl') || '-'}`,
    `Triagem preenchida: ${parsed.TR === '1' ? 'Sim' : 'Não'}`,
    `Agenda preferencial: ${slot ? `${slot.day} — ${slot.label} (${slot.detail})` : '-'}`,
    `Integridade: ${integrity}`
  ].join('\n');
}

function syncWhatsappLink() {
  const msg = encodeURIComponent(
    `Olá, segue meu protocolo de agendamento.\n${state.protocol}`
  );
  const url = `https://api.whatsapp.com/send/?phone=${WHATSAPP_PHONE}&text=${msg}&type=phone_number&app_absent=0&utm_source=ig`;
  state.whatsappUrl = url;
  if (whatsappLink)  whatsappLink.href  = url;
  if (floatingWA)    floatingWA.href    = url;
  saveState();
}

function showFinalStage() {
  if (protocolOutput) protocolOutput.textContent = state.protocol;
  syncWhatsappLink();
  if (finalStage) {
    finalStage.classList.remove('is-hidden');
    finalStage.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  if (floatingWA) floatingWA.classList.add('is-visible');
}

function generateProtocol() {
  if (!state.schedule.selectedSlot) {
    alert('Escolha um horário antes de gerar o protocolo.');
    return;
  }
  state.protocol = buildProtocol();
  showFinalStage();
}

function copyProtocol() {
  if (!state.protocol) return;
  navigator.clipboard.writeText(state.protocol).then(() => {
    const btn = document.getElementById('copyProtocol');
    const prev = btn.textContent;
    btn.textContent = 'Copiado!';
    setTimeout(() => { btn.textContent = prev; }, 1400);
  }).catch(() => {
    alert('Não foi possível copiar automaticamente. Selecione e copie manualmente.');
  });
}

/* ============================================================
   Decoder vault (área interna — acesso discreet)
   ============================================================ */
async function sha256Hex(value) {
  const encoded = new TextEncoder().encode(value);
  const digest  = await crypto.subtle.digest('SHA-256', encoded);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function clearDecoderTimers() {
  if (decoderState.relockTimeoutId) {
    clearTimeout(decoderState.relockTimeoutId);
    decoderState.relockTimeoutId = null;
  }
  if (decoderState.clearOutputTimeoutId) {
    clearTimeout(decoderState.clearOutputTimeoutId);
    decoderState.clearOutputTimeoutId = null;
  }
}

function clearDecoderFields() {
  if (decoderInput)    decoderInput.value = '';
  if (decoderOutput)   decoderOutput.textContent = '';
  if (decoderPin)      decoderPin.value = '';
  if (decoderGateSt)   decoderGateSt.textContent = '';
}

function lockDecoder() {
  decoderState.unlocked = false;
  clearDecoderTimers();
  clearDecoderFields();
  if (decoderVault) {
    decoderVault.classList.add('is-hidden');
    decoderVault.classList.remove('is-unlocked');
  }
}

function scheduleDecoderRelock() {
  if (!decoderState.unlocked) return;
  if (decoderState.relockTimeoutId) clearTimeout(decoderState.relockTimeoutId);
  decoderState.relockTimeoutId = setTimeout(lockDecoder, DECODER_RELOCK_MS);
}

function touchDecoderActivity() {
  if (!decoderState.unlocked) return;
  scheduleDecoderRelock();
}

function scheduleDecoderOutputClear() {
  if (decoderState.clearOutputTimeoutId) clearTimeout(decoderState.clearOutputTimeoutId);
  decoderState.clearOutputTimeoutId = setTimeout(() => {
    if (decoderOutput) decoderOutput.textContent = 'Saída limpa automaticamente por discrição.';
  }, DECODER_OUTPUT_AUTOCLEAR_MS);
}

async function requestDecoderUnlock() {
  const now = Date.now();

  if (decoderState.unlocked) {
    if (decoderVault) {
      decoderVault.classList.remove('is-hidden');
      decoderVault.classList.add('is-unlocked');
    }
    scheduleDecoderRelock();
    return;
  }

  if (decoderState.cooldownUntil > now) {
    const secsLeft = Math.ceil((decoderState.cooldownUntil - now) / 1000);
    if (decoderGateSt) decoderGateSt.textContent = `Acesso bloqueado. Aguarde ${secsLeft}s.`;
    return;
  }

  const cleanPin = normalizeText(decoderPin ? decoderPin.value : '');
  if (!cleanPin) {
    if (decoderGateSt) decoderGateSt.textContent = 'Informe o código interno.';
    return;
  }

  if (!DECODER_PIN_REGEX.test(cleanPin)) {
    if (decoderGateSt) decoderGateSt.textContent = 'Formato inválido. Use 6 dígitos numéricos.';
    return;
  }

  const pinHash = await sha256Hex(cleanPin);
  if (pinHash === DECODER_PIN_HASH) {
    decoderState.unlocked = true;
    decoderState.attempts = 0;
    decoderState.cooldownUntil = 0;
    if (decoderVault) decoderVault.classList.add('is-unlocked');
    if (decoderGateSt) decoderGateSt.textContent = '';
    if (decoderPin) decoderPin.value = '';
    scheduleDecoderRelock();
    return;
  }

  decoderState.attempts += 1;
  if (decoderState.attempts >= DECODER_MAX_ATTEMPTS) {
    decoderState.cooldownUntil = Date.now() + DECODER_COOLDOWN_MS;
    decoderState.attempts = 0;
    if (decoderGateSt) decoderGateSt.textContent = 'Acesso bloqueado por 2 minutos.';
    return;
  }

  const left = DECODER_MAX_ATTEMPTS - decoderState.attempts;
  if (decoderGateSt) decoderGateSt.textContent = `Código inválido. Restam ${left} tentativa(s).`;
}

function handleDiscreetTrigger() {
  const now = Date.now();
  if (!decoderState.triggerStartedAt ||
      (now - decoderState.triggerStartedAt) > DECODER_TRIGGER_WINDOW_MS) {
    decoderState.triggerStartedAt = now;
    decoderState.triggerCount = 1;
    return;
  }

  decoderState.triggerCount += 1;
  if (decoderState.triggerCount >= DECODER_TRIGGER_REQUIRED_CLICKS) {
    decoderState.triggerCount = 0;
    decoderState.triggerStartedAt = 0;
    if (decoderState.unlocked) {
      requestDecoderUnlock();
      return;
    }
    if (decoderVault) decoderVault.classList.remove('is-hidden');
    if (decoderGateSt) decoderGateSt.textContent = 'Informe o código interno.';
    if (decoderPin) decoderPin.focus();
  }
}

/* ============================================================
   Registro de eventos fixos
   ============================================================ */
function initButtons() {
  const generateBtn = document.getElementById('generateProtocol');
  if (generateBtn) generateBtn.addEventListener('click', generateProtocol);

  const copyBtn = document.getElementById('copyProtocol');
  if (copyBtn) copyBtn.addEventListener('click', copyProtocol);

  const calBtn = document.getElementById('openOfficialCalendar');
  if (calBtn) {
    calBtn.addEventListener('click', () => {
      window.open('https://calendar.app.google/4zcXaXysZadLhs5y6', '_blank', 'noopener,noreferrer');
    });
  }

  const decodeBtn = document.getElementById('decodeButton');
  if (decodeBtn) {
    decodeBtn.addEventListener('click', () => {
      if (!decoderState.unlocked) return;
      const protocol = normalizeText(decoderInput.value);
      if (decoderOutput) decoderOutput.textContent = decodeProtocol(protocol);
      touchDecoderActivity();
      scheduleDecoderOutputClear();
    });
  }

  const fillBtn = document.getElementById('fillCurrentProtocol');
  if (fillBtn) {
    fillBtn.addEventListener('click', () => {
      if (!decoderState.unlocked) return;
      if (decoderInput) decoderInput.value = state.protocol || '';
      touchDecoderActivity();
    });
  }

  if (closeDecoder) closeDecoder.addEventListener('click', lockDecoder);

  if (unlockDecoder) unlockDecoder.addEventListener('click', requestDecoderUnlock);

  if (decoderPin) {
    decoderPin.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') { event.preventDefault(); requestDecoderUnlock(); }
    });
  }

  if (decoderVault) {
    decoderVault.addEventListener('click', touchDecoderActivity);
    decoderVault.addEventListener('keydown', touchDecoderActivity);
    decoderVault.addEventListener('input', touchDecoderActivity);
  }

  if (footerCrp) footerCrp.addEventListener('click', handleDiscreetTrigger);

  if (whatsappLink) whatsappLink.addEventListener('click', clearState);
  if (floatingWA)   floatingWA.addEventListener('click', clearState);
}

/* ============================================================
   Inicialização
   ============================================================ */
function init() {
  initMobileMenu();
  loadState();
  renderSchedule();

  const formEl  = document.getElementById('multistepForm');
  const finalEl = document.getElementById('triagemFinal');

  if (state.triagemCompleted) {
    if (formEl)  formEl.classList.add('is-hidden');
    if (finalEl) finalEl.classList.remove('is-hidden');
    if (floatingWA) floatingWA.classList.add('is-visible');
  } else {
    const step = Math.min(state.triagemStep || 0, TRIAGEM_STEPS.length - 1);
    renderTriagemStep(step);
  }

  initButtons();
}

document.addEventListener('DOMContentLoaded', init);

const WHATSAPP_PHONE = '5511920177895';
const WHATSAPP_BASE = `https://api.whatsapp.com/send/?phone=${WHATSAPP_PHONE}&text=&type=phone_number&app_absent=0&utm_source=ig`;
const STORAGE_KEY = 'sara-landing-state-v1';
const PROTOCOL_VERSION = 'SRA1';
const OBFUSCATION_KEY = 'sara-coutinho-2026';
const DECODER_PIN_HASH = 'af5b40bf6c81d9abea3d41349fb6120f56b3b707997ed620a137de68a177fccf';
const DECODER_PIN_REGEX = /^\d{6}$/;
const DECODER_TRIGGER_REQUIRED_CLICKS = 5;
const DECODER_TRIGGER_WINDOW_MS = 4000;
const DECODER_MAX_ATTEMPTS = 3;
const DECODER_COOLDOWN_MS = 2 * 60 * 1000;
const DECODER_RELOCK_MS = 5 * 60 * 1000;
const DECODER_OUTPUT_AUTOCLEAR_MS = 90 * 1000;

const QUESTIONS = {
  q1: {
    title: 'Qual o foco principal do seu cuidado hoje?',
    kicker: 'Pergunta 1 de 4',
    subtitle: 'Escolha a opção que melhor representa o que você quer olhar com mais atenção neste momento.',
    next: 'q2',
    options: [
      { label: 'Ansiedade cotidiana', value: 'ANX', badge: '1' },
      { label: 'Relações humanas', value: 'REL', badge: '2' },
      { label: 'Momentos difíceis', value: 'DIF', badge: '3' },
      { label: 'Autoconhecimento', value: 'AUT', badge: '4' }
    ]
  },
  q2: {
    title: 'Você já vivenciou o processo terapêutico antes?',
    kicker: 'Pergunta 2 de 4',
    subtitle: 'A resposta aqui direciona o próximo bloco de forma personalizada.',
    options: [
      { label: 'Sim', value: 'SIM', badge: 'A', next: 'q3a' },
      { label: 'Não', value: 'NAO', badge: 'B', next: 'q3b' }
    ]
  },
  q3a: {
    title: 'Como você percebe sua jornada anterior?',
    kicker: 'Pergunta 3A',
    subtitle: 'Se você já fez terapia, queremos entender como percebeu essa experiência.',
    next: 'q4',
    options: [
      { label: 'Evolução contínua', value: 'EVO', badge: '1' },
      { label: 'Experiência neutra', value: 'NEU', badge: '2' },
      { label: 'Não me adaptei na época', value: 'ADP', badge: '3' }
    ]
  },
  q3b: {
    title: 'O que mais te motivou a dar esse passo agora?',
    kicker: 'Pergunta 3B',
    subtitle: 'Esse passo ajuda a entender como você chegou até aqui.',
    next: 'q4',
    options: [
      { label: 'Olhar para mim', value: 'OLH', badge: '1' },
      { label: 'Incentivo de terceiros', value: 'INC', badge: '2' },
      { label: 'Recomendação profissional', value: 'REC', badge: '3' }
    ]
  },
  q4: {
    title: 'Como prefere realizar os seus atendimentos?',
    kicker: 'Pergunta 4 de 4',
    subtitle: 'A escolha será incluída no seu protocolo e na mensagem final do WhatsApp.',
    options: [
      { label: 'Online por videochamada', value: 'ONL', badge: '1' },
      { label: 'Presencial no consultório', value: 'PRE', badge: '2' }
    ]
  }
};

const SLOTS = [
  { code: 'SEG-MANHA', day: 'Segunda', label: 'Manhã', detail: '08h30 - 10h' },
  { code: 'SEG-TARDE', day: 'Segunda', label: 'Tarde', detail: '14h - 16h' },
  { code: 'TER-MANHA', day: 'Terça', label: 'Manhã', detail: '09h - 11h' },
  { code: 'TER-NOITE', day: 'Terça', label: 'Noite', detail: '18h30 - 20h' },
  { code: 'QUA-TARDE', day: 'Quarta', label: 'Tarde', detail: '13h30 - 15h30' },
  { code: 'QUI-MANHA', day: 'Quinta', label: 'Manhã', detail: '08h30 - 10h' },
  { code: 'QUI-NOITE', day: 'Quinta', label: 'Noite', detail: '18h - 20h' },
  { code: 'SEX-TARDE', day: 'Sexta', label: 'Tarde', detail: '14h30 - 16h30' }
];

const UFS = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

const LABELS = {
  q1: { ANX: 'Ansiedade cotidiana', REL: 'Relações humanas', DIF: 'Momentos difíceis', AUT: 'Autoconhecimento' },
  q2: { SIM: 'Sim', NAO: 'Não' },
  q3a: { EVO: 'Evolução contínua', NEU: 'Experiência neutra', ADP: 'Não me adaptei na época' },
  q3b: { OLH: 'Olhar para mim', INC: 'Incentivo de terceiros', REC: 'Recomendação profissional' },
  q4: { ONL: 'Online por videochamada', PRE: 'Presencial no consultório' },
  relation: { mae: 'Mãe', pai: 'Pai', tutor: 'Tutor', outro: 'Outro' }
};

const state = {
  stage: 'anamnese',
  questionId: 'q1',
  history: ['q1'],
  responses: { q1: null, q2: null, q3: null, q3Branch: null, q4: null },
  form: {
    fullName: '',
    birthDate: '',
    phone: '',
    email: '',
    stateSelect: '',
    city: '',
    therapyExperience: '',
    emergencyContact: '',
    emergencyPhone: '',
    isMinor: '',
    guardianName: '',
    guardianRelation: '',
    guardianPhone: '',
    consent: false
  },
  schedule: { selectedSlot: '' },
  protocol: '',
  whatsappUrl: WHATSAPP_BASE
};

let isTransitioning = false;

const questionContainer = document.getElementById('question-container');
const cadastroStage = document.getElementById('cadastro-stage');
const agendaStage = document.getElementById('agenda-stage');
const finalStage = document.getElementById('final-stage');
const protocolOutput = document.getElementById('protocol-output');
const whatsappLink = document.getElementById('whatsappLink');
const floatingWhatsapp = document.getElementById('floatingWhatsapp');
const decoderInput = document.getElementById('decoderInput');
const decoderOutput = document.getElementById('decoderOutput');
const decoderVault = document.getElementById('decoderVault');
const closeDecoder = document.getElementById('closeDecoder');
const footerCrp = document.getElementById('footerCrp');
const decoderPin = document.getElementById('decoderPin');
const unlockDecoder = document.getElementById('unlockDecoder');
const decoderGateStatus = document.getElementById('decoderGateStatus');
const guardianFields = document.getElementById('guardian-fields');
const scheduleGrid = document.getElementById('schedule-grid');
const cadastroForm = document.getElementById('cadastro-form');

const decoderState = {
  unlocked: false,
  attempts: 0,
  cooldownUntil: 0,
  triggerCount: 0,
  triggerStartedAt: 0,
  relockTimeoutId: null,
  clearOutputTimeoutId: null
};

const formRefs = {
  fullName: document.getElementById('fullName'),
  birthDate: document.getElementById('birthDate'),
  phone: document.getElementById('phone'),
  email: document.getElementById('email'),
  stateSelect: document.getElementById('stateSelect'),
  city: document.getElementById('city'),
  emergencyContact: document.getElementById('emergencyContact'),
  emergencyPhone: document.getElementById('emergencyPhone'),
  guardianName: document.getElementById('guardianName'),
  guardianRelation: document.getElementById('guardianRelation'),
  guardianPhone: document.getElementById('guardianPhone'),
  lgpdConsent: document.getElementById('lgpdConsent')
};

function normalizeText(value) {
  return String(value || '').trim();
}

function calculateAge(dateValue) {
  if (!dateValue) return NaN;
  const birth = new Date(`${dateValue}T00:00:00`);
  if (Number.isNaN(birth.getTime())) return NaN;
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) age -= 1;
  return age;
}

function saveState() {
  const payload = {
    stage: state.stage,
    questionId: state.questionId,
    history: state.history,
    responses: state.responses,
    form: state.form,
    schedule: state.schedule,
    protocol: '',
    whatsappUrl: WHATSAPP_BASE
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  try {
    const saved = JSON.parse(raw);
    state.stage = saved.stage || state.stage;
    state.questionId = saved.questionId || state.questionId;
    state.history = Array.isArray(saved.history) && saved.history.length ? saved.history : state.history;
    state.responses = { ...state.responses, ...(saved.responses || {}) };
    state.form = { ...state.form, ...(saved.form || {}) };
    if (state.form.lgpdConsent === true && state.form.consent !== true) {
      state.form.consent = true;
    }
    state.schedule = { ...state.schedule, ...(saved.schedule || {}) };
    state.protocol = '';
    state.whatsappUrl = WHATSAPP_BASE;
  } catch (error) {
    console.warn('Falha ao carregar estado salvo.', error);
  }
}

function clearState() {
  localStorage.removeItem(STORAGE_KEY);
}

function populateStates() {
  if (!formRefs.stateSelect || formRefs.stateSelect.options.length > 1) return;
  UFS.forEach((uf) => {
    const option = document.createElement('option');
    option.value = uf;
    option.textContent = uf;
    formRefs.stateSelect.appendChild(option);
  });
}

function setActiveProgress(stageName) {
  document.querySelectorAll('.progress-pill').forEach((pill) => {
    pill.classList.toggle('is-active', pill.dataset.progress === stageName);
  });
}

function revealStage(stageName) {
  cadastroStage.classList.add('is-hidden');
  agendaStage.classList.add('is-hidden');
  finalStage.classList.add('is-hidden');

  if (stageName === 'cadastro') {
    cadastroStage.classList.remove('is-hidden');
    setActiveProgress('cadastro');
    cadastroStage.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  if (stageName === 'agenda') {
    agendaStage.classList.remove('is-hidden');
    setActiveProgress('agenda');
    agendaStage.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  if (stageName === 'final') {
    finalStage.classList.remove('is-hidden');
    setActiveProgress('agenda');
    finalStage.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  state.stage = stageName;
  saveState();
}

function renderQuestion(questionId) {
  const question = QUESTIONS[questionId];
  if (!question) return;

  const currentValue = questionId === 'q3a' || questionId === 'q3b' ? state.responses.q3 : state.responses[questionId];
  const backMarkup = state.history.length > 1 ? '<button type="button" class="ghost-button" id="backQuestion">Voltar</button>' : '';

  questionContainer.innerHTML = `
    <article class="question-card fade-in-slide-up" data-question-card>
      <div class="question-head">
        <p class="question-kicker">${question.kicker}</p>
        <h3 class="question-title">${question.title}</h3>
        <p class="question-subtitle">${question.subtitle}</p>
      </div>
      <div class="option-stack" role="group" aria-label="${question.title}">
        ${question.options.map((option) => `
          <button type="button" class="option-button ${currentValue === option.value ? 'is-selected' : ''}" data-question="${questionId}" data-value="${option.value}" data-next="${option.next || question.next}" aria-pressed="${currentValue === option.value}">
            <span class="option-label"><span class="option-badge">${option.badge}</span>${option.label}</span>
            <span aria-hidden="true">›</span>
          </button>
        `).join('')}
      </div>
      <div class="question-actions">${backMarkup}</div>
    </article>
  `;

  questionContainer.querySelectorAll('.option-button').forEach((button) => {
    button.addEventListener('click', handleOptionSelect);
  });

  const backButton = document.getElementById('backQuestion');
  if (backButton) backButton.addEventListener('click', goBackQuestion);
}

function handleOptionSelect(event) {
  if (isTransitioning) return;

  const button = event.currentTarget;
  const questionId = button.dataset.question;
  const value = button.dataset.value;
  const next = button.dataset.next;
  const card = button.closest('[data-question-card]');

  isTransitioning = true;
  card.classList.add('fade-out');
  card.querySelectorAll('button').forEach((control) => {
    control.disabled = true;
  });

  setTimeout(() => {
    if (questionId === 'q3a' || questionId === 'q3b') {
      state.responses.q3 = value;
      state.responses.q3Branch = questionId;
    } else {
      state.responses[questionId] = value;
    }

    if (questionId === 'q2') {
      state.responses.q3 = null;
      state.responses.q3Branch = next;
      state.responses.q4 = null;
    }

    if (questionId === 'q4') {
      revealStage('cadastro');
      saveState();
      isTransitioning = false;
      return;
    }

    state.questionId = next;
    state.history.push(next);
    saveState();
    renderQuestion(next);
    isTransitioning = false;
  }, 300);
}

function goBackQuestion() {
  if (isTransitioning || state.history.length <= 1) return;

  state.history.pop();
  const previous = state.history[state.history.length - 1] || 'q1';
  state.questionId = previous;

  if (previous === 'q1') {
    state.responses.q2 = null;
    state.responses.q3 = null;
    state.responses.q3Branch = null;
    state.responses.q4 = null;
  }

  if (previous === 'q2') {
    state.responses.q3 = null;
    state.responses.q3Branch = null;
    state.responses.q4 = null;
  }

  if (previous === 'q3a' || previous === 'q3b') state.responses.q4 = null;

  saveState();
  renderQuestion(previous);
}

function toggleGuardianFields() {
  const isMinor = state.form.isMinor === 'sim' || calculateAge(state.form.birthDate) < 18;
  guardianFields.classList.toggle('is-hidden', !isMinor);
  formRefs.guardianName.required = isMinor;
  formRefs.guardianRelation.required = isMinor;
  formRefs.guardianPhone.required = isMinor;
}

function clearGuardianData() {
  state.form.guardianName = '';
  state.form.guardianRelation = '';
  state.form.guardianPhone = '';

  formRefs.guardianName.value = '';
  formRefs.guardianRelation.value = '';
  formRefs.guardianPhone.value = '';
}

function maskPhone(value) {
  const digits = String(value || '').replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function populateFormFromState() {
  Object.entries(formRefs).forEach(([key, element]) => {
    if (element.type === 'checkbox') {
      element.checked = Boolean(state.form.consent);
    } else {
      element.value = state.form[key] || '';
    }
  });

  const therapy = document.querySelector(`input[name="therapyExperience"][value="${state.form.therapyExperience}"]`);
  if (therapy) therapy.checked = true;
  const minor = document.querySelector(`input[name="isMinor"][value="${state.form.isMinor}"]`);
  if (minor) minor.checked = true;
  toggleGuardianFields();
}

function wireFormEvents() {
  Object.entries(formRefs).forEach(([key, element]) => {
    const eventName = element.type === 'checkbox' ? 'change' : 'input';
    element.addEventListener(eventName, () => {
      if (key === 'lgpdConsent') {
        state.form.consent = element.checked;
      } else {
        state.form[key] = element.type === 'checkbox' ? element.checked : element.value;
      }
      if (key === 'birthDate') toggleGuardianFields();
      saveState();
    });
  });

  document.querySelectorAll('input[name="therapyExperience"]').forEach((input) => {
    input.addEventListener('change', () => {
      state.form.therapyExperience = input.value;
      saveState();
    });
  });

  document.querySelectorAll('input[name="isMinor"]').forEach((input) => {
    input.addEventListener('change', () => {
      state.form.isMinor = input.value;
      if (input.value === 'nao') {
        clearGuardianData();
      }
      toggleGuardianFields();
      saveState();
    });
  });

  [formRefs.phone, formRefs.emergencyPhone, formRefs.guardianPhone].forEach((input) => {
    input.addEventListener('input', () => {
      input.value = maskPhone(input.value);
      state.form[input.id] = input.value;
      saveState();
    });
  });
}

function validateCadastro() {
  const missing = [];

  ['fullName', 'birthDate', 'phone', 'stateSelect', 'city', 'emergencyContact', 'emergencyPhone'].forEach((key) => {
    if (!normalizeText(state.form[key])) missing.push(key);
  });

  if (!state.form.therapyExperience) missing.push('therapyExperience');
  if (!state.form.isMinor) missing.push('isMinor');
  if (!state.form.consent) missing.push('lgpdConsent');

  const isMinor = state.form.isMinor === 'sim' || calculateAge(state.form.birthDate) < 18;
  if (isMinor) {
    ['guardianName', 'guardianRelation', 'guardianPhone'].forEach((key) => {
      if (!normalizeText(state.form[key])) missing.push(key);
    });
  }

  return missing;
}

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
  const padded = token.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(token.length / 4) * 4, '=');
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  const keyBytes = new TextEncoder().encode(`${OBFUSCATION_KEY}:${seed}`);
  const restored = bytes.map((byte, index) => byte ^ keyBytes[index % keyBytes.length]);
  return new TextDecoder().decode(restored);
}

function calculateChecksum(content) {
  let hash = 0;
  for (let index = 0; index < content.length; index += 1) {
    hash = (hash + content.charCodeAt(index) * (index + 1)) % 997;
  }
  return String(hash).padStart(3, '0');
}

function buildProtocol() {
  const branch = state.responses.q2 === 'SIM' ? 'A' : 'B';
  const isMinor = state.form.isMinor === 'sim' || calculateAge(state.form.birthDate) < 18;
  const body = [
    PROTOCOL_VERSION,
    `Q1=${state.responses.q1 || ''}`,
    `Q2=${state.responses.q2 || ''}`,
    `BR=${branch}`,
    `Q3=${state.responses.q3 || ''}`,
    `Q4=${state.responses.q4 || ''}`,
    `NM=${obfuscateText(state.form.fullName, 'nm')}`,
    `DN=${obfuscateText(state.form.birthDate, 'dn')}`,
    `TL=${obfuscateText(state.form.phone, 'tl')}`,
    `EM=${obfuscateText(state.form.email || '-', 'em')}`,
    `UF=${state.form.stateSelect || ''}`,
    `CI=${obfuscateText(state.form.city, 'ci')}`,
    `EX=${state.form.therapyExperience === 'sim' ? '1' : '0'}`,
    `EC=${obfuscateText(state.form.emergencyContact, 'ec')}`,
    `EP=${obfuscateText(state.form.emergencyPhone, 'ep')}`,
    `MI=${isMinor ? '1' : '0'}`,
    `GN=${obfuscateText(state.form.guardianName || '-', 'gn')}`,
    `GR=${state.form.guardianRelation || ''}`,
    `GP=${obfuscateText(state.form.guardianPhone || '-', 'gp')}`,
    `LG=${state.form.consent ? '1' : '0'}`,
    `AG=${state.schedule.selectedSlot || ''}`
  ].join('|');

  return `${body}|CK=${calculateChecksum(body)}`;
}

function parseProtocol(protocol) {
  if (!protocol || !protocol.startsWith(PROTOCOL_VERSION)) return null;
  const parsed = {};
  protocol.split('|').forEach((part) => {
    const [key, ...rest] = part.split('=');
    if (rest.length === 0) parsed.VERSION = key;
    else parsed[key] = rest.join('=');
  });
  return parsed;
}

function decodeProtocol(protocol) {
  const parsed = parseProtocol(protocol);
  if (!parsed) return 'Protocolo inválido ou vazio.';

  const bodyWithoutChecksum = protocol.replace(/\|CK=\d{3}$/, '');
  const integrity = calculateChecksum(bodyWithoutChecksum) === (parsed.CK || '') ? 'Checksum conferido' : 'Checksum divergente';
  const branchKey = parsed.BR === 'A' ? 'q3a' : 'q3b';
  const slot = SLOTS.find((item) => item.code === parsed.AG);

  return [
    `Versão: ${parsed.VERSION}`,
    `Anamnese: ${LABELS.q1[parsed.Q1] || '-'} | ${LABELS.q2[parsed.Q2] || '-'} | ${(LABELS[branchKey][parsed.Q3] || '-')} | ${LABELS.q4[parsed.Q4] || '-'}`,
    `Cadastro: ${revealText(parsed.NM, 'nm') || '-'} | ${revealText(parsed.DN, 'dn') || '-'} | ${revealText(parsed.TL, 'tl') || '-'} | ${revealText(parsed.EM, 'em') || '-'}`,
    `Localização: ${parsed.UF || '-'} / ${revealText(parsed.CI, 'ci') || '-'}`,
    `Emergência: ${revealText(parsed.EC, 'ec') || '-'} | ${revealText(parsed.EP, 'ep') || '-'}`,
    `Menor de idade: ${parsed.MI === '1' ? 'Sim' : 'Não'} | Responsável: ${revealText(parsed.GN, 'gn') || '-'} | Parentesco: ${LABELS.relation[parsed.GR] || parsed.GR || '-'} | Telefone: ${revealText(parsed.GP, 'gp') || '-'}`,
    `Agenda: ${slot ? `${slot.day} ${slot.label} (${slot.detail})` : '-'}`,
    `LGPD: ${parsed.LG === '1' ? 'Aceita' : 'Não informada'}`,
    `Integridade: ${integrity}`
  ].join('\n');
}

async function sha256Hex(value) {
  const encoded = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', encoded);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
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
  if (decoderInput) decoderInput.value = '';
  if (decoderOutput) decoderOutput.textContent = '';
  if (decoderPin) decoderPin.value = '';
  if (decoderGateStatus) decoderGateStatus.textContent = '';
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
  decoderState.relockTimeoutId = setTimeout(() => {
    lockDecoder();
  }, DECODER_RELOCK_MS);
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
    const secondsLeft = Math.ceil((decoderState.cooldownUntil - now) / 1000);
    if (decoderGateStatus) decoderGateStatus.textContent = `Acesso bloqueado. Aguarde ${secondsLeft}s.`;
    return;
  }

  const cleanPin = normalizeText(decoderPin ? decoderPin.value : '');
  if (!cleanPin) {
    if (decoderGateStatus) decoderGateStatus.textContent = 'Informe o código interno.';
    return;
  }

  if (!DECODER_PIN_REGEX.test(cleanPin)) {
    if (decoderGateStatus) decoderGateStatus.textContent = 'Formato inválido. Use 6 dígitos numéricos.';
    return;
  }

  const pinHash = await sha256Hex(cleanPin);
  if (pinHash === DECODER_PIN_HASH) {
    decoderState.unlocked = true;
    decoderState.attempts = 0;
    decoderState.cooldownUntil = 0;
    if (decoderVault) decoderVault.classList.add('is-unlocked');
    if (decoderGateStatus) decoderGateStatus.textContent = '';
    if (decoderPin) decoderPin.value = '';
    scheduleDecoderRelock();
    return;
  }

  decoderState.attempts += 1;
  if (decoderState.attempts >= DECODER_MAX_ATTEMPTS) {
    decoderState.cooldownUntil = Date.now() + DECODER_COOLDOWN_MS;
    decoderState.attempts = 0;
    if (decoderGateStatus) decoderGateStatus.textContent = 'Acesso bloqueado por 2 minutos.';
    return;
  }

  const attemptsLeft = DECODER_MAX_ATTEMPTS - decoderState.attempts;
  if (decoderGateStatus) decoderGateStatus.textContent = `Código inválido. Restam ${attemptsLeft} tentativa(s).`;
}

function handleDiscreetTrigger() {
  const now = Date.now();
  if (!decoderState.triggerStartedAt || (now - decoderState.triggerStartedAt) > DECODER_TRIGGER_WINDOW_MS) {
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
    if (decoderGateStatus) decoderGateStatus.textContent = 'Informe o código interno.';
    if (decoderPin) decoderPin.focus();
  }
}

function syncWhatsappLink() {
  const message = encodeURIComponent(`Olá, segue meu protocolo discreto de atendimento.\n${state.protocol}`);
  const url = `https://api.whatsapp.com/send/?phone=${WHATSAPP_PHONE}&text=${message}&type=phone_number&app_absent=0&utm_source=ig`;
  state.whatsappUrl = url;
  whatsappLink.href = url;
  floatingWhatsapp.href = url;
  saveState();
}

function renderSchedule() {
  scheduleGrid.innerHTML = SLOTS.map((slot) => `
    <button type="button" class="schedule-slot ${state.schedule.selectedSlot === slot.code ? 'is-selected' : ''}" data-slot="${slot.code}" role="option" aria-selected="${state.schedule.selectedSlot === slot.code}">
      <strong>${slot.day}</strong>
      <span>${slot.label}</span>
      <span>${slot.detail}</span>
    </button>
  `).join('');

  scheduleGrid.querySelectorAll('.schedule-slot').forEach((button) => {
    button.addEventListener('click', () => {
      state.schedule.selectedSlot = button.dataset.slot;
      scheduleGrid.querySelectorAll('.schedule-slot').forEach((item) => {
        const selected = item.dataset.slot === state.schedule.selectedSlot;
        item.classList.toggle('is-selected', selected);
        item.setAttribute('aria-selected', String(selected));
      });
      saveState();
    });
  });
}

function showFinalStage() {
  protocolOutput.textContent = state.protocol;
  syncWhatsappLink();
  revealStage('final');
  floatingWhatsapp.classList.add('is-visible');
}

function submitCadastro(event) {
  event.preventDefault();
  const missing = validateCadastro();
  if (missing.length) {
    alert('Revise os campos obrigatórios antes de continuar.');
    return;
  }
  revealStage('agenda');
  renderSchedule();
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
    const button = document.getElementById('copyProtocol');
    const previousLabel = button.textContent;
    button.textContent = 'Protocolo copiado';
    setTimeout(() => {
      button.textContent = previousLabel;
    }, 1400);
  }).catch(() => {
    alert('Não foi possível copiar automaticamente o protocolo.');
  });
}

function initButtons() {
  cadastroForm.addEventListener('submit', submitCadastro);
  document.getElementById('generateProtocol').addEventListener('click', generateProtocol);
  document.getElementById('copyProtocol').addEventListener('click', copyProtocol);
  document.getElementById('openOfficialCalendar').addEventListener('click', () => {
    window.open('https://calendar.app.google/4zcXaXysZadLhs5y6', '_blank', 'noopener,noreferrer');
  });
  document.getElementById('decodeButton').addEventListener('click', () => {
    if (!decoderState.unlocked) return;
    const protocol = normalizeText(decoderInput.value);
    decoderOutput.textContent = decodeProtocol(protocol);
    touchDecoderActivity();
    scheduleDecoderOutputClear();
  });
  document.getElementById('fillCurrentProtocol').addEventListener('click', () => {
    if (!decoderState.unlocked) return;
    decoderInput.value = state.protocol || '';
    touchDecoderActivity();
  });
  if (closeDecoder) {
    closeDecoder.addEventListener('click', () => {
      lockDecoder();
    });
  }
  if (unlockDecoder) {
    unlockDecoder.addEventListener('click', () => {
      requestDecoderUnlock();
    });
  }
  if (decoderPin) {
    decoderPin.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        requestDecoderUnlock();
      }
    });
  }
  if (decoderVault) {
    decoderVault.addEventListener('click', touchDecoderActivity);
    decoderVault.addEventListener('keydown', touchDecoderActivity);
    decoderVault.addEventListener('input', touchDecoderActivity);
  }
  if (footerCrp) {
    footerCrp.addEventListener('click', handleDiscreetTrigger);
  }
  whatsappLink.addEventListener('click', clearState);
  floatingWhatsapp.addEventListener('click', clearState);
}

function init() {
  populateStates();
  loadState();
  if (state.stage === 'final') state.stage = 'anamnese';
  populateFormFromState();
  wireFormEvents();
  initButtons();
  renderSchedule();

  if (state.stage === 'cadastro') revealStage('cadastro');
  else if (state.stage === 'agenda') revealStage('agenda');
  else setActiveProgress('anamnese');

  renderQuestion(state.questionId || 'q1');
}

document.addEventListener('DOMContentLoaded', init);

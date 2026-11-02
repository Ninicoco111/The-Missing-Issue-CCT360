/* The Missing Issue — student-friendly edition */
const photos=[
 'assets/1950s.jpg',
 'assets/1960s.jpg',
 'assets/1970s.jpg',
 'assets/1980s.jpg',
 'assets/1990s.png'
];
const eras=[
 {year:'1950s',sub:'THE BEGINNING',title:'The first <em>signature.</em>',desc:'A decade of sculpted silhouettes and impeccable polish. In the margin of a forgotten sketch, somebody left two initials.',look:'Nipped waists, full skirts, gloves, pearls.',beauty:'Defined red lips, soft curls and precise eyeliner.',fact:'The postwar New Look helped popularize full skirts and fitted waists.',quote:'THE NEW SILHOUETTE / The waist becomes architecture; the skirt becomes a statement.',caption:'1950s PERIOD FASHION REFERENCE · SWEDISH MUSEUM ARCHIVE',name:'The sketch',clue:'The original drawing is marked “E.V.”, though the published credit lists only the fashion editor.',action:'TURN OVER THE SKETCH',prompt:'A handwritten note on the reverse: “E.V. — original silhouette, 1954.”'},
 {year:'1960s',sub:'THE REVOLUTION',title:'A letter <em>unanswered.</em>',desc:'Fashion moves faster. Hemlines rise; conventions fall. An editor’s correspondence hints at a name deliberately left out.',look:'Mod minidresses, geometric patterns and bold colour.',beauty:'Graphic eyeliner, pale lips and dramatic lashes.',fact:'Youth-driven Mod fashion helped popularize shorter hemlines and graphic design.',quote:'YOUTHQUAKE / Fashion leaves the salon and enters the street.',caption:'CONTEMPORARY EDITORIAL MOOD IMAGE · NOT A PERIOD PHOTOGRAPH',name:'The letter',clue:'A letter from Margaret asks that Evelyn Vale’s name be omitted from the next cover credits.',action:'OPEN THE SEALED LETTER',prompt:'“Margaret, why must the work be published without her name? — Editorial Office, 1967”'},
 {year:'1970s',sub:'THE FREEDOM',title:'The woman <em>in the frame.</em>',desc:'Behind the candid images and freer silhouettes, one contact sheet has a handwritten identification.',look:'Flared trousers, flowing fabrics and bohemian layers.',beauty:'Earth tones, natural skin and loose hair.',fact:'Fashion embraced diverse influences, from bohemian dressing to disco glamour.',quote:'A NEW FREEDOM / Personal style is no longer dictated by a single silhouette.',caption:'1972 PERIOD FASHION REFERENCE · WIKIMEDIA COMMONS',name:'The photograph',clue:'The back of the contact sheet identifies Evelyn Vale as the designer, not the model.',action:'INSPECT THE CONTACT SHEET',prompt:'CONTACT SHEET 03: “Evelyn Vale — atelier, Paris. Designer. Do not crop attribution.”'},
 {year:'1980s',sub:'THE SPOTLIGHT',title:'A voice <em>on tape.</em>',desc:'Power dressing dominates the pages. An interview transcript preserves a statement the printed magazine never included.',look:'Structured shoulders, sharp tailoring and high-impact colour.',beauty:'Bright eyeshadow, strong blush and statement lips.',fact:'Power suits and exaggerated shoulders became visual symbols of the decade.',quote:'DRESSING FOR POWER / Broad shoulders make a new kind of statement.',caption:'CONTEMPORARY EDITORIAL MOOD IMAGE · NOT A PERIOD PHOTOGRAPH',name:'The interview',clue:'A former editor says Evelyn shaped the magazine’s visual identity for decades but remained uncredited.',action:'PLAY THE ARCHIVE TRANSCRIPT',prompt:'[TAPE 08 / 1986] “Everyone knew the covers were hers. We just never printed the name.”'},
 {year:'1990s',sub:'THE LAST PROOF',title:'The cover <em>that vanished.</em>',desc:'A quieter aesthetic. A louder secret. The final proof shows the anniversary issue was completed before it disappeared.',look:'Slip dresses, denim, minimal tailoring and grunge.',beauty:'Soft brown lips, understated eyes and natural textures.',fact:'Minimalism and grunge challenged the excesses of the previous decade.',quote:'LESS IS MORE / An era begins to question the spectacle of the eighties.',caption:'CONTEMPORARY EDITORIAL MOOD IMAGE · NOT A PERIOD PHOTOGRAPH',name:'The proof',clue:'The anniversary cover proof reads: “EVELYN VALE — THE WOMAN BEHIND FIVE DECADES.”',action:'LIFT THE REDACTION',prompt:'ANNIVERSARY ISSUE / APPROVED PROOF: “EVELYN VALE — THE WOMAN BEHIND FIVE DECADES.”'}
];

// CCT360 student version: variables, arrays, functions, conditionals, DOM and events.
// No saved progress: refreshing the page begins a new investigation.
const $ = (selector) => document.querySelector(selector);
let found = [];
let current = 0;

function showPage(page) {
  const pages = ['prologue', 'intro', 'archive', 'era'];
  pages.forEach(function (name) {
    $('#' + name).classList.toggle('hidden', name !== page);
  });
  window.scrollTo(0, 0);
}

function setPhoto(element, file) {
  element.style.backgroundImage = 'url("' + file + '")';
}

function showArchive() {
  renderArchive();
  showPage('archive');
}

function renderArchive() {
  $('#count').textContent = String(found.length).padStart(2, '0');
  $('#progress').textContent = '0' + found.length + ' / 05';
  const stack = $('#file-stack');
  stack.innerHTML = '';

  eras.forEach(function (era, index) {
    const button = document.createElement('button');
    button.className = 'file';
    const status = found.includes(index) ? '✓ RECOVERED' : '↗ OPEN';
    button.innerHTML = '<span class="index">0' + (index + 1) + '</span>' +
      '<span class="year">' + era.year + '</span>' +
      '<span class="file-label">' + era.sub + '</span>' +
      '<span class="file-status">' + status + '</span>';
    button.onclick = function () { openEra(index); };
    stack.appendChild(button);
  });
  renderJournal();
}

function openEra(index) {
  current = (index + eras.length) % eras.length;
  const era = eras[current];
  $('#era-number').textContent = 'PRIVATE RECORD / 0' + (current + 1);
  $('#era-kicker').textContent = era.year + ' · ' + era.sub;
  $('#era-title').innerHTML = era.title;
  $('#era-desc').textContent = era.desc;
  $('#look').textContent = era.look;
  $('#beauty').textContent = era.beauty;
  $('#fact').textContent = era.fact;
  $('#photo-caption').textContent = era.caption;
  $('#issue-no').textContent = 'ISSUE Nº 0' + (current + 1);
  $('#editorial-quote').textContent = era.quote;
  $('#era-collected').textContent = found.includes(current) ? '✓ EVIDENCE RECOVERED' : '○ EVIDENCE NOT YET RECOVERED';
  setPhoto($('#era-img'), photos[current]);
  renderPuzzle();
  showPage('era');
}

function renderPuzzle() {
  const puzzle = $('#artifact-body');
  const names = ['THE ATELIER SKETCH', 'THE EDITOR’S LETTER', 'THE CONTACT SHEET', 'THE UNAIRED INTERVIEW', 'THE CENSORED PROOF'];
  const instructions = [
    'The published credit reads AUREL STUDIO. Turn over the original sketch.',
    'A private envelope addressed to Margaret Laurent has never been opened.',
    'Three photographs survived. Find the one with a handwritten note.',
    'Listen to the archive transcript that was never published.',
    'The approved anniversary cover is hidden under a black strip.'
  ];
  puzzle.innerHTML = '<div class="artifact-meta">ARCHIVE OBJECT / 0' + (current + 1) +
    '</div><h3>' + names[current] + '</h3><p>' + instructions[current] +
    '</p><div id="puzzle"></div>';

  if (found.includes(current)) {
    showEvidence();
    return;
  }

  const area = $('#puzzle');
  if (current === 0) {
    area.innerHTML = '<div class="sketch-card"><span>MAISON AUREL / ATELIER 1954</span><div class="sketch-lines">✧<br>1954</div><small>STUDY Nº 17 · PENCIL ON PAPER</small></div><button id="puzzle-action">TURN THE DRAWING OVER ↻</button>';
  } else if (current === 1) {
    area.innerHTML = '<div class="sealed-letter"><span>PERSONAL / 1967</span><strong>To: M. Laurent</strong><small>PRIVATE CORRESPONDENCE</small><div class="wax">A</div></div><button id="puzzle-action">BREAK THE SEAL ↗</button>';
  } else if (current === 2) {
    area.innerHTML = '<div class="contact-grid" id="contact-grid"></div><p id="puzzle-feedback">Which frame has a handwritten note?</p>';
    for (let i = 0; i < 3; i++) {
      const button = document.createElement('button');
      button.className = 'contact-frame';
      button.innerHTML = '<span>FRAME 0' + (i + 1) + '</span><div class="contact-photo"></div><small>INSPECT REVERSE ↗</small>';
      button.querySelector('.contact-photo').style.backgroundImage = 'url("' + photos[2] + '")';
      button.querySelector('.contact-photo').style.backgroundPosition = (20 + i * 30) + '% center';
      button.onclick = function () {
        if (i === 1) collectClue();
        else $('#puzzle-feedback').textContent = 'Only a production number. Try another frame.';
      };
      $('#contact-grid').appendChild(button);
    }
  } else if (current === 3) {
    area.innerHTML = '<div class="tape"><span>◉ AUREL AUDIO ARCHIVE</span><div class="tape-reels">◉ ━━━━━ ◉</div><small>INTERVIEW / 1986 / UNAIRED</small></div><button id="puzzle-action">PLAY TRANSCRIPT ▷</button>';
  } else {
    area.innerHTML = '<div class="redacted-proof"><span>ANNIVERSARY COVER / PRINT PROOF</span><div class="redacted-text">THE WOMAN BEHIND FIVE DECADES</div><div class="redaction">████████████████████</div><small>EDITORIAL HOLD / 1999</small></div><button id="puzzle-action">REMOVE THE REDACTION ↗</button>';
  }

  if (current !== 2) {
    $('#puzzle-action').onclick = collectClue;
  }
}

function collectClue() {
  if (!found.includes(current)) found.push(current);
  $('#era-collected').textContent = '✓ EVIDENCE RECOVERED';
  showEvidence();
  renderArchive();
}

function showEvidence() {
  const era = eras[current];
  $('#puzzle').innerHTML = '<div class="discovered"><span class="discovered-stamp">EVIDENCE / RECOVERED</span>' +
    '<p class="typewritten">' + era.prompt + '</p><p>' + era.clue +
    '</p><button id="open-journal">FILE THIS EVIDENCE ↗</button></div>';
  $('#open-journal').onclick = openJournal;
}

function renderJournal() {
  const list = $('#journal-list');
  list.innerHTML = '';
  eras.forEach(function (era, index) {
    const collected = found.includes(index);
    const item = document.createElement('div');
    item.className = collected ? 'journal-item' : 'journal-item locked';
    item.innerHTML = '<div class="jnum">0' + (index + 1) + '</div><div><strong>' +
      (collected ? era.name : 'Sealed record') + '</strong><p>' +
      (collected ? era.clue : 'Visit the ' + era.year + ' collection to recover this document.') +
      '</p></div>';
    list.appendChild(item);
  });
}

function openJournal() {
  renderJournal();
  $('#drawer').classList.add('open');
  $('#shade').classList.remove('hidden');
  $('#drawer').setAttribute('aria-hidden', 'false');
}
function closeJournal() {
  $('#drawer').classList.remove('open');
  $('#shade').classList.add('hidden');
  $('#drawer').setAttribute('aria-hidden', 'true');
}
function showModal(content) {
  $('#modal-content').innerHTML = content;
  $('#overlay').classList.remove('hidden');
}
function closeModal() { $('#overlay').classList.add('hidden'); }

function checkFinalCover() {
  if (found.length < 5) {
    showModal('<span class="overline">EXHIBIT 06 / RESTRICTED</span><h2>The missing <em>cover.</em></h2><p>Find all five records first. You still need ' + (5 - found.length) + '.</p><button class="primary" id="modal-go">RETURN TO THE FILES ↗</button>');
    $('#modal-go').onclick = closeModal;
    return;
  }
  showModal('<span class="overline">EXHIBIT 06 / IDENTITY VERIFICATION</span><h2>Who was <em>erased?</em></h2><p>Whose work appeared in every decade?</p><div class="choices"><button data-answer="wrong">Margaret Laurent — Editor-in-Chief</button><button data-answer="correct">Evelyn Vale — Fashion Designer</button><button data-answer="wrong">Clara Bennett — Archivist</button></div><p id="answer-feedback"></p>');
  document.querySelectorAll('[data-answer]').forEach(function (button) {
    button.onclick = function () {
      if (button.dataset.answer === 'correct') showFinale();
      else $('#answer-feedback').textContent = 'Try again. Look at the credits across all five decades.';
    };
  });
}

function showFinale() {
  closeModal();
  $('#reveal-stage').classList.remove('hidden');
  $('#reveal-stage-inner').innerHTML = `<div class="reveal-intro"><span>ARCHIVE Nº 006 / CLASSIFIED</span><h2>THE COVER WAS<br><em>NEVER LOST.</em></h2><p>It was removed.</p></div><div class="cinematic-cover"><div class="cover-photograph" style="background-image:linear-gradient(180deg,transparent 10%,#0d0c0bc9 100%),url('${photos[0]}')"></div><div class="cover-type"><span>AUREL · SPECIAL EDITION / 2000</span><strong>EVELYN<br>VALE.</strong><small>THE WOMAN BEHIND FIVE DECADES</small></div><div class="cover-restored">ORIGINAL COVER / RESTORED</div></div><div class="reveal-letter"><span>FINAL NOTE · CLARA BENNETT</span><h3>Fashion remembers the looks.<br><em>Who remembers the hands?</em></h3><p>For fifty years, Evelyn Vale's ideas shaped these pages. Her signature disappeared behind the masthead, and her anniversary cover was withdrawn before it reached print. I hid five pieces of the record where a true fashion lover might find them: in the clothes, the photographs, and the margins.</p><p><strong>You have restored her name to the archive.</strong></p><button class="primary" id="end-return">RETURN TO THE EXHIBITION ↗</button></div>`;
  $('#end-return').onclick = function () {
    $('#reveal-stage').classList.add('hidden');
    showArchive();
  };
  $('#reveal-stage').scrollTop = 0;
}

// Small optional ambient melody: simple Web Audio oscillator, no external music file.
let audioContext;
let musicTimer;
let musicOn = false;
let note = 0;
const notes = [220, 261.63, 329.63, 293.66, 261.63, 196, 220, 174.61];
function playTone() {
  if (!musicOn || !audioContext) return;
  const oscillator = audioContext.createOscillator();
  const volume = audioContext.createGain();
  oscillator.type = 'sine';
  oscillator.frequency.value = notes[note % notes.length];
  note++;
  volume.gain.value = 0.012;
  oscillator.connect(volume);
  volume.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.65);
}
function startMusic() {
  if (musicOn) return;
  try {
    audioContext = audioContext || new (window.AudioContext || window.webkitAudioContext)();
    audioContext.resume();
    musicOn = true;
    $('#audio').textContent = '♫ SOUND ON';
    playTone();
    musicTimer = setInterval(playTone, 950);
  } catch (error) {
    $('#audio').textContent = '♫ AUDIO UNAVAILABLE';
  }
}
function stopMusic() {
  musicOn = false;
  clearInterval(musicTimer);
  $('#audio').textContent = '♫ SOUND OFF';
}

// Button events: each action has a simple function.
$('#prologue-next').onclick = function () { startMusic(); showPage('intro'); };
$('#enter').onclick = function () { startMusic(); showArchive(); };
$('#home').onclick = showArchive;
$('#back').onclick = showArchive;
$('#next').onclick = function () { openEra(current + 1); };
$('#journal').onclick = openJournal;
$('#era-journal').onclick = openJournal;
$('#close-drawer').onclick = closeJournal;
$('#shade').onclick = closeJournal;
$('#reveal-entry').onclick = checkFinalCover;
$('#close-modal').onclick = closeModal;
$('#overlay').onclick = function (event) {
  if (event.target === $('#overlay')) closeModal();
};
$('#audio').onclick = function () {
  if (musicOn) stopMusic();
  else startMusic();
};
$('#reset').onclick = function () {
  if (confirm('Reset the investigation and erase all evidence?')) {
    found = [];
    closeJournal();
    closeModal();
    $('#reveal-stage').classList.add('hidden');
    renderArchive();
    showPage('prologue');
  }
};

// First visit and every refresh always start from the beginning.
setPhoto($('#hero-photo'), 'assets/cover-background.jpg');
renderArchive();
showPage('prologue');

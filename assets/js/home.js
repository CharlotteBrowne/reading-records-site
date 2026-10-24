const STORAGE_KEY = 'personal-reading-log-v1';

const defaultBooks = [
  { id: 'book-1', title: 'The Floating World', author: 'Kumi Kato', date: '2014-01-12', rating: 4, notes: '认真、克制的语言，像一场安静的冬雨。' },
  { id: 'book-2', title: 'The Garden of Evening', author: 'Ari Bell', date: '2014-01-20', rating: 4.5, notes: '文笔温柔，细节极美。' },
  { id: 'book-3', title: 'A Quiet House', author: 'Lina Frost', date: '2014-02-05', rating: 3.5, notes: '一处安静的回家感。' },
  { id: 'book-4', title: 'The Glass Sea', author: 'J. M. Durr', date: '2014-02-18', rating: 4, notes: '观察与反思都很强。' },
  { id: 'book-5', title: 'Midnight Letters', author: 'Elaine Stone', date: '2014-03-09', rating: 5, notes: '近乎完美的情感节奏。' },
  { id: 'book-6', title: 'Paper Lanterns', author: 'M. Peterson', date: '2014-03-22', rating: 4, notes: '故事轻盈，却有很深的释怀。' },
  { id: 'book-7', title: 'Notes of Bloom', author: 'Sora Lin', date: '2014-04-06', rating: 3.5, notes: '恬静而有力量。' },
  { id: 'book-8', title: 'Forest at Dusk', author: 'Thomas Reed', date: '2014-04-25', rating: 4.5, notes: '非常适合在黄昏时阅读。' },
  { id: 'book-9', title: 'The Blue Hour', author: 'Emma Vale', date: '2014-05-12', rating: 4, notes: '结构细腻，像被光线分割过的记忆。' },
  { id: 'book-10', title: 'Map of Echoes', author: 'Nora Allen', date: '2014-05-27', rating: 4.5, notes: '想象力丰富。' },
  { id: 'book-11', title: 'An Open Window', author: 'Claire Wren', date: '2014-06-08', rating: 4, notes: '故乡感很强。' },
  { id: 'book-12', title: 'Morning River', author: 'Hana Morel', date: '2014-06-17', rating: 3.5, notes: '适合安静地把一整下午用掉。' },
  { id: 'book-13', title: 'Stone and Light', author: 'Iris Moss', date: '2014-07-02', rating: 4.5, notes: '像城镇里的旧街巷。' },
  { id: 'book-14', title: 'Wind Between Columns', author: 'Jun Park', date: '2014-07-21', rating: 4, notes: '文风克制而有张力。' },
  { id: 'book-15', title: 'Peach Orchard', author: 'K. Morgan', date: '2014-08-10', rating: 5, notes: '读完以后，想把书页重新封起来再看一遍。' },
  { id: 'book-16', title: 'Soft Architecture', author: 'Luca Er', date: '2014-08-23', rating: 4, notes: '寓言式叙述很动人。' },
  { id: 'book-17', title: 'Moss and Snow', author: 'Celia M.', date: '2014-09-07', rating: 4.5, notes: '雪景和人际关系写得很好。' },
  { id: 'book-18', title: 'Letters to the Sea', author: 'R. Chase', date: '2014-09-19', rating: 3.5, notes: '情绪真诚，结尾余韵很长。' },
  { id: 'book-19', title: 'A Small City', author: 'A. Karp', date: '2014-10-04', rating: 4, notes: '城市感非常强。' },
  { id: 'book-20', title: 'The Last Lantern', author: 'C. Hsu', date: '2014-10-28', rating: 4.5, notes: '书中人物很真实。' },
  { id: 'book-21', title: 'Night Market', author: 'Sara Bell', date: '2014-11-09', rating: 4, notes: '热闹中藏着一种悲伤。' },
  { id: 'book-22', title: 'The Winter House', author: 'S. Leung', date: '2014-11-25', rating: 4.5, notes: '有股能把人留住的力量。' },
  { id: 'book-23', title: 'One River', author: 'L. Watson', date: '2014-12-06', rating: 3.5, notes: '像旅行日志一样。' },
  { id: 'book-24', title: 'Horizon in March', author: 'N. Hart', date: '2014-12-14', rating: 4, notes: '结尾非常轻盈。' },
  { id: 'book-25', title: 'An Old Room', author: 'M. Duffy', date: '2015-01-11', rating: 4.5, notes: '多年以后仍觉得温暖。' }
];

function readBooks() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) && saved.length ? saved : defaultBooks;
  } catch (error) {
    return defaultBooks;
  }
}

function saveBooks(books) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

function getYears() {
  const books = readBooks();
  return Array.from(new Set(books.map(book => Number(new Date(book.date).getFullYear())))).sort((a, b) => b - a);
}

function buildCoverSvg(title, accentA, accentB) {
  const safeTitle = (title || 'Book').slice(0, 18).replace(/&/g, '&amp;');
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="220" height="300" viewBox="0 0 220 300">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${accentA}" />
          <stop offset="100%" stop-color="${accentB}" />
        </linearGradient>
      </defs>
      <rect width="220" height="300" rx="12" fill="#f5f1ea"/>
      <rect x="12" y="12" width="196" height="276" rx="8" fill="url(#g)"/>
      <circle cx="58" cy="58" r="32" fill="rgba(255,255,255,0.12)" />
      <rect x="30" y="120" width="160" height="2" fill="rgba(255,255,255,0.5)"/>
      <text x="110" y="150" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-size="24" font-family="Georgia, serif" font-weight="600">${safeTitle}</text>
      <text x="110" y="212" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-size="11" font-family="sans-serif" letter-spacing="4">READING</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function pickPalette(title) {
  const palette = [
    ['#d98e73', '#f3d9b5'],
    ['#5f7d94', '#dfe9f5'],
    ['#8f9d7d', '#cdd6b9'],
    ['#7a5a6d', '#dcc4d5'],
    ['#b47a54', '#f0cf8f'],
    ['#5b7c6f', '#dce9e1'],
    ['#3d5f83', '#bcdaf2'],
    ['#a48d66', '#f2e3b8'],
    ['#7d6f92', '#d8d1ed'],
    ['#8e5e5f', '#efc0b7']
  ];

  const index = Array.from(title).reduce((sum, char) => sum + char.charCodeAt(0), 0) % palette.length;
  return palette[index];
}

function formatDate(isoDate) {
  const date = new Date(isoDate + 'T00:00:00');
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function starMarkup(rating) {
  const filled = Math.round(rating);
  let markup = '';
  for (let index = 1; index <= 5; index += 1) {
    markup += `<span class="star ${index <= filled ? 'filled' : ''}">★</span>`;
  }
  return markup;
}

function monthName(number) {
  return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][number - 1];
}

function openModal(book = null) {
  const modal = document.getElementById('bookModal');
  const form = document.getElementById('bookForm');
  const modalTitle = document.getElementById('modalTitle');

  if (!modal || !form) return;

  form.dataset.mode = book ? 'edit' : 'create';
  form.dataset.bookId = book ? book.id : '';
  modalTitle.textContent = book ? '编辑书籍' : '新增书籍';

  form.title.value = book ? book.title : '';
  form.author.value = book ? book.author : '';
  form.date.value = book ? formatDate(book.date) : '';
  form.rating.value = book ? book.rating : 4;
  form.notes.value = book ? book.notes : '';

  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  const modal = document.getElementById('bookModal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
  document.getElementById('bookForm').reset();
}

function renderReadingApp() {
  const yearList = document.getElementById('yearList');
  const monthList = document.getElementById('monthList');
  const yearTitle = document.getElementById('yearTitle');
  const bookGrid = document.getElementById('bookGrid');
  const books = readBooks();
  const years = getYears();

  if (!years.length) {
    yearTitle.textContent = '暂无阅读记录';
    return;
  }

  const currentYear = Number(new URLSearchParams(window.location.search).get('year')) || years[0];
  let selectedYear = years.includes(currentYear) ? currentYear : years[0];

  const yearButtons = years
    .map(
      year => `
        <button class="year-button ${selectedYear === year ? 'active' : ''}" data-year="${year}" type="button">
          <span>${year}</span>
        </button>
      `
    )
    .join('');

  if (yearList) {
    yearList.innerHTML = yearButtons;
    yearList.querySelectorAll('.year-button').forEach(button => {
      button.addEventListener('click', () => {
        selectedYear = Number(button.dataset.year);
        renderReadingApp();
      });
    });
  }

  yearTitle.textContent = `${selectedYear} 阅读清单`;

  const monthButtons = Array.from({ length: 12 }, (_, index) => {
    const monthNumber = index + 1;
    const monthBooks = books.filter(book => new Date(book.date).getFullYear() === selectedYear && new Date(book.date).getMonth() === index);
    const hasBooks = monthBooks.length > 0;
    return `
      <button class="month-button ${hasBooks ? 'has-books' : ''}" data-month="${monthNumber}" type="button">
        <span>${monthName(monthNumber)}</span>
        <small>${selectedYear}</small>
      </button>
    `;
  }).join('');

  if (monthList) {
    monthList.innerHTML = monthButtons;
    monthList.querySelectorAll('.month-button').forEach(button => {
      button.addEventListener('click', () => {
        monthList.querySelectorAll('.month-button').forEach(el => el.classList.remove('active'));
        button.classList.add('active');
        renderBookGrid(selectedYear, Number(button.dataset.month), books);
      });
    });
  }

  const firstMonthWithBooks = Array.from({ length: 12 }, (_, index) => index + 1).find(month => {
    return books.some(book => new Date(book.date).getFullYear() === selectedYear && new Date(book.date).getMonth() === month - 1);
  }) || 1;

  const monthButtonsEls = monthList ? monthList.querySelectorAll('.month-button') : [];
  const activeMonthButton = monthButtonsEls[firstMonthWithBooks - 1] || monthButtonsEls[0];
  if (activeMonthButton) {
    activeMonthButton.classList.add('active');
  }

  renderBookGrid(selectedYear, Number(activeMonthButton?.dataset.month || firstMonthWithBooks), books);
}

function renderBookGrid(selectedYear, selectedMonth, books) {
  const grid = document.getElementById('bookGrid');
  if (!grid) return;

  const monthBooks = books
    .filter(book => new Date(book.date).getFullYear() === selectedYear && new Date(book.date).getMonth() === selectedMonth - 1)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  if (!monthBooks.length) {
    grid.innerHTML = '<div class="empty-state">该月份暂无书籍记录，点击右上角新增。</div>';
    return;
  }

  grid.innerHTML = monthBooks
    .map(book => {
      const palette = pickPalette(book.title);
      const cover = buildCoverSvg(book.title, palette[0], palette[1]);
      return `
        <article class="book-card" data-book-id="${book.id}">
          <div class="book-cover-box">
            <img src="${cover}" alt="${book.title} cover" />
          </div>
          <div class="book-details">
            <h3>${book.title}</h3>
            <p class="author">${book.author}</p>
            <div class="meta-row">
              <span>${new Date(book.date).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })}</span>
              <span>${book.rating.toFixed(1)} / 5</span>
            </div>
            <div class="rating-row">${starMarkup(book.rating)}</div>
            <p class="notes">${book.notes}</p>
            <div class="card-actions">
              <button type="button" class="mini-button edit" data-action="edit" data-book-id="${book.id}">编辑</button>
              <button type="button" class="mini-button delete" data-action="delete" data-book-id="${book.id}">删除</button>
            </div>
          </div>
        </article>
      `;
    })
    .join('');

  grid.querySelectorAll('[data-action="edit"]').forEach(button => {
    button.addEventListener('click', () => {
      const book = readBooks().find(item => item.id === button.dataset.bookId);
      openModal(book);
    });
  });

  grid.querySelectorAll('[data-action="delete"]').forEach(button => {
    button.addEventListener('click', () => {
      const bookId = button.dataset.bookId;
      const booksAfterDelete = readBooks().filter(item => item.id !== bookId);
      saveBooks(booksAfterDelete);
      renderReadingApp();
    });
  });
}

function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const books = readBooks();
  const title = form.title.value.trim();
  const author = form.author.value.trim();
  const date = form.date.value;
  const rating = Number(form.rating.value);
  const notes = form.notes.value.trim();

  if (!title || !author || !date || !notes) return;

  const nextBook = {
    id: form.dataset.bookId || `book-${Date.now()}`,
    title,
    author,
    date,
    rating,
    notes,
  };

  if (form.dataset.mode === 'edit') {
    const updatedBooks = books.map(book => (book.id === nextBook.id ? nextBook : book));
    saveBooks(updatedBooks);
  } else {
    saveBooks([nextBook, ...books]);
  }

  closeModal();
  renderReadingApp();
}

function exportBooks() {
  const books = readBooks();
  const payload = JSON.stringify(books, null, 2);
  const blob = new Blob([payload], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `reading-records-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function importBooks(event) {
  const [file] = event.target.files || [];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      if (!Array.isArray(parsed)) {
        throw new Error('Invalid JSON format');
      }
      saveBooks(parsed);
      renderReadingApp();
    } catch (error) {
      window.alert('导入失败：文件内容不是有效的 JSON 数组。');
    }
  };

  reader.readAsText(file);
  event.target.value = '';
}

function setupReadingPage() {
  const addBookBtn = document.getElementById('addBookBtn');
  const exportBtn = document.getElementById('exportBtn');
  const importInput = document.getElementById('importInput');
  const form = document.getElementById('bookForm');
  const modal = document.getElementById('bookModal');

  if (addBookBtn) {
    addBookBtn.addEventListener('click', () => openModal());
  }

  if (exportBtn) {
    exportBtn.addEventListener('click', exportBooks);
  }

  if (importInput) {
    importInput.addEventListener('change', importBooks);
  }

  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }

  if (modal) {
    modal.addEventListener('click', event => {
      if (event.target instanceof HTMLElement && event.target.dataset.close === 'true') {
        closeModal();
      }
    });
  }

  renderReadingApp();
}

window.addEventListener('DOMContentLoaded', setupReadingPage);

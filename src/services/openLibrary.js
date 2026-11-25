const API_BASE = 'https://openlibrary.org';
const SEARCH_FIELDS = [
  'key',
  'title',
  'author_name',
  'first_publish_year',
  'cover_i',
  'edition_count',
  'author_key',
  'subject',
].join(',');

async function readJson(url) {
  let response;
  try {
    response = await fetch(url, {
      headers: { Accept: 'application/json' },
    });
  } catch (error) {
    throw new Error('Não foi possível conectar à internet. Verifique sua conexão e tente novamente.');
  }

  if (!response.ok) {
    throw new Error(`A API respondeu com erro (${response.status}). Tente novamente em instantes.`);
  }

  try {
    return await response.json();
  } catch (error) {
    throw new Error('A resposta recebida da API não pôde ser lida. Tente novamente.');
  }
}

export async function searchBooks(searchTerm, limit = 24) {
  const term = String(searchTerm || '').trim();
  if (!term) return [];

  const url = `${API_BASE}/search.json?q=${encodeURIComponent(term)}&limit=${limit}&fields=${encodeURIComponent(SEARCH_FIELDS)}`;
  const data = await readJson(url);

  return (Array.isArray(data.docs) ? data.docs : [])
    .filter((book) => book && book.key && book.title)
    .map((book) => ({ ...book, id: book.key }));
}

export async function getWorkDetails(workKey) {
  if (!workKey) throw new Error('Não foi possível identificar esta obra.');
  const normalizedKey = workKey.startsWith('/') ? workKey : `/works/${workKey}`;
  return readJson(`${API_BASE}${normalizedKey}.json`);
}

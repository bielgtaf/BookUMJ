export function getBookId(book) {
  return book?.key || book?.id || `${book?.title || 'livro'}-${book?.first_publish_year || 'sem-ano'}`;
}

export function getBookAuthor(book) {
  if (Array.isArray(book?.author_name) && book.author_name.length > 0) {
    return book.author_name.slice(0, 2).join(', ');
  }
  if (typeof book?.author === 'string' && book.author.trim()) {
    return book.author;
  }
  return 'Autor não informado';
}

export function getCoverUrl(coverId, size = 'M') {
  if (!coverId) return null;
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
}

export function getDescriptionText(description) {
  if (typeof description === 'string') return description.trim();
  if (description && typeof description.value === 'string') return description.value.trim();
  return '';
}

export function getWorkKey(book) {
  if (typeof book?.key !== 'string') return null;
  return book.key.startsWith('/') ? book.key : `/works/${book.key}`;
}

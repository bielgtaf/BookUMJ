import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../components/ScreenHeader';
import BookCard from '../components/BookCard';
import { EmptyState, ErrorState, LoadingState } from '../components/Feedback';
import { searchBooks } from '../services/openLibrary';
import { colors } from '../styles/theme';

export default function ResultsScreen({ navigation, route }) {
  const query = route.params?.query || '';
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let isActive = true;
    setLoading(true);
    setError('');
    setBooks([]);

    searchBooks(query, 30)
      .then((items) => {
        if (isActive) setBooks(items);
      })
      .catch((requestError) => {
        if (isActive) setError(requestError.message);
      })
      .finally(() => {
        if (isActive) setLoading(false);
      });

    return () => { isActive = false; };
  }, [query, reloadKey]);

  function openBook(book) {
    navigation.navigate('Detalhes', { book });
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScreenHeader title="Resultados" subtitle={`Busca por: ${query}`} onBack={() => navigation.goBack()} />
      {!loading && !error && books.length > 0 && (
        <View style={styles.resultInfo}>
          <Text style={styles.resultCount}>{books.length} resultados encontrados</Text>
          <Text style={styles.source}>Open Library</Text>
        </View>
      )}
      {loading ? (
        <LoadingState message="Procurando livros no catálogo..." />
      ) : error ? (
        <ErrorState message={error} onRetry={() => setReloadKey((value) => value + 1)} />
      ) : books.length === 0 ? (
        <EmptyState
          title="Nenhum livro encontrado"
          message="Tente outro título, autor ou assunto. Confira também a escrita da pesquisa."
          icon="search-outline"
        />
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item) => item.key}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <BookCard book={item} onPress={() => openBook(item)} width="48%" />}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  resultInfo: { paddingHorizontal: 20, paddingBottom: 11, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  resultCount: { color: colors.text, fontWeight: '800', fontSize: 12 },
  source: { color: colors.muted, fontSize: 10 },
  listContent: { paddingHorizontal: 20, paddingTop: 5, paddingBottom: 24 },
  row: { justifyContent: 'space-between' },
});

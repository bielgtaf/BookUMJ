import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';
import { ErrorState, LoadingState } from '../components/Feedback';
import { searchBooks } from '../services/openLibrary';
import { colors } from '../styles/theme';
import { navigateToRootStack } from '../navigation/navigationHelpers';

export default function HomeScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let isActive = true;
    setLoading(true);
    setError('');

    searchBooks('subject:fiction', 12)
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
  }, [reloadKey]);

  function handleSearch() {
    const cleanedQuery = query.trim();
    if (!cleanedQuery) return;
    navigateToRootStack(navigation, 'Resultados', { query: cleanedQuery });
  }

  function openBook(book) {
    navigateToRootStack(navigation, 'Detalhes', { book });
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topLine}>
          <View>
            <Text style={styles.eyebrow}>SUA BIBLIOTECA DIGITAL</Text>
            <Text style={styles.brand}>Book<Text style={styles.brandAccent}>UMJ</Text></Text>
          </View>
          <View style={styles.brandIcon}><Ionicons name="book" size={23} color={colors.primaryDark} /></View>
        </View>

        <Text style={styles.headline}>Uma boa história{ '\n' }começa por aqui.</Text>
        <Text style={styles.intro}>Encontre livros, conheça novas obras e guarde suas próximas leituras.</Text>

        <SearchBar value={query} onChangeText={setQuery} onSubmit={handleSearch} />

        <Pressable style={styles.featureBanner} onPress={() => navigateToRootStack(navigation, 'Buscar')}>
          <View style={styles.bannerTextArea}>
            <Text style={styles.bannerLabel}>EXPLORE SEM LIMITES</Text>
            <Text style={styles.bannerTitle}>Seu próximo livro favorito está esperando.</Text>
            <View style={styles.bannerLink}>
              <Text style={styles.bannerLinkText}>Explorar catálogo</Text>
              <Ionicons name="arrow-forward" size={15} color="#FFFFFF" />
            </View>
          </View>
          <View style={styles.bannerArt}><Ionicons name="library" size={54} color="#F5DDB8" /></View>
        </Pressable>

        <View style={styles.sectionHeading}>
          <View>
            <Text style={styles.sectionTitle}>Para descobrir</Text>
            <Text style={styles.sectionSubtitle}>Obras encontradas na Open Library</Text>
          </View>
          <Pressable onPress={() => navigateToRootStack(navigation, 'Resultados', { query: 'subject:fiction' })}>
            <Text style={styles.seeAll}>Ver todos</Text>
          </Pressable>
        </View>

        {loading ? (
          <LoadingState message="Buscando sugestões de leitura..." />
        ) : error ? (
          <ErrorState message={error} onRetry={() => setReloadKey((value) => value + 1)} />
        ) : (
          <View style={styles.bookGrid}>
            {books.slice(0, 6).map((book) => (
              <BookCard key={book.key} book={book} onPress={() => openBook(book)} width="48%" />
            ))}
          </View>
        )}
        <Text style={styles.credit}>Dados e capas fornecidos pela Open Library.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 25 },
  topLine: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  eyebrow: { color: colors.primaryDark, fontSize: 9, letterSpacing: 1.5, fontWeight: '800' },
  brand: { color: colors.text, fontWeight: '900', fontSize: 25, letterSpacing: -0.7, marginTop: 2 },
  brandAccent: { color: colors.primary },
  brandIcon: { width: 46, height: 46, borderRadius: 16, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  headline: { fontSize: 30, lineHeight: 35, fontWeight: '900', letterSpacing: -0.8, color: colors.text, marginTop: 25 },
  intro: { color: colors.muted, fontSize: 13, lineHeight: 20, marginTop: 8, marginBottom: 18, maxWidth: 310 },
  featureBanner: { backgroundColor: '#292722', borderRadius: 20, minHeight: 154, marginTop: 20, padding: 18, flexDirection: 'row', overflow: 'hidden', alignItems: 'center' },
  bannerTextArea: { flex: 1, paddingRight: 8 },
  bannerLabel: { fontSize: 9, color: '#E7BD7C', letterSpacing: 1.2, fontWeight: '800' },
  bannerTitle: { color: '#FFFFFF', fontSize: 18, lineHeight: 23, fontWeight: '800', marginTop: 8, maxWidth: 230 },
  bannerLink: { flexDirection: 'row', gap: 7, alignItems: 'center', marginTop: 13 },
  bannerLinkText: { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },
  bannerArt: { width: 75, height: 92, borderRadius: 18, backgroundColor: '#51412C', alignItems: 'center', justifyContent: 'center', transform: [{ rotate: '7deg' }] },
  sectionHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 27, marginBottom: 16 },
  sectionTitle: { color: colors.text, fontSize: 19, fontWeight: '900' },
  sectionSubtitle: { color: colors.muted, fontSize: 11, marginTop: 3 },
  seeAll: { color: colors.primaryDark, fontSize: 12, fontWeight: '800' },
  bookGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  credit: { color: '#9A9389', textAlign: 'center', fontSize: 10, marginTop: 7 },
});

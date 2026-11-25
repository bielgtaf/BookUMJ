import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../components/ScreenHeader';
import { getWorkDetails } from '../services/openLibrary';
import { useFavorites } from '../context/FavoritesContext';
import { colors } from '../styles/theme';
import { getBookAuthor, getCoverUrl, getDescriptionText } from '../utils/bookHelpers';

export default function BookDetailsScreen({ navigation, route }) {
  const book = route.params?.book || {};
  const { isFavorite, toggleFavorite } = useFavorites();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);
  const [imageFailed, setImageFailed] = useState(false);
  const saved = isFavorite(book.key || book.id);
  const coverUrl = getCoverUrl(book.cover_i, 'L');

  useEffect(() => {
    let isActive = true;
    setLoading(true);
    setError('');
    setDetails(null);

    getWorkDetails(book.key)
      .then((data) => {
        if (isActive) setDetails(data);
      })
      .catch((requestError) => {
        if (isActive) setError(requestError.message);
      })
      .finally(() => {
        if (isActive) setLoading(false);
      });

    return () => { isActive = false; };
  }, [book.key, reloadKey]);

  const description = getDescriptionText(details?.description);
  const subjects = Array.isArray(details?.subjects) ? details.subjects.slice(0, 8) : [];
  const author = getBookAuthor(book);
  const year = book.first_publish_year || details?.first_publish_date || 'Não informado';

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScreenHeader title="Detalhes do livro" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.coverFrame}>
            {coverUrl && !imageFailed ? (
              <Image source={{ uri: coverUrl }} style={styles.cover} resizeMode="cover" onError={() => setImageFailed(true)} />
            ) : (
              <View style={styles.noCover}><Ionicons name="book-outline" size={48} color={colors.primary} /><Text style={styles.noCoverText}>Capa indisponível</Text></View>
            )}
          </View>
          <View style={styles.heroInfo}>
            <Text style={styles.tag}>OBRA DO CATÁLOGO</Text>
            <Text style={styles.bookTitle}>{book.title || details?.title || 'Título não informado'}</Text>
            <Text style={styles.author}>{author}</Text>
            <View style={styles.metaRow}><Ionicons name="calendar-outline" size={14} color={colors.primaryDark} /><Text style={styles.metaText}>Publicação: {year}</Text></View>
            {!!book.edition_count && (
              <View style={styles.metaRow}><Ionicons name="copy-outline" size={14} color={colors.primaryDark} /><Text style={styles.metaText}>{book.edition_count} edições catalogadas</Text></View>
            )}
          </View>
        </View>

        <Pressable style={[styles.favoriteButton, saved && styles.favoriteButtonSaved]} onPress={() => toggleFavorite(book)}>
          <Ionicons name={saved ? 'heart' : 'heart-outline'} size={19} color={saved ? '#FFFFFF' : colors.primaryDark} />
          <Text style={[styles.favoriteText, saved && styles.favoriteTextSaved]}>{saved ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}</Text>
        </Pressable>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sobre a obra</Text>
          {loading ? (
            <View style={styles.descriptionLoading}><ActivityIndicator color={colors.primary} /><Text style={styles.loadingText}>Carregando descrição...</Text></View>
          ) : description ? (
            <Text style={styles.description}>{description}</Text>
          ) : (
            <Text style={styles.descriptionMuted}>A descrição desta obra não está disponível na Open Library no momento.</Text>
          )}
          {!!error && (
            <View style={styles.errorLine}>
              <Text style={styles.errorText}>Não foi possível carregar alguns detalhes. {error}</Text>
              <Pressable onPress={() => setReloadKey((value) => value + 1)}><Text style={styles.retryLink}>Tentar novamente</Text></Pressable>
            </View>
          )}
        </View>

        {subjects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Assuntos relacionados</Text>
            <View style={styles.subjects}>
              {subjects.map((subject) => (
                <View key={subject} style={styles.subjectChip}><Text style={styles.subjectText}>{subject}</Text></View>
              ))}
            </View>
          </View>
        )}
        <Text style={styles.credit}>Informações consultadas na Open Library.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 20, paddingBottom: 30 },
  hero: { flexDirection: 'row', gap: 17, alignItems: 'flex-start', marginTop: 4 },
  coverFrame: { width: 132, height: 196, borderRadius: 15, overflow: 'hidden', backgroundColor: colors.surfaceAlt, elevation: 3 },
  cover: { width: '100%', height: '100%' },
  noCover: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 9, padding: 8 },
  noCoverText: { color: colors.muted, fontSize: 10, textAlign: 'center' },
  heroInfo: { flex: 1, paddingTop: 5 },
  tag: { color: colors.primaryDark, fontSize: 9, letterSpacing: 1.1, fontWeight: '900' },
  bookTitle: { color: colors.text, fontSize: 21, lineHeight: 26, fontWeight: '900', marginTop: 9 },
  author: { color: colors.muted, fontSize: 13, marginTop: 7, lineHeight: 18 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 12 },
  metaText: { color: colors.text, fontSize: 11, flexShrink: 1 },
  favoriteButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9, borderColor: colors.primary, borderWidth: 1, borderRadius: 14, paddingVertical: 13, marginTop: 22, backgroundColor: colors.surface },
  favoriteButtonSaved: { backgroundColor: colors.primary, borderColor: colors.primary },
  favoriteText: { color: colors.primaryDark, fontSize: 13, fontWeight: '800' },
  favoriteTextSaved: { color: '#FFFFFF' },
  section: { marginTop: 26 },
  sectionTitle: { color: colors.text, fontSize: 17, fontWeight: '900', marginBottom: 10 },
  description: { color: '#514B43', fontSize: 13, lineHeight: 21 },
  descriptionMuted: { color: colors.muted, fontSize: 13, lineHeight: 20 },
  descriptionLoading: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 12 },
  loadingText: { color: colors.muted, fontSize: 12 },
  errorLine: { backgroundColor: '#F8E7E3', padding: 12, borderRadius: 12, marginTop: 10 },
  errorText: { color: colors.danger, fontSize: 11, lineHeight: 16 },
  retryLink: { color: colors.primaryDark, fontSize: 12, fontWeight: '800', marginTop: 7 },
  subjects: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  subjectChip: { backgroundColor: colors.primarySoft, borderRadius: 20, paddingVertical: 8, paddingHorizontal: 11 },
  subjectText: { color: colors.primaryDark, fontSize: 10, fontWeight: '700' },
  credit: { color: '#9A9389', fontSize: 10, marginTop: 27, textAlign: 'center' },
});

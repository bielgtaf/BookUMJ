import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BookCard from '../components/BookCard';
import { EmptyState } from '../components/Feedback';
import { useFavorites } from '../context/FavoritesContext';
import { colors } from '../styles/theme';
import { navigateToRootStack } from '../navigation/navigationHelpers';

export default function FavoritesScreen({ navigation }) {
  const { favorites, isReady } = useFavorites();

  function openBook(book) {
    navigateToRootStack(navigation, 'Detalhes', { book });
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>SUA ESTANTE PESSOAL</Text>
        <Text style={styles.title}>Meus favoritos</Text>
        <Text style={styles.subtitle}>{favorites.length} {favorites.length === 1 ? 'livro salvo' : 'livros salvos'}</Text>
      </View>
      {!isReady ? (
        <View style={styles.waiting}><Text style={styles.waitingText}>Carregando sua estante...</Text></View>
      ) : favorites.length === 0 ? (
        <EmptyState
          title="Sua lista está vazia"
          message="Abra os detalhes de um livro e toque em 'Adicionar aos favoritos' para guardá-lo aqui."
          icon="heart-outline"
          actionLabel="Explorar livros"
          onAction={() => navigation.navigate('Buscar')}
        />
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.key || item.id}
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
  header: { paddingHorizontal: 20, paddingTop: 25, paddingBottom: 18 },
  eyebrow: { color: colors.primaryDark, fontSize: 9, letterSpacing: 1.5, fontWeight: '800' },
  title: { color: colors.text, fontSize: 28, fontWeight: '900', letterSpacing: -0.7, marginTop: 8 },
  subtitle: { color: colors.muted, fontSize: 12, marginTop: 4 },
  waiting: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  waitingText: { color: colors.muted, fontSize: 13 },
  listContent: { paddingHorizontal: 20, paddingTop: 5, paddingBottom: 24 },
  row: { justifyContent: 'space-between' },
});

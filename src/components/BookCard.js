import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/theme';
import { getBookAuthor, getBookId, getCoverUrl } from '../utils/bookHelpers';
import { useFavorites } from '../context/FavoritesContext';

export default function BookCard({ book, onPress, width = '48%' }) {
  const [imageFailed, setImageFailed] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isFavorite(getBookId(book));
  const coverUrl = getCoverUrl(book?.cover_i, 'M');

  return (
    <View style={[styles.card, { width }]}>
      <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={`Ver detalhes de ${book.title}`}>
        <View style={styles.coverFrame}>
          {coverUrl && !imageFailed ? (
            <Image source={{ uri: coverUrl }} style={styles.cover} resizeMode="cover" onError={() => setImageFailed(true)} />
          ) : (
            <View style={styles.noCover}>
              <Ionicons name="book-outline" size={30} color={colors.primary} />
              <Text style={styles.noCoverText}>Sem capa</Text>
            </View>
          )}
        </View>
        <Text style={styles.title} numberOfLines={2}>{book?.title || 'Título não informado'}</Text>
        <Text style={styles.author} numberOfLines={1}>{getBookAuthor(book)}</Text>
        {!!book?.first_publish_year && (
          <Text style={styles.year}>{book.first_publish_year}</Text>
        )}
      </Pressable>
      <Pressable
        style={[styles.favoriteButton, saved && styles.favoriteButtonActive]}
        onPress={() => toggleFavorite(book)}
        hitSlop={6}
        accessibilityRole="button"
        accessibilityLabel={saved ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      >
        <Ionicons name={saved ? 'heart' : 'heart-outline'} size={17} color={saved ? '#FFFFFF' : colors.primaryDark} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 22,
    position: 'relative',
  },
  coverFrame: {
    width: '100%',
    height: 204,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: colors.surfaceAlt,
    marginBottom: 9,
  },
  cover: {
    width: '100%',
    height: '100%',
  },
  noCover: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 10,
    backgroundColor: '#EDE4D5',
  },
  noCoverText: {
    fontSize: 12,
    color: colors.muted,
  },
  title: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
  },
  author: {
    color: colors.muted,
    fontSize: 11,
    marginTop: 3,
  },
  year: {
    color: colors.primaryDark,
    fontSize: 10,
    marginTop: 4,
    fontWeight: '600',
  },
  favoriteButton: {
    position: 'absolute',
    top: 9,
    right: 9,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.94)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteButtonActive: {
    backgroundColor: colors.primary,
  },
});

import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/theme';

export function LoadingState({ message = 'Carregando livros...' }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}><Ionicons name="cloud-offline-outline" size={27} color={colors.danger} /></View>
      <Text style={styles.title}>Não foi possível carregar</Text>
      <Text style={styles.message}>{message || 'Ocorreu um problema ao buscar os dados.'}</Text>
      {!!onRetry && (
        <Pressable style={styles.retryButton} onPress={onRetry}>
          <Ionicons name="refresh" size={16} color="#FFFFFF" />
          <Text style={styles.retryText}>Tentar novamente</Text>
        </Pressable>
      )}
    </View>
  );
}

export function EmptyState({ title = 'Nada por aqui ainda', message, icon = 'book-outline', actionLabel, onAction }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}><Ionicons name={icon} size={28} color={colors.primary} /></View>
      <Text style={styles.title}>{title}</Text>
      {!!message && <Text style={styles.message}>{message}</Text>}
      {!!actionLabel && !!onAction && (
        <Pressable style={styles.retryButton} onPress={onAction}>
          <Text style={styles.retryText}>{actionLabel}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingVertical: 42,
    minHeight: 190,
  },
  iconCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
  },
  message: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
    marginTop: 8,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 17,
    paddingVertical: 11,
    borderRadius: 13,
    backgroundColor: colors.primary,
    marginTop: 18,
  },
  retryText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
});

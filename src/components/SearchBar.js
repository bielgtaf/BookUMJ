import React from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/theme';

export default function SearchBar({ value, onChangeText, onSubmit, placeholder = 'Busque por título ou autor', autoFocus = false }) {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={20} color={colors.muted} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        placeholder={placeholder}
        placeholderTextColor="#A19A90"
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus={autoFocus}
        accessibilityLabel="Pesquisar livros"
      />
      {!!value && (
        <Pressable onPress={() => onChangeText('')} hitSlop={8} accessibilityLabel="Limpar pesquisa">
          <Ionicons name="close-circle" size={18} color={colors.muted} />
        </Pressable>
      )}
      <Pressable style={styles.searchButton} onPress={onSubmit} accessibilityRole="button" accessibilityLabel="Pesquisar">
        <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 54,
    paddingLeft: 16,
    paddingRight: 7,
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: 14,
    paddingVertical: 12,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

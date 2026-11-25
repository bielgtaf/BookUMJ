import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../components/SearchBar';
import { colors } from '../styles/theme';
import { navigateToRootStack } from '../navigation/navigationHelpers';

const suggestions = ['Harry Potter', 'Romance', 'Fantasia', 'Mistério', 'Ficção científica', 'Machado de Assis'];

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');

  function search(term = query) {
    const cleanedQuery = String(term).trim();
    if (!cleanedQuery) return;
    setQuery(cleanedQuery);
    navigateToRootStack(navigation, 'Resultados', { query: cleanedQuery });
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.eyebrow}>CATÁLOGO BOOKUMJ</Text>
        <Text style={styles.title}>O que você{ '\n' }quer ler hoje?</Text>
        <Text style={styles.subtitle}>Pesquise pelo título, autor ou assunto do livro.</Text>
        <SearchBar value={query} onChangeText={setQuery} onSubmit={() => search()} autoFocus={false} />

        <View style={styles.tipCard}>
          <View style={styles.tipIcon}><Ionicons name="bulb-outline" size={21} color={colors.primaryDark} /></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.tipTitle}>Uma dica</Text>
            <Text style={styles.tipText}>Você também pode pesquisar pelo nome de um autor, como Clarice Lispector.</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Pesquisas sugeridas</Text>
        <View style={styles.chips}>
          {suggestions.map((item) => (
            <Pressable key={item} onPress={() => search(item)} style={styles.chip}>
              <Ionicons name="search-outline" size={13} color={colors.primaryDark} />
              <Text style={styles.chipText}>{item}</Text>
            </Pressable>
          ))}
        </View>
        <Text style={styles.footnote}>A busca consulta o catálogo público da Open Library.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 20, paddingTop: 26, paddingBottom: 30 },
  eyebrow: { color: colors.primaryDark, fontSize: 9, letterSpacing: 1.5, fontWeight: '800' },
  title: { color: colors.text, fontSize: 30, lineHeight: 36, fontWeight: '900', letterSpacing: -0.8, marginTop: 10 },
  subtitle: { color: colors.muted, fontSize: 13, lineHeight: 20, marginTop: 8, marginBottom: 19 },
  tipCard: { marginTop: 22, borderRadius: 17, padding: 16, backgroundColor: colors.primarySoft, flexDirection: 'row', alignItems: 'center', gap: 13 },
  tipIcon: { width: 42, height: 42, borderRadius: 13, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  tipTitle: { color: colors.text, fontWeight: '800', fontSize: 13 },
  tipText: { color: '#71634F', fontSize: 11, lineHeight: 16, marginTop: 3 },
  sectionTitle: { color: colors.text, fontSize: 17, fontWeight: '900', marginTop: 30, marginBottom: 14 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 7, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 22, paddingVertical: 11, paddingHorizontal: 14 },
  chipText: { color: colors.text, fontSize: 12, fontWeight: '600' },
  footnote: { color: '#9A9389', fontSize: 10, marginTop: 28, textAlign: 'center' },
});

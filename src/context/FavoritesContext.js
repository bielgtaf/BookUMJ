import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getBookId } from '../utils/bookHelpers';

const FavoritesContext = createContext(null);
const STORAGE_KEY = '@bookumj/favorites-v1';

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadFavorites() {
      try {
        const storedValue = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedValue && isMounted) {
          const parsed = JSON.parse(storedValue);
          if (Array.isArray(parsed)) setFavorites(parsed);
        }
      } catch (error) {
        // Se o armazenamento estiver vazio ou inválido, o app começa com favoritos vazios.
      } finally {
        if (isMounted) setIsReady(true);
      }
    }

    loadFavorites();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isReady) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites)).catch(() => {
      // A lista continua funcionando durante a sessão mesmo se o aparelho bloquear a gravação.
    });
  }, [favorites, isReady]);

  const toggleFavorite = useCallback((book) => {
    if (!book) return;
    const id = getBookId(book);
    setFavorites((current) => {
      const alreadySaved = current.some((item) => getBookId(item) === id);
      return alreadySaved
        ? current.filter((item) => getBookId(item) !== id)
        : [book, ...current];
    });
  }, []);

  const isFavorite = useCallback((bookOrId) => {
    const id = typeof bookOrId === 'string' ? bookOrId : getBookId(bookOrId);
    return favorites.some((item) => getBookId(item) === id);
  }, [favorites]);

  const value = useMemo(() => ({
    favorites,
    favoritesCount: favorites.length,
    toggleFavorite,
    isFavorite,
    isReady,
  }), [favorites, toggleFavorite, isFavorite, isReady]);

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites deve ser usado dentro de FavoritesProvider.');
  }
  return context;
}

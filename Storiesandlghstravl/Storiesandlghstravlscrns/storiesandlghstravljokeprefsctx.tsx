import AsyncStorage from '@react-native-async-storage/async-storage';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const storiesandlghstravlKeySaved = 'storiesandlghstravl_joke_saved_v1';

export type StoriesandlghstravlJokePrefsContextValue = {
  ready: boolean;
  isSaved: (jokeId: string) => boolean;
  toggleSaved: (jokeId: string) => void;
};

const StoriesandlghstravlJokePrefsContext =
  createContext<StoriesandlghstravlJokePrefsContextValue | null>(null);

export const StoriesandlghstravlJokePrefsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [storiesandlghstravlSavedIds, setStoriesandlghstravlSavedIds] =
    useState<string[]>([]);
  const [storiesandlghstravlReady, setStoriesandlghstravlReady] =
    useState(false);

  useEffect(() => {
    let storiesandlghstravlCancelled = false;
    (async () => {
      try {
        const savedRaw = await AsyncStorage.getItem(
          storiesandlghstravlKeySaved,
        );
        if (storiesandlghstravlCancelled) {
          return;
        }
        if (savedRaw) {
          const parsed = JSON.parse(savedRaw) as unknown;
          if (Array.isArray(parsed)) {
            setStoriesandlghstravlSavedIds(
              parsed.filter((x): x is string => typeof x === 'string'),
            );
          }
        }
      } catch {
      } finally {
        if (!storiesandlghstravlCancelled) {
          setStoriesandlghstravlReady(true);
        }
      }
    })();
    return () => {
      storiesandlghstravlCancelled = true;
    };
  }, []);

  const storiesandlghstravlSavedSet = useMemo(
    () => new Set(storiesandlghstravlSavedIds),
    [storiesandlghstravlSavedIds],
  );

  const isSaved = useCallback(
    (jokeId: string) => storiesandlghstravlSavedSet.has(jokeId),
    [storiesandlghstravlSavedSet],
  );

  const toggleSaved = useCallback((jokeId: string) => {
    setStoriesandlghstravlSavedIds(prev => {
      const has = prev.includes(jokeId);
      const next = has ? prev.filter(id => id !== jokeId) : [...prev, jokeId];
      AsyncStorage.setItem(
        storiesandlghstravlKeySaved,
        JSON.stringify(next),
      ).catch(() => {});
      return next;
    });
  }, []);

  const value = useMemo<StoriesandlghstravlJokePrefsContextValue>(
    () => ({
      ready: storiesandlghstravlReady,
      isSaved,
      toggleSaved,
    }),
    [storiesandlghstravlReady, isSaved, toggleSaved],
  );

  return (
    <StoriesandlghstravlJokePrefsContext.Provider value={value}>
      {children}
    </StoriesandlghstravlJokePrefsContext.Provider>
  );
};

export function useStoriesandlghstravlJokePrefs(): StoriesandlghstravlJokePrefsContextValue {
  const ctx = useContext(StoriesandlghstravlJokePrefsContext);
  if (!ctx) {
    throw new Error('err');
  }
  return ctx;
}

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const storiesandlghstravlKeySaved = 'storiesandlghstravl_story_saved_v1';
const storiesandlghstravlKeyRatings = 'storiesandlghstravl_story_ratings_v1';

type StoriesandlghstravlRatingsMap = Record<string, number>;

export type StoriesandlghstravlStoryPrefsContextValue = {
  ready: boolean;
  revision: number;
  isSaved: (storyId: string) => boolean;
  getRating: (storyId: string) => number;
  toggleSaved: (storyId: string) => void;
  setStoryRating: (storyId: string, rating: number) => void;
};

const StoriesandlghstravlStoryPrefsContext =
  createContext<StoriesandlghstravlStoryPrefsContextValue | null>(null);

export const StoriesandlghstravlStoryPrefsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [storiesandlghstravlSavedIds, setStoriesandlghstravlSavedIds] =
    useState<string[]>([]);
  const [storiesandlghstravlRatings, setStoriesandlghstravlRatings] =
    useState<StoriesandlghstravlRatingsMap>({});
  const [storiesandlghstravlReady, setStoriesandlghstravlReady] =
    useState(false);
  const [storiesandlghstravlRevision, setStoriesandlghstravlRevision] =
    useState(0);

  useEffect(() => {
    let storiesandlghstravlCancelled = false;
    (async () => {
      try {
        const [savedRaw, ratingsRaw] = await Promise.all([
          AsyncStorage.getItem(storiesandlghstravlKeySaved),
          AsyncStorage.getItem(storiesandlghstravlKeyRatings),
        ]);
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
        if (ratingsRaw) {
          const parsed = JSON.parse(ratingsRaw) as unknown;
          if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
            const next: StoriesandlghstravlRatingsMap = {};
            for (const [k, v] of Object.entries(
              parsed as Record<string, unknown>,
            )) {
              if (typeof v === 'number' && v >= 0 && v <= 3) {
                next[k] = v;
              }
            }
            setStoriesandlghstravlRatings(next);
          }
        }
      } catch {
        // keep defaults
      } finally {
        if (!storiesandlghstravlCancelled) {
          setStoriesandlghstravlReady(true);
          setStoriesandlghstravlRevision(r => r + 1);
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
    (storyId: string) => storiesandlghstravlSavedSet.has(storyId),
    [storiesandlghstravlSavedSet],
  );

  const getRating = useCallback(
    (storyId: string) => {
      const r = storiesandlghstravlRatings[storyId];
      if (typeof r !== 'number' || r < 0) {
        return 0;
      }
      return Math.min(3, r);
    },
    [storiesandlghstravlRatings],
  );

  const toggleSaved = useCallback((storyId: string) => {
    setStoriesandlghstravlSavedIds(prev => {
      const has = prev.includes(storyId);
      const next = has ? prev.filter(id => id !== storyId) : [...prev, storyId];
      AsyncStorage.setItem(
        storiesandlghstravlKeySaved,
        JSON.stringify(next),
      ).catch(() => {});
      setStoriesandlghstravlRevision(r => r + 1);
      return next;
    });
  }, []);

  const setStoryRating = useCallback((storyId: string, rating: number) => {
    const clamped = Math.min(3, Math.max(0, Math.round(rating)));
    setStoriesandlghstravlRatings(prev => {
      const next = {...prev, [storyId]: clamped};
      AsyncStorage.setItem(
        storiesandlghstravlKeyRatings,
        JSON.stringify(next),
      ).catch(() => {});
      setStoriesandlghstravlRevision(r => r + 1);
      return next;
    });
  }, []);

  const value = useMemo<StoriesandlghstravlStoryPrefsContextValue>(
    () => ({
      ready: storiesandlghstravlReady,
      revision: storiesandlghstravlRevision,
      isSaved,
      getRating,
      toggleSaved,
      setStoryRating,
    }),
    [
      storiesandlghstravlReady,
      storiesandlghstravlRevision,
      isSaved,
      getRating,
      toggleSaved,
      setStoryRating,
    ],
  );

  return (
    <StoriesandlghstravlStoryPrefsContext.Provider value={value}>
      {children}
    </StoriesandlghstravlStoryPrefsContext.Provider>
  );
};

export function useStoriesandlghstravlStoryPrefs(): StoriesandlghstravlStoryPrefsContextValue {
  const ctx = useContext(StoriesandlghstravlStoryPrefsContext);
  if (!ctx) {
    throw new Error('err');
  }
  return ctx;
}

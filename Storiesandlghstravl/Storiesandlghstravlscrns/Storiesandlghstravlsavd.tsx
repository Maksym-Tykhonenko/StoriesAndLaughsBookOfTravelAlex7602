import {
  storiesandlghstravlGetCategory,
  storiesandlghstravlGetStory,
  storiesandlghstravlStoryBody,
  type StoriesandlghstravlStoryItem,
} from './storiesandlghstravlstoriesdata';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useMemo, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Storiesandlghstravllayot from '../Storiesandlghstravlcpn/Storiesandlghstravllayot';

import {
  storiesandlghstravlJokeItems,
  type StoriesandlghstravlJokeItem,
} from './storiesandlghstravljokesdata';

const storiesandlghstravlKeyStorySaved = 'storiesandlghstravl_story_saved_v1';
const storiesandlghstravlKeyStoryRatings =
  'storiesandlghstravl_story_ratings_v1';
const storiesandlghstravlKeyJokeSaved = 'storiesandlghstravl_joke_saved_v1';

type StoriesandlghstravlRatingsMap = Record<string, number>;

type StoriesandlghstravlSavedTab = 'stories' | 'jokes';

function storiesandlghstravlClampRating(r: unknown): number {
  if (typeof r !== 'number' || !Number.isFinite(r)) {
    return 0;
  }
  return Math.min(3, Math.max(0, Math.round(r)));
}

const StoriesandlghstravlsavdEmptyState = ({
  imageSource,
  title,
  subtitle,
  ctaLabel,
  onPress,
}: {
  imageSource: number;
  title: string;
  subtitle: string;
  ctaLabel: string;
  onPress: () => void;
}) => (
  <View style={styles.storiesandlghstravlsavdEmptyWrap}>
    <Image
      source={imageSource}
      style={styles.storiesandlghstravlsavdEmptyImg}
    />
    <Text style={styles.storiesandlghstravlsavdEmptyTitle}>{title}</Text>
    <Text style={styles.storiesandlghstravlsavdEmptySub}>{subtitle}</Text>
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={styles.storiesandlghstravlsavdCtaShadow}>
      <LinearGradient
        colors={['#2A5CFF', '#2D1AD9', '#1429B5']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.storiesandlghstravlsavdCta}>
        <Text style={styles.storiesandlghstravlsavdCtaText}>{ctaLabel}</Text>
      </LinearGradient>
    </TouchableOpacity>
  </View>
);

const Storiesandlghstravlsavd = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [storiesandlghstravlTab, setStoriesandlghstravlTab] =
    useState<StoriesandlghstravlSavedTab>('stories');
  const [
    storiesandlghstravlSavedStoryIds,
    setStoriesandlghstravlSavedStoryIds,
  ] = useState<string[]>([]);
  const [storiesandlghstravlSavedJokeIds, setStoriesandlghstravlSavedJokeIds] =
    useState<string[]>([]);
  const [storiesandlghstravlRatings, setStoriesandlghstravlRatings] =
    useState<StoriesandlghstravlRatingsMap>({});

  const storiesandlghstravlReload = useCallback(() => {
    let cancelled = false;
    (async () => {
      try {
        const [sSavedRaw, sRatingsRaw, jSavedRaw] = await Promise.all([
          AsyncStorage.getItem(storiesandlghstravlKeyStorySaved),
          AsyncStorage.getItem(storiesandlghstravlKeyStoryRatings),
          AsyncStorage.getItem(storiesandlghstravlKeyJokeSaved),
        ]);
        if (cancelled) {
          return;
        }

        if (sSavedRaw) {
          const parsed = JSON.parse(sSavedRaw) as unknown;
          if (Array.isArray(parsed)) {
            setStoriesandlghstravlSavedStoryIds(
              parsed.filter((x): x is string => typeof x === 'string'),
            );
          } else {
            setStoriesandlghstravlSavedStoryIds([]);
          }
        } else {
          setStoriesandlghstravlSavedStoryIds([]);
        }

        if (jSavedRaw) {
          const parsed = JSON.parse(jSavedRaw) as unknown;
          if (Array.isArray(parsed)) {
            setStoriesandlghstravlSavedJokeIds(
              parsed.filter((x): x is string => typeof x === 'string'),
            );
          } else {
            setStoriesandlghstravlSavedJokeIds([]);
          }
        } else {
          setStoriesandlghstravlSavedJokeIds([]);
        }

        if (sRatingsRaw) {
          const parsed = JSON.parse(sRatingsRaw) as unknown;
          if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
            const next: StoriesandlghstravlRatingsMap = {};
            for (const [k, v] of Object.entries(
              parsed as Record<string, unknown>,
            )) {
              const clamped = storiesandlghstravlClampRating(v);
              if (clamped > 0) {
                next[k] = clamped;
              }
            }
            setStoriesandlghstravlRatings(next);
          } else {
            setStoriesandlghstravlRatings({});
          }
        } else {
          setStoriesandlghstravlRatings({});
        }
      } catch {
        if (!cancelled) {
          setStoriesandlghstravlSavedStoryIds([]);
          setStoriesandlghstravlSavedJokeIds([]);
          setStoriesandlghstravlRatings({});
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      const cleanup = storiesandlghstravlReload();
      return () => cleanup?.();
    }, [storiesandlghstravlReload]),
  );

  const storiesandlghstravlSavedStories = useMemo(() => {
    const items: {story: StoriesandlghstravlStoryItem; rating: number}[] = [];
    for (const id of storiesandlghstravlSavedStoryIds) {
      const story = storiesandlghstravlGetStory(id);
      if (story) {
        items.push({story, rating: storiesandlghstravlRatings[id] ?? 0});
      }
    }
    return items;
  }, [storiesandlghstravlSavedStoryIds, storiesandlghstravlRatings]);

  const storiesandlghstravlSavedJokes = useMemo(() => {
    const set = new Set(storiesandlghstravlSavedJokeIds);
    return storiesandlghstravlJokeItems.filter(j => set.has(j.id));
  }, [storiesandlghstravlSavedJokeIds]);

  const storiesandlghstravlToggleStorySaved = useCallback((storyId: string) => {
    setStoriesandlghstravlSavedStoryIds(prev => {
      const has = prev.includes(storyId);
      const next = has ? prev.filter(id => id !== storyId) : [...prev, storyId];
      AsyncStorage.setItem(
        storiesandlghstravlKeyStorySaved,
        JSON.stringify(next),
      ).catch(() => {});
      return next;
    });
  }, []);

  const storiesandlghstravlToggleJokeSaved = useCallback((jokeId: string) => {
    setStoriesandlghstravlSavedJokeIds(prev => {
      const has = prev.includes(jokeId);
      const next = has ? prev.filter(id => id !== jokeId) : [...prev, jokeId];
      AsyncStorage.setItem(
        storiesandlghstravlKeyJokeSaved,
        JSON.stringify(next),
      ).catch(() => {});
      return next;
    });
  }, []);

  const storiesandlghstravlStoriesCount =
    storiesandlghstravlSavedStories.length;
  const storiesandlghstravlJokesCount = storiesandlghstravlSavedJokes.length;

  const renderStory = ({
    item,
  }: {
    item: {story: StoriesandlghstravlStoryItem; rating: number};
  }) => {
    const story = item.story;
    const category = storiesandlghstravlGetCategory(story.categoryId);
    const rating = item.rating;

    if (!category) {
      return null;
    }

    return (
      <LinearGradient
        colors={['rgba(217, 58, 26, 0.1)', 'rgba(242, 106, 46, 0.15)']}
        style={styles.storiesandlghstravlsavdStoryCard}>
        <View style={{}}>
          <Image
            source={story.image}
            style={styles.storiesandlghstravlsavdStoryHero}
            resizeMode="cover"
          />
          <View style={styles.storiesandlghstravlsavdStoryBody}>
            <View style={styles.storiesandlghstravlsavdPill}>
              <Text style={styles.storiesandlghstravlsavdPillText}>
                {category.name}
              </Text>
            </View>
            <Text style={styles.storiesandlghstravlsavdStoryTitle}>
              {story.title}
            </Text>
            <View style={styles.storiesandlghstravlsavdStoryFooter}>
              <View style={styles.storiesandlghstravlsavdActionsLeft}>
                <TouchableOpacity
                  style={styles.storiesandlghstravlsavdIconCircle}
                  activeOpacity={0.8}
                  onPress={() => storiesandlghstravlToggleStorySaved(story.id)}>
                  <Image
                    source={require('../../assets/i/storiesandlgsaved.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.storiesandlghstravlsavdIconCircle}
                  activeOpacity={0.8}
                  onPress={() =>
                    Share.share({
                      title: story.title,
                      message: `${
                        story.title
                      }\n\n${storiesandlghstravlStoryBody(story)}`,
                    })
                  }>
                  <Image
                    source={require('../../assets/i/storiesandlgshr.png')}
                  />
                </TouchableOpacity>
              </View>
              {rating > 0 ? (
                <View style={styles.storiesandlghstravlsavdStars}>
                  {[1, 2, 3].map(star => (
                    <Image
                      key={star}
                      source={
                        rating >= star
                          ? require('../../assets/i/storiesandlgbratesv.png')
                          : require('../../assets/i/storiesandlgbrates.png')
                      }
                      style={styles.storiesandlghstravlsavdStarImg}
                      resizeMode="contain"
                    />
                  ))}
                </View>
              ) : null}
            </View>
          </View>
        </View>
      </LinearGradient>
    );
  };

  const renderJoke = ({item}: {item: StoriesandlghstravlJokeItem}) => (
    <LinearGradient
      colors={['rgba(217, 58, 26, 0.1)', 'rgba(242, 106, 46, 0.15)']}
      style={styles.storiesandlghstravlsavdJokeCard}>
      <View style={{padding: 18}}>
        <Text style={styles.storiesandlghstravlsavdJokeText}>{item.text}</Text>
        <View style={styles.storiesandlghstravlsavdJokeActions}>
          <TouchableOpacity
            style={[
              styles.storiesandlghstravlsavdIconCircle,
              {
                backgroundColor: '#FFD36A33',
                borderColor: '#FFD36A66',
              },
            ]}
            activeOpacity={0.8}
            onPress={() => storiesandlghstravlToggleJokeSaved(item.id)}>
            <Image source={require('../../assets/i/storiesandlgsaved.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.storiesandlghstravlsavdIconCircle}
            activeOpacity={0.8}
            onPress={() =>
              Share.share({
                message: item.text,
              })
            }>
            <Image source={require('../../assets/i/storiesandlgshr.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );

  return (
    <Storiesandlghstravllayot>
      <View
        style={[
          styles.storiesandlghstravlsavdRoot,
          {paddingTop: insets.top + 18},
        ]}>
        <Text style={styles.storiesandlghstravlsavdHeader}>Saved</Text>
        <Text style={styles.storiesandlghstravlsavdHeaderSub}>
          Your personal collection
        </Text>

        <View style={styles.storiesandlghstravlsavdSegWrap}>
          <View style={styles.storiesandlghstravlsavdSegBg}>
            <Pressable
              onPress={() => setStoriesandlghstravlTab('stories')}
              style={styles.storiesandlghstravlsavdSegItem}>
              {storiesandlghstravlTab === 'stories' ? (
                <LinearGradient
                  colors={['#D93A1A40', '#F26A2E4D']}
                  style={styles.storiesandlghstravlsavdSegActive}>
                  <Text style={styles.storiesandlghstravlsavdSegTextActive}>
                    Stories ({storiesandlghstravlStoriesCount})
                  </Text>
                </LinearGradient>
              ) : (
                <Text style={styles.storiesandlghstravlsavdSegTextIdle}>
                  Stories ({storiesandlghstravlStoriesCount})
                </Text>
              )}
            </Pressable>
            <Pressable
              onPress={() => setStoriesandlghstravlTab('jokes')}
              style={styles.storiesandlghstravlsavdSegItem}>
              {storiesandlghstravlTab === 'jokes' ? (
                <LinearGradient
                  colors={['#D93A1A40', '#F26A2E4D']}
                  style={styles.storiesandlghstravlsavdSegActive}>
                  <Text style={styles.storiesandlghstravlsavdSegTextActive}>
                    Jokes ({storiesandlghstravlJokesCount})
                  </Text>
                </LinearGradient>
              ) : (
                <Text style={styles.storiesandlghstravlsavdSegTextIdle}>
                  Jokes ({storiesandlghstravlJokesCount})
                </Text>
              )}
            </Pressable>
          </View>
        </View>

        {storiesandlghstravlTab === 'stories' ? (
          storiesandlghstravlStoriesCount === 0 ? (
            <StoriesandlghstravlsavdEmptyState
              imageSource={require('../../assets/i/storiesandlghon3.png')}
              title="Build Your Collection"
              subtitle={
                'Save your favorite folk tales to have them\nalways at hand'
              }
              ctaLabel="Explore Stories"
              onPress={() =>
                (navigation as any).navigate('Storiesandlghstravlstrs')
              }
            />
          ) : (
            <FlatList
              data={storiesandlghstravlSavedStories}
              keyExtractor={x => x.story.id}
              scrollEnabled={false}
              renderItem={renderStory}
              contentContainerStyle={styles.storiesandlghstravlsavdListContent}
              showsVerticalScrollIndicator={false}
            />
          )
        ) : storiesandlghstravlJokesCount === 0 ? (
          <StoriesandlghstravlsavdEmptyState
            imageSource={require('../../assets/i/storiesandlgbsavedcol.png')}
            title="Build Your Collection"
            subtitle="Save the funniest jokes in your collection"
            ctaLabel="Explore Jokes"
            onPress={() =>
              (navigation as any).navigate('Storiesandlghstravljoks')
            }
          />
        ) : (
          <FlatList
            data={storiesandlghstravlSavedJokes}
            keyExtractor={x => x.id}
            scrollEnabled={false}
            renderItem={renderJoke}
            contentContainerStyle={styles.storiesandlghstravlsavdListContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </Storiesandlghstravllayot>
  );
};

export default Storiesandlghstravlsavd;

const styles = StyleSheet.create({
  storiesandlghstravlsavdHeaderSub: {
    fontFamily: 'Commissioner-Regular',
    fontSize: 14,
    color: '#FFFFFF99',
    marginBottom: 16,
  },
  storiesandlghstravlsavdSegWrap: {
    marginBottom: 16,
  },

  storiesandlghstravlsavdSegBg: {
    flexDirection: 'row',
    backgroundColor: 'rgba(88, 33, 10, 0.55)',
    borderRadius: 18,
    borderWidth: 1.2,
    borderColor: '#3A1C16',
    padding: 4,
  },

  storiesandlghstravlsavdRoot: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  storiesandlghstravlsavdHeader: {
    fontFamily: 'Cormorant-Bold',
    fontSize: 36,
    color: '#FFFFFF',
    marginBottom: 4,
  },

  storiesandlghstravlsavdSegItem: {
    flex: 1,
    height: 40,
    borderRadius: 14,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storiesandlghstravlsavdSegActive: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
  },
  storiesandlghstravlsavdSegTextActive: {
    fontFamily: 'Commissioner-Regular',
    fontSize: 14,
    color: '#FFD966',
  },
  storiesandlghstravlsavdSegTextIdle: {
    fontFamily: 'Commissioner-Regular',
    fontSize: 14,
    color: '#FFFFFF88',
  },

  storiesandlghstravlsavdListContent: {
    paddingBottom: 120,
    gap: 16,
  },

  storiesandlghstravlsavdStoryCard: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#3A1C16',
    backgroundColor: 'rgba(119, 46, 15, 0.2)',
  },
  storiesandlghstravlsavdStoryHero: {
    width: '100%',
    height: 170,
  },
  storiesandlghstravlsavdStoryBody: {
    padding: 16,
  },
  storiesandlghstravlsavdPill: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFD36A1A',
    borderRadius: 20,
    paddingHorizontal: 12,
    borderWidth: 1,
    minHeight: 26,
    justifyContent: 'center',
    borderColor: 'rgba(255, 211, 106, 0.35)',
    marginBottom: 10,
  },
  storiesandlghstravlsavdPillText: {
    fontFamily: 'Commissioner-Medium',
    fontSize: 12,
    color: '#FFD966',
  },
  storiesandlghstravlsavdStoryTitle: {
    fontFamily: 'Cormorant-SemiBold',
    fontSize: 22,
    color: '#FFFFFF',
    lineHeight: 28,
    width: '78%',
  },
  storiesandlghstravlsavdStoryFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  storiesandlghstravlsavdActionsLeft: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },

  storiesandlghstravlsavdJokeCard: {
    borderRadius: 24,
    backgroundColor: 'rgba(119, 46, 15, 0.2)',
    borderWidth: 1,
    borderColor: '#FFD36A33',
    minHeight: 160,
  },

  storiesandlghstravlsavdJokeText: {
    fontFamily: 'Commissioner-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: '#FFFFFFF0',
  },
  storiesandlghstravlsavdJokeActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 14,
  },

  storiesandlghstravlsavdIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.2,
    borderColor: '#3A1C16',
    backgroundColor: '#FFD36A0D',
    alignItems: 'center',
    justifyContent: 'center',
  },

  storiesandlghstravlsavdStars: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  storiesandlghstravlsavdStarImg: {
    width: 24,
    height: 24,
  },

  storiesandlghstravlsavdEmptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  storiesandlghstravlsavdEmptyImg: {
    marginBottom: 20,
    resizeMode: 'contain',
  },
  storiesandlghstravlsavdEmptyTitle: {
    fontFamily: 'Cormorant-SemiBold',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  storiesandlghstravlsavdEmptySub: {
    fontFamily: 'Commissioner-Regular',
    fontSize: 14,
    color: '#FFFFFF99',
    textAlign: 'center',
    marginBottom: 22,
    lineHeight: 18,
  },
  storiesandlghstravlsavdCtaShadow: {
    width: '92%',
    borderRadius: 16,
    shadowColor: '#0a1f8c',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 12,
  },
  storiesandlghstravlsavdCta: {
    height: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    alignSelf: 'center',
  },
  storiesandlghstravlsavdCtaText: {
    fontFamily: 'Commissioner-SemiBold',
    fontSize: 16,
    color: '#FFFFFFF2',
  },
});

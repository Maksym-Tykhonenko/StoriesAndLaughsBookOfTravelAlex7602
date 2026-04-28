import {
  StoriesandlghstravlJokePrefsProvider,
  useStoriesandlghstravlJokePrefs,
} from './storiesandlghstravljokeprefsctx';
import LinearGradient from 'react-native-linear-gradient';

import {storiesandlghstravlIncAchvRead} from './storiesandlghstravlachvstore';
import {useFocusEffect} from '@react-navigation/native';

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Storiesandlghstravllayot from '../Storiesandlghstravlcpn/Storiesandlghstravllayot';
import {
  storiesandlghstravlGetJokeCategory,
  storiesandlghstravlGetJokesForCategory,
  storiesandlghstravlJokeCategories,
  type StoriesandlghstravlJokeItem,
} from './storiesandlghstravljokesdata';

const storiesandlghstravlCardShadow = {
  shadowColor: '#000',
  shadowOffset: {width: 0, height: 4},
  shadowOpacity: 0.25,
  shadowRadius: 8,
  elevation: 6,
};

const StoriesandlghstravlJokeCard = ({
  item,
  isDarkCard,
}: {
  item: StoriesandlghstravlJokeItem;
  isDarkCard: boolean;
}) => {
  const {isSaved, toggleSaved} = useStoriesandlghstravlJokePrefs();
  const saved = isSaved(item.id);

  return (
    <LinearGradient
      colors={
        isDarkCard
          ? ['#1E0F0BCC', '#1E0F0BCC']
          : ['rgba(217, 58, 26, 0.1)', 'rgba(242, 106, 46, 0.15)']
      }
      style={[styles.storiesandlghstravlsavdJokeCard]}>
      <View style={styles.storiesandlghstravlsavdJokeCardInner}>
        <Text style={styles.storiesandlghstravlsavdJokeText}>{item.text}</Text>
        <View style={styles.storiesandlghstravlsavdJokeActions}>
          <TouchableOpacity
            style={[
              styles.storiesandlghstravlsavdIconCircle,
              saved && {backgroundColor: '#FFD36A33', borderColor: '#FFD36A66'},
            ]}
            activeOpacity={0.8}
            onPress={() => toggleSaved(item.id)}>
            <Image
              source={
                saved
                  ? require('../../assets/i/storiesandlgsaved.png')
                  : require('../../assets/i/storiesandlgsave.png')
              }
            />
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
};

const StoriesandlghstravlsavdCategoriesView = ({
  onPickCategory,
}: {
  onPickCategory: (categoryId: string) => void;
}) => {
  const {width} = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const gap = 12;
  const pad = 20;
  const cardW = (width - pad * 2 - gap) / 2;

  return (
    <Storiesandlghstravllayot>
      <View
        style={[
          styles.storiesandlghstravlsavdPad,
          {paddingTop: insets.top + 16},
        ]}>
        <Text style={styles.storiesandlghstravlsavdTitle}>Jokes</Text>
        <Text style={styles.storiesandlghstravlsavdSub}>
          Humor from different cultures
        </Text>
        <View
          style={[
            styles.storiesandlghstravlsavdGrid,
            styles.storiesandlghstravlsavdGridPad,
            {paddingHorizontal: pad, gap},
          ]}>
          {storiesandlghstravlJokeCategories.map(cat => (
            <Pressable
              key={cat.id}
              onPress={() => onPickCategory(cat.id)}
              style={({pressed}) => [
                {width: cardW},
                storiesandlghstravlCardShadow,
                pressed && {opacity: 0.92},
              ]}>
              <LinearGradient
                colors={['rgba(217, 58, 26, 0.1)', 'rgba(242, 106, 46, 0.15)']}
                style={styles.storiesandlghstravlsavdCatCard}>
                <View style={styles.storiesandlghstravlsavdCatCardInner}>
                  <Image
                    source={cat.coverImage}
                    style={styles.storiesandlghstravlsavdCatImg}
                  />
                  <Text style={styles.storiesandlghstravlsavdCatName}>
                    {cat.name}
                  </Text>
                  <Text style={styles.storiesandlghstravlsavdCatCount}>
                    {cat.jokeCount} jokes
                  </Text>
                </View>
              </LinearGradient>
            </Pressable>
          ))}
        </View>
      </View>
    </Storiesandlghstravllayot>
  );
};

const StoriesandlghstravlsavdListView = ({
  categoryId,
  onBack,
}: {
  categoryId: string;
  onBack: () => void;
}) => {
  const insets = useSafeAreaInsets();
  const category = storiesandlghstravlGetJokeCategory(categoryId);
  const jokes = useMemo(
    () => storiesandlghstravlGetJokesForCategory(categoryId),
    [categoryId],
  );

  if (!category) {
    return null;
  }

  const renderItem = ({
    item,
    index,
  }: {
    item: StoriesandlghstravlJokeItem;
    index: number;
  }) => (
    <StoriesandlghstravlJokeCard item={item} isDarkCard={index % 2 === 1} />
  );

  return (
    <Storiesandlghstravllayot>
      <View
        style={[
          styles.storiesandlghstravlsavdListWrap,
          {paddingTop: insets.top + 8},
        ]}>
        <View style={styles.storiesandlghstravlsavdListHeader}>
          <TouchableOpacity
            onPress={onBack}
            style={styles.storiesandlghstravlsavdBackBtn}
            activeOpacity={0.8}>
            <Image source={require('../../assets/i/storiesandlgback.png')} />
            <Text style={styles.storiesandlghstravlsavdBackText}>Back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.storiesandlghstravlsavdListTitleRow}>
          <Image source={category.coverImage} />
          <Text style={styles.storiesandlghstravlsavdRegionTitle}>
            {category.name}
          </Text>
        </View>
        <FlatList
          data={jokes}
          keyExtractor={j => j.id}
          scrollEnabled={false}
          renderItem={renderItem}
          contentContainerStyle={styles.storiesandlghstravlsavdListContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Storiesandlghstravllayot>
  );
};

const Storiesandlghstravljoks = () => {
  const [
    storiesandlghstravlSelectedCategoryId,
    setStoriesandlghstravlSelectedCategoryId,
  ] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      setStoriesandlghstravlSelectedCategoryId(null);
    }, []),
  );

  useEffect(() => {
    if (
      storiesandlghstravlSelectedCategoryId === 'greece' ||
      storiesandlghstravlSelectedCategoryId === 'scandinavia' ||
      storiesandlghstravlSelectedCategoryId === 'china'
    ) {
      storiesandlghstravlIncAchvRead(
        storiesandlghstravlSelectedCategoryId,
      ).catch(() => {});
    }
  }, [storiesandlghstravlSelectedCategoryId]);

  return (
    <StoriesandlghstravlJokePrefsProvider>
      {storiesandlghstravlSelectedCategoryId ? (
        <StoriesandlghstravlsavdListView
          categoryId={storiesandlghstravlSelectedCategoryId}
          onBack={() => setStoriesandlghstravlSelectedCategoryId(null)}
        />
      ) : (
        <StoriesandlghstravlsavdCategoriesView
          onPickCategory={setStoriesandlghstravlSelectedCategoryId}
        />
      )}
    </StoriesandlghstravlJokePrefsProvider>
  );
};

export default Storiesandlghstravljoks;

const styles = StyleSheet.create({
  storiesandlghstravlsavdGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  storiesandlghstravlsavdGridPad: {
    marginTop: 24,
  },
  storiesandlghstravlsavdCatCard: {
    backgroundColor: 'rgba(119, 46, 15, 0.2)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 211, 106, 0.2)',
  },

  storiesandlghstravlsavdPad: {
    paddingBottom: 120,
  },
  storiesandlghstravlsavdTitle: {
    fontFamily: 'Cormorant-Bold',
    fontSize: 36,
    color: '#FFFFFF',
    paddingHorizontal: 20,
  },
  storiesandlghstravlsavdSub: {
    fontFamily: 'Commissioner-Regular',
    fontSize: 14,
    color: '#FFFFFFB3',
    marginTop: 6,
    paddingHorizontal: 20,
  },

  storiesandlghstravlsavdCatCardInner: {
    padding: 22,
    paddingLeft: 20,
  },
  storiesandlghstravlsavdCatImg: {
    marginBottom: 11,
    resizeMode: 'contain',
  },
  storiesandlghstravlsavdCatName: {
    fontFamily: 'Cormorant-SemiBold',
    fontSize: 17,
    color: '#FFFFFF',
  },
  storiesandlghstravlsavdCatCount: {
    fontFamily: 'Commissioner-Medium',
    fontSize: 13,
    color: '#FFFFFF99',
    marginTop: 5,
  },
  storiesandlghstravlsavdListWrap: {
    flex: 1,
    paddingBottom: 8,
  },
  storiesandlghstravlsavdListHeader: {
    paddingHorizontal: 16,
  },
  storiesandlghstravlsavdBackBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingRight: 12,
  },
  storiesandlghstravlsavdBackText: {
    fontFamily: 'Commissioner-Medium',
    fontSize: 17,
    color: '#FFD966',
  },
  storiesandlghstravlsavdListTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    marginTop: 8,
    marginBottom: 16,
  },
  storiesandlghstravlsavdRegionTitle: {
    fontFamily: 'Cormorant-SemiBold',
    fontSize: 28,
    color: '#FFFFFF',
  },
  storiesandlghstravlsavdListContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
    gap: 16,
  },
  storiesandlghstravlsavdJokeCard: {
    borderRadius: 24,
    backgroundColor: 'rgba(119, 46, 15, 0.2)',
    borderWidth: 1.2,
    borderColor: '#3A1C16',
    minHeight: 160,
  },
  storiesandlghstravlsavdJokeCardInner: {
    padding: 18,
  },
  storiesandlghstravlsavdJokeText: {
    fontFamily: 'Commissioner-Regular',
    fontSize: 14,
    lineHeight: 18,
    color: '#FFFFFFF0',
  },
  storiesandlghstravlsavdJokeActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
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
});

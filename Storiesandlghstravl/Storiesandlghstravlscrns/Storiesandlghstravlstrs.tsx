import {
  StoriesandlghstravlStoryPrefsProvider,
  useStoriesandlghstravlStoryPrefs,
} from './storiesandlghstravlstoryprefsctx';

import {createStackNavigator} from '@react-navigation/stack';

import type {StackScreenProps} from '@react-navigation/stack';
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
  storiesandlghstravlGetCategory,
  storiesandlghstravlGetStoriesForCategory,
  storiesandlghstravlGetStory,
  storiesandlghstravlStoryBody,
  storiesandlghstravlStoryCategories,
  type StoriesandlghstravlStoryCategory,
  type StoriesandlghstravlStoryItem,
} from './storiesandlghstravlstoriesdata';

import {storiesandlghstravlIncAchvRead} from './storiesandlghstravlachvstore';
import LinearGradient from 'react-native-linear-gradient';
import {useFocusEffect} from '@react-navigation/native';

export type StoriesandlghstravlStoriesStackParamList = {
  StoriesandlghstravlstrsHome: undefined;
  StoriesandlghstravlstrsList: {categoryId: string};
  StoriesandlghstravlstrsDetail: {storyId: string};
};

const StoriesandlghstravlStoriesStack =
  createStackNavigator<StoriesandlghstravlStoriesStackParamList>();

const storiesandlghstravlCardShadow = {
  shadowColor: '#000',
  shadowOffset: {width: 0, height: 4},
  shadowOpacity: 0.25,
  shadowRadius: 8,
  elevation: 6,
};

const StoriesandlghstravlstrsListCard = ({
  item,
  category,
  onOpen,
}: {
  item: StoriesandlghstravlStoryItem;
  category: StoriesandlghstravlStoryCategory;
  onOpen: () => void;
}) => {
  const {
    isSaved: storiesandlghstravlIsSaved,
    getRating: storiesandlghstravlGetRating,
    toggleSaved: storiesandlghstravlToggleSaved,
  } = useStoriesandlghstravlStoryPrefs();
  const storiesandlghstravlSaved = storiesandlghstravlIsSaved(item.id);
  const storiesandlghstravlRating = storiesandlghstravlGetRating(item.id);

  return (
    <LinearGradient
      colors={['rgba(217, 58, 26, 0.1)', 'rgba(242, 106, 46, 0.15)']}
      style={[styles.storiesandlghstravlstrsListCard]}>
      <View style={{}}>
        <Pressable
          onPress={onOpen}
          style={({pressed}) => [pressed && {opacity: 0.96}]}>
          <Image
            source={item.image}
            style={styles.storiesandlghstravlstrsListHero}
            resizeMode="cover"
          />
          <View style={styles.storiesandlghstravlstrsListCardBody}>
            <View
              style={[
                styles.storiesandlghstravlstrsPill,
                {
                  width: 85,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}>
              <Text style={styles.storiesandlghstravlstrsPillText}>
                {category.name}
              </Text>
            </View>
            <Text style={styles.storiesandlghstravlstrsListTitle}>
              {item.title}
            </Text>
          </View>
        </Pressable>
        <View style={styles.storiesandlghstravlstrsListCardFooter}>
          <View style={styles.storiesandlghstravlstrsListActionsLeft}>
            <TouchableOpacity
              style={[
                styles.storiesandlghstravlstrsIconCircle,
                storiesandlghstravlSaved && {
                  backgroundColor: '#FFD36A33',
                  borderColor: '#FFD36A66',
                },
              ]}
              activeOpacity={0.8}
              onPress={() => storiesandlghstravlToggleSaved(item.id)}>
              <Image
                source={
                  storiesandlghstravlSaved
                    ? require('../../assets/i/storiesandlgsaved.png')
                    : require('../../assets/i/storiesandlgsave.png')
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.storiesandlghstravlstrsIconCircle}
              activeOpacity={0.8}
              onPress={() =>
                Share.share({
                  title: item.title,
                  message: `${item.title}\n\n${storiesandlghstravlStoryBody(
                    item,
                  ).slice(0, 280)}…`,
                })
              }>
              <Image source={require('../../assets/i/storiesandlgshr.png')} />
            </TouchableOpacity>
          </View>
          {storiesandlghstravlRating > 0 ? (
            <View style={styles.storiesandlghstravlstrsListStars}>
              {[1, 2, 3].map(star => (
                <Image
                  key={star}
                  source={
                    storiesandlghstravlRating >= star
                      ? require('../../assets/i/storiesandlgbratesv.png')
                      : require('../../assets/i/storiesandlgbrates.png')
                  }
                  style={styles.storiesandlghstravlstrsListStarImg}
                  resizeMode="contain"
                />
              ))}
            </View>
          ) : null}
        </View>
      </View>
    </LinearGradient>
  );
};

const StoriesandlghstravlstrsHomeScreen = ({
  navigation,
}: StackScreenProps<
  StoriesandlghstravlStoriesStackParamList,
  'StoriesandlghstravlstrsHome'
>) => {
  const {width} = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const gap = 12;
  const pad = 20;
  const cardW = (width - pad * 2 - gap) / 2;

  return (
    <Storiesandlghstravllayot>
      <View
        style={[
          styles.storiesandlghstravlstrsPad,
          {paddingTop: insets.top + 16},
        ]}>
        <Text style={styles.storiesandlghstravlstrsFolkTitle}>Folk Tales</Text>
        <Text style={styles.storiesandlghstravlstrsFolkSub}>
          Funny Stories from ancient cultures
        </Text>
        <View
          style={[
            styles.storiesandlghstravlstrsGrid,
            styles.storiesandlghstravlstrsGridPad,
            {paddingHorizontal: pad, gap},
          ]}>
          {storiesandlghstravlStoryCategories.map(cat => (
            <Pressable
              key={cat.id}
              onPress={() =>
                navigation.navigate('StoriesandlghstravlstrsList', {
                  categoryId: cat.id,
                })
              }
              style={({pressed}) => [
                {width: cardW},
                storiesandlghstravlCardShadow,
                pressed && {opacity: 0.92},
              ]}>
              <LinearGradient
                colors={['rgba(217, 58, 26, 0.1)', 'rgba(242, 106, 46, 0.15)']}
                style={styles.storiesandlghstravlstrsCatCard}>
                <View style={{padding: 22, paddingLeft: 20}}>
                  <Image
                    source={cat.coverImage}
                    style={styles.storiesandlghstravlstrsCatImg}
                  />
                  <Text style={styles.storiesandlghstravlstrsCatName}>
                    {cat.name}
                  </Text>
                  <Text style={styles.storiesandlghstravlstrsCatCount}>
                    {cat.storyCount} stories
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

const StoriesandlghstravlstrsListScreen = ({
  navigation,
  route,
}: StackScreenProps<
  StoriesandlghstravlStoriesStackParamList,
  'StoriesandlghstravlstrsList'
>) => {
  const insets = useSafeAreaInsets();
  const {revision: storiesandlghstravlPrefsRevision} =
    useStoriesandlghstravlStoryPrefs();
  const [storiesandlghstravlFocusTick, setStoriesandlghstravlFocusTick] =
    useState(0);
  const category = storiesandlghstravlGetCategory(route.params.categoryId);
  const stories = useMemo(
    () => storiesandlghstravlGetStoriesForCategory(route.params.categoryId),
    [route.params.categoryId],
  );

  useFocusEffect(
    useCallback(() => {
      setStoriesandlghstravlFocusTick(t => t + 1);
    }, []),
  );

  if (!category) {
    return null;
  }

  const storiesandlghstravlRenderCard = ({
    item,
  }: {
    item: StoriesandlghstravlStoryItem;
  }) => (
    <StoriesandlghstravlstrsListCard
      item={item}
      category={category}
      onOpen={() =>
        navigation.navigate('StoriesandlghstravlstrsDetail', {storyId: item.id})
      }
    />
  );

  return (
    <Storiesandlghstravllayot>
      <View
        style={[
          styles.storiesandlghstravlstrsListWrap,
          {paddingTop: insets.top + 8},
        ]}>
        <View style={styles.storiesandlghstravlstrsListHeader}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.storiesandlghstravlstrsBackBtn}
            activeOpacity={0.8}>
            <Image source={require('../../assets/i/storiesandlgback.png')} />
            <Text style={styles.storiesandlghstravlstrsBackText}>Back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.storiesandlghstravlstrsListTitleRow}>
          <Image source={category.coverImage} />
          <Text style={styles.storiesandlghstravlstrsRegionTitle}>
            {category.name}
          </Text>
        </View>
        <FlatList
          data={stories}
          keyExtractor={s => s.id}
          extraData={{
            storiesandlghstravlPrefsRevision,
            storiesandlghstravlFocusTick,
          }}
          scrollEnabled={false}
          renderItem={storiesandlghstravlRenderCard}
          style={styles.storiesandlghstravlstrsListFlat}
          contentContainerStyle={styles.storiesandlghstravlstrsListContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Storiesandlghstravllayot>
  );
};

const StoriesandlghstravlstrsDetailScreen = ({
  navigation,
  route,
}: StackScreenProps<
  StoriesandlghstravlStoriesStackParamList,
  'StoriesandlghstravlstrsDetail'
>) => {
  const insets = useSafeAreaInsets();
  const story = storiesandlghstravlGetStory(route.params.storyId);
  const category = story
    ? storiesandlghstravlGetCategory(story.categoryId)
    : undefined;
  const {
    isSaved: storiesandlghstravlIsSaved,
    getRating: storiesandlghstravlGetRating,
    toggleSaved: storiesandlghstravlToggleSaved,
    setStoryRating: storiesandlghstravlSetStoryRating,
  } = useStoriesandlghstravlStoryPrefs();
  const storiesandlghstravlSaved = storiesandlghstravlIsSaved(story?.id ?? '');
  const storiesandlghstravlRating = storiesandlghstravlGetRating(
    story?.id ?? '',
  );

  const storiesandlghstravlShare = useCallback(() => {
    if (!story) {
      return;
    }
    Share.share({
      title: story.title,
      message: `${story.title}\n\n${storiesandlghstravlStoryBody(story)}`,
    });
  }, [story]);

  useEffect(() => {
    const cat = story?.categoryId;
    if (cat === 'greece' || cat === 'scandinavia' || cat === 'china') {
      storiesandlghstravlIncAchvRead(cat).catch(() => {});
    }
  }, [story?.categoryId]);

  if (!story || !category) {
    return null;
  }

  return (
    <Storiesandlghstravllayot>
      <View
        style={[
          styles.storiesandlghstravlstrsDetailRoot,
          {paddingTop: insets.top + 8},
        ]}>
        <View style={styles.storiesandlghstravlstrsDetailTopBar}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.storiesandlghstravlstrsDetailCircleBtn}
            activeOpacity={0.85}>
            <Image source={require('../../assets/i/storiesandlgbackar.png')} />
          </TouchableOpacity>
          <View style={styles.storiesandlghstravlstrsPill}>
            <Text style={styles.storiesandlghstravlstrsPillText}>
              {category.name}
            </Text>
          </View>
          <View style={styles.storiesandlghstravlstrsFlex1} />
          <TouchableOpacity
            onPress={() => storiesandlghstravlToggleSaved(story.id)}
            style={[
              styles.storiesandlghstravlstrsDetailCircleBtn,
              storiesandlghstravlSaved && {
                backgroundColor: '#FFD36A33',
                borderColor: '#FFD36A66',
              },
            ]}
            activeOpacity={0.85}>
            <Image
              source={
                storiesandlghstravlSaved
                  ? require('../../assets/i/storiesandlgsaved.png')
                  : require('../../assets/i/storiesandlgsave.png')
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={storiesandlghstravlShare}
            style={[
              styles.storiesandlghstravlstrsDetailCircleBtn,
              styles.storiesandlghstravlstrsDetailShareBtn,
            ]}
            activeOpacity={0.85}>
            <Image source={require('../../assets/i/storiesandlgshr.png')} />
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.storiesandlghstravlstrsDetailScrollContent,
            {paddingBottom: insets.bottom + 74},
          ]}>
          <Image
            source={story.image}
            style={styles.storiesandlghstravlstrsDetailHero}
            resizeMode="cover"
          />
          <Text style={styles.storiesandlghstravlstrsDetailTitle}>
            {story.title}
          </Text>
          <LinearGradient
            colors={['rgba(217, 58, 26, 0.08)', 'rgba(242, 106, 46, 0.12)']}
            style={styles.storiesandlghstravlstrsStoryBox}>
            <View style={{padding: 22}}>
              <Text style={styles.storiesandlghstravlstrsStoryText}>
                {storiesandlghstravlStoryBody(story)}
              </Text>
            </View>
          </LinearGradient>
          <LinearGradient
            colors={['rgba(217, 58, 26, 0.08)', 'rgba(242, 106, 46, 0.12)']}
            style={styles.storiesandlghstravlstrsRateBox}>
            <View style={{padding: 22}}>
              <Text style={styles.storiesandlghstravlstrsRateTitle}>
                Rate this story
              </Text>
              <View style={styles.storiesandlghstravlstrsRateRow}>
                {[1, 2, 3].map(star => (
                  <TouchableOpacity
                    key={star}
                    style={[styles.storiesandlghstravlstrsRateBtn]}
                    onPress={() =>
                      storiesandlghstravlSetStoryRating(story.id, star)
                    }
                    activeOpacity={0.85}>
                    <Image
                      style={{width: 28, height: 28}}
                      source={
                        storiesandlghstravlRating >= star
                          ? require('../../assets/i/storiesandlgbratesv.png')
                          : require('../../assets/i/storiesandlgbrates.png')
                      }
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </LinearGradient>
        </View>
      </View>
    </Storiesandlghstravllayot>
  );
};

const Storiesandlghstravlstrs = () => {
  useFocusEffect(useCallback(() => {}, []));

  return (
    <StoriesandlghstravlStoryPrefsProvider>
      <StoriesandlghstravlStoriesStack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {backgroundColor: 'transparent'},
        }}>
        <StoriesandlghstravlStoriesStack.Screen
          name="StoriesandlghstravlstrsHome"
          component={StoriesandlghstravlstrsHomeScreen}
        />
        <StoriesandlghstravlStoriesStack.Screen
          name="StoriesandlghstravlstrsList"
          component={StoriesandlghstravlstrsListScreen}
        />
        <StoriesandlghstravlStoriesStack.Screen
          name="StoriesandlghstravlstrsDetail"
          component={StoriesandlghstravlstrsDetailScreen}
        />
      </StoriesandlghstravlStoriesStack.Navigator>
    </StoriesandlghstravlStoryPrefsProvider>
  );
};

const styles = StyleSheet.create({
  storiesandlghstravlstrsCatCard: {
    backgroundColor: 'rgba(119, 46, 15, 0.2)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 211, 106, 0.2)',
  },

  storiesandlghstravlstrsCatImg: {
    marginBottom: 11,
    resizeMode: 'contain',
  },
  storiesandlghstravlstrsCatName: {
    fontFamily: 'Cormorant-SemiBold',
    fontSize: 17,
    color: '#FFFFFF',
  },

  storiesandlghstravlstrsPad: {
    paddingBottom: 120,
  },
  storiesandlghstravlstrsFolkTitle: {
    fontFamily: 'Cormorant-Bold',
    fontSize: 36,
    color: '#FFFFFF',
    paddingHorizontal: 20,
  },
  storiesandlghstravlstrsFolkSub: {
    fontFamily: 'Commissioner-Regular',
    fontSize: 14,
    color: '#FFFFFFB3',
    marginTop: 6,
    paddingHorizontal: 20,
  },
  storiesandlghstravlstrsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  storiesandlghstravlstrsGridPad: {
    marginTop: 24,
  },
  storiesandlghstravlstrsFlex1: {
    flex: 1,
  },

  storiesandlghstravlstrsCatCount: {
    fontFamily: 'Commissioner-Medium',
    fontSize: 13,
    color: '#FFFFFF99',
    marginTop: 5,
  },
  storiesandlghstravlstrsListWrap: {
    flex: 1,
    paddingBottom: 8,
  },
  storiesandlghstravlstrsListFlat: {
    flex: 1,
  },
  storiesandlghstravlstrsListHeader: {
    paddingHorizontal: 16,
  },
  storiesandlghstravlstrsBackBtn: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  storiesandlghstravlstrsBackText: {
    fontFamily: 'Commissioner-Medium',
    fontSize: 15,
    color: '#FFD36A',
  },
  storiesandlghstravlstrsListTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    marginTop: 8,
    marginBottom: 19,
  },

  storiesandlghstravlstrsListTitleIcon: {
    width: 44,
    height: 44,
  },
  storiesandlghstravlstrsRegionTitle: {
    fontFamily: 'Cormorant-Bold',
    fontSize: 30,
    color: '#FFFFFF',
  },
  storiesandlghstravlstrsListContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    gap: 16,
  },
  storiesandlghstravlstrsListCard: {
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: 'rgba(119, 46, 15, 0.2)',
    borderWidth: 1,
    borderColor: '#3A1C16',
  },
  storiesandlghstravlstrsListHero: {
    width: '100%',
    height: 131,
  },
  storiesandlghstravlstrsListCardBody: {
    padding: 16,
  },
  storiesandlghstravlstrsPill: {
    backgroundColor: '#FFD36A1A',
    borderRadius: 20,
    paddingHorizontal: 12,
    borderWidth: 1,
    minHeight: 26,
    justifyContent: 'center',
    borderColor: 'rgba(255, 211, 106, 0.35)',
  },
  storiesandlghstravlstrsPillText: {
    fontFamily: 'Commissioner-Medium',
    fontSize: 12,
    color: '#FFD966',
  },
  storiesandlghstravlstrsListTitle: {
    fontFamily: 'Cormorant-SemiBold',
    fontSize: 20,
    color: '#FFFFFF',
    marginTop: 10,
    lineHeight: 24,
    width: '70%',
  },
  storiesandlghstravlstrsListActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 14,
  },
  storiesandlghstravlstrsListCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 2,
  },
  storiesandlghstravlstrsListActionsLeft: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  storiesandlghstravlstrsListStars: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  storiesandlghstravlstrsListStarImg: {
    width: 24,
    height: 24,
  },
  storiesandlghstravlstrsIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.2,
    borderColor: '#3A1C16',
    backgroundColor: '#FFD36A0D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  storiesandlghstravlstrsIconStar: {
    fontSize: 20,
    color: '#FFD966',
  },
  storiesandlghstravlstrsIconShare: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  storiesandlghstravlstrsDetailRoot: {
    flex: 1,
    paddingHorizontal: 16,
  },
  storiesandlghstravlstrsDetailScroll: {
    flex: 1,
    paddingHorizontal: 3,
  },
  storiesandlghstravlstrsDetailScrollContent: {
    paddingBottom: 8,
  },
  storiesandlghstravlstrsDetailShareBtn: {
    marginLeft: 8,
  },
  storiesandlghstravlstrsDetailTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  storiesandlghstravlstrsDetailCircleBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFD36A0D',
    borderWidth: 1.2,
    borderColor: '#3A1C16',
    alignItems: 'center',
    justifyContent: 'center',
  },
  storiesandlghstravlstrsDetailBackArrow: {
    fontSize: 26,
    color: '#FFD966',
    marginTop: -2,
  },
  storiesandlghstravlstrsDetailStar: {
    fontSize: 20,
    color: '#FFFFFFAA',
  },
  storiesandlghstravlstrsDetailStarOn: {
    color: '#FFD966',
  },
  storiesandlghstravlstrsDetailHero: {
    width: '100%',
    height: 190,
    borderRadius: 24,
    marginBottom: 24,

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 1,
    shadowRadius: 18,
    elevation: 6,
  },
  storiesandlghstravlstrsDetailTitle: {
    fontFamily: 'Cormorant-SemiBold',
    fontSize: 22,
    color: '#FFFFFF',
    marginBottom: 16,
    lineHeight: 28,
    width: '70%',
  },
  storiesandlghstravlstrsStoryBox: {
    borderRadius: 24,
    backgroundColor: 'rgba(119, 46, 15, 0.2)',
    borderWidth: 1,
    borderColor: '#3A1C16',
  },
  storiesandlghstravlstrsStoryText: {
    fontFamily: 'Commissioner-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: '#FFFFFFF0',
  },
  storiesandlghstravlstrsRateBox: {
    marginTop: 18,
    borderRadius: 24,
    backgroundColor: 'rgba(119, 46, 15, 0.2)',
    borderWidth: 1,
    borderColor: '#FFD36A33',
    marginBottom: 30,
  },
  storiesandlghstravlstrsRateTitle: {
    fontFamily: 'Cormorant-SemiBold',
    fontSize: 17,
    color: '#FFFFFF',
    marginBottom: 14,
  },
  storiesandlghstravlstrsRateRow: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
  },
  storiesandlghstravlstrsRateBtn: {
    width: 66,
    height: 66,
    borderRadius: 16,
    borderWidth: 1.2,
    borderColor: '#3A1C16',
    backgroundColor: '#FFD36A0D',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  storiesandlghstravlstrsRateBtnOn: {
    borderColor: '#FFD96688',
  },
  storiesandlghstravlstrsRateStar: {
    fontSize: 24,
    color: '#FFFFFF88',
  },
  storiesandlghstravlstrsRateStarOn: {
    color: '#FFD966',
  },
});

export default Storiesandlghstravlstrs;

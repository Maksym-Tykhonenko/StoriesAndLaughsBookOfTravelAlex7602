// achv

import {Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useMemo, useState} from 'react';

import Storiesandlghstravllayot from '../Storiesandlghstravlcpn/Storiesandlghstravllayot';
import {
  storiesandlghstravlGetAchvReads,
  type StoriesandlghstravlAchvReadsMap,
} from './storiesandlghstravlachvstore';

const storiesandlghstravlQuizKeyRuns = 'storiesandlghstravl_quiz_runs_v1';

const storiesandlghstravlCardShadow = {
  shadowColor: '#000',
  shadowOffset: {width: 0, height: 4},
  shadowOpacity: 0.25,
  shadowRadius: 8,
  elevation: 6,
};

function storiesandlghstravlClamp0to10(v: number): number {
  return Math.min(10, Math.max(0, Math.floor(v)));
}

const Storiesandlghstravlachv = () => {
  const insets = useSafeAreaInsets();
  const [storiesandlghstravlQuizRuns, setStoriesandlghstravlQuizRuns] =
    useState(0);
  const [storiesandlghstravlReads, setStoriesandlghstravlReads] =
    useState<StoriesandlghstravlAchvReadsMap>({});

  const storiesandlghstravlReload = useCallback(() => {
    let cancelled = false;
    (async () => {
      try {
        const [runsRaw, reads] = await Promise.all([
          AsyncStorage.getItem(storiesandlghstravlQuizKeyRuns),
          storiesandlghstravlGetAchvReads(),
        ]);
        if (cancelled) {
          return;
        }
        if (runsRaw) {
          const parsed = JSON.parse(runsRaw) as unknown;
          setStoriesandlghstravlQuizRuns(
            Array.isArray(parsed) ? parsed.length : 0,
          );
        } else {
          setStoriesandlghstravlQuizRuns(0);
        }
        setStoriesandlghstravlReads(reads);
      } catch {
        if (!cancelled) {
          setStoriesandlghstravlQuizRuns(0);
          setStoriesandlghstravlReads({});
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

  const storiesandlghstravlItems = useMemo(() => {
    const egypt = storiesandlghstravlClamp0to10(storiesandlghstravlQuizRuns);
    const greece = storiesandlghstravlClamp0to10(
      storiesandlghstravlReads.greece ?? 0,
    );
    const scandi = storiesandlghstravlClamp0to10(
      storiesandlghstravlReads.scandinavia ?? 0,
    );
    const china = storiesandlghstravlClamp0to10(
      storiesandlghstravlReads.china ?? 0,
    );

    return [
      {
        id: 'ancient-laughs',
        title: 'Ancient Laughs',
        description: 'Complete 10 quiz runs inspired by Egyptian humor.',
        icon: require('../../assets/i/storiesandlgbach1.png'),
        progress: egypt,
      },
      {
        id: 'greek-vibes',
        title: 'Greek Vibes',
        description: 'Read 10 stories or jokes set in Greece.',
        icon: require('../../assets/i/storiesandlgbach2.png'),
        progress: greece,
      },
      {
        id: 'nordic-flow',
        title: 'Nordic Flow',
        description:
          'Finish 10 calm or reflective interactions in Scandinavian content.',
        icon: require('../../assets/i/storiesandlgbach3.png'),
        progress: scandi,
      },
      {
        id: 'eastern-mood',
        title: 'Eastern Mood',
        description: 'Explore 10 stories or jokes inspired by Chinese culture.',
        icon: require('../../assets/i/storiesandlgbach4.png'),
        progress: china,
      },
    ] as const;
  }, [storiesandlghstravlQuizRuns, storiesandlghstravlReads]);

  return (
    <Storiesandlghstravllayot>
      <View
        style={[
          styles.storiesandlghstravlachvRoot,
          {paddingTop: insets.top + 16},
        ]}>
        <Text style={styles.storiesandlghstravlachvTitle}>Achievements</Text>
        <Text style={styles.storiesandlghstravlachvSub}>Your milestones</Text>

        <View style={styles.storiesandlghstravlachvList}>
          {storiesandlghstravlItems.map(item => {
            const pct = Math.round((item.progress / 10) * 100);
            const isDarkCard =
              item.id === 'greek-vibes' || item.id === 'eastern-mood';
            return (
              <LinearGradient
                key={item.id}
                colors={
                  isDarkCard
                    ? ['#1E0F0BCC', '#1E0F0BCC']
                    : ['rgba(217, 58, 26, 0.10)', 'rgba(242, 106, 46, 0.15)']
                }
                style={[
                  styles.storiesandlghstravlachvCard,

                  isDarkCard && styles.storiesandlghstravlachvCardDark,
                ]}>
                <View style={styles.storiesandlghstravlachvCardInner}>
                  <Image
                    source={item.icon}
                    style={styles.storiesandlghstravlachvIcon}
                  />
                  <View style={styles.storiesandlghstravlachvCardBody}>
                    <Text style={styles.storiesandlghstravlachvCardTitle}>
                      {item.title}
                    </Text>
                    <Text style={styles.storiesandlghstravlachvCardDesc}>
                      {item.description}
                    </Text>

                    <View style={styles.storiesandlghstravlachvMetaRow}>
                      <Text style={styles.storiesandlghstravlachvMetaLeft}>
                        {item.progress} / 10
                      </Text>
                      <Text style={styles.storiesandlghstravlachvMetaRight}>
                        {pct}%
                      </Text>
                    </View>

                    <View style={styles.storiesandlghstravlachvTrack}>
                      <LinearGradient
                        colors={['#FFD36A', '#FF8A2B']}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        style={[
                          styles.storiesandlghstravlachvFill,
                          {width: `${Math.max(0, Math.min(100, pct))}%`},
                        ]}
                      />
                    </View>
                  </View>
                </View>
              </LinearGradient>
            );
          })}
        </View>
      </View>
    </Storiesandlghstravllayot>
  );
};

export default Storiesandlghstravlachv;

const styles = StyleSheet.create({
  storiesandlghstravlachvMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  storiesandlghstravlachvMetaLeft: {
    fontFamily: 'Commissioner-SemiBold',
    fontSize: 12,
    color: '#FFD966',
  },

  storiesandlghstravlachvRoot: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  storiesandlghstravlachvTitle: {
    fontFamily: 'Cormorant-Bold',
    fontSize: 36,
    color: '#FFFFFF',
    marginBottom: 6,
  },

  storiesandlghstravlachvSub: {
    fontFamily: 'Commissioner-Regular',
    fontSize: 14,
    color: '#FFFFFF99',
    marginBottom: 18,
  },
  storiesandlghstravlachvList: {
    gap: 14,
    paddingBottom: 110,
  },
  storiesandlghstravlachvCard: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#3A1C16',
    backgroundColor: 'rgba(119, 46, 15, 0.2)',
    overflow: 'hidden',
    minHeight: 150,
  },
  storiesandlghstravlachvCardDark: {
    borderColor: '#FFD36A33',
  },
  storiesandlghstravlachvCardInner: {
    flexDirection: 'row',
    padding: 18,
    gap: 14,
    alignItems: 'center',
  },
  storiesandlghstravlachvIcon: {
    resizeMode: 'contain',
  },
  storiesandlghstravlachvCardBody: {
    flex: 1,
  },
  storiesandlghstravlachvCardTitle: {
    fontFamily: 'Cormorant-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 6,
  },
  storiesandlghstravlachvCardDesc: {
    fontFamily: 'Commissioner-Regular',
    fontSize: 12,
    color: '#FFFFFF99',
    lineHeight: 16,
    marginBottom: 10,
  },

  storiesandlghstravlachvMetaRight: {
    fontFamily: 'Commissioner-Regular',
    fontSize: 12,
    color: '#FFFFFF99',
  },
  storiesandlghstravlachvTrack: {
    height: 8,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 211, 106, 0.20)',
    overflow: 'hidden',
  },
  storiesandlghstravlachvFill: {
    height: 6,
    borderRadius: 6,
    overflow: 'hidden',
  },
});

import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useMemo, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Storiesandlghstravllayot from '../Storiesandlghstravlcpn/Storiesandlghstravllayot';

type StoriesandlghstravlQuizRun = {
  ranAtIso: string;
  avgScore: number;
};

const storiesandlghstravlQuizKeyRuns = 'storiesandlghstravl_quiz_runs_v1';

const storiesandlghstravlCardShadow = {
  shadowColor: '#000',
  shadowOffset: {width: 0, height: 4},
  shadowOpacity: 0.25,
  shadowRadius: 8,
  elevation: 6,
};

const storiesandlghstravlTierColors = {
  1: {border: '#D93A1A', bg: '#D93A1A40'},
  2: {border: '#FFD36A', bg: '#FFD36A40)'},
  3: {border: '#4D94FF', bg: '#4D94FF40'},
  4: {border: '#34D399', bg: '#34D39940'},
} as const;

function storiesandlghstravlTierForAvgScore(avgScore: number): 1 | 2 | 3 | 4 {
  if (!Number.isFinite(avgScore) || avgScore <= 0) {
    return 1;
  }
  const rounded = Math.round(avgScore);
  return Math.min(4, Math.max(1, rounded)) as 1 | 2 | 3 | 4;
}

function storiesandlghstravlFormatDate(d: Date): string {
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
}

function storiesandlghstravlFormatTime(d: Date): string {
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

const Storiesandlghstreslt = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [storiesandlghstravlRuns, setStoriesandlghstravlRuns] = useState<
    StoriesandlghstravlQuizRun[]
  >([]);

  const storiesandlghstravlReload = useCallback(() => {
    let cancelled = false;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(storiesandlghstravlQuizKeyRuns);
        if (cancelled) {
          return;
        }
        if (!raw) {
          setStoriesandlghstravlRuns([]);
          return;
        }
        const parsed = JSON.parse(raw) as unknown;
        if (!Array.isArray(parsed)) {
          setStoriesandlghstravlRuns([]);
          return;
        }
        const cleaned: StoriesandlghstravlQuizRun[] = [];
        for (const x of parsed) {
          if (!x || typeof x !== 'object') {
            continue;
          }
          const ranAtIso = (x as any).ranAtIso;
          const avgScore = (x as any).avgScore;
          if (typeof ranAtIso === 'string' && typeof avgScore === 'number') {
            cleaned.push({ranAtIso, avgScore});
          }
        }
        setStoriesandlghstravlRuns(cleaned);
      } catch {
        if (!cancelled) {
          setStoriesandlghstravlRuns([]);
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

  const storiesandlghstravlRunsNewestFirst = useMemo(() => {
    return [...storiesandlghstravlRuns].sort(
      (a, b) => new Date(b.ranAtIso).getTime() - new Date(a.ranAtIso).getTime(),
    );
  }, [storiesandlghstravlRuns]);

  const storiesandlghstravlGoQuiz = useCallback(() => {
    (navigation as any).navigate('Storiesandlghstravlquz');
  }, [navigation]);

  const renderItem = ({
    item,
    index,
  }: {
    item: StoriesandlghstravlQuizRun;
    index: number;
  }) => {
    const d = new Date(item.ranAtIso);
    const tier = storiesandlghstravlTierForAvgScore(item.avgScore);
    const c = storiesandlghstravlTierColors[tier];
    const isDarkCard = index % 2 === 1;

    return (
      <LinearGradient
        colors={
          isDarkCard
            ? ['#1E0F0BCC', '#1E0F0BCC']
            : ['rgba(217, 58, 26, 0.08)', 'rgba(242, 106, 46, 0.12)']
        }
        style={[styles.card]}>
        <View style={styles.cardInner}>
          <Text style={styles.date}>{storiesandlghstravlFormatDate(d)}</Text>
          <Text style={styles.time}>{storiesandlghstravlFormatTime(d)}</Text>
          <View
            style={[
              styles.scorePill,
              {borderColor: c.border, backgroundColor: c.bg},
            ]}>
            <Text style={[styles.scoreNum, {color: c.border}]}>
              {item.avgScore.toFixed(1)}
            </Text>
            <Text style={styles.scoreSlash}> / 4</Text>
          </View>
        </View>
      </LinearGradient>
    );
  };

  return (
    <Storiesandlghstravllayot>
      <View
        style={[
          styles.storiesandlghstravlstRoot,
          {paddingTop: insets.top + 16},
        ]}>
        <Text style={styles.storiesandlghstravlstTitle}>Quiz Results</Text>

        {storiesandlghstravlRunsNewestFirst.length === 0 ? (
          <View style={styles.storiesandlghstravlstEmptyWrap}>
            <Text style={styles.storiesandlghstravlstEmptyTitle}>
              No Results Yet
            </Text>
            <Text style={styles.storiesandlghstravlstEmptySub}>
              Take the quiz to see your scores and track your{'\n'}progress over
              time
            </Text>
            <Image
              source={require('../../assets/i/storiesandlghon5.png')}
              style={styles.storiesandlghstravlstEmptyImg}
            />
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={storiesandlghstravlGoQuiz}
              style={styles.storiesandlghstravlstCtaShadow}>
              <LinearGradient
                colors={['#2A5CFF', '#2D1AD9', '#1429B5']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.storiesandlghstravlstCta}>
                <Text style={styles.storiesandlghstravlstCtaText}>
                  Take Quiz
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.storiesandlghstravlstListWrap}>
            <FlatList
              data={storiesandlghstravlRunsNewestFirst}
              keyExtractor={(x, idx) => `${x.ranAtIso}-${idx}`}
              renderItem={renderItem}
              scrollEnabled={false}
              contentContainerStyle={styles.storiesandlghstravlstListContent}
              showsVerticalScrollIndicator={false}
            />
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={storiesandlghstravlGoQuiz}
              style={styles.storiesandlghstravlstCtaShadowWide}>
              <LinearGradient
                colors={['#2A5CFF', '#2D1AD9', '#1429B5']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.storiesandlghstravlstCta}>
                <Text style={styles.storiesandlghstravlstCtaText}>
                  Take Quiz
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Storiesandlghstravllayot>
  );
};

export default Storiesandlghstreslt;

const styles = StyleSheet.create({
  scoreSlash: {
    fontFamily: 'Commissioner-Regular',
    fontSize: 14,
    color: '#FFFFFF99',
  },

  storiesandlghstravlstEmptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50,
  },

  storiesandlghstravlstRoot: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  storiesandlghstravlstTitle: {
    fontFamily: 'Cormorant-Bold',
    fontSize: 36,
    color: '#FFFFFF',
    marginBottom: 16,
  },

  storiesandlghstravlstListWrap: {
    flex: 1,
  },
  storiesandlghstravlstListContent: {
    paddingBottom: 40,
    gap: 14,
  },
  card: {
    borderRadius: 24,
    backgroundColor: 'rgba(119, 46, 15, 0.2)',
    borderWidth: 1,
    borderColor: '#3A1C16',
  },
  cardInner: {
    padding: 18,
  },
  date: {
    fontFamily: 'Commissioner-Regular',
    fontSize: 14,
    color: '#FFFFFFCC',
    marginBottom: 10,
  },
  time: {
    fontFamily: 'Commissioner-Regular',
    fontSize: 14,
    color: '#FFFFFFCC',
    marginBottom: 14,
  },
  scorePill: {
    height: 36,
    borderRadius: 18,
    borderWidth: 1.4,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  scoreNum: {
    fontFamily: 'Commissioner-SemiBold',
    fontSize: 14,
  },

  storiesandlghstravlstEmptyTitle: {
    fontFamily: 'Cormorant-SemiBold',
    fontSize: 26,
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  storiesandlghstravlstEmptySub: {
    fontFamily: 'Commissioner-Regular',
    fontSize: 13,
    color: '#FFFFFF99',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 22,
  },
  storiesandlghstravlstEmptyImg: {
    marginBottom: 18,
    marginTop: 25,
  },

  storiesandlghstravlstCtaShadow: {
    width: '92%',
    borderRadius: 16,
    shadowColor: '#0a1f8c',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 12,
  },
  storiesandlghstravlstCtaShadowWide: {
    borderRadius: 16,
    shadowColor: '#0a1f8c',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 12,
  },
  storiesandlghstravlstCta: {
    height: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storiesandlghstravlstCtaText: {
    fontFamily: 'Commissioner-SemiBold',
    fontSize: 16,
    color: '#FFFFFFF2',
  },
});

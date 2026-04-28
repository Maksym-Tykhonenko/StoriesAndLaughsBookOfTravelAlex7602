import Storiesandlghstravllayot from '../Storiesandlghstravlcpn/Storiesandlghstravllayot';
import {useFocusEffect} from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type StoriesandlghstravlQuizCategoryId =
  | 'egypt'
  | 'greece'
  | 'scandinavia'
  | 'china';

type StoriesandlghstravlQuizOption = {
  text: string;
  points: 1 | 2 | 3 | 4;
};

type StoriesandlghstravlQuizQuestion = {
  id: string;
  categoryId: StoriesandlghstravlQuizCategoryId;
  prompt: string;
  options: StoriesandlghstravlQuizOption[];
};

type StoriesandlghstravlQuizRun = {
  ranAtIso: string;
  avgScore: number; // 1..4 (or 0 if no answers)
};

const storiesandlghstravlQuizKeyRuns = 'storiesandlghstravl_quiz_runs_v1';

const storiesandlghstravlQuizQuestions: StoriesandlghstravlQuizQuestion[] = [
  {
    id: 'egypt-1',
    categoryId: 'egypt',
    prompt:
      'I asked the guide how old the pyramids are. He looked at me seriously and said:',
    options: [
      {points: 1, text: '“Very old.”'},
      {points: 2, text: '“Older than this city.”'},
      {points: 3, text: '“Older than most countries.”'},
      {points: 4, text: '“Older than your return ticket.”'},
    ],
  },
  {
    id: 'greece-1',
    categoryId: 'greece',
    prompt: 'I asked for a small portion at a Greek restaurant. They brought:',
    options: [
      {points: 1, text: 'A normal plate.'},
      {points: 2, text: 'A slightly bigger plate.'},
      {points: 3, text: 'Enough for two people.'},
      {points: 4, text: 'Enough for four — minimum.'},
    ],
  },
  {
    id: 'scandinavia-1',
    categoryId: 'scandinavia',
    prompt: 'I walked into a very quiet forest. After a minute, I felt:',
    options: [
      {points: 1, text: 'Calm.'},
      {points: 2, text: 'Peaceful.'},
      {points: 3, text: 'Slightly uncomfortable.'},
      {points: 4, text: 'The silence was watching me back.'},
    ],
  },
  {
    id: 'china-1',
    categoryId: 'china',
    prompt:
      'I bought street food without knowing what it was. After the first bite:',
    options: [
      {points: 1, text: 'It was interesting.'},
      {points: 2, text: 'It was good.'},
      {points: 3, text: 'It was really good.'},
      {points: 4, text: 'I still don’t know what it was — but it was amazing.'},
    ],
  },
];

const storiesandlghstravlQuizColors = {
  1: {border: '#D93A1A', bg: '#D93A1A40'},
  2: {border: '#FFD36A', bg: '#FFD36A40)'},
  3: {border: '#4D94FF', bg: '#4D94FF40'},
  4: {border: '#34D399', bg: '#34D39940'},
} as const;

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

function storiesandlghstravlTierForAvgScore(avgScore: number): 1 | 2 | 3 | 4 {
  if (!Number.isFinite(avgScore) || avgScore <= 0) {
    return 1;
  }
  const rounded = Math.round(avgScore);
  return Math.min(4, Math.max(1, rounded)) as 1 | 2 | 3 | 4;
}

const Storiesandlghstravlquz = () => {
  const insets = useSafeAreaInsets();
  const [storiesandlghstravlStep, setStoriesandlghstravlStep] = useState<
    'intro' | 'quiz' | 'result'
  >('intro');
  const [storiesandlghstravlIndex, setStoriesandlghstravlIndex] = useState(0);
  const [storiesandlghstravlPicked, setStoriesandlghstravlPicked] = useState<
    Record<string, 1 | 2 | 3 | 4>
  >({});
  const [storiesandlghstravlFlashPoints, setStoriesandlghstravlFlashPoints] =
    useState<1 | 2 | 3 | 4 | null>(null);
  const [storiesandlghstravlRun, setStoriesandlghstravlRun] =
    useState<StoriesandlghstravlQuizRun | null>(null);

  const storiesandlghstravlAdvancingRef = useRef(false);

  const storiesandlghstravlQuestions = useMemo(
    () => storiesandlghstravlQuizQuestions,
    [],
  );

  useFocusEffect(
    useCallback(() => {
      setStoriesandlghstravlStep('intro');
      setStoriesandlghstravlIndex(0);
      setStoriesandlghstravlRun(null);
      setStoriesandlghstravlFlashPoints(null);
      storiesandlghstravlAdvancingRef.current = false;
    }, []),
  );

  const storiesandlghstravlCurrent =
    storiesandlghstravlQuestions[storiesandlghstravlIndex];

  const storiesandlghstravlProgressLabel = `${storiesandlghstravlIndex + 1}/${
    storiesandlghstravlQuestions.length
  }`;

  const storiesandlghstravlProgressPct =
    storiesandlghstravlQuestions.length === 0
      ? 0
      : (storiesandlghstravlIndex + 1) / storiesandlghstravlQuestions.length;

  const storiesandlghstravlStart = useCallback(() => {
    setStoriesandlghstravlPicked({});
    setStoriesandlghstravlIndex(0);
    setStoriesandlghstravlRun(null);
    setStoriesandlghstravlFlashPoints(null);
    setStoriesandlghstravlStep('quiz');
    storiesandlghstravlAdvancingRef.current = false;
  }, []);

  const storiesandlghstravlFinish = useCallback(async () => {
    const total = Object.values(storiesandlghstravlPicked).reduce(
      (sum, v) => sum + v,
      0,
    );
    const avg =
      storiesandlghstravlQuestions.length === 0
        ? 0
        : total / storiesandlghstravlQuestions.length;
    const avgRounded = Math.round(avg * 10) / 10;
    const now = new Date();
    const run: StoriesandlghstravlQuizRun = {
      ranAtIso: now.toISOString(),
      avgScore: avgRounded,
    };
    setStoriesandlghstravlRun(run);
    setStoriesandlghstravlStep('result');

    try {
      const existingRaw = await AsyncStorage.getItem(
        storiesandlghstravlQuizKeyRuns,
      );
      const existing = existingRaw ? (JSON.parse(existingRaw) as unknown) : [];
      const next = Array.isArray(existing) ? [...existing, run] : [run];
      await AsyncStorage.setItem(
        storiesandlghstravlQuizKeyRuns,
        JSON.stringify(next),
      );
    } catch {
      console.error('err');
    }
  }, [storiesandlghstravlPicked, storiesandlghstravlQuestions.length]);

  const storiesandlghstravlPick = useCallback(
    (questionId: string, points: 1 | 2 | 3 | 4) => {
      if (storiesandlghstravlAdvancingRef.current) {
        return;
      }
      setStoriesandlghstravlPicked(prev => ({...prev, [questionId]: points}));
      setStoriesandlghstravlFlashPoints(points);
      storiesandlghstravlAdvancingRef.current = true;

      setTimeout(() => {
        setStoriesandlghstravlFlashPoints(null);
        setStoriesandlghstravlIndex(prev => {
          const next = prev + 1;
          if (next >= storiesandlghstravlQuestions.length) {
            setTimeout(() => {
              storiesandlghstravlAdvancingRef.current = false;
              storiesandlghstravlFinish().catch(() => {});
            }, 0);
            return prev;
          }
          storiesandlghstravlAdvancingRef.current = false;
          return next;
        });
      }, 1000);
    },
    [storiesandlghstravlFinish, storiesandlghstravlQuestions.length],
  );

  const storiesandlghstravlResultText = useMemo(() => {
    const v = storiesandlghstravlRun?.avgScore ?? 0;
    if (v >= 3.4) {
      return 'Amazing run. You definitely have a sharp humor sense.';
    }
    if (v >= 2.6) {
      return 'Nice run. Your humor sense is getting warmer.';
    }
    if (v >= 1.8) {
      return 'Good run. Your best score is still ahead.';
    }
    return 'Keep going. Try again and trust your funniest instinct.';
  }, [storiesandlghstravlRun?.avgScore]);

  const storiesandlghstravlHeroIntro = require('../../assets/i/storiesandlghon5.png');
  const storiesandlghstravlHeroQuiz = require('../../assets/i/storiesandlgbsaqzm.png');
  const storiesandlghstravlHeroQuizFlash =
    storiesandlghstravlFlashPoints === 4
      ? require('../../assets/i/storiesandlgbsaqz5.png')
      : storiesandlghstravlFlashPoints === 3
      ? require('../../assets/i/storiesandlgbsaqz4.png')
      : storiesandlghstravlFlashPoints === 2
      ? require('../../assets/i/storiesandlgbsaqz3.png')
      : storiesandlghstravlFlashPoints === 1
      ? require('../../assets/i/storiesandlgbsaqzm2.png')
      : storiesandlghstravlHeroQuiz;
  const storiesandlghstravlResultTier = storiesandlghstravlTierForAvgScore(
    storiesandlghstravlRun?.avgScore ?? 0,
  );
  const storiesandlghstravlHeroResult =
    storiesandlghstravlResultTier === 4
      ? require('../../assets/i/storiesandlgbsaqz5.png')
      : storiesandlghstravlResultTier === 3
      ? require('../../assets/i/storiesandlgbsaqz4.png')
      : storiesandlghstravlResultTier === 2
      ? require('../../assets/i/storiesandlgbsaqz3.png')
      : require('../../assets/i/storiesandlgbsaqzm2.png');

  return (
    <Storiesandlghstravllayot>
      <View
        style={[
          styles.storiesandlghstravlquzRoot,
          {paddingTop: insets.top + 16},
        ]}>
        {storiesandlghstravlStep === 'intro' ? (
          <View style={styles.storiesandlghstravlquzIntroWrap}>
            <Text style={styles.storiesandlghstravlquzTitle}>Quiz</Text>
            <Text style={styles.storiesandlghstravlquzSub}>
              Test your sense of humor
            </Text>

            <Image
              source={storiesandlghstravlHeroIntro}
              style={styles.storiesandlghstravlquzHero}
            />

            <Text style={styles.storiesandlghstravlquzIntroHeadline}>
              Humor Sense Test
            </Text>
            <Text style={styles.storiesandlghstravlquzIntroText}>
              Choose the funniest ending for each joke. The character will react
              based on your choice. Each answer has a score from 1–4, shown by
              color!
            </Text>

            <View style={styles.storiesandlghstravlquzLegendRow}>
              {[1, 2, 3, 4].map(p => (
                <View
                  key={p}
                  style={[
                    styles.storiesandlghstravlquzLegendPill,
                    {
                      borderColor:
                        storiesandlghstravlQuizColors[p as 1 | 2 | 3 | 4]
                          .border,
                      backgroundColor:
                        storiesandlghstravlQuizColors[p as 1 | 2 | 3 | 4].bg,
                    },
                  ]}>
                  <View
                    style={[
                      styles.storiesandlghstravlquzLegendDot,
                      {
                        backgroundColor:
                          storiesandlghstravlQuizColors[p as 1 | 2 | 3 | 4]
                            .border,
                      },
                    ]}
                  />
                  <Text style={styles.storiesandlghstravlquzLegendText}>
                    {p} pt{p === 1 ? '' : 's'}
                  </Text>
                </View>
              ))}
            </View>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={storiesandlghstravlStart}
              style={styles.storiesandlghstravlquzCtaShadow}>
              <LinearGradient
                colors={['#2A5CFF', '#2D1AD9', '#1429B5']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.storiesandlghstravlquzCta}>
                <Text style={styles.storiesandlghstravlquzCtaText}>
                  Start Quiz
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ) : storiesandlghstravlStep === 'quiz' && storiesandlghstravlCurrent ? (
          <View style={styles.storiesandlghstravlquzQuizWrap}>
            <View style={styles.storiesandlghstravlquzProgressRow}>
              <Text style={styles.storiesandlghstravlquzProgressText}>
                {storiesandlghstravlProgressLabel}
              </Text>
              <View style={styles.storiesandlghstravlquzProgressTrack}>
                <LinearGradient
                  colors={['#FFD36A', '#F26A2E']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={[
                    styles.storiesandlghstravlquzProgressFill,
                    {
                      width: `${Math.round(
                        storiesandlghstravlProgressPct * 100,
                      )}%`,
                    },
                  ]}
                />
              </View>
            </View>

            <Image
              source={storiesandlghstravlHeroQuizFlash}
              style={styles.storiesandlghstravlquzHeroQuiz}
            />

            <LinearGradient
              colors={['rgba(217, 58, 26, 0.1)', 'rgba(242, 106, 46, 0.15)']}
              style={styles.storiesandlghstravlquzQuestionCard}>
              <View style={{padding: 18}}>
                <Text style={styles.storiesandlghstravlquzQuestionText}>
                  {storiesandlghstravlCurrent.prompt}
                </Text>
              </View>
            </LinearGradient>

            <View style={styles.storiesandlghstravlquzOptionsWrap}>
              {storiesandlghstravlCurrent.options.map(opt => {
                const chosen =
                  storiesandlghstravlPicked[storiesandlghstravlCurrent.id];
                const isChosen = chosen === opt.points;
                const c = storiesandlghstravlQuizColors[opt.points];

                return (
                  <Pressable
                    key={`${storiesandlghstravlCurrent.id}-${opt.points}`}
                    onPress={() =>
                      storiesandlghstravlPick(
                        storiesandlghstravlCurrent.id,
                        opt.points,
                      )
                    }
                    style={[
                      styles.storiesandlghstravlquzOptionCard,
                      isChosen && {
                        borderColor: c.border,
                        backgroundColor: c.bg,
                      },
                    ]}>
                    <View
                      style={[
                        styles.storiesandlghstravlquzOptionBadge,
                        isChosen && {borderColor: c.border},
                      ]}>
                      <Text
                        style={[
                          styles.storiesandlghstravlquzOptionBadgeText,
                          isChosen && {color: c.border},
                        ]}>
                        {opt.points}
                      </Text>
                    </View>
                    <Text style={styles.storiesandlghstravlquzOptionText}>
                      {opt.text}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        ) : (
          <View style={styles.storiesandlghstravlquzResultWrap}>
            <Text style={styles.storiesandlghstravlquzTitle}>Quiz Results</Text>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Image
                source={storiesandlghstravlHeroResult}
                style={styles.storiesandlghstravlquzHeroResult}
              />

              <LinearGradient
                colors={['rgba(217, 58, 26, 0.1)', 'rgba(242, 106, 46, 0.15)']}
                style={styles.storiesandlghstravlquzResultCard}>
                <View style={{padding: 18}}>
                  <Text style={styles.storiesandlghstravlquzResultDate}>
                    {storiesandlghstravlRun
                      ? storiesandlghstravlFormatDate(
                          new Date(storiesandlghstravlRun.ranAtIso),
                        )
                      : storiesandlghstravlFormatDate(new Date())}
                  </Text>
                  <Text style={styles.storiesandlghstravlquzResultTime}>
                    {storiesandlghstravlRun
                      ? storiesandlghstravlFormatTime(
                          new Date(storiesandlghstravlRun.ranAtIso),
                        )
                      : storiesandlghstravlFormatTime(new Date())}
                  </Text>
                  <View style={styles.storiesandlghstravlquzScorePill}>
                    <Text style={styles.storiesandlghstravlquzScoreText}>
                      {(storiesandlghstravlRun?.avgScore ?? 0).toFixed(1)} / 4
                    </Text>
                  </View>
                </View>
              </LinearGradient>

              <View style={styles.storiesandlghstravlquzResultMessageCard}>
                <Text style={styles.storiesandlghstravlquzResultMessageText}>
                  {storiesandlghstravlResultText}
                </Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={storiesandlghstravlStart}
                style={[
                  styles.storiesandlghstravlquzCtaShadow,
                  {width: '99%'},
                ]}>
                <LinearGradient
                  colors={['#2A5CFF', '#2D1AD9', '#1429B5']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={[styles.storiesandlghstravlquzCta]}>
                  <Text style={styles.storiesandlghstravlquzCtaText}>
                    Take Quiz Again
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </Storiesandlghstravllayot>
  );
};

export default Storiesandlghstravlquz;

const styles = StyleSheet.create({
  storiesandlghstravlquzProgressText: {
    fontFamily: 'Commissioner-SemiBold',
    fontSize: 14,
    color: '#FFD36A',
    width: 35,
  },
  storiesandlghstravlquzProgressTrack: {
    flex: 1,
    height: 6,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 211, 106, 0.28)',
    overflow: 'hidden',
  },

  storiesandlghstravlquzRoot: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 120,
  },

  storiesandlghstravlquzTitle: {
    fontFamily: 'Cormorant-Bold',
    fontSize: 36,
    color: '#FFFFFF',
    marginBottom: 6,
  },
  storiesandlghstravlquzSub: {
    fontFamily: 'Commissioner-Regular',
    fontSize: 14,
    color: '#FFFFFF99',
  },

  storiesandlghstravlquzIntroWrap: {
    flex: 1,
  },
  storiesandlghstravlquzHero: {
    resizeMode: 'contain',
    marginTop: 18,
    marginBottom: 8,
    alignSelf: 'center',
  },
  storiesandlghstravlquzIntroHeadline: {
    fontFamily: 'Cormorant-SemiBold',
    fontSize: 24,
    color: '#FFFFFF',
    marginTop: 6,
    marginBottom: 12,
    textAlign: 'center',
  },
  storiesandlghstravlquzIntroText: {
    fontFamily: 'Commissioner-Regular',
    fontSize: 14,
    color: '#FFFFFF99',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  storiesandlghstravlquzLegendRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 18,
    justifyContent: 'center',
    marginTop: 8,
  },
  storiesandlghstravlquzLegendPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1.2,
    backgroundColor: 'rgba(0,0,0,0.15)',
    minWidth: 63,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    flexDirection: 'row',
  },
  storiesandlghstravlquzLegendText: {
    fontFamily: 'Commissioner-Medium',
    fontSize: 12,
    color: '#FFFFFFCC',
  },
  storiesandlghstravlquzLegendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },

  storiesandlghstravlquzCtaShadow: {
    width: '54%',
    alignSelf: 'center',
    borderRadius: 16,
    shadowColor: '#0a1f8c',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 12,
    marginTop: 12,
    height: 55,
  },
  storiesandlghstravlquzCta: {
    height: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storiesandlghstravlquzCtaText: {
    fontFamily: 'Commissioner-SemiBold',
    fontSize: 16,
    color: '#FFFFFFF2',
  },

  storiesandlghstravlquzQuizWrap: {
    flex: 1,
  },
  storiesandlghstravlquzProgressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },

  storiesandlghstravlquzProgressFill: {
    height: 6,
    borderRadius: 6,
    overflow: 'hidden',
  },
  storiesandlghstravlquzHeroQuiz: {
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 20,
  },
  storiesandlghstravlquzQuestionCard: {
    backgroundColor: 'rgba(119, 46, 15, 0.2)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#3A1C16',
    marginBottom: 14,
    minHeight: 120,
    justifyContent: 'center',
  },
  storiesandlghstravlquzQuestionText: {
    fontFamily: 'Commissioner-Regular',
    fontSize: 16,
    lineHeight: 22,
    color: '#FFFFFFF0',
    textAlign: 'center',
  },
  storiesandlghstravlquzOptionsWrap: {
    gap: 12,
  },
  storiesandlghstravlquzOptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 18,
    backgroundColor: '#1E0F0B99',
    borderWidth: 1.2,
    borderColor: '#3A1C16',
    minHeight: 66,
    justifyContent: 'center',
  },
  storiesandlghstravlquzOptionBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.2,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  storiesandlghstravlquzOptionBadgeText: {
    fontFamily: 'Commissioner-SemiBold',
    fontSize: 12,
    color: '#FFFFFFCC',
  },
  storiesandlghstravlquzOptionText: {
    flex: 1,
    fontFamily: 'Commissioner-Medium',
    fontSize: 14,
    color: '#FFFFFFF2',
    lineHeight: 18,
  },

  storiesandlghstravlquzResultWrap: {
    paddingBottom: 28,
    flex: 1,
  },
  storiesandlghstravlquzHeroResult: {
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  storiesandlghstravlquzResultCard: {
    backgroundColor: 'rgba(119, 46, 15, 0.2)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#3A1C16',
    marginBottom: 16,
  },
  storiesandlghstravlquzResultDate: {
    fontFamily: 'Commissioner-Regular',
    fontSize: 14,
    color: '#FFFFFFCC',
    marginBottom: 8,
  },
  storiesandlghstravlquzResultTime: {
    fontFamily: 'Commissioner-Regular',
    fontSize: 14,
    color: '#FFFFFFCC',
    marginBottom: 12,
  },
  storiesandlghstravlquzScorePill: {
    height: 30,
    borderRadius: 16,
    borderWidth: 1.2,
    borderColor: '#FFD36A',
    backgroundColor: '#FFD36A20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  storiesandlghstravlquzScoreText: {
    fontFamily: 'Commissioner-SemiBold',
    fontSize: 14,
    color: '#FFD966',
  },
  storiesandlghstravlquzResultMessageCard: {
    backgroundColor: '#1E0F0BCC',
    borderRadius: 24,
    borderWidth: 1.2,
    borderColor: '#3A1C16',
    padding: 18,
    marginBottom: 18,
    minHeight: 120,
  },
  storiesandlghstravlquzResultMessageText: {
    fontFamily: 'Commissioner-Regular',
    fontSize: 15,
    lineHeight: 20,
    color: '#FFFFFFF0',
  },
  storiesandlghstravlquzResultResetBtn: {
    alignSelf: 'center',
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  storiesandlghstravlquzResultResetText: {
    fontFamily: 'Commissioner-Medium',
    fontSize: 13,
    color: '#FFFFFF99',
  },
});

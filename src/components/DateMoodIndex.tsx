import React, {useMemo, useEffect, useRef, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {getLanguageConfig} from '../i18n';
import {StyleSheet, View, ViewStyle, Pressable, Animated} from 'react-native';

import {flex} from '../utils/styles';
import {Score} from './Score';
import {iconStyle} from './Avatar';
enum MoodStatus {
  GREATE = 1,
  NORMAL = 2,
  GOOD = 3,
  BAD = 4,
  ANONYMOUS = 5,
}

type DateMoodIndexProps = {
  score: number | null;
  mood: MoodStatus;
  date: string;
  dateData: number;
  isLast: boolean;
  timeout: number;
};

const getMoodImageSource = (mood: MoodStatus) => {
  switch (mood) {
    case MoodStatus.GOOD: {
      return require('../../assets/img/good.png');
    }
    case MoodStatus.GREATE: {
      return require('../../assets/img/greate.png');
    }
    case MoodStatus.ANONYMOUS:
    default: {
      return require('../../assets/img/anonymous.png');
    }
  }
};

export const getMoodColumnHeight = (score: number | null) => {
  score = typeof score === 'number' ? score : 20;
  return (score * 280) / 100;
};

const getMoodColumnBackgroudColor = (
  mood: MoodStatus,
  isSelect: boolean = false,
) => {
  switch (mood) {
    case MoodStatus.GOOD: {
      return isSelect ? ['#42F373', '#A1FD44'] : ['#52C873', '#52C873'];
    }
    case MoodStatus.GREATE: {
      return isSelect ? ['#FFA14A', '#FFCC4A'] : ['#FF823C', '#FF823C'];
    }
    case MoodStatus.ANONYMOUS:
    default: {
      return ['#CFCFCF', '#CFCFCF'];
    }
  }
};

// fadein
// scale
// stretch
// time bounce
// how to one by one animated ?
// setTimeout to start animate
function DateMoodIndex({
  date,
  score,
  mood,
  dateData,
  isLast,
  timeout,
}: DateMoodIndexProps) {
  const currentDay = new Date().getDay();
  const isCurrentDay = dateData === currentDay;
  const animationStateRef = useRef(false);
  const [isSelect, setIsSelect] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const handlePress = () => {
    animationStateRef.current && setIsSelect(!isSelect);
  };

  const opacityAnimate = useRef(new Animated.Value(0)).current;
  const scoreOpacityAnimate = useRef(new Animated.Value(0)).current;
  const dateOpacityAnimate = useRef(new Animated.Value(0)).current;
  const dateScaleInAnimate = useRef(new Animated.Value(0)).current;
  const scaleAnimate = useRef(new Animated.Value(0)).current;
  const heightAnimate = useRef(new Animated.Value(40)).current;
  // animationTimerManager
  // first opacityAnimate
  // in the animated progress, scecond scaleAnimate
  // opacityAnimate and scaleAnimate done, dateOpacityAnimate and dateScaleInAnimate, and heightAnimate start
  // heightAnimate done, scoreOpacityAnimate start
  // use the Composing animations

  useEffect(() => {
    const timer = setTimeout(() => {
      const animated = Animated.sequence([
        Animated.parallel([
          Animated.timing(opacityAnimate, {
            useNativeDriver: false,
            toValue: 1,
            duration: 200,
          }),
          Animated.timing(scaleAnimate, {
            useNativeDriver: true,
            toValue: 1,
            duration: 400,
          }),
        ]),
        Animated.parallel([
          Animated.timing(dateOpacityAnimate, {
            useNativeDriver: true,
            toValue: 1,
            duration: 500,
          }),
          Animated.timing(dateScaleInAnimate, {
            useNativeDriver: true,
            toValue: 1,
            duration: 500,
          }),
          // not support native driver
          Animated.timing(heightAnimate, {
            useNativeDriver: false,
            toValue: getMoodColumnHeight(score),
            duration: 400,
          }),
        ]),
      ]);

      animated.start(() => {
        setShowScore(true);
        Animated.timing(scoreOpacityAnimate, {
          useNativeDriver: true,
          toValue: 1,
          duration: 500,
        }).start(() => {
          animationStateRef.current = true;
        });
      });
    }, timeout);
    return () => {
      clearTimeout(timer);
    };
  }, [
    score,
    timeout,
    opacityAnimate,
    scoreOpacityAnimate,
    dateOpacityAnimate,
    dateScaleInAnimate,
    scaleAnimate,
    heightAnimate,
  ]);
  const marginTopStyle = {
    marginTop: showScore ? 12 : 0,
  };
  const children = (
    <>
      <Score
        animated
        value={score}
        showScore={showScore}
        style={{
          opacity: scoreOpacityAnimate,
          ...flex.justifyContentStart,
          ...marginTopStyle,
        }}
        valueStyle={styles.scoreText}
      />
      <View style={styles.moodIndexImage}>
        <Animated.Image
          style={{
            ...iconStyle,
            transform: [{scale: scaleAnimate}],
          }}
          resizeMode="cover"
          source={getMoodImageSource(mood)}
        />
      </View>
    </>
  );

  const {languageTag} = getLanguageConfig();
  const fontSize = {
    fontSize: languageTag === 'zh' ? 18 : 14,
  };
  const scoreStyle = useMemo(
    () => ({
      justifyContent: 'center',
      marginTop: 12,
    }),
    [],
  );
  const backgroundStyle = useMemo(
    () => ({
      height: getMoodColumnHeight(100),
    }),
    [],
  );
  const columnMarginStyle = {
    marginRight: isLast ? 0 : 12,
  };
  return (
    <View style={[styles.moodIndexColumn, columnMarginStyle]}>
      <Pressable onPress={handlePress}>
        {isSelect ? (
          <LinearGradient
            colors={getMoodColumnBackgroudColor(mood, isSelect)}
            style={[
              styles.moodStaticColumnBar,
              {
                height: getMoodColumnHeight(score),
              },
            ]}>
            {children}
          </LinearGradient>
        ) : (
          <View style={[flex.justifyContentEnd, backgroundStyle]}>
            <Animated.View
              style={[
                styles.moodAnimatedColumnBar,
                {
                  backgroundColor: getMoodColumnBackgroudColor(mood)[0],
                  opacity: opacityAnimate,
                  height: heightAnimate,
                },
              ]}>
              {children}
            </Animated.View>
          </View>
        )}
      </Pressable>
      <Pressable onPress={handlePress}>
        <Animated.View
          style={[
            scoreStyle as Animated.WithAnimatedObject<ViewStyle>,
            isSelect
              ? styles.moodDateSelected
              : isCurrentDay
              ? [
                  styles.moodDateCurrent,
                  {
                    transform: [{scale: dateScaleInAnimate}],
                  },
                ]
              : iconStyle,
          ]}>
          <Animated.Text
            style={[
              {
                ...styles.moodDateText,
                ...(isSelect
                  ? {
                      color: getMoodColumnBackgroudColor(mood)[0],
                    }
                  : isCurrentDay
                  ? {
                      color: '#FFFFFF',
                    }
                  : {color: '#2D2F33'}),
              },
              fontSize,
              {
                opacity: dateOpacityAnimate,
              },
            ]}>
            {date}
          </Animated.Text>
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  scoreText: {fontWeight: '800', color: '#ffffff'},
  moodIndexImage: {
    flexShrink: 1,
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 4,
    paddingHorizontal: 4,
  },
  moodIndexColumn: {
    justifyContent: 'flex-end',
    flexDirection: 'column',
    alignItems: 'center',
    flexShrink: 1,
  },
  moodStaticColumnBar: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexShrink: 1,
    borderRadius: 30,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    elevation: 4,
    shadowOffset: {height: 4, width: 10},
  },
  moodDateCurrent: {
    ...iconStyle,
    borderRadius: 8,
    backgroundColor: '#2D2F33',
  },
  moodDateSelected: {
    ...iconStyle,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    elevation: 4,
    shadowOpacity: 1,
    shadowOffset: {height: 4, width: 10},
    shadowRadius: 8,
  },
  moodAnimatedColumnBar: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexShrink: 1,
    borderRadius: 30,
  },
  moodDateText: {
    textAlign: 'center',
    textAlignVertical: 'top',
    alignContent: 'center',
    justifyContent: 'center',
    fontWeight: '500',
  },
});

export {DateMoodIndex, MoodStatus};

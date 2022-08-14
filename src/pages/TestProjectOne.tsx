import React, {useEffect, useMemo, useRef} from 'react';
import {StyleSheet, View, Animated} from 'react-native';

import {Score} from '../components/Score';
import {
  DateMoodIndex,
  getMoodColumnHeight,
  MoodStatus,
} from '../components/DateMoodIndex';
import {Avatar, avatarStyles} from '../components/Avatar';
import {translate} from '../i18n';

let id = 0;
const mockData = [
  {
    score: 86,
    mood: MoodStatus.GOOD,
    id: id++,
  },
  {
    score: 80,
    mood: MoodStatus.GOOD,
    id: id++,
  },
  {
    score: null,
    mood: MoodStatus.ANONYMOUS,
    id: id++,
  },
  {
    score: 90,
    mood: MoodStatus.GREATE,
    id: id++,
  },
  {
    score: 92,
    mood: MoodStatus.GREATE,
    id: id++,
  },
  {
    score: 97,
    mood: MoodStatus.GREATE,
    id: id++,
  },
  {
    score: 81,
    mood: MoodStatus.GOOD,
    id: id++,
  },
];
function createAnimationTimeouts(timeBounce: number, count: number = 7) {
  const timers = [timeBounce];
  for (let i = 1; i < count; i++) {
    timers[i] = timers[i - 1] + timeBounce;
  }
  return timers;
}
const animationTimeouts = createAnimationTimeouts(200);
function TestProjectOneScreen() {
  // TODO:
  const dateMap = [
    translate('sunday'),
    translate('monday'),
    translate('tuesday'),
    translate('wednesday'),
    translate('thursday'),
    translate('friday'),
    translate('saturday'),
  ];
  const opacityAnimate = useRef(new Animated.Value(0)).current;
  const maskOpacityAnimate = useRef(new Animated.Value(0)).current;
  const avatarIconStyle = useMemo(
    () => ({
      marginTop: 45,
    }),
    [],
  );
  const moodIndexStyle = useMemo(
    () => ({
      ...avatarStyles.moodIndexPoint,
      fontSize: 72,
    }),
    [],
  );
  useEffect(() => {
    Animated.timing(opacityAnimate, {
      useNativeDriver: true,
      toValue: 1,
      duration: 400,
    }).start();
    Animated.timing(maskOpacityAnimate, {
      useNativeDriver: true,
      toValue: 1,
      duration: 400,
    }).start();
  });
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.maskBackGround,
          {
            opacity: maskOpacityAnimate,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.host,
          {
            opacity: opacityAnimate,
          },
        ]}>
        <>
          <Avatar
            style={{...styles.horizontalAndVerticalCenter, ...avatarIconStyle}}
            label={translate('name')}
          />
          <Score
            value={88}
            style={styles.horizontalAndVerticalCenter}
            label={translate('weeklyAverageMoodIndex')}
            valueStyle={moodIndexStyle}
          />
          <View style={styles.topLine} />
          <View style={styles.middleLine} />
          <View style={styles.rowToEndDisplay}>
            {mockData.map(({id: _id, score, mood}, index) => {
              return (
                <DateMoodIndex
                  isLast={index === mockData.length - 1}
                  timeout={animationTimeouts[index]}
                  key={_id}
                  score={score}
                  mood={mood}
                  date={dateMap[index]}
                  dateData={index}
                />
              );
            })}
          </View>
        </>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
  },
  maskBackGround: {
    position: 'absolute',
    top: 0,
    left: 12,
    flexGrow: 1,
    width: '100%',
    height: 235,
    flexDirection: 'column',
    borderRadius: 24,
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    elevation: 4,
    shadowOffset: {height: -6, width: 16},
    shadowOpacity: 0.15,
    marginTop: 18,
  },
  host: {
    flexDirection: 'column',
    borderRadius: 24,
    backgroundColor: '#ffffff',
    marginTop: 18,
  },
  horizontalAndVerticalCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarIcon: {
    marginTop: 45,
  },
  topLine: {
    // height: StyleSheet.hairlineWidth,
    height: 2,
    marginTop: 35,
    top: 0,
    backgroundColor: '#F2F2F2',
  },
  middleLine: {
    height: 2,
    top: getMoodColumnHeight(50),
    backgroundColor: '#F2F2F2',
  },
  rowToEndDisplay: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export {TestProjectOneScreen};

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from 'react';
import type {ReactNode} from 'react';

import i18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';
import memoize from 'lodash-es/memoize';
import codePush from 'react-native-code-push';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  I18nManager,
  Image,
  ImageStyle,
  ViewStyle,
  TextStyle,
  Pressable,
  Animated,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
// currently, it's not to hotUpdate by manual operation.
// const codePushOptions = {checkFrequency: codePush.CheckFrequency.MANUAL};

const translationGetters = {
  // lazy requires
  zh: () => require('./src/i18n/zh.json'),
  en: () => require('./src/i18n/en.json'),
};

const translate = memoize(
  (key, config?: any) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);

const setI18nConfig = () => {
  // fallback if no available language fits
  const fallback = {languageTag: 'en', isRTL: false};

  const {languageTag, isRTL} =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback;

  // clear translation cache
  translate.cache.clear?.();
  // update layout direction
  I18nManager.forceRTL(isRTL);

  // set i18n-js config
  i18n.translations = {
    [languageTag]: translationGetters[languageTag as 'zh' | 'en'](),
  };

  i18n.locale = languageTag;
};

const Section: React.FC<
  PropsWithChildren<{
    title: string;
  }>
> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

function HelperScreen() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const Stack = createNativeStackNavigator();

// TOFIX: ts type
function HomeScreen({navigation}: any) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to TestProjectOne"
        onPress={() => navigation.navigate('TestProjectOne')}
      />
    </View>
  );
}

type AvatarProps = {
  label?: ReactNode;
  iconSrc?: string;
  style: ImageStyle;
};

const iconStyle: Partial<ImageStyle> = {
  width: (36 * 750) / 896,
  height: (36 * 750) / 896,
  borderRadius: (36 * 750) / 896,
};

// without icon loading and suffix word function
function Avatar({label, iconSrc, style}: AvatarProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        ...style,
      }}>
      <Image
        style={{
          ...iconStyle,
        }}
        source={iconSrc || require('./assets/img/icon.png')}
      />
      {label && (
        <Text style={{color: '#2D2F33', fontWeight: '800'}}>{label}</Text>
      )}
    </View>
  );
}

type ScoreProps = {
  value: number | null;
  style?: ViewStyle | Animated.WithAnimatedObject<ViewStyle>;
  label?: ReactNode;
  valueStyle?: TextStyle;
  animated?: boolean;
  showScore?: boolean;
};

function Score({
  value,
  style,
  label,
  valueStyle,
  animated = false,
  showScore = true,
}: ScoreProps) {
  if (value === null) {
    return <View />;
  }
  const nodes = (
    <>
      {showScore && (
        <Text
          style={{
            fontSize: 20,
            ...valueStyle,
          }}>
          {value}
        </Text>
      )}
      {label && (
        <Text
          style={{
            fontSize: 18,
            alignItems: 'center',
            textAlign: 'center',
            color: '#929292',
          }}>
          {label}
        </Text>
      )}
    </>
  );
  return !animated ? (
    <View
      style={{
        alignItems: 'center',
        ...style,
      }}>
      {nodes}
    </View>
  ) : (
    <Animated.View
      style={{
        alignItems: 'center',
        ...style,
      }}>
      {nodes}
    </Animated.View>
  );
}

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
      return require('./assets/img/good.png');
    }
    case MoodStatus.GREATE: {
      return require('./assets/img/greate.png');
    }
    case MoodStatus.ANONYMOUS:
    default: {
      return require('./assets/img/anonymous.png');
    }
  }
};

const getMoodColumnHeight = (score: number | null) => {
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
  }, [score, timeout]);
  const children = (
    <>
      <Score
        animated
        value={score}
        showScore={showScore}
        style={{
          justifyContent: 'flex-start',
          marginTop: showScore ? 12 : 0,
          opacity: scoreOpacityAnimate,
        }}
        valueStyle={{fontWeight: '800', color: '#ffffff'}}
      />
      <View
        style={{
          flexShrink: 1,
          alignSelf: 'center',
          alignItems: 'center',
          marginBottom: 4,
          paddingHorizontal: 4,
        }}>
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

  const {languageTag, isRTL} =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) || {};

  return (
    <View
      style={{
        justifyContent: 'flex-end',
        flexDirection: 'column',
        alignItems: 'center',
        marginRight: isLast ? 0 : 12,
        flexShrink: 1,
      }}>
      <Pressable onPress={handlePress}>
        {isSelect ? (
          <LinearGradient
            colors={getMoodColumnBackgroudColor(mood, isSelect)}
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: getMoodColumnHeight(score),
              flexShrink: 1,
              borderRadius: 30,
              shadowColor: 'black',
              shadowOpacity: 0.2,
              elevation: 4,
              shadowOffset: {height: 4, width: -10},
            }}>
            {children}
          </LinearGradient>
        ) : (
          <View
            style={{
              height: getMoodColumnHeight(100),
              justifyContent: 'flex-end',
            }}>
            <Animated.View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: getMoodColumnBackgroudColor(mood)[0],
                opacity: opacityAnimate,
                flexShrink: 1,
                borderRadius: 30,
                height: heightAnimate,
              }}>
              {children}
            </Animated.View>
          </View>
        )}
      </Pressable>
      <Pressable onPress={handlePress}>
        <Animated.View
          style={{
            justifyContent: 'center',
            marginTop: 12,
            ...(isSelect
              ? {
                  ...iconStyle,
                  borderRadius: 8,
                  backgroundColor: '#ffffff',
                  shadowColor: '#000000',
                  elevation: 4,
                  shadowOpacity: 1,
                  shadowOffset: {height: 4, width: -12},
                  shadowRadius: 8,
                }
              : isCurrentDay
              ? {
                  ...iconStyle,
                  borderRadius: 8,
                  backgroundColor: '#2D2F33',
                  transform: [{scale: dateScaleInAnimate}],
                }
              : iconStyle),
          }}>
          <Animated.Text
            style={{
              fontSize: languageTag === 'zh' ? 18 : 14,
              textAlign: 'center',
              textAlignVertical: 'top',
              alignContent: 'center',
              opacity: dateOpacityAnimate,
              justifyContent: 'center',
              fontWeight: '500',
              ...(isSelect
                ? {
                    color: getMoodColumnBackgroudColor(mood)[0],
                  }
                : isCurrentDay
                ? {
                    color: '#FFFFFF',
                  }
                : {color: '#2D2F33'}),
            }}>
            {date}
          </Animated.Text>
        </Animated.View>
      </Pressable>
    </View>
  );
}
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
function createAnimationTimeouts(timeBounce: number, count = 7) {
  const timers = [timeBounce];
  for (let i = 1; i < 7; i++) {
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
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingHorizontal: 12,
      }}>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 12,
          flexGrow: 1,
          width: '100%',
          height: 400,
          flexDirection: 'column',
          borderRadius: 24,
          backgroundColor: '#ffffff',
          shadowColor: '#000000',
          elevation: 4,
          shadowOffset: {height: -6, width: 16},
          shadowOpacity: 0.15,
          marginTop: 18,
          opacity: maskOpacityAnimate,
        }}
      />
      <Animated.View
        style={{
          flexDirection: 'column',
          borderRadius: 24,
          backgroundColor: '#ffffff',
          opacity: opacityAnimate,
          marginTop: 18,
        }}>
        <>
          <Avatar
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 45,
            }}
            label={translate('name')}
          />
          <Score
            value={88}
            style={{
              alignItems: 'center',
            }}
            label={translate('weeklyAverageMoodIndex')}
            valueStyle={{fontSize: 72, color: '#2D2F33', fontWeight: '800'}}
          />
          <View
            style={{
              height: 2,
              marginTop: 35,
              top: 0,
              backgroundColor: '#F2F2F2',
              // shadowColor:
            }}
          />
          <View
            style={{
              height: 2,
              top: getMoodColumnHeight(50),
              backgroundColor: '#F2F2F2',
              // shadowColor:
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
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

const App = () => {
  const forceUpdate = useState(0)[1];
  const handleLocalizationChange = useCallback(() => {
    setI18nConfig();
    forceUpdate(n => n + 1);
  }, [forceUpdate]);
  setI18nConfig();
  useEffect(() => {
    RNLocalize.addEventListener('change', handleLocalizationChange);
    return () => {
      RNLocalize.removeEventListener('change', handleLocalizationChange);
    };
  }, [handleLocalizationChange]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Helper" component={HelperScreen} />
        <Stack.Screen
          name="TestProjectOne"
          component={TestProjectOneScreen}
          options={{
            title: translate('historyMoodIndex'),
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerTitleStyle: {
              fontWeight: '500',
              fontSize: 20,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default codePush(App);

import React, {useMemo} from 'react';
import type {ReactNode} from 'react';

import {
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TextStyle,
  Animated,
} from 'react-native';

import {flex} from '../utils/styles';

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
  const fontStyle = useMemo(
    () => ({
      fontSize: 20,
    }),
    [],
  );

  if (value === null) {
    return <View />;
  }
  const nodes = (
    <>
      {showScore && <Text style={[fontStyle, valueStyle]}>{value}</Text>}
      {label && <Text style={styles.scoreTextStyle}>{label}</Text>}
    </>
  );
  return !animated ? (
    <View
      style={{
        ...flex.alignItemsCenter,
        ...(style as ViewStyle),
      }}>
      {nodes}
    </View>
  ) : (
    <Animated.View
      style={{
        ...flex.alignItemsCenter,
        ...style,
      }}>
      {nodes}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  scoreTextStyle: {
    fontSize: 18,
    alignItems: 'center',
    textAlign: 'center',
    color: '#929292',
  },
});

export {Score};

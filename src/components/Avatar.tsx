import React from 'react';
import type {ReactNode} from 'react';

import {
  StyleSheet,
  Text,
  View,
  ImageStyle,
  Image,
  ViewStyle,
} from 'react-native';

import {flex} from '../utils/styles';
type AvatarProps = {
  label?: ReactNode;
  iconSrc?: string;
  style: ViewStyle;
  imageStyle?: ImageStyle;
};

// size
export const iconStyle: Partial<ImageStyle> = {
  width: (36 * 750) / 896,
  height: (36 * 750) / 896,
  borderRadius: (36 * 750) / 896,
};

// without icon loading and suffix word function
function Avatar({label, iconSrc, style, imageStyle}: AvatarProps) {
  return (
    <View style={[style, flex.row]}>
      <Image
        style={{
          ...iconStyle,
          ...imageStyle,
        }}
        source={iconSrc || require('../../assets/img/icon.png')}
      />
      {label && <Text style={styles.moodIndexPoint}>{label}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  moodIndexPoint: {color: '#2D2F33', fontWeight: '800'},
});

export {Avatar, styles as avatarStyles};

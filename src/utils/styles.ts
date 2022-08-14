import {StyleSheet} from 'react-native';
import {useMemo} from 'react';

const flex = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  justifyContentStart: {
    justifyContent: 'flex-start',
  },
  justifyContentEnd: {
    justifyContent: 'flex-end',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
});

// eslint-disable-next-line react-hooks/exhaustive-deps
export const useCreateStaticStyle = (style: any) => useMemo(() => style, []);

export {flex};

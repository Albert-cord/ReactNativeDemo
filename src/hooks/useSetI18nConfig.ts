import {useCallback, useEffect, useState} from 'react';

import * as RNLocalize from 'react-native-localize';

import {setI18nConfig} from '../i18n';
export const useSetI18nConfig = () => {
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
};

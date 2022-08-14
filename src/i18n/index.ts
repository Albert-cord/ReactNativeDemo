import i18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';
import memoize from 'lodash-es/memoize';
import {I18nManager} from 'react-native';

// TODO:
const translationGetters = {
  // lazy requires
  zh: () => require('./i18n/lang/zh.json'),
  en: () => require('./i18n/lang/en.json'),
};

const translate = memoize(
  (key, config?: any) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);

const getLanguageConfig = () => {
  // fallback if no available language fits
  const fallback = {languageTag: 'en', isRTL: false};
  const {languageTag, isRTL} =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback;
  return {languageTag, isRTL};
};

const setI18nConfig = () => {
  const {languageTag, isRTL} = getLanguageConfig();

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

export {translate, setI18nConfig, getLanguageConfig};

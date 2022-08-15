import RNLocalize from 'react-native-localize/mock';
jest.useFakeTimers();
export default jest.mock('react-native-localize', () => RNLocalize);
export const findBestAvailableLanguage = () => null as any;

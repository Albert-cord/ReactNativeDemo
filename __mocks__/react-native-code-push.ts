const codePush = {
  InstallMode: {},
  CheckFrequency: {},
  SyncStatus: {},
  UpdateState: {},
  DeploymentStatus: {},
  DEFAULT_UPDATE_DIALOG: {},

  allowRestart: jest.fn(),
  checkForUpdate: jest.fn(() => Promise.resolve(null)),
  disallowRestart: jest.fn(),
  getCurrentPackage: jest.fn(() => Promise.resolve(null)),
  getUpdateMetadata: jest.fn(() => Promise.resolve(null)),
  notifyAppReady: jest.fn(() => Promise.resolve()),
  restartApp: jest.fn(),
  sync: jest.fn(() => Promise.resolve(1)),
  clearUpdates: jest.fn(),
};
jest.useFakeTimers();
const cb = (app: any) => app;
Object.assign(cb, codePush);
export default cb;

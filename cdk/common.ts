import { getRevision } from '../app/utils';

export interface AppSettingsProps {
  appName: string
  account: string
  region: string
}

export interface AppSettings {
  appName: string
  account: string
  region: string
  tableName: string
  revision: string
}

export const getAppSettings = (props: AppSettingsProps): AppSettings => ({
  ...props,
  tableName: `${props.appName}-table`,
  revision: getRevision(),
});

export const appSettings = getAppSettings({
  appName: 'fullstack',
  account: '525122308447',
  region: 'us-east-1',
});

export const simpleLayout = false;
export const debugMode = true;

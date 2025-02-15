import { getRevision } from '../app/utils';

export interface AppSettingsProps {
  appName: string
  account: string
  region: string
  domainName: string
  copyrightYear: number
  copyrightOwner: string
}

export interface AppSettings extends AppSettingsProps {
  tableName: string
  revision: string
}

export const getAppSettings = (props: AppSettingsProps): AppSettings => ({
  ...props,
  tableName: `${props.appName}-table`,
  // TODO: Compile revision into server bundle
  // instead of querying on the server.
  revision: getRevision(),
});

export const appSettings = getAppSettings({
  appName: 'fullstack',
  account: '525122308447',
  region: 'us-east-1',
  domainName: 'acjensen-desktop.com',
  copyrightYear: 2024,
  copyrightOwner: 'Andrew Jensen',
});

export const simpleLayout = false;
export const debugMode = true;

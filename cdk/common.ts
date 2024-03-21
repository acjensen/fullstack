export interface AppSettingsProps {
  appName: string;
  account: string;
  region: string;
}

export interface AppSettings {
  appName: string;
  account: string;
  region: string;
  tableName: string;
}

export const appSettings = (props: AppSettingsProps): AppSettings => {
  return {
    ...props,
    tableName: `${props.appName}-table`,
  };
};

export const fullStackAppSettings = appSettings({
  appName: "fullstack",
  account: "525122308447",
  region: "us-east-1",
});

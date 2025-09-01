import { AppEnvironmentEnum } from '@core/enums';
import app from 'package.json';

export const environment = {
  VERSION: app.version.toString(),
  ENV: AppEnvironmentEnum.PRODUCTION,
  BASE_URL: {
    ECOSYSTEM: 'https://eu.ecosystem.we-mind.app/api/',
    MEDIA_URL: 'https://d3j8ns7jb2lbjf.cloudfront.net/'
  }
};

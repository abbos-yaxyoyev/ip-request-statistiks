import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import path from 'path';

i18next
  .use(Backend)
  .init({
    // lng: 'lat',
    fallbackLng: 'lat',
    backend: {
      loadPath: path.join(process.cwd(), 'languages' ,'{{lng}}.json'),
    },
    detection: {
      order: ['header'],
    },
    preload: ['lat', 'cyr'],
  });

export default i18next;

import slugify from 'slugify';

export const createSlug = (title: string) => {
  return slugify(title, {
    lower: true,
    strict: true,
    locale: 'en'
  });
};
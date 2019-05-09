import etag from 'etag';
import fresh from 'fresh';
import fs from 'fs';

export function globalHostFunc(req) {
  return req.headers['x-apm-podcasthost']
    ? (global.host = req.headers['x-apm-podcasthost'])
    : (global.host = req.headers.host);
}

export function replaceTemplateStrings(template, title, meta, link, content) {
  template = template.replace(/__title__/, title);
  template = template.replace(/__meta__/, meta);
  template = template.replace(/__link__/, link);
  template = template.replace(/__content__/, content);
  template = template.replace(/\/\.\.(\/\.)?\/build/g, '');
  return template;
}

export function isFresh(req, res) {
  return fresh(req.headers, {
    etag: res.getHeader('ETag')
  });
}

export function apm_etag(str) {
  let current_etag;
  try {
    const filepath = process.env.APP_PATH === 'relative' ? './' : './current/';
    const tsfile = fs.readFileSync(`${filepath}HASH.json`).toString();
    current_etag = etag(`${str}${tsfile}`);
  } catch (_err) {
    current_etag = etag(str);
  }
  return current_etag;
}

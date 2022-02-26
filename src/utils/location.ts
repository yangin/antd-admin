/**
 * 解析location.search,成为一个对象
 * @param search location.search
 * @returns {from: string, name: string}
 */
export const locationQuery = (): any => {
  const query = {};
  window.location.search.replace(/([^?&=]+)=([^&]*)/g, (_, k, v) => {
    query[k] = v;
  });
  return query;
};

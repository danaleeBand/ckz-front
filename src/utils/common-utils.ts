import { camelCase, mapKeys, isArray } from 'lodash';

type DataObject = { [key: string]: unknown };

export const convertKeysToCamel = <T extends DataObject | Array<DataObject>>(
  data: T,
): T => {
  if (isArray(data)) {
    return data.map((item: DataObject) => convertKeysToCamel(item)) as T;
  }
  if (data !== null && typeof data === 'object') {
    return mapKeys(data, (_: unknown, key: string) => camelCase(key)) as T;
  }
  return data;
};

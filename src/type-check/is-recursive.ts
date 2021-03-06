import type { Optional } from '../Optional.type';
import type { TypeCheck } from '../TypeCheck.type';
import type { Dictionary } from '../Dictionary.type';
import { memoize } from '../memoize';
import { isArray, isNullish, isDictionary } from './is-primitive';

export const isDictionaryOf = memoize(<T> (isType: TypeCheck<T>): TypeCheck<Dictionary<T>> => {
  const result = (obj: unknown): obj is Dictionary<T> => {
    return isDictionary(obj) && Object.values(obj).every(isType);
  };
  result.TYPE_NAME = `Dictionary<${isType.TYPE_NAME ?? 'unknown'}>`;
  return result;
});

export const isOptDictionaryOf = memoize(<T> (isType: TypeCheck<T>): TypeCheck<Optional<Dictionary<T>>> => {
  const result = (obj: unknown): obj is Dictionary<T> => {
    return isNullish(obj) || isDictionary(obj) && Object.values(obj).every(isType);
  };
  result.TYPE_NAME = `Optional<Dictionary<${isType.TYPE_NAME ?? 'unknown'}>>`;
  return result;
});

export const isArrayOf = memoize(<T> (isType: TypeCheck<T>): TypeCheck<T[]> => {
  const result = (obj: unknown): obj is T[] => {
    return isArray(obj) && obj.every(isType);
  };
  result.TYPE_NAME = `${isType.TYPE_NAME ?? 'unknown'}[]`;
  return result;
});

export const isOptArrayOf = memoize(<T> (isType: TypeCheck<T>): TypeCheck<Optional<T[]>> => {
  const result = (obj: unknown): obj is T[] => {
    return isNullish(obj) || isArray(obj) && obj.every(isType);
  };
  result.TYPE_NAME = `Optional<${isType.TYPE_NAME ?? 'unknown'}[]>`;
  return result;
});
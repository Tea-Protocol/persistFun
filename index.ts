import { isEqual, remove } from 'lodash'

const persistCache: any = []

/**
 * 移除缓存的函数
 * @param fn 缓存的函数方法function
 */
export const removePersistFn = (fn) => {
  remove(persistCache, (item: any) => {
    return item.fn === fn
  })
}

/**
 * 缓存箭头函数，配套函数移除使用removePersistFn
 * @param that 当前对象 this
 * @param fn 缓存的函数方法 function
 * @param args 额外传参
 * @returns 返回缓存的函数
 */
export const persistFn = (that, fn, ...args) => {
  const persistFunc = persistCache.find((item: any) => {
    return item.fn === fn && isEqual(item.args, args)
  })
  if (persistFunc) {
    return persistFunc.func
  }
  const func = (...funcParams) => {
    fn.apply(that, [...funcParams, ...args])
  }
  persistCache.push({
    fn,
    func,
    args
  })
  return func
}

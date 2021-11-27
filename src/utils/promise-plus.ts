const delayPromise = <T>(delay: number, value?: T): Promise<T | undefined> =>
  new Promise((resolve) => setTimeout(() => resolve(value), delay));

export { delayPromise };

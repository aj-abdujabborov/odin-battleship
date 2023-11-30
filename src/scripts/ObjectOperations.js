function getRandomPropertyFromObject(object) {
  const keys = Object.keys(object);
  const key = keys[Math.floor(Math.random() * keys.length)];
  return { key, value: object[key] };
}

export { getRandomPropertyFromObject };

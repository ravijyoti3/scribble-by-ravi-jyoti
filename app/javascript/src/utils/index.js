const camelize = str =>
  str
    .toLowerCase()
    .replace(/([-][a-z0-9])|(\s[a-z0-9])/gi, m => m[1].toUpperCase());

export const buildSelectOptions = options =>
  options.map(option => ({ label: option, value: camelize(option) }));

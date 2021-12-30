function flatten(object, separator = '.') {
  const isValidObject = (value) => {
    if (!value) { return false; }
    const isArray = Array.isArray(value);
    const isBuffer = Buffer.isBuffer(value);
    const isΟbject = Object.prototype.toString.call(value) === "[object Object]";
    const hasKeys = !!Object.keys(value).length;
    return !isArray && !isBuffer && isΟbject && hasKeys;
  };
  return Object.assign({}, ...function _flatten(child, path = []) {
    return [].concat(...Object.keys(child)
      .map(key => isValidObject(child[key])
        ? _flatten(child[key], path.concat([key]))
        : { [path.concat([key]).join(separator)]: child[key] }));
  }(object));
}

export { flatten };
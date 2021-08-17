// Check conformance to Azure operationId conventions:
// - operationIds should have the form "noun_verb" with just one underscore separator [R1001, R2055]
// - get operation with pageable response should have "list" in the operationId verb [R1003]
// - get operation should have "get" or "list" in the operationId verb [R1005]
// - put operation should have "create" in the operationId verb [R1006]
// - patch operation should have "update" in the operationId verb [R1007]
// - delete operations should have "delete" in the "verb" component of the operationId [R1009]

module.exports = (targetVal, _opts, paths) => {
  // targetVal should be the operationId
  if (targetVal === null || typeof targetVal !== 'string') {
    return [];
  }
  const path = paths.target || paths.given;

  const errors = [];

  const m = targetVal.match(/[A-Za-z0-9]+_([A-Za-z0-9]+)/);
  if (!m) {
    errors.push({
      message: 'operationId should be of the form "Noun_Verb"',
      path,
    });
  }

  const verb = m ? m[1] : targetVal;
  const method = path[path.length - 2];
  const patterns = {
    get: /(get|list)/i,
    put: /create/i,
    patch: /update/i,
    delete: /delete/i,
  };
  const frags = {
    get: '"Get" or "list"',
    put: '"Create"',
    patch: '"Update"',
    delete: '"Delete"',
  };

  if (patterns[method] && !verb.match(patterns[method])) {
    errors.push({
      message: `Verb in operationId for ${method} method should contain ${frags[method]}`,
      path,
    });
  }

  return errors;
};

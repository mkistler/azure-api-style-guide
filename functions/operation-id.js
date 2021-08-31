// Check conformance to Azure operationId conventions:
// - operationIds should have the form "noun_verb" with just one underscore separator [R1001, R2055]
// - get operation with pageable response should have "list" in the operationId verb [R1003]
// - get operation should have "get" or "list" in the operationId verb [R1005]
// - put operation should have "create" in the operationId verb [R1006]
// - patch operation should have "update" in the operationId verb [R1007]
// - delete operations should have "delete" in the "verb" component of the operationId [R1009]

module.exports = (targetVal, _opts, paths) => {
  // targetVal should be an operation
  if (targetVal === null || typeof targetVal !== 'object') {
    return [];
  }
  const path = paths.target || paths.given;

  const errors = [];

  if (!targetVal.operationId) {
    // Missing operationId is caught elsewhere, so just return
    return errors;
  }

  const m = targetVal.operationId.match(/[A-Za-z0-9]+_([A-Za-z0-9]+)/);
  if (!m) {
    errors.push({
      message: 'OperationId should be of the form "Noun_Verb"',
      path: [...path, 'operationId'],
    });
  }

  const verb = m ? m[1] : targetVal.operationId;
  const method = path[path.length - 1];

  const isCreateOrUpdate = ['put', 'patch'].includes(method)
    && (targetVal.responses?.['200'] && targetVal.responses?.['201']);

  if (isCreateOrUpdate) {
    if (!verb.match(/create/i) || !verb.match(/update/i)) {
      errors.push({
        message: `OperationId for ${method} method should contain both "Create" and "Update"`,
        path: [...path, 'operationId'],
      });
    }
  } else {
    const isList = method === 'get' && targetVal['x-ms-pageable'];
    const patterns = {
      get: isList ? /list/i : /(get|list)/i,
      put: /create/i,
      patch: /update/i,
      delete: /delete/i,
    };
    const frags = {
      get: isList ? '"List"' : '"Get" or "list"',
      put: '"Create"',
      patch: '"Update"',
      delete: '"Delete"',
    };

    if (patterns[method] && !verb.match(patterns[method])) {
      // Customize message for list operation
      if (isList) {
        errors.push({
          message: 'OperationId for get method on a collection should contain "List"',
          path: [...path, 'operationId'],
        });
      } else {
        errors.push({
          message: `OperationId for ${method} method should contain ${frags[method]}`,
          path: [...path, 'operationId'],
        });
      }
    }
  }

  return errors;
};
const { linterForRule } = require('./utils');

let linter;

beforeAll(async () => {
  linter = await linterForRule('az-operation-id');
  return linter;
});

test('az-operation-id should find operationId not Noun_Verb', async () => {
  const oasDoc = {
    swagger: '2.0',
    paths: {
      '/api/test1': {
        get: {
          operationId: 'notNounVerb',
        },
        post: {
          operationId: 'fooBarBaz',
        },
      },
    },
  };
  linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(2);
    expect(results[0].path.join('.')).toBe('paths./api/test1.get.operationId');
    expect(results[1].path.join('.')).toBe('paths./api/test1.post.operationId');
    results.forEach((result) => expect(result.message).toContain(
      'operationId should be of the form "Noun_Verb"',
    ));
  });
});

test('az-operation-id should find operationId without standard verb', async () => {
  const oasDoc = {
    swagger: '2.0',
    paths: {
      '/api/test2': {
        get: {
          operationId: 'Noun_Verb',
        },
        put: {
          operationId: 'Noun_Put',
        },
        patch: {
          operationId: 'Noun_Patch',
        },
        delete: {
          operationId: 'Noun_Remove',
        },
      },
    },
  };
  linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(4);
    expect(results[0].path.join('.')).toBe('paths./api/test2.get.operationId');
    expect(results[1].path.join('.')).toBe('paths./api/test2.put.operationId');
    expect(results[2].path.join('.')).toBe('paths./api/test2.patch.operationId');
    expect(results[3].path.join('.')).toBe('paths./api/test2.delete.operationId');
    results.forEach((result) => expect(result.message).toMatch(
      /Verb in operationId for (get|put|patch|delete) method should contain/,
    ));
  });
});

test('az-operation-id should find no errors', async () => {
  const oasDoc = {
    swagger: '2.0',
    paths: {
      '/api/test3': {
        get: {
          operationId: 'Noun_Get',
        },
        put: {
          operationId: 'Noun_Create',
        },
        patch: {
          operationId: 'Noun_Update',
        },
        delete: {
          operationId: 'Noun_Delete',
        },
        post: {
          operationId: 'Noun_Anything',
        },
      },
      '/api/test4': {
        get: {
          operationId: 'Noun_List',
        },
        put: {
          operationId: 'Noun_CreateOrUpdate',
        },
        patch: {
          operationId: 'Noun_CreateOrUpdate',
        },
      },
      '/api/test5': {
        get: {
          operationId: 'noun_get',
        },
        put: {
          operationId: 'noun_create',
        },
        patch: {
          operationId: 'noun_update',
        },
        delete: {
          operationId: 'noun_delete',
        },
      },
    },
  };
  linter.run(oasDoc).then((results) => {
    expect(results.length).toBe(0);
  });
});

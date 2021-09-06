const { linterForRule } = require('./utils');

let linter;

beforeAll(async () => {
  linter = await linterForRule('az-request-body-type');
  return linter;
});

test('az-request-body-type should find errors', () => {
  const oas3Doc = {
    openapi: '3.0.1',
    paths: {
      '/test1': {
        put: {
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                },
              },
            },
          },
        },
      },
      '/test2': {
        put: {
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ArrayBody',
                },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        ArrayBody: {
          type: 'array',
        },
      },
    },
  };
  return linter.run(oas3Doc).then((results) => {
    expect(results.length).toBe(2);
    expect(results[0].path.join('.')).toBe('paths./test1.put.requestBody.content.application/json.schema.type');
    expect(results[1].path.join('.')).toBe('paths./test2.put.requestBody.content.application/json.schema.type');
  });
});

test('az-request-body-type should find no errors', () => {
  const oas3Doc = {
    openapi: '3.0.1',
    paths: {
      '/test1': {
        put: {
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                },
              },
            },
          },
        },
        post: {
          requestBody: {
            content: {
              'application/octet-stream': {
                schema: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      '/test2': {
        put: {
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ObjBody',
                },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        ObjBody: {
          type: 'object',
        },
      },
    },
  };
  return linter.run(oas3Doc).then((results) => {
    expect(results.length).toBe(0);
  });
});

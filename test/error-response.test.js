const { linterForRule } = require('./utils');

let linter;

beforeAll(async () => {
  linter = await linterForRule('az-error-response');
  return linter;
});

test('az-error-response should find errors', async () => {
  const oasDoc = {
    swagger: '2.0',
    paths: {
      '/api/Paths': {
        get: {
          responses: {
            200: {
              description: 'Success',
            },
            400: {
              description: 'Bad request',
              schema: {
                properties: {
                  code: {
                    type: 'string',
                  },
                  message: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
      },
    },
  };
  linter.run(oasDoc).then((results) => {
    expect(results.length).toBe(2);
    expect(results[0].path.join('.')).toBe('paths./api/Paths.get.responses.400');
    expect(results[0].message).toBe('Error response should contain x-ms-error-response.');
    expect(results[1].path.join('.')).toBe('paths./api/Paths.get.responses.400.schema');
    expect(results[1].message).toBe('Error response schema contain an object property named `error`.');
  });
});

test('az-error-response should find no errors', async () => {
  const oasDoc = {
    swagger: '2.0',
    paths: {
      '/api/Paths': {
        get: {
          responses: {
            200: {
              description: 'Success',
            },
            400: {
              description: 'Bad request',
              headers: {
                'x-ms-error': {
                  type: 'string',
                },
              },
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'object',
                    properties: {
                      code: {
                        type: 'string',
                      },
                      message: {
                        type: 'string',
                      },
                    },
                    required: ['code', 'message'],
                  },
                },
                required: ['error'],
              },
              'x-ms-error-response': true,
            },
          },
        },
      },
    },
  };
  linter.run(oasDoc).then((results) => {
    expect(results.length).toBe(0);
  });
});

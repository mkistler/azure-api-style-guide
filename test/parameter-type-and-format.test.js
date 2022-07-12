const { linterForRule } = require('./utils');

let linter;

beforeAll(async () => {
  linter = await linterForRule('az-parameter-type-and-format');
  return linter;
});

test('az-parameter-type-and-format should find errors', () => {
  const oasDoc = {
    swagger: '2.0',
    paths: {
      '/test1': {
        post: {
          parameters: [
            {
              name: 'param1',
              in: 'query',
              type: 'integer',
              format: 'int52',
            },
            {
              name: 'param2',
              in: 'query',
              type: 'string',
              format: 'special',
            },
          ],
        },
      },
      '/test2': {
        get: {
          parameters: [
            {
              name: 'param3',
              in: 'header',
              type: 'boolean',
              format: 'yes-or-no',
            },
            {
              name: 'param4',
              in: 'query',
              type: 'number',
            },
          ],
        },
        put: {
          parameters: [
            {
              $ref: '#/parameters/param5',
            },
          ],
        },
      },
    },
    parameters: {
      param5: {
        name: 'param5',
        in: 'query',
        type: 'number',
        format: 'exponential',
      },
    },
  };
  return linter.run(oasDoc).then((results) => {
    expect(results.length).toBe(5);
    expect(results[0].path.join('.')).toBe('paths./test1.post.parameters.0.format');
    expect(results[0].message).toBe('Parameter with type: integer has unrecognized format: int52');
    expect(results[1].path.join('.')).toBe('paths./test1.post.parameters.1.format');
    expect(results[1].message).toBe('Parameter with type: string has unrecognized format: special');
    expect(results[2].path.join('.')).toBe('paths./test2.get.parameters.0.format');
    expect(results[2].message).toBe('Parameter with type: boolean should not specify format');
    expect(results[3].path.join('.')).toBe('paths./test2.get.parameters.1');
    expect(results[3].message).toBe('Parameter with type: number should specify format');
    expect(results[4].path.join('.')).toBe('paths./test2.put.parameters.0.format');
    expect(results[4].message).toBe('Parameter with type: number has unrecognized format: exponential');
  });
});

test('az-parameter-type-and-format should find no errors', () => {
  const oasDoc = {
    swagger: '2.0',
    paths: {
      '/test1': {
        post: {
          parameters: [
            {
              name: 'param1',
              in: 'query',
              type: 'integer',
              format: 'int64',
            },
            {
              name: 'param2',
              in: 'query',
              type: 'string',
              format: 'date-time',
            },
          ],
        },
      },
      '/test2': {
        get: {
          parameters: [
            {
              name: 'param3',
              in: 'header',
              type: 'boolean',
            },
            {
              name: 'param4',
              in: 'query',
              type: 'number',
              format: 'float',
            },
          ],
        },
        put: {
          parameters: [
            {
              $ref: '#/parameters/param5',
            },
          ],
        },
      },
    },
    parameters: {
      param5: {
        name: 'param5',
        in: 'query',
        type: 'number',
        format: 'double',
      },
    },
  };
  return linter.run(oasDoc).then((results) => {
    expect(results.length).toBe(0);
  });
});

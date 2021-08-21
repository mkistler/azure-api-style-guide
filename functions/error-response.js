/*
 * Custom function to verify that error response conforms to Microsoft Azure API Guidelines.
 *
 * Check that:
 * - For all error responses, validate that:
 *   - the response contains a schema for the response body
 *   - the response body schema conforms to Azure API guidelines
 *   - the response headers contain an `x-ms-error` header definition
 * - All 4xx or 5xx responses contain x-ms-error-response: true
 */

function isArraySchema(schema) {
  return schema.type === 'array' || !!schema.items;
}

function isObjectSchema(schema) {
  return schema.type === 'object' || !!schema.properties;
}

// Validate that the schema conforms to Microsoft API Guidelines
// https://github.com/microsoft/api-guidelines/blob/vNext/Guidelines.md#7102-error-condition-responses
function validateErrorResponseSchema(errorResponseSchema, pathToSchema) {
  const errors = [];
  // The error response MUST be a single JSON object.
  if (!errorResponseSchema.properties) {
    errors.push({
      message: 'Error response schema must be an object schema.',
      path: pathToSchema,
    });
    return errors;
  }
  // This object MUST have a name/value pair named "error." The value MUST be a JSON object.
  if (!errorResponseSchema.properties.error || !errorResponseSchema.properties.error.properties) {
    errors.push({
      message: 'Error response schema should contain an object property named `error`.',
      path: pathToSchema,
    });
    return errors;
  }

  const errorSchema = errorResponseSchema.properties.error;
  const errorSchemaRequired = Array.isArray(errorSchema.required) ? errorSchema.required : [];

  if (!errorSchema.properties.code || !errorSchema.properties.code.type === 'string') {
    errors.push({
      message: 'Error schema should contain `code` field with type `string`.',
      path: [...pathToSchema, 'properties', 'code'],
    });
  } else if (!errorSchemaRequired.includes('code')) {
    errors.push({
      message: 'The `code` property of the error schema should be required.',
      path: [...pathToSchema, 'required'],
    });
  }

  if (!errorSchema.properties.message || !errorSchema.properties.message.type === 'string') {
    errors.push({
      message: 'Error schema should contain `message` field with type `string`.',
      path: [...pathToSchema, 'properties', 'message'],
    });
  } else if (!errorSchemaRequired.includes('message')) {
    errors.push({
      message: 'The `message` property of the error schema should be required.',
      path: [...pathToSchema, 'required'],
    });
  }

  // The value for the "target" name/value pair is ... the name of the property in error
  if (!!errorSchema.properties.target && errorSchema.properties.target.type !== 'string') {
    errors.push({
      message: 'The `target` property of the error schema should be type `string`.',
      path: [...pathToSchema, 'properties', 'target'],
    });
  }

  // The value for the "details" name/value pair MUST be an array of JSON objects
  if (!!errorSchema.properties.details && !isArraySchema(errorSchema.properties.details)) {
    errors.push({
      message: 'The `details` property of the error schema should be an array.',
      path: [...pathToSchema, 'properties', 'details'],
    });
  }

  // The value for the "innererror" name/value pair MUST be an object
  if (!!errorSchema.properties.innererror && !isObjectSchema(errorSchema.properties.innererror)) {
    errors.push({
      message: 'The `innererror` property of the error schema should be an object.',
      path: [...pathToSchema, 'properties', 'innererror'],
    });
  }

  return errors;
}

function validateErrorResponse(errorResponse, responsePath) {
  const errors = [];

  // The error response schema should conform to Microsoft API Guidelines
  if (!errorResponse.schema) {
    errors.push({
      message: 'Error response should have a schema.',
      path: responsePath,
    });
  } else {
    errors.push(
      ...validateErrorResponseSchema(errorResponse.schema, [...responsePath, 'schema']),
    );
  }

  // The error response should contain a x-ms-error header
  if (!errorResponse.headers || !errorResponse.headers['x-ms-error']) {
    errors.push({
      message: 'Error response should contain a x-ms-error header.',
      path: !errorResponse.headers ? responsePath : [...responsePath, 'headers'],
    });
  }

  return errors;
}

module.exports = function errorResponse(responses, _opts, paths) {
  const errors = [];
  const path = paths.target || paths.given;

  // Note: az-default-response rule will flag missing default response
  if (responses.default) {
    errors.push(
      ...validateErrorResponse(responses.default, [...path, 'default']),
    );
  }

  Object.keys(responses).filter((code) => code.match(/[45]\d\d/)).forEach((code) => {
    errors.push(
      ...validateErrorResponse(responses[code], [...path, code]),
    );

    // The error response should contain x-ms-error-response: true
    if (!(responses[code]['x-ms-error-response'])) {
      errors.push({
        message: 'Error response should contain x-ms-error-response.',
        path: [...path, code],
      });
    }
  });

  return errors;
};

// Check that format is valid for a parameter.
// Valid formats are those defined in the OpenAPI spec and extensions in autorest.
// - https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#data-types
// - https://github.com/Azure/autorest/blob/main/packages/libs/openapi/src/v3/formats.ts

// `input` is parameter that is not a body parameter
module.exports = function checkTypeAndFormat(parameter, options, { path }) {
  if (parameter === null || typeof parameter !== 'object') {
    return [];
  }

  const errors = [];

  const stringFormats = [
    // OAS-defined formats
    'byte', 'date', 'date-time', 'password', // not 'binary'
    // Additional formats recognized by autorest
    'char', 'time', 'date-time-rfc1123', 'duration', 'uuid', 'base64url', 'url',
    'odata-query', 'certificate',
  ];

  if (parameter.type === 'string') {
    if (parameter.format) {
      if (!stringFormats.includes(parameter.format)) {
        errors.push({
          message: `Parameter with type: string has unrecognized format: ${parameter.format}`,
          path: [...path, 'format'],
        });
      }
    }
  } else if (parameter.type === 'integer') {
    if (parameter.format) {
      if (!['int32', 'int64', 'unixtime'].includes(parameter.format)) {
        errors.push({
          message: `Parameter with type: integer has unrecognized format: ${parameter.format}`,
          path: [...path, 'format'],
        });
      }
    } else {
      errors.push({
        message: 'Parameter with type: integer should specify format',
        path,
      });
    }
  } else if (parameter.type === 'number') {
    if (parameter.format) {
      if (!['float', 'double', 'decimal'].includes(parameter.format)) {
        errors.push({
          message: `Parameter with type: number has unrecognized format: ${parameter.format}`,
          path: [...path, 'format'],
        });
      }
    } else {
      errors.push({
        message: 'Parameter with type: number should specify format',
        path,
      });
    }
  } else if (parameter.type === 'boolean') {
    if (parameter.format) {
      errors.push({
        message: 'Parameter with type: boolean should not specify format',
        path: [...path, 'format'],
      });
    }
  }

  return errors;
};

# Azure Ruleset

The Azure ruleset incorporates a select set of the Spectral oas rules and a collection of custom rules
to verify compliance to
the [Azure API Guidelines](https://github.com/microsoft/api-guidelines/blob/vNext/azure/Guidelines.md) and
the [Azure OpenAPI Style Guidelines](./openapi-style-guidelines.md).

## Azure Custom Rules

### ms-property-names-convention

Property names should be lowerCamelCase.

### ms-parameter-names-convention

Query parameter names should be lowerCamelCase; header parameter names should be kebab case.

### ms-success-response-body

All success responses except 202 & 204 should define a response body.

### ms-success-response-nobody

Responses for status codes 202 and 204 should have no response body.

### ms-lro-headers

A 202 response should include an Operation-Location response header.

### az-error-response

Error response body should conform to Microsoft Azure API Guidelines.

### az-version-policy

API version should not be specified in path segment.

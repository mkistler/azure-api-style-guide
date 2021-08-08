# Azure Ruleset

The Azure ruleset incorporates a select set of the Spectral oas rules and a collection of custom rules
to verify compliance to
the [Azure API Guidelines](https://github.com/microsoft/api-guidelines/blob/vNext/azure/Guidelines.md) and
the [Azure OpenAPI Style Guidelines](./openapi-style-guidelines.md).

## Azure Custom Rules

### az-delete-204-response

A delete operation should have a 204 response.

### az-error-response

Error response body should conform to Azure API Guidelines.

### az-lro-headers

A 202 response should include an Operation-Location response header.

### az-operation-summary-or-description

Operation should have a summary or description.

See [azure-openapi-validator OperationDescriptionOrSummaryRequired](https://github.com/Azure/azure-openapi-validator/blob/master/src/dotnet/OpenAPI.Validator/Validation/OperationDescriptionOrSummaryRequired.cs)

### az-parameter-names-convention

Query parameter names should be lowerCamelCase; header parameter names should be kebab case.

### az-patch-content-type

The request body content type for patch operations should be JSON merge patch.

### az-path-characters

Service-defined path segments should be restricted to 0-9 A-Z a-z - . _ ~, with : allowed only as described below to designate an action operation.

### az-property-descriptions

All schema properties should have descriptions.

### az-property-names-convention

Property names should be lowerCamelCase.

### az-patch-content-type

The request body content type for patch operations should be JSON merge patch.

### az-required-default-response

All operations should have a default (error) response.

See [azure-openapi-validator RequiredDefaultResponse](https://github.com/Azure/azure-openapi-validator/blob/master/src/typescript/azure-openapi-validator/rules/RequiredDefaultResponse.ts)

### az-schema-names-convention

Schema names should be UpperCamelCase.

### az-success-response-body

All success responses except 202 & 204 should define a response body.

### az-success-response-nobody

Responses for status codes 202 and 204 should have no response body.

### az-version-convention

API version (`info.version`) should be a date in YYYY-MM-DD format, optionally suffixed with '-preview'.

### az-version-policy

API version should not be specified in path segment, and all operations should accept `api-version` query param with date value.

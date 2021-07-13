# OpenAPI Style Guidelines

## Table of Contents

<!--
  The TOC below is generated using the `markdown-toc` node package.

      https://github.com/jonschlinkert/markdown-toc

  You should regenerate the TOC after making changes to this file.

      ./node_modules/.bin/markdown-toc -i openapi-style-guidelines.md
  -->

<!-- toc -->

- [Introduction](#introduction)
- [Schemas](#schemas)
  * [Schema names](#schema-names)
  * [Combine schemas when practical](#combine-schemas-when-practical)
  * [Descriptions](#descriptions)
  * [Use well-defined property types](#use-well-defined-property-types)
  * [Avoid reserved words](#avoid-reserved-words)
  * [Proper use of required](#proper-use-of-required)
  * [Order of properties](#order-of-properties)
  * [Order of properties in body parameter schemas](#order-of-properties-in-body-parameter-schemas)
  * [Sibling elements for refs](#sibling-elements-for-refs)
  * [Use of discriminator field](#use-of-discriminator-field)
- [Operations](#operations)
  * [Order of operations](#order-of-operations)
  * [Summary and description](#summary-and-description)
  * [OperationId](#operationid)
  * [Explicitly specify consumes type(s)](#explicitly-specify-consumes-types)
  * [Explicitly specify produces type(s)](#explicitly-specify-produces-types)
- [Parameters](#parameters)
  * [Use well-defined parameter types](#use-well-defined-parameter-types)
  * [Use refs for common parameters](#use-refs-for-common-parameters)
  * [Specify common parameters for a path in the path definition](#specify-common-parameters-for-a-path-in-the-path-definition)
  * [Do not explicitly define an `authorization` header parameter](#do-not-explicitly-define-an-authorization-header-parameter)
  * [Do not explicitly define a `content-type` header parameter](#do-not-explicitly-define-a-content-type-header-parameter)
  * [Do not explicitly define a `accept-type` header parameter](#do-not-explicitly-define-a-accept-type-header-parameter)
  * [Schemas for optional body parameters](#schemas-for-optional-body-parameters)
- [Conventions / Annotations for SDK generation](#-conventions--annotations-for-sdk-generation)

<!-- tocstop -->

<!-- --------------------------------------------------------------- -->

## Introduction

The following are guidelines for writing API descriptions for Azure using OpenAPI.
Of course, all OpenAPI documents should conform to the [OpenAPI specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md).

In addition, Azure services should adhere to the [Microsoft Azure HTTP/REST API Guidelines](https://github.com/microsoft/api-guidelines/blob/azureRestUpdates/azure/Guidelines.md).

The guidelines in this document extend and/or clarify the OpenAPI specification and Azure API Guidelines
to address aspects of API description related to the generation of client libraries
suitable for distribution in a Software Development Kit (SDK).

## Schemas

OpenAPI uses JSON Schema as the means for describing request and response body payloads.

### Schema names

Schemas that appear in the `definitions` or `components.schemas` section of an API definition are
referenced by their key in this section, or the "schema name".
Schema names should be simple, descriptive, and meaningful to developers.
Schema names should be in ["upper camel case"](https://en.wikipedia.org/wiki/Camel_case).

Good:

* `Trait`
* `Classifier`

Bad:

* `TraitTreeNode`
* `GetClassifiersTopLevelBrief`

### Combine schemas when practical

Use a single schema to describe similar, compatible objects when practical.
For example, if a "Foo" has 8 properties and a "FooPlus" has the same 8 properties as "Foo" but also two more,
it is usually preferable to combine these two schemas by adding the two additional properties from "FooPlus"
into "Foo" as optional properties.

### Descriptions

Every schema and property should have a description.
These descriptions should match the API Reference descriptions wherever practical.
Avoid describing a schema as a "JSON object" since this will be incorrect in some SDKs.
Rather, use the generic "object" in schema descriptions.

Good:

* "An object containing request parameters."

Bad:

* "JSON object containing request parameters."

### Use well-defined property types

schema properties and parameters should have well-defined type and format information.
Only use combinations of `type` and `format` defined in the
[OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#dataTypes)

Good:
```
    "matching_results": {
        "type": "integer",
        "format": "int32"
    },
```

Bad:
```
   "matching_results": {
       "type": "number",
       "format": "integer"
    },
```

In the "Bad" example, `matching_results` may appear to be defined as an integer, but the `integer` format is
not defined for type `number`, so the actual type is a floating point (generic number).
The standard tools do not warn about this because the OpenAPI spec does not restrict the values for "type" or "format".

### Avoid reserved words

Avoid using reserved words for schema/property names (for example, `error`, `return`, `type`, `input`).
See [Alternate names for properties or parameters](#alternate-names-for-properties-or-parameters) below
for a way to deal with existing properties whose names are reserved words.

### Proper use of required

Mark a property as "required" if and only if it will be present *and not null* for every instance of the schema.

### Order of properties

The properties in a schema definition should appear in the same order they should appear in the SDK.
Typically important or fundamental properties should be listed first and ancillary properties appearing last.
For example, if a schema has an "id" property that uniquely identifies an instance of the schema, that should generally appear earlier in the list of properties.
As a corollary, required properties should generally appear before optional properties in the schema definition.

### Sibling elements for refs

The JSON Schema specification does not allow "sibling" elements to a $ref -- the behavior of such elements is "undefined".
But the Azure tooling explicitly allows certain elements as siblings of $ref, including `description`.

### Use of discriminator field

The `discriminator` field of a schema can be used to create a polymorphic relationship between schemas. The `discriminator` should be specified on the superclass, although the value doesn't actually affect the relationship. The subclasses should use the `allOf` property to reference the superclass and define any additional properties.

Example:

```
    "Pet": {
        "type": "object",
        "discriminator": "pet_type",
        "properties": {
            "name": {
                "type": "string"
            },
            "age": {
                "type": "integer",
                "format": "int32"
            }
        }
    },
    "Dog": {
        "allOf": [
            {
                "$ref": "Pet"
            },
            {
                "properties": {
                    "breed": {
                        "type": "string"
                    }
                }
            }
        ]
    },
    "Hamster": {
        "allOf": [
            {
                "$ref": "Pet"
            },
            {
                "properties": {
                    "fur_color": {
                        "type": "string"
                    }
                }
            }
        ]
    }
```

Using `discriminator` allows for the `Pet` class to show up as a `parent` property for both `Dog` and `Hamster` in the SDK generator. Similarly, `allOf` will ensure that the resulting `Dog` and `Hamster` objects contain the properties derived from `Pet`.

<!-- --------------------------------------------------------------- -->

## Operations

### Order of operations

Define basic/common operations before advanced/rare operations.
Typically this order should match the order of operations in the API Reference.

### Summary and description

Each operation should have a summary and/or description.
When both a summary and description are provided, the description should include additional detail
about the operation behavior -- it should not simply restate the summary.

### OperationId

Every operation should have a unique `operationId`.
In the OpenAPI specification, `operationId`s are optional, but if specified, must be unique.
For SDK generation, `operationId`s are used as the name of the method corresponding to the operation, so it is important to include these in the OpenAPI definition file.

The `operationId` should be specific and descriptive. Here is the recommended convention:

- GET a single `Resource`: `getResource`
- GET a list of `Resource`: `listResources`
- POST a new `Resource`: `createResource` or `addResource`
- POST a partial update to a `Resource`: `updateResource`
- PUT a complete replacement to a `Resource`: `replaceResource`
- DELETE a `Resource`: `deleteResource`

### Explicitly specify consumes type(s)

All POST and PUT operations should explicitly specify their `consumes` type(s).
Note that OpenAPI V2 supports a global `consumes` setting to specify the content type(s) consumed
by any API that does not explicitly override this value.

### Explicitly specify produces type(s)

All operations should explicitly specify their `produces` type(s).
Note that OpenAPI (v2) supports a global `produces` setting to specify the content type(s) produced
by any API that does not explicitly override this value.

<!-- --------------------------------------------------------------- -->

## Parameters

### Use well-defined parameter types

Parameters should have well-defined type and format information. Only use combinations of `type` and `format` defined in the [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#dataTypes) Parameter types are further constrained by their "in" property, as specified in [OpenAPI Specification, Parameter Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#parameterObject).

Parameters that may have multiple values (for example, a comma-separated list of values) are best described as arrays of the base value type.

- In OpenAPI 2, the `collectionFormat` attribute specifies how the multiple values are represented. The default is comma-separated values (CSV).
- In OpenAPI 3, the `style` attribute specifies serialization. For path parameters, the default is `"style": "simple", which indicates an array with CSV.

Good:
```
{
    "name": "return",
    "in": "query",
    "type": "array",
    "items": {
        "type": "string"
    },
    "description": "A comma-separated list of the portion of the document hierarchy to return.",
{
```

Bad:
```
{
    "name": "return",
    "in": "query",
    "type": "string",
    "description": "A comma-separated list of the portion of the document hierarchy to return.",
{
```

### Use refs for common parameters

For any parameters that appear on multiple operations,
create a named parameter in the parameters section of the OpenAPI doc and
then use a `$ref` to reference the parameter definition from every operation
that accepts this parameter.


### Specify common parameters for a path in the path definition

Any parameter that appears on all operations of a particular path should be specified
in the parameter list for the path rather than in the parameter list for each of
the operations.
This makes the API description more concise and easy to understand.


### Do not explicitly define an `authorization` header parameter

The `authorization` header is the standard header used to pass credentials to authenticate
to a service.
However, this header parameter should not be coded explicitly in API definition,
since it is implicitly specified by the [Security Requirement](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#securityRequirementObject) for the operation or service. 
OpenAPI 3.0 requires that a "authorization" header parameter, if specified, must be ignored
[[ref](https://github.com/OAI/OpenAPI-Specification/blob/3.0.3/versions/3.0.3.md#fixed-fields-10)].


### Do not explicitly define a `content-type` header parameter

Operations that consume multiple content types often use a "content-type" header parameter to specify
the content type of data provided.
However, this header parameter should not be coded explicitly in API definition,
since it is implicitly specified by a `consumes` setting with more than one value.
OpenAPI 3.0 requires that a "content-type" header parameter, if specified, must be ignored
[[ref](https://github.com/OAI/OpenAPI-Specification/blob/3.0.3/versions/3.0.3.md#fixed-fields-10)].


### Do not explicitly define a `accept-type` header parameter

Operations that produce multiple content types often use an "accept-type" header parameter to specify
the content type of data to be returned.
However, this header parameter should not be coded explicitly in the API definition,
since it is implicitly specified by a `produces` setting with more than one value.
OpenAPI 3.0 requires that an "accept" header parameter, if specified, must be ignored
[[ref](https://github.com/OAI/OpenAPI-Specification/blob/3.0.3/versions/3.0.3.md#fixed-fields-10)].


### Schemas for optional body parameters

Don't specify required properties in the schema of an optional body parameter.
This is ambiguous and can lead to incorrect implementation on the client or server.

<!-- --------------------------------------------------------------- -->

## <a name="annotations"></a> Conventions / Annotations for SDK generation

See the [Autorest documentation on the supported specification extensions](https://github.com/Azure/autorest/tree/main/docs/extensions).

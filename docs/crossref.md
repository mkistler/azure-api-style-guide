# Cross Reference Azure Spectral Rules with azure-openapi-validator

| Rule Name | Rule ID | Azure Spectral Ruleset |
| --------- | ------- | ---------------------- |
| [OperationIdNounInVerb](#r1001) | R1001 | Add |
| [ListInOperationName](#r1003) | R1003 | Add |
| [GetInOperationName](#r1005) | R1005 | Add |
| [PutInOperationName](#r1006) | R1006 | Add |
| [PatchInOperationName](#r1007) | R1007 | Add |
| [DeleteInOperationName](#r1009) | R1009 | Add |
| [AvoidMSDNReferences](#r1010) | R1010 |  |
| [HttpsSupportedScheme](#r1011) | R1011 | Add |
| [AvoidNestedProperties](#r2001) | R2001 | Add |
| [ValidFormats](#r2003)  | R2003 | Add |
| [NonApplicationJsonType](#r2004) | R2004 | |
| [LongRunningResponseStatusCode](#r2005) | R2005 | Add |
| [ControlCharactersNotAllowed](#r2006) | R2006 |  |
| [LongRunningOperationsWithLongRunningExtension](#r2007) | R2007 | Add |
| [MutabilityWithReadOnlyRule](#r2008) | R2008 |  |
| [ArraySchemaMustHaveItems](#r2009) | R2009 | Add |
| [LongRunningOperationsOptionsValidator](#r2010) | R2010 | Add ? |
| [XmsClientNameParameter](#r2012) | R2012 |  |
| [XmsClientNameProperty](#r2013) | R2013 |  |
| [SubscriptionIdParameterInOperations](#r2014) | R2014 |  |
| [ParameterNotDefinedInGlobalParameters](#r2015) | R2015 | add for api-version |
| [PatchBodyParametersSchema](#r2016) | R2016 | Add |
| [PutRequestResponseScheme](#r2017) | R2017 |  |
| [XmsEnumValidation](#r2018) | R2018 | Add |
| [ResourceHasXMsResourceEnabled](#r2019) | R2019 |  |
| [RequiredPropertiesMissingInResourceModel](#r2020) | R2020 |  |
| [SummaryAndDescriptionMustNotBeSame](#r2023) | R2023 | Add |
| [AnonymousBodyParameter](#r2024) | R2024 | Add |
| [NextLinkPropertyMustExist](#r2025) | R2025 | Add |
| [AvoidAnonymousTypes](#r2026) | R2026 | Add |
| [DefaultMustBeInEnum](#r2027) | R2027 | Add |
| [NonEmptyClientName](#r2028) | R2028 |  |
| [PageableOperation](#r2029) | R2029 | Add |
| [InvalidVerbUsed](#r2044) | R2044 | Spectral:oas |
| [NamePropertyDefinitionInParameter](#r2047) | R2047 | Spectral:oas |
| [SecurityDefinitionsStructure](#r2054) | R2054 |  |
| [OneUnderscoreInOperationId](#r2055) | R2055 | Add |
| [RequiredReadOnlyProperties](#r2056) | R2056 | Add |
| [InvalidSkuModel](#r2057) | R2057 |  |
| [XmsPathsMustOverloadPaths](#r2058) | R2058 |  |
| [PageableRequires200Response](#r2060) | R2060 |  |
| [XmsResourceInPutResponse](#r2062) | R2062 | |
| [OperationIdNounConflictingModelNames](#r2063) | R2063 | Add |
| [LROStatusCodesReturnTypeSchema](#r2064) | R2064 | Add |
| [LicenseHeaderMustNotBeSpecified](#r2065) | R2065 |  |
| [PostOperationIdContainsUrlVerb](#r2066) | R2066 | Add |
| [BodyTopLevelProperties](#r3006) | R3006 | |
| [PutGetPatchResponseSchema](#r3007) | R3007 | Add |
| [CollectionObjectPropertiesNaming](#r3008) | R3008 | Add |
| [TrackedResourceListByImmediateParent](#r3010) | R3010 |  |
| [DescriptionMustNotBeNodeName](#r3011) | R3011 | Add |
| [APIVersionPattern](#r3012) | R3012 | Done |
| [DeleteMustNotHaveRequestBody](#r3013) | R3013 | Add |
| [BodyPropertiesNamesCamelCase](#r3014) | R3014 | Done |
| [EnumMustHaveType](#r3015) | R3015 | Add |
| [DefinitionsPropertiesNamesCamelCase](#r3016)  | R3016 | Done |
| [GuidUsage](#r3017) | R3017 |  |
| [EnumInsteadOfBoolean](#r3018) | R3018 |  |
| [ARMResourcePropertiesBag](#r3019) | R3019 |  |
| [PathResourceProviderNamePascalCase](#r3020) | R3020 |  |
| [PathResourceTypeNameCamelCase](#r3021) | R3021 |  |
| [OperationsAPIImplementation](#r3023) | R3023 |  |
| [EnumUniqueValue](#r3024) | R3024 | Add |
| [TrackedResourceGetOperation](#r3025) | R3025 | |
| [TrackedResourcePatchOperation](#r3026) | R3026 | |
| [TrackedResourceListByResourceGroup](#r3027) | R3027 |  |
| [TrackedResourceListBySubscription](#r3028) | R3028 |  |
| [EnumMustNotHaveEmptyValue](#r3024) | R3024 | Add |
| [PathResourceProviderMatchNamespace](#R3030) | R3030  | |
| [XmsPageableListByRGAndSubscriptions](#r3060) | R3060 |  |
| [ParameterDescriptionRequired](#r4000) | R4000 | Add |
| [XmsParameterLocation](#r4001) | R4001 | Add |
| [LocationMustHaveXmsMutability](#r4002) | R4002 |  |
| [OperationIdRequired](#r4004) | R4004 | Add |
| [UniqueXmsEnumName](#r4005) | R4005 | Add |
| [DeprecatedXmsCodeGenerationSetting](#r4006) | R4006 |  |
| [DefaultErrorResponseSchema](#r4007) | R4007 | Add |
| [AvoidEmptyResponseSchema](#r4008) | R4008 | Add |
| [RequiredReadOnlySystemData](#r4009) | R4009 | |
| [RequiredDefaultResponse](#r4010) | R4010 | Add |
| [DeleteOperationResponses](#r4011) | R4011 | Done | 
| [XmsPageableMustHaveCorrespondingResponse](#r4012) | R4012 | Add |
| [IntegerTypeMustHaveFormat](#r4013) | R4013 | Add |
| [AllResourcesMustHaveGetOperation](#r4014) | R4014 |  |
| [NestedResourcesMustHaveListOperation](#r4015) | R4015 |  |
| [TopLevelResourcesListByResourceGroup](#r4016) | R4016 |  |
| [TopLevelResourcesListBySubscription](#r4017) | R4017 | |
| [OperationsApiResponseSchema](#r4018) | R4018 |  |
| [GetCollectionResponseSchema](#r4019) | R4019 | Add |
| [DescriptiveDescriptionRequired](#r4000-3) | R4000-3 | Add |
| [DescriptionAndTitleMissing](#r4000-4) | R4000-4 | Add |
| [OperationDescriptionOrSummaryRequired](#r4000-5) | R4000-5 | Add |
| [PreviewVersionOverOneYear](#r4024) | R4024 |  |
| [ValidResponseCodeRequired](#r4028) | R4028 | Add |
| [UniqueClientParameterName](#r4029) | R4029 |  |
| [UniqueXmsExample](#r4030) | R4030 |  |
| [MissingXmsErrorResponse](#r4032) | R4032 | Add |
| [UniqueModelName](#r4033) | R4033 | Add |
| [AzureResourceTagsSchemaValidation](#r4034) | R4034 |  |
| [PrivateEndpointResourceSchemaValidation](#r4035) | R4035 |  |
| [ImplementPrivateEndpointAPIs](#r4036) | R4036 |  |
| [MissingTypeObject](#r4037) | R4037 | Add |

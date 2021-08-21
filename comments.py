#!/usr/bin/env python3

import json
import sys

def min_line(msgs):
  return min([x['range']['start']['line'] for x in msgs])

# Since version 3.6, the json library is now order preserving by default. 
messages = json.load(sys.stdin)

comments = []

# az-default-response

default_response = [x for x in messages if x['code'] == 'az-default-response']
if default_response:
    comments.append({
      'line': min_line(default_response),
      'text': 'All operations should have a default (error) response. '
        + f'There are {len(default_response)} operations missing a default response in this API. '
        + 'Please fix all occurrences.'
    })

# az-parameter-description

param_description = [x for x in messages if x['code'] == 'az-parameter-description']
if param_description:
    comments.append({
      'line': min_line(param_description),
      'text': 'All parameters should have a description. '
        + f'There are {len(param_description)} parameters without descriptions in this API. '
        + 'Please fix all occurrences.'
    })

# az-property-description

property_description = [x for x in messages if x['code'] == 'az-property-description']
if property_description:
    comments.append({
      'line': min_line(property_description),
      'text': 'All properties should have a description. '
        + f'There are {len(property_description)} properties without descriptions in this API. '
        + 'Please fix all occurrences.'
    })

# Schema name should be Pascal case.
# - Every one (will only be 1 per name)
# - "Schema name should be Pascal case." + suggestion

schema_names = [x for x in messages if x['code'] == 'az-schema-names']
for msg in schema_names:
    suggestion = 'TODO'
    comments.append({
      'line': msg['range']['start']['line'],
      'text': 'Schema name should be Pascal case.\n'
        + f'```Suggestion\n{suggestion}\n```'
    })

print(json.dumps(comments, indent=4))

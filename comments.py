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
    text = 'All operations should have a default (error) response.'
    if len(default_response) > 1:
        text += f' There are {len(default_response)} operations missing a default response.' \
            + ' Please fix all occurrences.'
    comments.append({
      'line': min_line(default_response),
      'text': text
    })

# az-error-response

error_response = [x for x in messages if x['code'] == 'az-error-response']
if error_response:
    # Handle each unique message separately
    msgs = { x['message'] for x in error_response }
    for text in msgs:
        occurrences = [x for x in error_response if x['message'] == text]
        if len(occurrences) > 1:
            text += f' There are {len(occurrences)} occurrences of this issue in the API. ' \
                + ' Please fix all occurrences.'
        comments.append({
          'line': min_line(occurrences),
          'text': text
        })

# az-pagination-response

pagination_response = [x for x in messages if x['code'] == 'az-pagination-response']
if pagination_response:
    # Handle each unique message separately
    msgs = { x['message'] for x in pagination_response }
    for text in msgs:
        occurrences = [x for x in pagination_response if x['message'] == text]
        if len(occurrences) > 1:
            text += f' There are {len(occurrences)} occurrences of this issue in the API. ' \
                + ' Please fix all occurrences.'
        comments.append({
          'line': min_line(occurrences),
          'text': text
        })

# az-parameter-description

param_description = [x for x in messages if x['code'] == 'az-parameter-description']
if param_description:
    text = 'All parameters should have a description.'
    if len(param_description) > 1:
        text += f' There are {len(param_description)} parameters without descriptions in this API. ' \
           + 'Please fix all occurrences.'
    comments.append({
      'line': min_line(param_description),
      'text': text,
    })

# az-property-description

property_description = [x for x in messages if x['code'] == 'az-property-description']
if property_description:
    text = 'All properties should have a description.'
    if len(property_description) > 1:
        text += f' There are {len(property_description)} properties without descriptions in this API. ' \
            + 'You should fix all occurrences of properties without a description.'
    comments.append({
      'line': min_line(property_description),
      'text': text,
    })

# az-schema-names-convention

schema_names = [x for x in messages if x['code'] == 'az-schema-names-convention']
for msg in schema_names:
    suggestion = 'TODO'
    comments.append({
      'line': msg['range']['start']['line'],
      'text': 'Schema names should be Pascal case.\n' \
          + f'```Suggestion\n{suggestion}\n```'
    })

comments.sort(key=lambda x: x['line'])
for comment in comments:
    line = comment['line']
    text = comment['text']
    print(f'line: {line}\ntext:\n{text}\n')

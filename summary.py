#!/usr/bin/env python3

import json
import sys

# Since version 3.6, the json library is now order preserving by default. 
messages = json.load(sys.stdin)

codes = {x['code'] for x in messages}

summary = []

for code in codes:
    count = len([x for x in messages if x['code'] == code])
    summary.append({
        'code': code,
        'count': count,
    })

summary.sort(key=lambda x: x['count'], reverse=True)

for elem in summary:
    code = elem['code']
    count = elem['count']
    print(f'{count:6d} {(count/len(messages))*100:.1f}% {code}')

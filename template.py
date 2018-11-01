#!/usr/bin/env python3
import json
import os
import sys


def main():
    with open('index.html.tmpl') as f:
        content = f.read().replace(
            '{templates}',
            json.dumps(sorted(filter(
                lambda name: not name.startswith('.'),
                os.listdir('templates'),
            )))
        )
    with open('index.html', 'w') as f:
        f.write(content)


if __name__ == '__main__':
    sys.exit(main())

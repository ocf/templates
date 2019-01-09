#!/usr/bin/env python3
import json
import os
import sys


def main():
    with open('/srv/www/index.html.tmpl') as f:
        content = f.read().replace(
            '{templates}',
            json.dumps(sorted(filter(
                lambda name: not name.startswith('.'),
                os.listdir('/srv/www/templates'),
            ))),
        )
    with open('/srv/www/index.html', 'w') as f:
        f.write(content)


if __name__ == '__main__':
    sys.exit(main())

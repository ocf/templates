#!/usr/bin/env python3

import json
import os
import argparse


parser = argparse.ArgumentParser(prog="templates")
parser.add_argument("index")
parser.add_argument("tpldir")
parser.add_argument("output")
args = parser.parse_args()


with open(args.index) as f:
    content = f.read().replace(
        "{templates}",
        json.dumps(
            sorted(
                filter(
                    lambda name: not name.startswith("."),
                    os.listdir(args.tpldir),
                ),
            ),
        ),
    )
with open(args.output, "w") as f:
    f.write(content)

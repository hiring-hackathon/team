#!/bin/sh -x

# find . -not -path '*/.*' | grep -i '^.\/\.'

# for i in $(find . -type d | grep -e aws -e frontend -e python -e data); do write-the docs --save $i; done

# git clone git@github.com:onsen-ai/node-doc-llm.git

cd node-doc-llm

# npm i

for i in $(find .. -not -path '*/.*' -type f); do node index.js $i $i.md; done

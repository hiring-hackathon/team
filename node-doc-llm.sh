#!/bin/sh -x

# find . -not -path '*/.*' | grep -i '^.\/\.'

# for i in $(find . -type d | grep -e aws -e frontend -e python -e data); do write-the docs --save $i; done

# git clone git@github.com:onsen-ai/node-doc-llm.git

cd node-doc-llm

# npm i

for i in $(find .. -not -path '*/.*' -type f); do node index.js $i $i.md; done

find . -type f -name '*.md' | \
xargs grep -l '# Table of Contents' | \
xargs gsed -i 1,11d

find . -type f -name '*.md' | \
xargs grep -l "\[Back to (root)\](#root)\|\[Back to top\](#table-of-contents)" | \
xargs sed -i '' '/\[Back to (root)\](#root) | \[Back to top\](#table-of-contents)/d'


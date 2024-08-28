#!/bin/sh -x

# find . -not -path '*/.*' | grep -i '^.\/\.'

# for i in $(find . -type d | grep -e aws -e frontend -e python -e data); do write-the docs --save $i; done

# pip install write-the

for i in $(find . -not -path '*/.*' -type d); do write-the docs --save $i; done

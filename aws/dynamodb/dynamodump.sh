#!/bin/sh

# https://github.com/bchew/dynamodump

# pip install dynamodump

dynamodump -m backup -r us-east-1 -s Transcriptions

dynamodump -m backup -r us-east-1 -s Comments

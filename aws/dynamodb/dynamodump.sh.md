## [dynamodump.sh](dynamodump.sh)

### Script for backing up DynamoDB tables

This script is designed to automate the backup process for DynamoDB tables using the `dynamodump` tool. The script performs backups for two specific tables, "Transcriptions" and "Comments," in the AWS region "us-east-1." The `dynamodump` tool is a Python-based utility that facilitates the backup and restore of DynamoDB tables. To use this script, ensure that `dynamodump` is installed via pip. Once executed, the script will create backups of the specified tables, which can be used for data recovery or migration purposes. This script is particularly useful for maintaining regular backups of critical DynamoDB tables in a straightforward and automated manner.

[Back to (root)](#root) | [Back to top](#table-of-contents)


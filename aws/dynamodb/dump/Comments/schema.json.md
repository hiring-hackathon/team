# Table of Contents

- [(root) (1 files)](#root)
# (root)

## List of files

- [schema.json](#schemajson)

[Back to top](#table-of-contents)

## [schema.json](schema.json)

### JSON schema defining a DynamoDB table for storing comments

This `schema.json` file defines the structure and metadata for a DynamoDB table named "Comments". The table is designed to store comments, with each comment uniquely identified by a combination of `TranscriptId` and `CommentId`. The `AttributeDefinitions` section specifies that both `CommentId` and `TranscriptId` are string attributes. The `KeySchema` section designates `TranscriptId` as the partition key (HASH) and `CommentId` as the sort key (RANGE), enabling efficient querying and retrieval of comments associated with specific transcripts.

The table's status is marked as "ACTIVE", indicating it is ready for use. The `ProvisionedThroughput` section details the read and write capacity units allocated to the table, both set to 1, which governs the table's performance and scalability. Additional metadata includes the table's creation date, size in bytes, item count, and Amazon Resource Name (ARN). The `TableClassSummary` indicates the table class as "STANDARD", and `DeletionProtectionEnabled` is set to false, meaning the table can be deleted if necessary.

The `ResponseMetadata` section provides information about the request that retrieved this schema, including the request ID, HTTP status code, headers, and the number of retry attempts. This metadata is useful for debugging and tracking the request's lifecycle.

[Back to (root)](#root) | [Back to top](#table-of-contents)


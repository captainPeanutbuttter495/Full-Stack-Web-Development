import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand
} from '@aws-sdk/lib-dynamodb';

const isLocal = process.env.NODE_ENV !== 'production';

const client = new DynamoDBClient(
  isLocal
    ? {
        endpoint: 'http://localhost:8000',
        region: 'local',
        credentials: {
          accessKeyId: 'local',
          secretAccessKey: 'local'
        }
      }
    : {}
);

const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.DYNAMODB_TABLE || 'user';

export async function getUser(username) {
  const command = new GetCommand({
    TableName: TABLE_NAME,
    Key: { username }
  });

  const response = await docClient.send(command);
  return response.Item;
}

export async function createUser(username, passwordHash, salt) {
  const command = new PutCommand({
    TableName: TABLE_NAME,
    Item: {
      username,
      passwordHash,
      salt,
      count: 1
    },
    ConditionExpression: 'attribute_not_exists(username)'
  });

  await docClient.send(command);
}

export async function incrementCount(username) {
  const command = new UpdateCommand({
    TableName: TABLE_NAME,
    Key: { username },
    UpdateExpression: 'SET #count = #count + :inc',
    ExpressionAttributeNames: { '#count': 'count' },
    ExpressionAttributeValues: { ':inc': 1 },
    ReturnValues: 'ALL_NEW'
  });

  const response = await docClient.send(command);
  return response.Attributes.count;
}

export async function getCount(username) {
  const user = await getUser(username);
  return user ? user.count : null;
}

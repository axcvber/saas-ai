import { S3Client, PutObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3'

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!,
  },
})

export async function uploadToS3(url: string, userId: string, chatId: string, fileType: string): Promise<string> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const arrayBuffer = await response.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const key = `users/${userId}/${chatId}/${fileType}/${Date.now()}-${Math.random().toString(36).substring(7)}`
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: response.headers.get('content-type') || 'application/octet-stream',
  })

  await s3Client.send(command)

  return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${key}`
}

export async function deleteAllChatFiles(userId: string, chatId: string) {
  const chatPrefix = `users/${userId}/${chatId}/`

  const listCommand = new ListObjectsV2Command({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Prefix: chatPrefix,
  })

  const listResponse = await s3Client.send(listCommand)

  if (listResponse.Contents) {
    const deletePromises = listResponse.Contents.map(async (object) => {
      if (object.Key) {
        const deleteCommand = new DeleteObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: object.Key,
        })
        await s3Client.send(deleteCommand)
      }
    })

    await Promise.all(deletePromises)
  }
}

export async function deleteUserFiles(userId: string, continuationToken?: string): Promise<void> {
  const userPrefix = `users/${userId}/`

  const listCommand = new ListObjectsV2Command({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Prefix: userPrefix,
    ContinuationToken: continuationToken,
  })

  const listResponse = await s3Client.send(listCommand)

  if (listResponse.Contents) {
    const deletePromises = listResponse.Contents.map(async (object) => {
      if (object.Key) {
        const deleteCommand = new DeleteObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: object.Key,
        })
        await s3Client.send(deleteCommand)
      }
    })

    await Promise.all(deletePromises)
  }

  if (listResponse.NextContinuationToken) {
    await deleteUserFiles(userId, listResponse.NextContinuationToken)
  }
}

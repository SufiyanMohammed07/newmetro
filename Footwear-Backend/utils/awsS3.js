import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import crypto from 'crypto';
dotenv.config();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const uploadToS3 = async (file) => {
  try {
    const uniqueId = crypto.randomBytes(16).toString("hex");
    const upload = new Upload({
      client: s3,
      params: {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${uniqueId}-${file.originalname}`, 
        Body: file.buffer,
        ContentType: file.mimetype,
      },
    });

    const result = await upload.done();

    // ✅ AWS SDK v3 returns the uploaded object's info in result.Key
    const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${result.Key}`;

    return imageUrl;
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw error;
  }
};

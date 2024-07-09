import { config } from 'dotenv';
config();

const AWSConfig = {
  access_key: process.env.AWS_CREDENTIAL_KEY,
  secret: process.env.AWS_SECRET,
  s3: {
    bucket: process.env.AWS_S3_BUCKET,
    region: process.env.AWS_S3_REGION || '',
    baseUrl: process.env.AWS_S3_BASE_URL,
  },
} as const;

export default AWSConfig;

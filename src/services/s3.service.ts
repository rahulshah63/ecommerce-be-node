import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { AWSConfig } from '@/config';

class AWSS3ervice {
  private static instance: AWSS3ervice;
  private client: S3Client;
  private bucketName: string;

  constructor() {
    if (!AWSConfig.s3.region) {
      throw new Error('S3: Missing S3 region');
    }

    this.client = new S3Client({
      region: AWSConfig.s3.region,
    });

    this.bucketName = AWSConfig.s3.bucket;
  }

  public async uploadBase64(data: string, fileName: string) {
    const base64Data = Buffer.from(data.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    const type = data.split(';')[0].split('/')[1];

    const params = {
      Bucket: this.bucketName,
      Key: `avatars/${fileName}`,
      Body: base64Data,
      ContentEncoding: 'base64',
      ContentType: `image/${type}`,
      // ACL: 'public-read',
    };

    try {
      const command = new PutObjectCommand(params);
      const result = await this.client.send(command);

      return { ...result, imageUrl: `${AWSConfig.s3.baseUrl}/${fileName}` };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new AWSS3ervice();
    }

    return this.instance;
  }
}

export default AWSS3ervice;

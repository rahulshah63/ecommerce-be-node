import AWS from 'aws-sdk';
import { AWSConfig } from '@/config';

class AWSS3ervice {
  private static instance: AWSS3ervice;
  private s3: AWS.S3;
  private bucketName: string;

  constructor() {
    AWS.config.update({
      region: AWSConfig.s3.region,
      credentials: {
        accessKeyId: AWSConfig.access_key,
        secretAccessKey: AWSConfig.secret,
      },
    });
    this.s3 = new AWS.S3();
    this.bucketName = AWSConfig.s3.bucket;
  }

  public async uploadBase64(data: string, fileName: string) {
    const base64Data = Buffer.from(data.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    const type = data.split(';')[0].split('/')[1];

    const params = {
      Bucket: this.bucketName,
      Key: fileName,
      Body: base64Data,
      ContentEncoding: 'base64',
      ContentType: `image/${type}`,
      ACL: 'public-read',
    };

    try {
      await this.s3.putObject(params).promise();

      return { imageUrl: `https://${this.bucketName}.s3.${AWSConfig.s3.region}.amazonaws.com/${params.Key}` };
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

import { createClient } from 'redis';

const redisClient = createClient({
  url: 'redis://default:C208zUOH5HSGEzI7q06OFxlA6iKepYQY@redis-16574.c301.ap-south-1-1.ec2.redns.redis-cloud.com:16574'
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

(async () => {
  await redisClient.connect();
})();

export const enqueueRenderJob = async ({ s3Key, fileUrl, metadata }) => {
  const jobId = s3Key.split('/').pop().replace('.py', '');

  const jobData = {
    jobId,
    status: 'queued',
    createdAt: new Date().toISOString(),
    s3Key,
    fileUrl,
    metadata: JSON.stringify(metadata),
  };

  await redisClient.hSet(`job:${jobId}`, jobData);
  await redisClient.rPush('renderQueue', JSON.stringify(jobData));
};

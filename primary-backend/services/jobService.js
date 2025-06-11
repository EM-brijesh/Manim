import { createClient } from 'redis';
import { v4 as uuidv4 } from 'uuid';
import { generateManimCode } from './llmService.js';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

// const redisClient = createClient();
// await redisClient.connect();





export const generateVideo = async (req, res) => {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
        return res.status(400).json({ error: 'Invalid prompt' });
    }

    try {
        const createdPrompt = await prisma.prompt.create({
            data: {
                prompt: prompt.trim(),
                userId: req.user.id
            }
        });

        const manimCode = await generateManimCode(prompt, req.user.id, createdPrompt.id);

        res.json({
            success: true,
            userId: req.user.id,
            prompt: createdPrompt,
            manimCode
        });
    } catch (err) {
        console.error('Error generating video:', err);
        res.status(500).json({ error: 'Something went wrong while generating the video.' });
    }
};



// export const getJobStatus = async (req, res) => {
//   const { id } = req.params;
//   const status = await redisClient.hGet(id, 'status');

//   if (!status) return res.status(404).json({ error: 'Job not found' });

//   const response = { status };
//   if (status === 'done') {
//     response.url = `/outputs/${id}.mp4`; // you can serve this statically later
//   }

//   res.json(response);
// };

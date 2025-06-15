import express from 'express';
import { createCode, generateVideo } from '../services/jobService.js';
import { isAuthenticated } from './auth.js';
// import prisma from "../prisma"; // your Prisma client instance
import { PrismaClient } from '@prisma/client'; // ✅ Preferred and cleaner
const prisma = new PrismaClient();
const router = express.Router();

router.get('/video', (req,res) => [
    res.json({message: "Hello from the video route!"})
])


router.post('/generate' ,isAuthenticated, generateVideo);

router.post('/create' , isAuthenticated , createCode);


// routes/render.js or similar
router.post('/update-url', async (req, res) => {
  const { promptId, url } = req.body;

  if (!promptId || !url) {
    return res.status(400).json({ error: 'Missing promptId or url' });
  }

  try {
    const newVideo = await prisma.video.create({
      data: {
        url,
        prompt: {
          connect: {
            id: promptId
          }
        }
      }
    });

    return res.status(200).json({ message: 'Video record created', video: newVideo });
  } catch (err) {
    console.error('[ERROR] Failed to create video:', err);
    return res.status(500).json({ error: 'Failed to create video' });
  }
});




export default router;
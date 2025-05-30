import express from 'express';
import { generateVideo } from '../services/jobService.js';
import { isAuthenticated } from './auth.js';
import express from "express";
import prisma from "../prisma"; // your Prisma client instance
const router = express.Router();

router.get('/video', (req,res) => [
    res.json({message: "Hello from the video route!"})
])


router.post('/generate' ,isAuthenticated, generateVideo);


// routes/render.js or similar
router.post("/complete", async (req, res) => {
  const { renderId, videoUrl } = req.body;

  try {
    const updated = await prisma.render.update({
      where: { id: renderId },
      data: { s3VideoUrl: videoUrl },
    });
    res.status(200).json({ success: true, updated });
  } catch (err) {
    console.error("DB update error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});




export default router;
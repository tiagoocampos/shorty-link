import { Router } from "express";
import { createShortUrl, redirectUrl } from "../controllers/linksController.js";

const router = Router();

router.post("/shorten", createShortUrl);
router.get("/:code", redirectUrl);

export default router;
import { Router } from "express";
import userRouter from "./user.routes";
import documentRouter from "./documents";
import logsRouter from "./logs";
import notificationRouter from "./notification";

const router = Router();

router.use(userRouter);
router.use(documentRouter);
router.use(logsRouter);
router.use(notificationRouter);

export default router;
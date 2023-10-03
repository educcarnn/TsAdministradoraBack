import { inviteAdmin } from "../../services/emails/invites";
import express from "express";

const router = express.Router();

router.post("/users/invite-admin", inviteAdmin);

export default router
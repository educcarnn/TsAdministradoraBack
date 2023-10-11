import { inviteAdmin } from "../../services/emails/empresa/invites";
import { createBusiness } from "../../services/emails/empresa/create";
import express from "express";

const router = express.Router();

router.post("/users/invite-admin", inviteAdmin);
router.post("/empresa/cadastrar-empresa", createBusiness)

export default router
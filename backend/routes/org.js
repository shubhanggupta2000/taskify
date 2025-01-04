const express = require("express");
const {
  createOrganization,
  getAllOrganizations,
  requestToJoinOrganization,
  assignRole,
} = require("../controllers/orgController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Routes
router.post("/create", authMiddleware, createOrganization);
router.get("/", authMiddleware, getAllOrganizations);
router.post("/join", authMiddleware, requestToJoinOrganization);
router.post("/assign-role", authMiddleware, assignRole);

module.exports = router;

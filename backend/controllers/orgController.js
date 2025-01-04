const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Create Organization
const createOrganization = async (req, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.user.id;

    // Check if organization already exists
    const existingOrg = await prisma.organization.findUnique({
      where: { name },
    });
    if (existingOrg) {
      return res.status(400).json({ error: "Organization already exists" });
    }

    // Create organization
    const newOrganization = await prisma.organization.create({
      data: {
        name,
        description,
        creatorId: userId,
        members: {
          create: {
            userId,
            role: "ADMIN",
            status: "APPROVED",
            joinedAt: new Date(),
          },
        },
      },
    });

    res.status(201).json(newOrganization);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get All Organizations
const getAllOrganizations = async (req, res) => {
  try {
    const organizations = await prisma.organization.findMany({
      include: { creator: true },
    });
    res.status(200).json(organizations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Request to Join Organization
const requestToJoinOrganization = async (req, res) => {
  try {
    const { organizationId } = req.body;
    const userId = req.user.id;

    // Check if user is already a member
    const existingRequest = await prisma.membership.findFirst({
      where: { userId, organizationId },
    });
    if (existingRequest) {
      return res.status(400).json({ error: "Request already exists" });
    }

    // Create membership request
    const newRequest = await prisma.membership.create({
      data: {
        userId,
        organizationId,
        status: "PENDING",
      },
    });

    res
      .status(201)
      .json({ message: "Request submitted successfully", newRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Assign Role (Admin Only)
const assignRole = async (req, res) => {
  try {
    const { userId, organizationId, role } = req.body;
    const adminId = req.user.id;

    // Verify admin privileges
    const adminMembership = await prisma.membership.findFirst({
      where: {
        userId: adminId,
        organizationId,
        role: "ADMIN",
        status: "APPROVED",
      },
    });
    if (!adminMembership) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    // Update user's role
    const updatedMembership = await prisma.membership.updateMany({
      where: { userId, organizationId, status: "APPROVED" },
      data: { role },
    });

    if (updatedMembership.count === 0) {
      return res
        .status(404)
        .json({ error: "User is not a member of the organization" });
    }

    res
      .status(200)
      .json({ message: "Role assigned successfully", updatedMembership });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createOrganization,
  getAllOrganizations,
  requestToJoinOrganization,
  assignRole,
};

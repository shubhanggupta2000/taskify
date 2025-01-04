const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Admin Dashboard - Get all tasks with filters, logs, and file management
const adminDashboard = async (req, res) => {
  try {
    const { status, priority, dateRange } = req.query;

    // Build the filter criteria for tasks
    let filterCriteria = {};
    if (status) filterCriteria.status = status;
    if (priority) filterCriteria.priority = priority;

    if (dateRange) {
      const [startDate, endDate] = dateRange.split(",");
      filterCriteria.dueDate = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    const tasks = await prisma.task.findMany({
      where: filterCriteria,
      include: { createdBy: true, assignedTo: true, files: true, logs: true },
    });

    const logs = await prisma.activityLog.findMany({
      include: { task: true, performedBy: true },
    });

    res.status(200).json({ tasks, logs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// User Dashboard - Get assigned tasks and related files
const userDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get tasks assigned to the current user
    const tasks = await prisma.task.findMany({
      where: { assignedToId: userId },
      include: { files: true },
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// View Task File (User can view files related to the task)
const viewTaskFile = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user.id;

    // Check if the task is assigned to the user
    const task = await prisma.task.findUnique({
      where: { id: Number(taskId) },
      include: { assignedTo: true },
    });

    if (task.assignedToId !== userId) {
      return res.status(403).json({ error: "Unauthorized access to this file" });
    }

    const files = await prisma.file.findMany({
      where: { taskId: Number(taskId) },
    });

    res.status(200).json(files);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  adminDashboard,
  userDashboard,
  viewTaskFile,
};

const Task = require("../models/Task");
const ActivityLog = require("../models/ActivityLog");
const User = require("../models/User");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.createTask = async (req, res) => {
  const { title, description, priority, dueDate, status, userId } = req.body;
  const task = await Task.create({
    title,
    description,
    priority,
    dueDate,
    status,
    userId,
  });
  await ActivityLog.create({ taskId: task.id, action: "Task created" });

  if (userId) {
    const user = await User.findByPk(userId);
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "New Task Assigned",
      text: `You have been assigned a new task: ${title}`,
    };
    transporter.sendMail(mailOptions);
  }

  res.status(201).json(task);
};

exports.getTasks = async (req, res) => {
  const tasks = await Task.findAll();
  res.json(tasks);
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, priority, dueDate, status, userId } = req.body;
  const task = await Task.findByPk(id);
  if (task) {
    task.title = title;
    task.description = description;
    task.priority = priority;
    task.dueDate = dueDate;
    task.status = status;
    task.userId = userId;
    await task.save();
    await ActivityLog.create({ taskId: task.id, action: "Task updated" });

    if (userId) {
      const user = await User.findByPk(userId);
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Task Updated",
        text: `A task assigned to you has been updated: ${title}`,
      };
      transporter.sendMail(mailOptions);
    }

    res.json(task);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByPk(id);
  if (task) {
    await task.destroy();
    await ActivityLog.create({ taskId: task.id, action: "Task deleted" });
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Task not found" });
  }
};

const getNotifications = (req, res) => {
  // Mock notifications data
  const notifications = [
    { id: 1, message: "Task assigned to you" },
    { id: 2, message: "Task updated" },
  ];
  res.status(200).json(notifications);
};

module.exports = { getNotifications };

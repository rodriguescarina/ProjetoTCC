const express = require("express");
const Action = require("../models/Action");
const ONG = require("../models/ONG");
const User = require("../models/User");
const Application = require("../models/Application");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const totalActions = await Action.countDocuments({ isActive: true });
    const totalONGs = await ONG.countDocuments();
    const totalVolunteers = await User.countDocuments();

    const activeActions = await Action.countDocuments({
      isActive: true,
      status: "active",
    });

    const completedActions = await Action.countDocuments({
      status: "completed",
    });

    const actionsByArea = await Action.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: "$area", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const ongsByArea = await ONG.aggregate([
      { $group: { _id: "$area", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const volunteersByState = await User.aggregate([
      { $group: { _id: "$state", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    const actionsByState = await Action.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: "$location.state", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    const approvedApplications = await Action.aggregate([
      { $unwind: "$applications" },
      { $match: { "applications.status": "approved" } },
      { $count: "total" },
    ]);

    const totalApprovedApplications = approvedApplications[0]?.total || 0;

    const volunteerHours = await Action.aggregate([
      { $match: { isActive: true, status: "completed" } },
      {
        $group: {
          _id: null,
          totalHours: {
            $sum: {
              $multiply: ["$duration", "$currentVolunteers"],
            },
          },
        },
      },
    ]);

    const estimatedVolunteerHours = volunteerHours[0]?.totalHours || 0;

    const uniqueStates = await Action.distinct("location.state", {
      isActive: true,
    });

    const completionRate =
      totalActions > 0
        ? Math.round((completedActions / totalActions) * 100)
        : 0;

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const activeONGs = await Action.distinct("ong", {
      createdAt: { $gte: thirtyDaysAgo },
      isActive: true,
    });

    const activeONGsCount = activeONGs.length;

    const currentMonth = new Date();
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const currentMonthActions = await Action.countDocuments({
      createdAt: {
        $gte: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1),
        $lt: new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth() + 1,
          1
        ),
      },
      isActive: true,
    });

    const lastMonthActions = await Action.countDocuments({
      createdAt: {
        $gte: new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1),
        $lt: new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 1),
      },
      isActive: true,
    });

    const actionsGrowth =
      lastMonthActions > 0
        ? Math.round(
            ((currentMonthActions - lastMonthActions) / lastMonthActions) * 100
          )
        : 0;

    const currentMonthVolunteers = await User.countDocuments({
      createdAt: {
        $gte: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1),
        $lt: new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth() + 1,
          1
        ),
      },
    });

    const lastMonthVolunteers = await User.countDocuments({
      createdAt: {
        $gte: new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1),
        $lt: new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 1),
      },
    });

    const volunteersGrowth =
      lastMonthVolunteers > 0
        ? Math.round(
            ((currentMonthVolunteers - lastMonthVolunteers) /
              lastMonthVolunteers) *
              100
          )
        : 0;

    const currentMonthONGs = await ONG.countDocuments({
      createdAt: {
        $gte: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1),
        $lt: new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth() + 1,
          1
        ),
      },
    });

    const lastMonthONGs = await ONG.countDocuments({
      createdAt: {
        $gte: new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1),
        $lt: new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 1),
      },
    });

    const ongsGrowth =
      lastMonthONGs > 0
        ? Math.round(((currentMonthONGs - lastMonthONGs) / lastMonthONGs) * 100)
        : 0;

    const stats = {
      overview: {
        totalActions,
        totalONGs,
        totalVolunteers,
        activeActions,
        completedActions,
        totalApprovedApplications,
        estimatedVolunteerHours,
        uniqueStatesCount: uniqueStates.length,
        completionRate,
        activeONGsCount,
      },
      growth: {
        actions: actionsGrowth,
        volunteers: volunteersGrowth,
        ongs: ongsGrowth,
      },
      distribution: {
        actionsByArea,
        ongsByArea,
        volunteersByState,
        actionsByState,
      },
      lastUpdated: new Date(),
    };

    res.json(stats);
  } catch (error) {
    console.error("Erro ao buscar estatísticas:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

router.get("/actions", async (req, res) => {
  try {
    const { period = "all" } = req.query;

    let dateFilter = {};
    if (period === "month") {
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);
      dateFilter = { createdAt: { $gte: startOfMonth } };
    } else if (period === "week") {
      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - 7);
      dateFilter = { createdAt: { $gte: startOfWeek } };
    }

    const actionsStats = await Action.aggregate([
      { $match: { isActive: true, ...dateFilter } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          totalVolunteers: { $sum: "$currentVolunteers" },
          totalMaxVolunteers: { $sum: "$maxVolunteers" },
          avgDuration: { $avg: "$duration" },
          avgMaxVolunteers: { $avg: "$maxVolunteers" },
        },
      },
    ]);

    const result = actionsStats[0] || {
      total: 0,
      totalVolunteers: 0,
      totalMaxVolunteers: 0,
      avgDuration: 0,
      avgMaxVolunteers: 0,
    };

    res.json(result);
  } catch (error) {
    console.error("Erro ao buscar estatísticas de ações:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

module.exports = router;

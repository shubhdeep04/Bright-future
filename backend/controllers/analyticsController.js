const Donation = require("../models/Donation");
const Volunteer = require("../models/Volunteer");
const Event = require("../models/Event");
const User = require("../models/User");
const Beneficiary = require("../models/Beneficiary");

// @desc    Get overall dashboard analytics (admin)
// @route   GET /api/analytics/dashboard
const getDashboardAnalytics = async (req, res, next) => {
  try {
    const [
      totalDonationsAgg,
      donationCount,
      volunteerCount,
      pendingVolunteers,
      eventCount,
      upcomingEventCount,
      userCount,
      beneficiaryCount,
    ] = await Promise.all([
      Donation.aggregate([
        { $match: { status: "success" } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      Donation.countDocuments({ status: "success" }),
      Volunteer.countDocuments({}),
      Volunteer.countDocuments({ status: "pending" }),
      Event.countDocuments({}),
      Event.countDocuments({ date: { $gte: new Date() } }),
      User.countDocuments({}),
      Beneficiary.countDocuments({ isActive: true }),
    ]);

    res.json({
      totalDonations: totalDonationsAgg[0]?.total || 0,
      donationCount,
      volunteerCount,
      pendingVolunteers,
      eventCount,
      upcomingEventCount,
      userCount,
      beneficiaryCount,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboardAnalytics };

const Donation = require("../models/Donation");
const Campaign = require("../models/Campaign");

// @desc    Create a donation record (after payment success / or pending)
// @route   POST /api/donations
const createDonation = async (req, res, next) => {
  try {
    const { name, email, phone, amount, campaign, purpose, isAnonymous, panNumber } = req.body;

    const donation = await Donation.create({
      donor: req.user ? req.user._id : undefined,
      name,
      email,
      phone,
      amount,
      campaign: campaign || undefined,
      purpose,
      isAnonymous,
      panNumber,
      status: "pending",
    });

    res.status(201).json(donation);
  } catch (error) {
    next(error);
  }
};

// @desc    Verify/confirm donation (mock payment success webhook)
// @route   PUT /api/donations/:id/confirm
const confirmDonation = async (req, res, next) => {
  try {
    const { paymentId, orderId } = req.body;
    const donation = await Donation.findById(req.params.id);
    if (!donation) return res.status(404).json({ message: "Donation not found" });

    donation.status = "success";
    donation.paymentId = paymentId || `MOCK_PAY_${Date.now()}`;
    donation.orderId = orderId || `MOCK_ORD_${Date.now()}`;
    await donation.save();

    if (donation.campaign) {
      await Campaign.findByIdAndUpdate(donation.campaign, {
        $inc: { raisedAmount: donation.amount },
      });
    }

    res.json(donation);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all donations (admin)
// @route   GET /api/donations
const getDonations = async (req, res, next) => {
  try {
    const donations = await Donation.find({})
      .populate("campaign", "title")
      .sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    next(error);
  }
};

// @desc    Get my donations (donor dashboard)
// @route   GET /api/donations/my
const getMyDonations = async (req, res, next) => {
  try {
    const donations = await Donation.find({ donor: req.user._id })
      .populate("campaign", "title")
      .sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    next(error);
  }
};

// @desc    Get donation stats (for dashboards/live tracker)
// @route   GET /api/donations/stats
const getDonationStats = async (req, res, next) => {
  try {
    const totalResult = await Donation.aggregate([
      { $match: { status: "success" } },
      { $group: { _id: null, total: { $sum: "$amount" }, count: { $sum: 1 } } },
    ]);

    const monthly = await Donation.aggregate([
      { $match: { status: "success" } },
      {
        $group: {
          _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
          total: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
      { $limit: 12 },
    ]);

    res.json({
      total: totalResult[0]?.total || 0,
      count: totalResult[0]?.count || 0,
      monthly,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete donation (admin)
// @route   DELETE /api/donations/:id
const deleteDonation = async (req, res, next) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) return res.status(404).json({ message: "Donation not found" });
    await donation.deleteOne();
    res.json({ message: "Donation removed" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createDonation,
  confirmDonation,
  getDonations,
  getMyDonations,
  getDonationStats,
  deleteDonation,
};

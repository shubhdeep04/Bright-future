const Campaign = require("../models/Campaign");

const createCampaign = async (req, res, next) => {
  try {
    const campaign = await Campaign.create(req.body);
    res.status(201).json(campaign);
  } catch (error) {
    next(error);
  }
};

const getCampaigns = async (req, res, next) => {
  try {
    const { active } = req.query;
    let filter = {};
    if (active === "true") filter.isActive = true;
    const campaigns = await Campaign.find(filter).sort({ createdAt: -1 });
    res.json(campaigns);
  } catch (error) {
    next(error);
  }
};

const getCampaignBySlug = async (req, res, next) => {
  try {
    const campaign = await Campaign.findOne({ slug: req.params.slug });
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });
    res.json(campaign);
  } catch (error) {
    next(error);
  }
};

const updateCampaign = async (req, res, next) => {
  try {
    const campaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });
    res.json(campaign);
  } catch (error) {
    next(error);
  }
};

const deleteCampaign = async (req, res, next) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });
    await campaign.deleteOne();
    res.json({ message: "Campaign removed" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCampaign,
  getCampaigns,
  getCampaignBySlug,
  updateCampaign,
  deleteCampaign,
};

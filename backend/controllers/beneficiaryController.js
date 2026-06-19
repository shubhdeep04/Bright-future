const Beneficiary = require("../models/Beneficiary");

const createBeneficiary = async (req, res, next) => {
  try {
    const beneficiary = await Beneficiary.create(req.body);
    res.status(201).json(beneficiary);
  } catch (error) {
    next(error);
  }
};

const getBeneficiaries = async (req, res, next) => {
  try {
    const { program } = req.query;
    let filter = {};
    if (program) filter.program = program;
    const beneficiaries = await Beneficiary.find(filter).sort({ createdAt: -1 });
    res.json(beneficiaries);
  } catch (error) {
    next(error);
  }
};

const getBeneficiaryById = async (req, res, next) => {
  try {
    const beneficiary = await Beneficiary.findById(req.params.id);
    if (!beneficiary) return res.status(404).json({ message: "Beneficiary not found" });
    res.json(beneficiary);
  } catch (error) {
    next(error);
  }
};

const updateBeneficiary = async (req, res, next) => {
  try {
    const beneficiary = await Beneficiary.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!beneficiary) return res.status(404).json({ message: "Beneficiary not found" });
    res.json(beneficiary);
  } catch (error) {
    next(error);
  }
};

const deleteBeneficiary = async (req, res, next) => {
  try {
    const beneficiary = await Beneficiary.findById(req.params.id);
    if (!beneficiary) return res.status(404).json({ message: "Beneficiary not found" });
    await beneficiary.deleteOne();
    res.json({ message: "Beneficiary removed" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBeneficiary,
  getBeneficiaries,
  getBeneficiaryById,
  updateBeneficiary,
  deleteBeneficiary,
};

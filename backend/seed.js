const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const Campaign = require("./models/Campaign");
const Event = require("./models/Event");
const Testimonial = require("./models/Testimonial");
const SiteContent = require("./models/SiteContent");

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

    // Create admin user
    const adminExists = await User.findOne({ email: "admin@brightfutures.org" });
    if (!adminExists) {
      await User.create({
        name: "Admin",
        email: "admin@brightfutures.org",
        password: "Admin@123",
        role: "admin",
        phone: "9999999999",
      });
      console.log("Admin user created: admin@brightfutures.org / Admin@123");
    } else {
      console.log("Admin already exists");
    }

    // Sample campaign
    const campaignExists = await Campaign.findOne({ title: "Books for Every Child" });
    if (!campaignExists) {
      await Campaign.create({
        title: "Books for Every Child",
        description:
          "Help us provide textbooks, notebooks and stationery to underprivileged children for the new academic year.",
        targetAmount: 500000,
        raisedAmount: 187500,
        category: "Education",
      });
      console.log("Sample campaign created");
    }

    // Sample event
    const eventExists = await Event.findOne({ title: "Annual Scholarship Awards 2026" });
    if (!eventExists) {
      await Event.create({
        title: "Annual Scholarship Awards 2026",
        description: "Celebrating our scholarship recipients and their academic achievements this year.",
        date: new Date("2026-08-15"),
        location: "Community Hall, Khandwa",
        category: "Education",
        maxParticipants: 200,
      });
      console.log("Sample event created");
    }

    // Sample testimonials
    const testimonialCount = await Testimonial.countDocuments();
    if (testimonialCount === 0) {
      await Testimonial.insertMany([
        {
          name: "Priya Sharma",
          role: "donor",
          message:
            "Donating through Bright Futures was simple and transparent. I love seeing the impact reports every quarter.",
          rating: 5,
          isApproved: true,
        },
        {
          name: "Rahul Verma",
          role: "volunteer",
          message:
            "Volunteering with the education team has been one of the most rewarding experiences of my life.",
          rating: 5,
          isApproved: true,
        },
        {
          name: "Anjali (Beneficiary)",
          role: "beneficiary",
          message:
            "Thanks to the scholarship program, I am now studying in college. This NGO changed my future.",
          rating: 5,
          isApproved: true,
        },
      ]);
      console.log("Sample testimonials created");
    }

    // Site content defaults
    const defaults = {
      hero_title: "Empowering Children Through Education",
      hero_subtitle:
        "Bright Futures Foundation works to ensure every child has access to quality education, regardless of their background.",
      mission: "To provide free, quality education and learning resources to underprivileged children across India.",
      vision: "A world where every child has the opportunity to learn, grow, and reach their full potential.",
      stat_beneficiaries: 5200,
      stat_volunteers: 340,
      stat_schools: 28,
      stat_years: 12,
      founder_message:
        "When we started Bright Futures over a decade ago, we had one simple goal: no child should be denied education because of poverty. Today, thanks to thousands of donors and volunteers, we have touched over 5,000 lives. This is just the beginning.",
      founder_name: "Dr. Meera Joshi, Founder & Director",
      ngo_history:
        "Founded in 2014, Bright Futures Foundation began as a small after-school tutoring initiative in two villages near Khandwa. Over the years, it has grown into a registered NGO running scholarship programs, learning centers, and teacher training workshops across Madhya Pradesh.",
      registration_details: "Registered under Societies Registration Act, 1860 | Reg No: MP/EDU/2014/00123 | 80G & 12A Certified",
      contact_email: "contact@brightfutures.org",
      contact_phone: "+91 98765 43210",
      contact_address: "123 Hope Street, Khandwa, Madhya Pradesh, India - 450001",
    };

    const existing = await SiteContent.find({});
    if (existing.length === 0) {
      const ops = Object.entries(defaults).map(([key, value]) => ({ key, value }));
      await SiteContent.insertMany(ops);
      console.log("Default site content created");
    }

    console.log("Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seed();

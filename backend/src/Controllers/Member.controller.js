import { MemberModel } from "../Models/Member.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { uploadOnCloudinary } from "../Utils/cloudinary.js";
import cloudinary from "cloudinary";

// Login a user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await MemberModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        email: user.email,
        domain: user.domain,
        avatarUrl: user.avatarUrl,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new member
export const createMember = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      role,
      domain,
      socials,
      yearOfJoining,
      yearOfPassing,
      stream,
      universityRollNumber,
      avatarUrl,
      skills,
      events,
      projects,
      attendance,
       // Expecting Base64 string from frontend
    } = req.body;

    // Upload avatar to Cloudinary if provided
    let avatar = "";
    if (avatarUrl) {
      const cloudinaryResponse = await uploadOnCloudinary(avatarUrl);
      console.log("cloudinaryResponse", cloudinaryResponse);
      
      avatar = cloudinaryResponse?.url || "";
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newMember = new MemberModel({
      username,
      email,
      password: hashedPassword,
      role,
      domain,
      socials,
      yearOfJoining,
      yearOfPassing,
      stream,
      universityRollNumber,
      avatarUrl: avatar,
      skills,
      events,
      projects,
      attendance,
    });

    const savedMember = await newMember.save();
    res.status(201).json(savedMember);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all members
export const getAllMembers = async (req, res) => {
  try {
    const members = await MemberModel.find()
      .populate("events")
      .populate("projects")
      .populate("attendance");
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single member by ID
export const getMemberById = async (req, res) => {
  try {
    const member = await MemberModel.findById(req.params.id)
      .populate("events")
      .populate("projects")
      .populate("attendance");

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a member by ID
export const updateMember = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      role,
      domain,
      socials,
      yearOfJoining,
      yearOfPassing,
      stream,
      universityRollNumber,
      skills,
      events,
      projects,
      attendance,
      avatarUrl, // Expecting Base64 string from frontend
    } = req.body;

    const updatedData = {
      username,
      email,
      role,
      domain,
      socials,
      yearOfJoining,
      yearOfPassing,
      stream,
      universityRollNumber,
      skills,
      events,
      projects,
      attendance,
    };

    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    // Handle avatar update
    if (avatarUrl) {
      const member = await MemberModel.findById(req.params.id);

      // Delete old avatar from Cloudinary
      if (member?.avatarUrl) {
        const publicId = member.avatarUrl.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      }

      // Upload new avatar to Cloudinary
      const cloudinaryResponse = await uploadOnCloudinary(avatarUrl);
      updatedData.avatarUrl = cloudinaryResponse?.url || "";
    }

    const updatedMember = await MemberModel.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    )
      .populate("events")
      .populate("projects")
      .populate("attendance");

    if (!updatedMember) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.status(200).json(updatedMember);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a member by ID
export const deleteMember = async (req, res) => {
  try {
    const member = await MemberModel.findById(req.params.id);

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    if (member.avatarUrl) {
      const publicId = member.avatarUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }

    await MemberModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import { MemberModel } from "../Models/Member.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Login a user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Check if user exists
    const user = await MemberModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ token, user });
  } catch (error) {
    console.error("Error logging in user:", error);
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
    } = req.body;

    // Encrypt the password
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
      avatarUrl,
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
    } = req.body;

    const updatedMember = await MemberModel.findByIdAndUpdate(
      req.params.id,
      {
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
      },
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
    const deletedMember = await MemberModel.findByIdAndDelete(req.params.id);
    if (!deletedMember) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.status(200).json({ message: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

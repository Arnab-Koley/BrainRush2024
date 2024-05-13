import { NextResponse } from "next/server";
import { connectToDatabase } from "@utils/db";
import Team from "@models/team";
import User from "@models/user";
import ConfirmationRequest from "@models/confirmationRequest";
import mongoose from "mongoose";

//kick a member
export async function PATCH(req, { params }) {
  try {
    await connectToDatabase();
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Not a valid id" }, { status: 404 });
    }
    const email = req.headers.get("Authorization");
    const user = await User.findOne({ email: email });
    const { memberId } = await req.json();
    const member = await User.findById(memberId);
    if (!user) {
      return NextResponse.json(
        { message: "Not a valid user" },
        { status: 400 }
      );
    }
    if (!member) {
      return NextResponse.json(
        { message: "Not a valid member" },
        { status: 400 }
      );
    }
    const team = await Team.findOne({
      $and: [{ _id: id }, { leader: user._id }, { members: member._id }],
    }).populate(["leader", "members"]);
    if (!team) {
      return NextResponse.json({ message: "You are not leader of the team" });
    }
    if (team.payment) {
      return NextResponse.json(
        { message: "You can not remove the team member as payment done" },
        { status: 400 }
      );
    }

    const newTeam = await Team.findByIdAndUpdate(
      team._id,
      {
        $pull: { members: member },
        $pull: {
          memberEmails: { email: member.email },
        },
      },
      { new: true }
    )
      .populate("leader")
      .populate("members");
    return NextResponse.json({
      success: true,
      message: "Team member removed successfully",
      data: newTeam,
    });
  } catch (error) {
    console.error("Error Updating team:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

//teamLeave By the team member

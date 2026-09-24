const prisma = require("../config/prisma");

// USER REGISTRATION (submitting data) >>>
exports.submitData = async (req, res) => {
  try {
    const { email, fullname } = req.body;

    // VALIDATION LOGIC >>>
    if (!email || !fullname) {
      return res.status(400).json({
        message: "Abeg!, either your fullname or email is missing",
      });
    }

    const normalizedFullname = fullname.trim();

    // fullname validation and check >>>
    const namePattern = /^[A-Za-z]{2,50}(?:[ -][A-Za-z]{2,50})*$/;

    if (
      typeof normalizedFullname !== "string" ||
      !namePattern.test(normalizedFullname)
    ) {
      return res.status(400).json({
        message: "Guy!, Your fullname is not valid",
      });
    }

    // normalize EMAIL before checking the db >>>
    const normalizedEmail = email.trim().toLowerCase();

    // email validation and check >>>
    const emailPattern =
      /^[A-Za-z][A-Za-z0-9._%+-]*@[A-Za-z][A-Za-z0-9-]*(?:\.[A-Za-z][A-Za-z0-9-]*)+$/;

    if (
      typeof normalizedEmail !== "string" ||
      !emailPattern.test(normalizedEmail)
    ) {
      return res.status(400).json({
        message: "Guy!, Your email is not valid",
      });
    }

    // check if someone has registered before so they don't register twice/more >>>
    const existingUser = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Guy!, You have registered before",
      });
    }

    // store user's input in the db (i.e create a new user) >>>
    const newUser = await prisma.user.create({
      data: {
        email: normalizedEmail,
        fullname: normalizedFullname,
      },
    });

    res.status(201).json({
      message:
        "You are the most serious student i have seen. Thank you for registering",
      newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Network issues, please try again",
      error,
    });
  }
};

//
// DELETE USER'S DATA >>>
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // validation >>>
    if (typeof id !== "string" || isNaN(id) || Number(id) <= 0 || id === null) {
      return res.status(400).json({
        message: "Guy!, You need to provide an id",
      });
    }

    // check if "id" is in the db before making attemtpt to delete >>>
    const existingUser = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingUser) {
      return res.status(404).json({
        message: "Guy!, User not found",
      });
    }

    // delete user from db >>>
    const deletedUser = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      message: "User deleted successfully",
      deletedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Network issues, please try again",
      error,
    });
  }
};

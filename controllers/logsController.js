import asyncHandler from "express-async-handler";

const addNewLog = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  if (!name && !description) {
    res.status(400);
    throw new Error("Please provide a name and description.");
    return;
  } else {
    const project = new Project({
      user: req.user._id,
      name,
      description,
    });

    const createdProject = await project.save();
    res.status(200);
    res.json(createdProject);
  }
});

export { addNewLog };

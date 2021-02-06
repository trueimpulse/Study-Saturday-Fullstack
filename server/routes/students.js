const router = require("express").Router();
const { Student, Test } = require("../db/models");

// GET /api/students
router.get("/", async (req, res, next) => {
  try {
    const students = await Student.findAll({
      include: Test,
    });
    res.json(students);
  } catch (error) {
    next(error);
  }
});

// GET /api/students/:id
router.get("/:id", async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (student) res.json(student);
    else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
});

// POST /api/students
router.post("/", async (req, res, next) => {
  try {
    // const student = await Student.create(req.body);
    const { firstName, lastName, email } = req.body;
    //create a new row in the db
    const student = await Student.create(
      { firstName, lastName, email },
      { include: Test }
    );
    res.send(student);
  } catch (error) {
    next(error);
  }
});

// PUT /api/students/:id
router.put("/:id", async (req, res, next) => {
  try {
    const { firstName, lastName, email } = req.body;
    const student = await Student.findByPk(req.params.id);
    const updatedStudent = await student.update({
      firstName,
      lastName,
      email,
    });
    res.json(updatedStudent);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/students/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (student) {
      await student.destroy();
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;

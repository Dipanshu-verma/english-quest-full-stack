const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { BookModel } = require("../models/BookModel");
require("dotenv").config();
const bookRouter = Router();

const authanticatuser = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode.user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Unauthorized" });
  }
};


const checkrole = (req, res, next) => {
  if (req.user?.role === "CREATOR") {
    next();
  } else {
    return res.status(403).json({ error: "Forbidden" });
  }
};



bookRouter.get("/books", async (req, res) => {
  const { old, latest, sort, language,page,limit } = req.query;

  try {
    const query = {};
    if (language) {
      query.language = { $regex: language, $options: "i" };
    }

    if (old) {
      const tenMinutesAgo = new Date();
      tenMinutesAgo.setMinutes(tenMinutesAgo.getMinutes() - 10);
      query.createdAt = { $lte: tenMinutesAgo };
    }

    if (latest) {
      const tenMinutesAgo = new Date();
      tenMinutesAgo.setMinutes(tenMinutesAgo.getMinutes() - 10);
      query.createdAt = { $gt: tenMinutesAgo };
    }

    let sortoption = {};

    if (sort === "asc") {
      sortoption.createdAt = 1;
    } else if (sort === "desc") {
      sortoption.createdAt = -1;
    }

    const books = await BookModel.find(query).sort(sortoption).skip((page-1)*limit).limit(limit);
    const totalDocuments =  await BookModel.countDocuments(query)
    const totalPage=  Math.ceil(totalDocuments/limit)
    
    res.status(200).json({books,totalPage});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

 


bookRouter.post("/books", authanticatuser, checkrole, async (req, res) => {
  try {
    const book = new BookModel({ userId: req.user._id, ...req.body });
    await book.save();
    res.status(200).json({ book, message: "book added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


bookRouter.put(
  "/books/update/:id",
  authanticatuser,
  checkrole,
  async (req, res) => {
    const userId = req.user._id;

    try {
      const book = await BookModel.findOneAndUpdate(
        { _id: req.params.id, userId },
        req.body,
        { new: true }
      );

      if (!book) {
        return res
          .status(404)
          .json({ error: "Book not found or you don't have permission" });
      }

      res.status(200).json({ book, message: "book updated successfully" });
      console.log(book);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

bookRouter.delete(
  "/books/delete/:id",
  authanticatuser,
  checkrole,
  async (req, res) => {
    const userId = req.user._id;

    try {
      const book = await BookModel.findOneAndDelete({
        _id: req.params.id,
        userId,
      });

      if (!book) {
        return res
          .status(404)
          .json({ error: "Book not found or you don't have permission" });
      }

      res.status(200).json({ message: "book deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

module.exports = { bookRouter };

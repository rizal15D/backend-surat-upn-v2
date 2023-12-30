const express = require("express");
var multer = require("multer");
var upload = multer({ dest: "upload/" });
var fs = require("fs");
const Template_surat = require("../../models/template_surat");
const app = express.Router();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "template_surat/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });
// const upload = multer({ dest: "uploads/" });

var type = upload.single("recfile");

app
  .get("/", function (req, res) {
    res.send("get hello world2");
  })
  .post("/", type, function (req, res) {
    /** When using the "single"
        data come in "req.file" regardless of the attribute "name". **/
    var tmp_path = req.file;

    /** The original name of the uploaded file
        stored in the variable "originalname". **/
    var target_path = "uploads/";

    /** A better way to copy the uploaded file. **/
    var src = fs.createReadStream(tmp_path);
    var dest = fs.createWriteStream(target_path);
    src.pipe(dest);
    src.on("end", function () {
      res.render("complete");
    });
    src.on("error", function (err) {
      res.render("error");
    });
  })
  .put("/:id", (req, res) => {
    const id = req.params.id;
    res.send("put hello world2");
  })
  .delete("/:id", (req, res) => {
    const id = req.params.id;
    res.send("delete hello world2");
  });

module.exports = app;

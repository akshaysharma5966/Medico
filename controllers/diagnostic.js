const Diagnostic = require("../models/diagnostic");

exports.getDiagnostic = (req, res, next) => {
  Diagnostic.find()
    .then((diagnostics) => res.status(200).json(diagnostics))
    .catch((err) => console.log(err));
};

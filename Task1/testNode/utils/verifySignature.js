 
require('dotenv').config();
function validateRequest(req, res) { 
const isValidSignature = verifySignature(
    req.headers['x-hub-signature-256'],
    JSON.stringify(req.body),
    process.env.GITHUB_WEBHOOK_SECRET
  );

  if (!isValidSignature) {
    console.error('Invalid signature');
    return res.sendStatus(401);
  } else {
      next();
  }

}

module.exports = {
    validateRequest
}


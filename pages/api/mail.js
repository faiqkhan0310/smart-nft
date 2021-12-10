/*eslint-disable*/

const sgmail = require("@sendgrid/mail");
sgmail.setApiKey(process.env.SENDGRID_API_KEY);
export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        console.log(`Mail send to: ${req.body.email}`);
        let emailObj = {
          to: req.body.email,
          from: "support@NFTYSCOTT.io",
          subject: req.body.subject,
          html: req.body.html,
        };
        let smsSuccess = await sgmail.send(emailObj);
        return res.status(200).json({ status: true });
      } catch (error) {
        console.log(error);
        return res.status(404).json({
          success: false,
        });
      }
    default:
      res.setHeaders("Allow", ["GET", "POST"]);
      return res
        .status(405)
        .json({ success: false })
        .end(`Method ${method} Not Allowed`);
  }
};

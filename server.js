require("dotenv").config();
const nodemailer = require("nodemailer");
const csvToJson = require("csvToJson");
const minimist = require("minimist");
const { content } = require("./content");

const sendMail = async ({
  recipientMail,
  recipientName,
  content,
  isHtmlMail,
  transporter,
}) => {
  const mailOptions = {
    from: process.env.CUSTOM_MAIL_NAME || process.env.EMAIL,
    to: recipientMail,
    subject: `Message from ${req.body.email}: ${req.body.subject}`,
    text: req.body.message,
    html: req.body.html,
  };

  transporter.sendMail(
    {
      ...mailOptions,
      text: isHtmlMail ? undefined : content,
      html: isHtmlMail ? content : undefined,
    },
    function (error, info) {
      if (error) {
        console.error(
          `Failed to send mail to ${recipientMail} (${recipientName})!`,
          error
        );
      } else {
        console.log(`Email sent to ${recipientMail} (${recipientName})!`);
      }
    }
  );
};

const parseCommandArgs = (opts, selectKeys) => {
  const res = minimist(process.argv.slice(2), opts);
  if (!selectKeys) {
    return res;
  }
  return _.pick(res, selectKeys);
};

// node server.js --csvFile=input.csv --isHtmlMail=true
// csv file must have 2 columns name 'email' and 'name' indicate for recipient email and name
const run = async () => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD, // should use app password if you use Gmail as mail provider
    },
  });

  const args = parseCommandArgs();
  const data = await csvToJson().fromFile(
    path.resolve(process.cwd(), args.csvFile || "input.csv")
  );

  await Promise.all(
    data.map((rec) => {
      const altContent = undefined; // can put your custom content here if needed
      return sendMail({
        recipientMail: rec.email,
        recipientName: rec.name,
        content: altContent || content,
        isHtmlMail: args.isHtmlMail,
        transporter,
      });
    })
  );
};

run()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(JSON.stringify(e));
    process.exit(-1);
  });

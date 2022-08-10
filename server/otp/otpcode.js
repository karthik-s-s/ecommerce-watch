require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceid = process.env.TWILIO_SERVICE_ID;
const client = require('twilio')(accountSid, authToken);

module.exports = {
  make: (phone_number) =>
    new Promise( async (resolve, reject) => {
      await client.verify
        .services(serviceid)
        .verifications.create({
          to: `+91${phone_number}`,
          channel: 'sms',
        })
        .then((verification) => {
          console.log(verification);
          resolve(verification);
        });
    }),
  verifyOtp: (otp,phoneNumber) =>
   
    new Promise(async (resolve) => {
      await client.verify
        .services(serviceid)
        .verificationChecks.create({
          to: `+91${phoneNumber}`,
          code: otp,
        })
        .then((verificationCheck) => {
          resolve(verificationCheck);
        });
    }),
};

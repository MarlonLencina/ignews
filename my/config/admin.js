module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '49da9212c83cc415c46e656f4f1a5aa9'),
  },
});

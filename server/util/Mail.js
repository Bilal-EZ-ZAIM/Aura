const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bbilalzaimrajawi@gmail.com", // بريدك الإلكتروني في Gmail
    pass: "kesupihtnpmhexxq", // كلمة مرور البريد الإلكتروني أو كلمة مرور التطبيقات المحددة (App Password)
  },
});

const envoyerEmail = async (email, message, subject) => {
  try {
    // إرسال البريد الإلكتروني باستخدام كائن النقل المحدد
    const info = await transporter.sendMail({
      from: "bbilalzaimrajawi@gmail.com", // عنوان المرسل
      to: email, // قائمة المستلمين
      subject: subject, // موضوع البريد
      html: message,
    });

    console.log("Message sent: %s", info.messageId);
    // الرسالة المرسلة: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = envoyerEmail;

// subjict "Réinitialisation de votre mot de passe"

// `Bonjour,

// Vous avez demandé à réinitialiser votre mot de passe. Veuillez cliquer sur le lien ci-dessous pour réinitialiser votre mot de passe :

// ${url}

// Veuillez noter que ce lien expirera dans 10 minutes.

// Cordialement,
// L'équipe de support`, // نص الرسالة
//       html: `<p>Bonjour,</p>
// <p>Vous avez demandé à réinitialiser votre mot de passe. Veuillez cliquer sur le lien ci-dessous pour réinitialiser votre mot de passe :</p>
// <p><a href="${url}">Réinitialiser le mot de passe</a></p>
// <p>Veuillez noter que ce lien expirera dans 10 minutes.</p>
// <p>Cordialement,<br>L'équipe de support</p>`

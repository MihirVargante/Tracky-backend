const nodemailer = require('nodemailer');

// Configure email transport
const transporter = nodemailer.createTransport({
    service: 'gmail', // or another email service
    auth: {
        user: 'mihirvargante123456@gmail.com',
        pass: 'wtlpvpmgteszkpoa', // Use OAuth2 for better security in production
    },
});

// Send email
const sendPriceDropEmail = async (userEmail, productLink, currentPrice, thresholdPrice) => {
    const mailOptions = {
        from: 'mihirvargante123456@gmail.com',
        to: userEmail,
        subject: 'Price Drop Alert!',
        text: `Good news! The price for your watched product has dropped below your threshold price.\n\n` +
              `Product Link: ${productLink}\n` +
              `Current Price: ₹${currentPrice}\n` +
              `Your Threshold Price: ₹${thresholdPrice}\n\n` +
              `Check it out now!`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Price drop email sent to ${userEmail}`);
    } catch (error) {
        console.error('Error sending email:', error.message);
    }
};
// sendPriceDropEmail('sohammore2372@gmail.com','https://www.amazon.in/Vanish-Action-Stain-Remover-Liquid/dp/B01N0OHGDE/?_encoding=UTF8&pd_rd_w=r3teO&content-id=amzn1.sym.bb373a5c-8802-4d94-ac0d-fa11d27d41b3&pf_rd_p=bb373a5c-8802-4d94-ac0d-fa11d27d41b3&pf_rd_r=G5SVEKPKMHTH49HHVPS3&pd_rd_wg=Tr0sL&pd_rd_r=5bf7ae98-3edc-4f1f-ad22-626d6770a0f4&ref_=pd_hp_d_btf_cr_cartx',100,150)
module.exports = sendPriceDropEmail ;

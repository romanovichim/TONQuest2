import qrcode from "qrcode-terminal";

async function generateReward() {
    const mintLink = "https://app.tonkeeper.com/transfer/EQCZ52LU4PsK71IVjn4Ur599R4ZdsnT9ToAEqysot628BEdo?bin=te6cckEBAQEABgAACAHMb83ygmcj&amount=50000000"
    qrcode.generate(mintLink, {small: true }, (qr) => {
        console.log(qr);
    });
    console.log(`Scan qr-code above or click on this link: ${mintLink}`)
}

generateReward();
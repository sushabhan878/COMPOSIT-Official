import { createCanvas, loadImage } from "canvas";
import fs from "fs";

const generateCertificate = async (name: string) => {
  const image = await loadImage("/certificate.png");

  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext("2d");

  ctx.drawImage(image, 0, 0);

  ctx.font = "50px Arial";
  ctx.textAlign = "center";
  ctx.fillText(name, canvas.width / 2, 500);

  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(`./certificates/${name}.png`, buffer);
};

generateCertificate("Rahul Sharma");

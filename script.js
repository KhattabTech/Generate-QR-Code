let currentCanvas;

function generateQRCode() {
  const qrcodeContainer = document.getElementById("qrcode");
  const text = document.getElementById("text").value;
  const foregroundColor = document.getElementById("foreground").value;
  const backgroundColor = document.getElementById("background").value;
  const size = parseInt(document.getElementById("size").value);

  qrcodeContainer.innerHTML = "";

  if (text.trim() === "") {
    alert("Please enter text or a URL!");
    return;
  }

  const canvas = document.createElement("canvas");
  qrcodeContainer.appendChild(canvas);
  currentCanvas = canvas;

  QRCode.toCanvas(
    canvas,
    text,
    {
      color: {
        dark: foregroundColor,
        light: backgroundColor,
      },
      width: size,
    },
    function (error) {
      if (error) console.error(error);
    }
  );
}

function downloadQRCode(format) {
  if (!currentCanvas) {
    alert("Please generate a QR Code first!");
    return;
  }

  const link = document.createElement("a");
  link.download = `qrcode.${format}`;
  link.href = currentCanvas.toDataURL(`image/${format}`);
  link.click();
}

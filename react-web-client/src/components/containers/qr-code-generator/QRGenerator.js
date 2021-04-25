import React, { useState, useEffect } from "react";
import QRcode from "qrcode.react";

function QRGenerator({ ...props }) {
  const [qr_code, setQrCode] = useState("");

  const { sku_code } = props;

  useEffect(() => {
    setQrCode(sku_code);
  }, [sku_code]);

  const handleDownloadQRCode = () => {
    const canvas = document.getElementById("productQr");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${sku_code}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div>
      <span>QR Generator</span>

      <div>
        {qr_code ? (
          <QRcode
            id="productQr"
            value={qr_code}
            size={320}
            includeMargin={true}
          />
        ) : (
          <span class="badge badge-light">No QR code preview available</span>
        )}
      </div>
      <div>
        {qr_code ? (
          <div>
            <a
              href="javascript:void(0)"
              onClick={handleDownloadQRCode}
              style={{ marginLeft: 136 }}
            >
              Download
            </a>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default QRGenerator;

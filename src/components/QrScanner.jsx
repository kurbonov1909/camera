import { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QrScanner = () => {
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,            // Kamera yangilanish tezligi
        qrbox: { width: 250, height: 250 }  // QR kod oynasining o'lchami
      }
    );

    scanner.render(
      (decodedText) => {
        setResult(decodedText);  // QR kod o'qilganda
        scanner.clear();         // Skanerni tozalash
      },
      (err) => {
        setError('QR kod topilmadi');  // QR kod topilmasa
      }
    );

    return () => {
      scanner.clear();  // Komponent unmount bo'lganda tozalash
    };
  }, []);

  return (
    <div>
      <h1>QR Kodni Skaner Qiling</h1>
      <div id="reader" style={{ width: '100%' }}></div>
      {result && <p>Natija: {result}</p>}
      {error && !result && <p>{error}</p>}
    </div>
  );
};

export default QrScanner;

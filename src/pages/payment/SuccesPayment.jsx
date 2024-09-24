// eslint-disable-next-line no-unused-vars
import React from 'react';

const SuccessPayment = () => {
  return (
    <main className="max-w-sm md:max-w-5xl mx-auto mt-10 p-4">
      <div className="bg-green-500 text-white p-2 rounded-lg text-center font-semibold mb-14">
        Terimakasih atas pembayaran transaksi
      </div>
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">Selamat!</h1>
        <img src="/images/image-2.png" alt="Confirmation Image" className="mx-auto mb-8 max-w-full h-auto" />
        <p className="text-gray-600 mb-4">Transaksi pembayaran kelas premium berhasil!</p>
        <p className="text-gray-600 mb-14">E-receipt telah dikirimkan ke email.</p>
        <div className="flex flex-col items-center space-y-4">
          <a href="#" className="bg-blue-600 text-white py-2 px-32 rounded-full font-bold inline-block">Mulai Belajar</a>
          <a href="#" className="text-blue-600 font-semibold">Kembali ke Beranda</a>
        </div>
      </div>
    </main>
  );
};

export default SuccessPayment;
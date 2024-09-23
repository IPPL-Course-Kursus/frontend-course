// eslint-disable-next-line no-unused-vars
import React from 'react';

const SuccessPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="mb-4 text-sm font-semibold bg-green-500 text-white py-2 px-4 rounded-full">
          Terimakasih atas pembayaran transaksi
        </div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-blue-800">Selamat!</h1>
          <p className="text-base text-gray-700">Transaksi pembayaran kelas premium berhasil!</p>
          <p className="text-base text-gray-700">E-receipt telah dikirimkan ke email.</p>
        </div>
        <img src="path_to_success_image.png" alt="Success" className="mb-6"/>
        <div className="space-y-4">
          <button className="bg-blue-600 text-white py-2 px-8 rounded-full">Mulai Belajar</button>
          <button className="bg-blue-500 text-white py-2 px-8 rounded-full">Kembali ke Beranda</button>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;

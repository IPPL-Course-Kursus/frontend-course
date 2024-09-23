import React from 'react';

const SuccessPayment = () => {
  return (
    <div className="bg-gray-100">
      {/* Navbar */}
      <header className="bg-blue-700 p-4 flex justify-between items-center">
        <div className="text-white font-bold text-xl">LOGO</div>
        <div className="relative flex-grow max-w-2xl mx-20">
          <input type="text" placeholder="Cari Kursus terbaik..." className="pl-4 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"/>
          <svg className="w-4 h-5 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.415l5.385 5.384a1 1 0 01-1.415 1.415l-5.384-5.385zM14 8a6 6 0 11-12 0 6 6 0 0112 0z" clipRule="evenodd"/>
          </svg>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12h18M3 6h18M3 18h18"/>
            </svg>
          </button>
          {/* Account Button with Icon */}
          <button className="text-white font-bold flex items-center space-x-2 p-2 bg-blue-500 rounded shadow-lg">
            <img src="https://via.placeholder.com/24" alt="User Logo" className="rounded-full"/>
            <span>Akun</span>
          </button>
        </div>
      </header>

      {/* Payment Confirmation */}
      <main className="max-w-3xl mx-auto mt-10">
        <div className="bg-green-500 text-white p-4 rounded text-center font-semibold mb-6">
          Terimakasih atas pembayaran transaksi
        </div>

        <div className="bg-white p-12 rounded-lg shadow-lg text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">Selamat!</h1>
          <p className="text-gray-600 mb-4">Transaksi pembayaran kelas premium berhasil!</p>
          <p className="text-gray-600 mb-8">E-receipt telah dikirimkan ke email.</p>
          <img src="https://via.placeholder.com/150" alt="Confirmation Image" className="mx-auto mb-8"/>
          
          {/* Vertical Layout Buttons */}
          <div className="space-y-4">
            <button className="bg-blue-600 text-white py-2 px-6 rounded-full font-bold inline-block">Mulai Belajar</button>
            <button className="text-blue-600 font-semibold">Kembali ke Beranda</button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SuccessPayment;

import { useState } from "react";
import { Link } from "react-router-dom";

const Payment = () => {
  const [toggleBankTransfer, setToggleBankTransfer] = useState(false);
  const [toggleCreditCard, setToggleCreditCard] = useState(true);

  // eslint-disable-next-line no-unused-vars
  const [paymentMethod, setPaymentMethod] = useState("Transfer Bank");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  //   const token = localStorage.getItem("token");

  const handleTransaction = async () => {
    // e.preventDefault();
  };

  const handleBankTransfer = () => {
    setToggleBankTransfer(!toggleBankTransfer);
    setToggleCreditCard(false);
    setPaymentMethod("E-Wallet");
  };
  const handleCreditCard = () => {
    setToggleCreditCard(!toggleCreditCard);
    setToggleBankTransfer(false);
    setPaymentMethod("Transfer Bank");
  };

  return (
    <>
      <div className="h-full bg-[#FFFF] pb-32 md:w-full">
        <div className="md:w-[80%] md:mx-auto">
          <div className="flex pt-4">
            <div>{/* <img src={arrow} /> */}</div>
            <Link to="/">
              <div className="font-medium pl-2">Kembali</div>
            </Link>
          </div>
          <div className="w-[80%] mx-auto">
            <div className="bg-[#FF0000] text-white text-center my-14 py-2 rounded-xl md:py-4 md:text-xl">
              Selesaikan Pembayaran sebelum 10 Maret 2023 13:00
            </div>
          </div>
          <form onSubmit={handleTransaction}>
            <div className="w-[90%] mx-auto">
              <div className="md:grid grid-cols-2">
                <div id="Transfer Method">
                  <div
                    className="bg-[#3C3C3C] rounded-md flex justify-between items-center p-3"
                    onClick={handleBankTransfer}
                  >
                    <div className="text-white">E-Wallet</div>
                    <div className="">{/* <img src={suffixDown} className="" /> */}</div>
                  </div>
                  <div
                    className={`${
                      toggleBankTransfer ? "rounded-xl border-b-2 h-28 p-4" : "hidden"
                    }`}
                  >
                    <div>Isi Pembayaran</div>
                  </div>
                  <div
                    className="bg-[#0A61AA] rounded-md flex justify-between items-center p-3 mt-4"
                    onClick={handleCreditCard}
                  >
                    <div className="text-white">Bank Transfer</div>
                    <div className="">{/* <img src={suffixDown} className="" /> */}</div>
                  </div>
                  <div
                    className={`${
                      toggleCreditCard ? "rounded-xl border-b-2 h-full p-4 md:h-[370px]" : "hidden"
                    }`}
                  >
                    <div className="w-[100%]">
                      <div>
                        <div className="font-medium">Card Number</div>
                        <div>
                          <input
                            className="mb-4 py-2 px-2 pr-24 border-b-2"
                            type="text"
                            placeholder="4480 0000 0000 0000"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">Card Holder Name</div>
                        <div>
                          <input
                            className="mb-4 py-2 px-2 pr-24 border-b-2"
                            type="text"
                            placeholder="John Doe"
                            value={cardHolderName}
                            onChange={(e) => setCardHolderName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="flex">
                        <div>
                          <div className="font-medium">CVV</div>
                          <div>
                            <input
                              className="mb-4 py-2 px-2  border-b-2"
                              type="text"
                              placeholder="000"
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="ml-3">
                          <div className="font-medium">Expiry Date</div>
                          <div>
                            <input
                              className="mb-4 py-2 border-b-2"
                              type="text"
                              placeholder="Date"
                              value={expiryDate}
                              onChange={(e) => setExpiryDate(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="Class Buy" className=" md:ml-16">
                  <div className="border-2 border-[#6148FF] rounded-xl my-5 p-4 md:my-0">
                    <div className=" mx-auto">
                      <div className="bg-white w-full h-[200px] rounded-xl shadow-xl md:w-[440px] md:h-[200px] md:mx-auto">
                        <div className=" bg-gray-500 w-full h-[50%] rounded-t-xl">
                          <img
                            className="w-full h-full"
                            //   src={banner}
                            src="https://indi.tech/wp-content/uploads/2022/03/Screenshot-2022-03-24-223956.png"
                          />
                        </div>
                        <div className="p-2">
                          <div className="flex justify-between w-full">
                            <div className="font-medium text-[#6148FF] md:text-xl">
                              {/* {details.category} */}
                              Design UI/UX
                            </div>
                          </div>
                          <div className="font-medium md:text-xl">
                            {/* {details.name} */}
                            Lorem Ipsumahsdfabk
                          </div>
                          <div className="font-medium text-sm md:pt-2">
                            {/* {details.mentor} */}
                            By Saman
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between md:justify-around">
                        <div className="pt-3">
                          <div className="font-medium">Harga</div>
                          <div>
                            {/* Rp.{details.price} */}
                            RP.190.000
                          </div>
                        </div>
                        <div className="pt-3">
                          <div className="font-medium">PPN 11%</div>
                          <div>
                            {/* Rp {(details.price * 11) / 100} */}
                            Rp30.000
                          </div>
                        </div>
                        <div className="pt-3">
                          <div className="font-medium">Total Bayar</div>
                          <div className="text-[#6148FF] font-bold">
                            {/* Rp {details.price + (details.price * 11) / 100} */}
                            Rp. 220.000
                          </div>
                        </div>
                      </div>
                      <div className="py-3">
                        <button
                          className="bg-[#FF0000] mx-auto text-center py-3 px-8 rounded-3xl text-white flex"
                          type="submit"
                        >
                          Bayar dan Ikuti Kelas Selamanya{" "}
                          <img
                            //   src={next}
                            className="ml-3"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Payment;

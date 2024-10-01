import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CardPayment from "../../components/PayemnetComponent/CardPayment";

const PaymentPage = () => {
  const [toggleBankTransfer, setToggleBankTransfer] = useState(false);
  const [toggleCreditCard, setToggleCreditCard] = useState(true);

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
      <Navbar />
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
                  <div className="border-2 border-gray-100 shadow-lg rounded-xl my-5 p-4 md:my-0">
                    <div className=" mx-auto">
                      <CardPayment />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentPage;

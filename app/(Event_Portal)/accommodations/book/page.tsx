import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const AccommodationBookingPage = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/signin");
  }

  return (
    <main className="relative w-full overflow-hidden py-20 mt-16 lg:py-28">
      <div className="mx-auto max-w-7xl px-[5vw]">
        <div className="mb-12 space-y-3 text-center">
          <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
            Book Accommodation
          </h1>
          <div className="mx-auto h-1 w-24 rounded-full bg-linear-to-r from-amber-400 to-orange-500" />
          <p className="mx-auto max-w-3xl text-base text-gray-300 md:text-lg">
            Complete your booking details and upload your payment screenshot to
            confirm your accommodation.
          </p>
        </div>

        <section className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7 rounded-3xl bg-white/5 p-7 backdrop-blur-sm md:p-9">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              Booking Details
            </h2>

            <form className="mt-6 space-y-5">
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-gray-300"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="Enter your phone number"
                  className="w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition duration-300 focus:border-amber-400"
                />
              </div>

              <div>
                <label
                  htmlFor="stayDate"
                  className="mb-2 block text-sm font-medium text-gray-300"
                >
                  Select Stay Dates
                </label>
                <select
                  id="stayDate"
                  name="stayDate"
                  required
                  defaultValue=""
                  className="w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-white outline-none transition duration-300 focus:border-amber-400"
                >
                  <option value="" disabled>
                    Choose your stay option
                  </option>
                  <option value="27-march">27th of March</option>
                  <option value="28-march">28th of March</option>
                  <option value="29-march">29th of March</option>

                  <option value="27-and-28-march">
                    27th and 28th of March
                  </option>
                  <option value="28-and-29-march">
                    28th and 29th of March
                  </option>
                  <option value="27-to-29-march">27th to 29th of March</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="transactionId"
                  className="mb-2 block text-sm font-medium text-gray-300"
                >
                  Transaction ID
                </label>
                <input
                  id="transactionId"
                  name="transactionId"
                  type="text"
                  placeholder="Enter your payment transaction ID"
                  className="w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition duration-300 focus:border-amber-400"
                />
              </div>

              <div>
                <label
                  htmlFor="paymentScreenshot"
                  className="mb-2 block text-sm font-medium text-gray-300"
                >
                  Upload Payment Screenshot
                </label>
                <input
                  id="paymentScreenshot"
                  name="paymentScreenshot"
                  type="file"
                  required
                  accept="image/*"
                  className="w-full cursor-pointer rounded-xl border border-dashed border-amber-400/40 bg-black/30 px-4 py-3 text-sm text-gray-300 file:mr-4 file:rounded-lg file:border-0 file:bg-amber-400 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-900 hover:file:bg-amber-300"
                />
                <p className="mt-2 text-xs text-gray-400">
                  Upload the screenshot of your payment confirmation.
                </p>
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center rounded-full bg-amber-400 px-7 py-3 text-base font-semibold text-slate-900 shadow-lg shadow-amber-400/30 transition-transform duration-300 hover:-translate-y-1 hover:shadow-amber-400/50"
              >
                Submit Booking Request
              </button>
            </form>
          </div>

          <aside className="lg:col-span-5 rounded-3xl border border-amber-400/30 bg-linear-to-br from-white/5 to-white/2 p-7 md:p-9">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              Payment Details
            </h2>
            <p className="mt-4 text-gray-300 leading-relaxed">
              Scan the QR code to pay your accommodation fee. After payment,
              fill in your details and upload the payment screenshot in the
              form.
            </p>

            <div className="mt-6 flex justify-center rounded-2xl bg-white p-5">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=upi%3Acomposit2026%40ybl%3Fpn%3DCOMPOSIT%2520Accommodation%26cu%3DINR"
                alt="Accommodation payment QR code"
                width={260}
                height={260}
                className="h-[260px] w-[260px]"
              />
            </div>

            <div className="mt-6 space-y-2 text-sm text-gray-300 md:text-base">
              <p>
                <span className="text-amber-300">UPI ID:</span> composit2026@ybl
              </p>
              <p>
                <span className="text-amber-300">Amount:</span> ₹300 (1 day
                pass) / ₹800 (3 day pass)
              </p>
              <p>
                <span className="text-amber-300">Note:</span> Keep the
                screenshot ready before submitting the booking form.
              </p>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
};

export default AccommodationBookingPage;

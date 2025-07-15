import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="p-6 max-w-4xl my-10 mx-auto space-y-8 bg-gradient-to-b from-gray-100 via-white to-gray-50 rounded-2xl shadow-xl">
      <h1 className="text-4xl font-bold text-center text-indigo-600">تماس با ما</h1>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-pink-600">همیشه در دسترس شما هستیم</h2>
        <p className="text-gray leading-relaxed">
          چه سوالی داشته باشید، چه مشاوره‌ای بخواید یا دنبال پیگیری سفارش‌تون باشید، تیم پشتیبانی <strong className="text-indigo-700">Landamin</strong> همیشه آماده پاسخ‌گویی‌ست.
          ما با روی باز به پیام‌هاتون پاسخ می‌دیم — سریع، دقیق و با احترام.
        </p>
        <p className="text-gray">
          از طریق روش‌های زیر می‌تونید با ما تماس بگیرید یا به صورت مستقیم با پشتیبانی آنلاین وارد گفتگو بشید:
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-4">
        <div className="flex items-center bg-white border border-gray-200 rounded-xl p-4 shadow-sm space-x-4 rtl:space-x-reverse">
          <Phone className="w-6 h-6 text-indigo-600" />
          <span className="text-lg text-gray">2205 096 0905</span>
        </div>

        <div className="flex items-center bg-white border border-gray-200 rounded-xl p-4 shadow-sm space-x-4 rtl:space-x-reverse">
          <Mail className="w-6 h-6 text-indigo-600" />
          <span className="text-lg text-gray">info@landamin.com</span>
        </div>

        <div className="flex items-center bg-white border border-gray-200 rounded-xl p-4 shadow-sm space-x-4 rtl:space-x-reverse">
          <MapPin className="w-6 h-6 text-indigo-600" />
          <span className="text-lg text-gray">تهران، خیابان جمهوری، تقاطع سعدی</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-around space-y-4 sm:space-y-0">
          <a
            href="https://wa.me/989123456789"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-green border border-green-300 px-4 py-2 rounded-xl hover:bg-green-200 transition"
          >
            <FaWhatsapp className="w-6 h-6 text-white mr-2" />
            <span className="text-lg text-white">پیام در واتساپ</span>
          </a>

          <a
            href="https://t.me/landamin"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-blue border border-blue-300 px-4 py-2 rounded-xl hover:bg-blue-200 transition"
          >
            <FaTelegramPlane className="w-6 h-6 text-white mr-2" />
            <span className="text-lg text-white">پیام در تلگرام</span>
          </a>
        </div>
      </section>

      <div className="rounded-xl overflow-hidden shadow-md">
        <iframe
          title="Landamin Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3238.913118492644!2d51.421578575796775!3d35.6891393725814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e0173e3e92c6f%3A0x6a9c2189f85de276!2z2KfZhNiz2KfZhtmK2YbYqSDYp9mE2KjYsdin2YY!5e0!3m2!1sen!2s!4v1720786800000!5m2!1sen!2s"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <p className="text-center text-sm text-gray-600 pt-4">
        Landamin | به ما پیام بده، چون پاسخ ما همیشه روشنه.
      </p>
    </div>
  );
};

export default ContactUs;

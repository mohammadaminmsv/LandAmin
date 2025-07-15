
import React from "react";

const Information = () => {
  return (
    <div className="p-6 mb-10 max-w-4xl mx-auto space-y-8 bg-gradient-to-b from-gray-100 via-white to-gray-50 rounded-2xl shadow-xl">

      <div className="w-full rounded-xl overflow-hidden shadow-md">
        <img
          src="/aboutlandamin.png"
          alt="قطعات کامپیوتر Landamin"
          className="w-full object-cover h-full"
        />
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-pink-600">Landamin، جایی که سخت‌افزار رنگ واقعیت می‌گیرد</h2>
        <p className="text-gray-800 leading-relaxed">
          در دنیای فناوری، سرعت یعنی همه‌چیز؛ اما کیفیت، یعنی ماندگاری. ما در <strong className="text-indigo-700">Landamin</strong> فقط قطعه
          نمی‌فروشیم — ما <strong className="text-green-600">سیستم می‌سازیم</strong>. سیستمی که قراره قدرت‌بخش کارهای بزرگ باشه، از اجرای بازی‌های سنگین گرفته تا تحلیل‌های گرافیکی و مهندسی.
        </p>
        <p className="text-gray-700">
          از واردات مستقیم تا پخش گسترده، از مشاوره‌ی خرید تا راه‌اندازی کامل، ما اینجاییم تا صفر تا صد
          سیستم‌تون رو با خیالی راحت به ما بسپارید. ما به کیفیت وسواس داریم، و سلامت کالا برامون فقط شعار نیست — تعهد ماست.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-blue-600">چه کاری می‌کنیم؟</h2>
        <p className="text-gray-700">
          ما واردکننده و پخش‌کننده‌ی تخصصی قطعات کامپیوتر هستیم — از مادربرد و کارت گرافیک تا SSD، رم، پاور و کیس.
          تمام محصولات ما مستقیماً از برندهای معتبر جهانی تهیه شده و با ضمانت اصالت و سلامت فیزیکی عرضه می‌شن.
          شما فقط انتخاب می‌کنید، ما بقیه مسیر رو براتون ساده و بی‌دردسر می‌کنیم.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-green-700">چرا Landamin؟</h2>
        <ul className="list-disc pr-6 space-y-1 text-gray-800">
          <li>دسترسی مستقیم به قطعات اصلی، بدون واسطه‌های اضافی</li>
          <li>بررسی و تست کامل سلامت کالا پیش از ارسال</li>
          <li>مشاوره تخصصی متناسب با بودجه و نیاز شما</li>
          <li>پشتیبانی واقعی، سریع و پاسخگو — حتی بعد از خرید</li>
          <li>لحن ساده، برخورد حرفه‌ای، و همراهی تا لحظه‌ی تحویل نهایی</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-purple-600">مخاطب ما کیه؟</h2>
        <p className="text-gray-700">
          اگه دنبال سیستمی هستی که قدرتش قابل اتکاء باشه، Landamin دقیقاً برای تو ساخته شده.
          گیمر، تدوین‌گر، برنامه‌نویس، مهندس، طراح سه‌بعدی، یا حتی کسی که فقط یه سیستم خونگی سریع می‌خواد —
          ما نیازتو می‌فهمیم و راه‌حل مخصوص بهت رو پیشنهاد می‌دیم.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-red-600">ما فقط فروشنده نیستیم — شریک دیجیتالی شما هستیم</h2>
        <p className="text-gray-700">
          ما باور داریم خرید قطعات کامپیوتر باید تجربه‌ای ساده، شفاف و لذت‌بخش باشه. به همین دلیل، در هر قدم کنارتون هستیم:
          از انتخاب هوشمندانه تا نصب و راه‌اندازی. حتی اگه شک داشته باشی چی بخری، تیم ما اینجاست تا با صداقت راهنماییت کنه.
        </p>
        <p className="text-gray-800">
          چون در نهایت، اعتماد شما سرمایه‌ی اصلی ماست.
        </p>
      </section>

      <section className="text-center pt-6">
        <p className="text-lg font-medium text-gray-900">
          تو راهت به دنیای سخت‌افزار، ما نه فقط یک تأمین‌کننده — بلکه یک <strong className="text-indigo-600">همراه واقعی</strong> هستیم.
          <br />
          <span className="text-sm text-gray-600">Landamin | قطعه به قطعه تا آینده‌ات</span>
        </p>
      </section>
    </div>
  );
};

export default Information;

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Müşteri Hizmetleri",
  description: "Size nasıl yardımcı olabiliriz?",
}

export default function CustomerServicePage() {
  return (
    <div className="content-container py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Müşteri Hizmetleri</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">İletişim</h2>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>E-posta:</strong>{" "}
                <a href="mailto:destek@iox.com.tr" className="text-blue-600 hover:underline">
                  destek@iox.com.tr
                </a>
              </p>
              <p>
                <strong>Telefon:</strong> +90 (XXX) XXX XX XX
              </p>
              <p>
                <strong>Çalışma Saatleri:</strong> Hafta içi 09:00 - 18:00
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Sık Sorulan Sorular</h2>
            
            <div className="space-y-4">
              <details className="border border-gray-200 rounded-lg p-4">
                <summary className="font-semibold cursor-pointer">
                  Sipariş iade süreci nasıl işler?
                </summary>
                <p className="mt-2 text-gray-600">
                  Ürününüzü teslim aldıktan sonra 14 gün içinde iade edebilirsiniz.
                </p>
              </details>
              
              <details className="border border-gray-200 rounded-lg p-4">
                <summary className="font-semibold cursor-pointer">
                  Kargo süresi ne kadar?
                </summary>
                <p className="mt-2 text-gray-600">
                  Siparişiniz 2-5 iş günü içinde kargoya verilir.
                </p>
              </details>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Bize Ulaşın</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  E-posta
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Mesajınız
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
              >
                Gönder
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  )
}

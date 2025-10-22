# Quote Request Component

## Hızlı Başlangıç

Bu bileşen, ürün detay sayfalarında müşterilerin teklif talebinde bulunmasını sağlar.

## Kullanım

```tsx
import QuoteRequestButton from "@modules/products/components/quote-request"

<QuoteRequestButton
  productId={product.id}
  productTitle={product.title}
  variant="secondary"
/>
```

## Props

- `productId` (string, zorunlu): Ürün ID'si
- `productTitle` (string, zorunlu): Ürün başlığı
- `variant` ("primary" | "secondary", opsiyonel): Buton stili
- `className` (string, opsiyonel): Ek CSS sınıfları

## Dosyalar

- `index.tsx`: Ana bileşen (QuoteRequestButton)
- `quote-request-form.tsx`: Form bileşeni
- `quote-request-modal.tsx`: Modal wrapper

## Gereksinimler

- Backend API endpoint'i: `POST /store/quotes`
- Environment variable: `NEXT_PUBLIC_MEDUSA_BACKEND_URL`

## Detaylı Dokümantasyon

Daha fazla bilgi için: `/docs/QUOTE_REQUEST_FEATURE.md`

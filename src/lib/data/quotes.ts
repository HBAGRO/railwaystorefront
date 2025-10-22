"use server"

import { QuoteRequestPayload, QuoteRequestResponse, QuoteRequestError } from "@/types/quote"

const MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"

export async function submitQuoteRequest(
  data: QuoteRequestPayload
): Promise<QuoteRequestResponse | QuoteRequestError> {
  try {
    const response = await fetch(`${MEDUSA_BACKEND_URL}/store/quotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Teklif isteği gönderilemedi. Lütfen tekrar deneyin.",
        errors: result.errors,
      }
    }

    return {
      success: true,
      message: "Teklif isteğiniz başarıyla alındı. En kısa sürede size dönüş yapacağız.",
      quote: result.quote,
    }
  } catch (error) {
    console.error("Quote request error:", error)
    return {
      success: false,
      message: "Bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
    }
  }
}

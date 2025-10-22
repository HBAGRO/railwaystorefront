export type QuoteRequestData = {
  name: string
  email: string
  phone: string
  quantity: number
  address: string
  notes?: string
  product_id: string
  product_title: string
}

export type QuoteRequestPayload = {
  customer_name: string
  customer_email: string
  customer_phone: string
  quantity: number
  customer_address: string
  notes?: string
  product_id: string
  product_title: string
}

export type QuoteRequestResponse = {
  success: boolean
  message?: string
  quote?: {
    id: string
    customer_name: string
    customer_email: string
    customer_phone: string
    quantity: number
    customer_address: string
    notes?: string
    product_id: string
    product_title: string
    status: string
    created_at: string
  }
}

export type QuoteRequestError = {
  success: false
  message: string
  errors?: Record<string, string[]>
}

"use client"

import { useState } from "react"
import { Button, Label } from "@medusajs/ui"
import Input from "@modules/common/components/input"
import { QuoteRequestData, QuoteRequestPayload } from "@/types/quote"
import { submitQuoteRequest } from "@lib/data/quotes"

type QuoteRequestFormProps = {
  productId: string
  productTitle: string
  onSuccess?: () => void
  onClose?: () => void
}

type FormErrors = {
  name?: string
  email?: string
  phone?: string
  quantity?: string
  address?: string
}

export default function QuoteRequestForm({
  productId,
  productTitle,
  onSuccess,
  onClose,
}: QuoteRequestFormProps) {
  const [formData, setFormData] = useState<QuoteRequestData>({
    name: "",
    email: "",
    phone: "",
    quantity: 1,
    address: "",
    notes: "",
    product_id: productId,
    product_title: productTitle,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Ad alanı zorunludur"
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-posta alanı zorunludur"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Geçerli bir e-posta adresi giriniz"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Telefon alanı zorunludur"
    }

    if (!formData.quantity || formData.quantity <= 0) {
      newErrors.quantity = "Miktar 0'dan büyük olmalıdır"
    }

    if (!formData.address.trim()) {
      newErrors.address = "Adres alanı zorunludur"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? parseInt(value) || 0 : value,
    }))

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus({ type: null, message: "" })

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    const payload: QuoteRequestPayload = {
      customer_name: formData.name,
      customer_email: formData.email,
      customer_phone: formData.phone,
      quantity: formData.quantity,
      customer_address: formData.address,
      notes: formData.notes || undefined,
      product_id: formData.product_id,
      product_title: formData.product_title,
    }

    try {
      const result = await submitQuoteRequest(payload)

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: result.message || "Teklif isteğiniz başarıyla gönderildi!",
        })

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          quantity: 1,
          address: "",
          notes: "",
          product_id: productId,
          product_title: productTitle,
        })

        // Call onSuccess callback after a delay
        setTimeout(() => {
          onSuccess?.()
        }, 2000)
      } else {
        setSubmitStatus({
          type: "error",
          message: result.message || "Bir hata oluştu. Lütfen tekrar deneyin.",
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
      <div>
        <h3 className="text-xl font-semibold mb-2">Teklif İste</h3>
        <p className="text-sm text-gray-600 mb-4">
          {productTitle} için teklif isteğinizi aşağıdaki formu doldurarak
          gönderebilirsiniz.
        </p>
      </div>

      {/* Name */}
      <div>
        <Input
          label="Ad"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleInputChange}
          required
          autoComplete="name"
        />
        {errors.name && (
          <p className="text-rose-500 text-xs mt-1">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <Input
          label="E-posta"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          autoComplete="email"
        />
        {errors.email && (
          <p className="text-rose-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <Input
          label="Telefon"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange}
          required
          autoComplete="tel"
        />
        {errors.phone && (
          <p className="text-rose-500 text-xs mt-1">{errors.phone}</p>
        )}
      </div>

      {/* Quantity */}
      <div>
        <Input
          label="Miktar"
          name="quantity"
          type="number"
          min="1"
          value={formData.quantity.toString()}
          onChange={handleInputChange}
          required
        />
        {errors.quantity && (
          <p className="text-rose-500 text-xs mt-1">{errors.quantity}</p>
        )}
      </div>

      {/* Address */}
      <div>
        <Input
          label="Adres"
          name="address"
          type="text"
          value={formData.address}
          onChange={handleInputChange}
          required
          autoComplete="street-address"
        />
        {errors.address && (
          <p className="text-rose-500 text-xs mt-1">{errors.address}</p>
        )}
      </div>

      {/* Notes */}
      <div className="flex flex-col w-full">
        <Label className="mb-2 txt-compact-medium-plus">
          Notlar (Opsiyonel)
        </Label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          rows={4}
          placeholder="Ek bilgi veya notlarınız varsa buraya yazabilirsiniz..."
          className="pt-3 pb-2 block w-full px-4 mt-0 bg-ui-bg-field border rounded-md appearance-none focus:outline-none focus:ring-0 focus:shadow-borders-interactive-with-active border-ui-border-base hover:bg-ui-bg-field-hover txt-compact-medium resize-none"
        />
      </div>

      {/* Status Messages */}
      {submitStatus.type && (
        <div
          className={`p-4 rounded-md ${
            submitStatus.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          <p className="text-sm">{submitStatus.message}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-x-3 justify-end mt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onClose}
          disabled={isSubmitting}
        >
          İptal
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          {isSubmitting ? "Gönderiliyor..." : "Teklif İste"}
        </Button>
      </div>
    </form>
  )
}

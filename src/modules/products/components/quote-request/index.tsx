"use client"

import { useState } from "react"
import { Button } from "@medusajs/ui"
import Modal from "@modules/common/components/modal"
import QuoteRequestForm from "./quote-request-form"

type QuoteRequestButtonProps = {
  productId: string
  productTitle: string
  variant?: "primary" | "secondary"
  className?: string
}

export default function QuoteRequestButton({
  productId,
  productTitle,
  variant = "secondary",
  className = "",
}: QuoteRequestButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleSuccess = () => {
    // Auto-close modal after successful submission
    setTimeout(() => {
      handleClose()
    }, 2000)
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant={variant}
        className={`w-full h-10 ${className}`}
        data-testid="quote-request-button"
      >
        Teklif İste
      </Button>

      <Modal
        isOpen={isOpen}
        close={handleClose}
        size="large"
        data-testid="quote-request-modal"
      >
        <div className="overflow-y-auto max-h-[65vh] px-2">
          <QuoteRequestForm
            productId={productId}
            productTitle={productTitle}
            onSuccess={handleSuccess}
            onClose={handleClose}
          />
        </div>
      </Modal>
    </>
  )
}

"use client"

import { useState } from "react"
import Modal from "@modules/common/components/modal"
import QuoteRequestForm from "./quote-request-form"

type QuoteRequestModalProps = {
  productId: string
  productTitle: string
}

export default function QuoteRequestModal({
  productId,
  productTitle,
}: QuoteRequestModalProps) {
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

      {/* This will be rendered by the parent component */}
    </>
  )
}

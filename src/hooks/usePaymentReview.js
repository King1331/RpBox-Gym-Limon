import { useState } from 'react';

export default function usePaymentReview() {
  const [paymentVisible, setPaymentVisible] = useState(true);
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [feedback, setFeedback] = useState('');

  const settle = (message) => {
    setPaymentVisible(false);
    setFeedback(message);
    window.setTimeout(() => setFeedback(''), 2200);
  };

  return {
    paymentVisible,
    receiptOpen,
    feedback,
    openReceipt: () => setReceiptOpen(true),
    closeReceipt: () => setReceiptOpen(false),
    settle,
  };
}
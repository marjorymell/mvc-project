class PaymentService {
  constructor() {
    this.payments = [];
    this.paymentMethods = ['credit_card', 'debit_card', 'bank_transfer', 'cash'];
  }

  // Simulate payment processing with failure scenarios
  processPayment(orderId, amount, paymentMethod) {
    console.log(`PaymentService: Processing payment for order ${orderId}`);
    
    // Simulate payment success probability (80% success rate)
    const success = Math.random() < 0.8; 
    let status, message;

    if (success) {
      status = 'paid';
      message = `Payment of $${amount} processed successfully using ${paymentMethod}`;
    } else {
      status = 'pending';
      message = `Payment failed. Please try again or choose a different payment method.`;
    }

    // Additional failure simulation for bank transfers
    if (paymentMethod === 'bank_transfer' && Math.random() < 0.3) {
      status = 'pending';
      message = 'Payment failed due to insufficient funds. Please try a different payment method.';
    }

    this.payments.push({ orderId, amount, paymentMethod, status });
    console.log(`PaymentService: ${message}`);
    return { success: status === 'paid', message, status };
  }

  getPaymentStatus(orderId) {
    const payment = this.payments.find(p => p.orderId === orderId);
    return payment ? payment.status : 'pending';
  }

  // Update order payment status
  updateOrderStatus(orderId, newStatus) {
    const payment = this.payments.find(p => p.orderId === orderId);
    if (payment) {
      payment.status = newStatus;
      console.log(`PaymentService: Updated status for order ${orderId} to ${newStatus}`);
      return true;
    }
    console.log(`PaymentService: Order ${orderId} not found`);
    return false;
  }

  getAvailablePaymentMethods() {
    return this.paymentMethods;
  }
}

module.exports = PaymentService;
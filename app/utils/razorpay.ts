declare global {
  interface Window {
    Razorpay: any;
  }
}

export const initializeRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const makePayment = async (amount: number) => {
  try {
    const res = await initializeRazorpay();
    if (!res) {
      throw new Error('Razorpay SDK failed to load');
    }

    // Create order on the server
    const response = await fetch('/api/razorpay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currency: 'INR',
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to create order');
    }

    // Initialize Razorpay payment
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: 'TrustCart',
      description: 'Payment for your order',
      order_id: data.id,
      handler: function (response: any) {
        // Handle successful payment
        console.log('Payment successful:', response);
        // You can redirect to a success page or update the order status
      },
      prefill: {
        name: 'John Doe', // Replace with actual user data
        email: 'john@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#6366f1',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  } catch (error) {
    console.error('Payment failed:', error);
    throw error;
  }
}; 
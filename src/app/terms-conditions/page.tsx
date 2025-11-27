'use client';

const TermsAndConditionPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-brown-700">
        Terms and Conditions
      </h1>

      <p className="mb-4">
        Welcome to <span className="font-semibold">Dry Basket</span>! These
        Terms and Conditions outline the rules and regulations for using our
        website and purchasing our products. By accessing or using our website,
        you agree to comply with these terms. Please read them carefully before
        using our services.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">1. General Information</h2>
      <p className="mb-4">
        The website <strong>www.drybasket.in</strong> is operated by Dry Basket
        (“we”, “our”, “us”). By accessing or purchasing from our website, you
        agree to the terms stated here. If you do not agree, please refrain from
        using our website or services.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">2. Use of Website</h2>
      <ul className="list-disc list-inside space-y-2 mb-4">
        <li>
          You must be at least 18 years old to use our website or place an
          order.
        </li>
        <li>
          You agree not to use our site for any unlawful or unauthorized
          purpose.
        </li>
        <li>
          You are responsible for maintaining the confidentiality of your
          account credentials and activities under your account.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-3">3. Product Information</h2>
      <p className="mb-4">
        We make every effort to display accurate information about our dry fruit
        products, including pricing, weight, and images. However, slight
        variations in color, size, or packaging may occur due to natural product
        differences or display settings. Dry Basket reserves the right to
        modify or discontinue any product without prior notice.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">4. Orders and Payments</h2>
      <ul className="list-disc list-inside space-y-2 mb-4">
        <li>
          By placing an order, you confirm that all information provided is true
          and accurate.
        </li>
        <li>
          All prices are listed in INR and are inclusive of applicable taxes
          unless stated otherwise.
        </li>
        <li>
          Payments are processed securely through trusted payment gateways. We
          do not store your card or payment information.
        </li>
        <li>
          Orders are subject to acceptance and availability. We reserve the
          right to cancel any order due to unforeseen circumstances or pricing
          errors.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-3">5. Shipping and Delivery</h2>
      <p className="mb-4">
        We aim to deliver all orders promptly. Shipping times may vary depending
        on your location and product availability. Once dispatched, tracking
        information will be provided via email or SMS. Please refer to our{" "}
        <a
          href="/shipping-policy"
          className="text-brown-600 underline hover:text-brown-800"
        >
          Shipping Policy
        </a>{" "}
        for more details.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">6. Returns and Refunds</h2>
      <p className="mb-4">
        Due to the perishable nature of our products, returns are accepted only
        in cases of damage or incorrect item delivery. Customers must notify us
        within 48 hours of delivery. Please read our{" "}
        <a
          href="/refund-policy"
          className="text-brown-600 underline hover:text-brown-800"
        >
          Refund Policy
        </a>{" "}
        for complete details.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">7. Intellectual Property</h2>
      <p className="mb-4">
        All content on this website — including logos, text, graphics, and
        images — is the property of Dry Basket and protected by copyright laws.
        You may not reproduce, distribute, or use any content without prior
        written consent.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">8. Limitation of Liability</h2>
      <p className="mb-4">
        Dry Basket shall not be liable for any direct, indirect, or incidental
        damages arising from the use of our website, delay in delivery, or
        inaccuracy of information. Our liability is limited to the amount paid
        for your purchase.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">9. Governing Law</h2>
      <p className="mb-4">
        These Terms and Conditions shall be governed by and construed in
        accordance with the laws of India. Any disputes shall be subject to the
        jurisdiction of courts located in New Delhi, India.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">10. Changes to Terms</h2>
      <p className="mb-4">
        We reserve the right to update or modify these Terms and Conditions at
        any time without prior notice. The updated version will be posted on
        this page with the revised date.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">11. Contact Information</h2>
      <p className="mb-4">
        For any queries regarding these Terms and Conditions, please contact us:
      </p>
      <p className="mb-2">
        📧 <strong>Email:</strong> support@drybasket.in
      </p>
      <p className="mb-2">
        📍 <strong>Address:</strong> Dry Basket HQ, New Delhi, India
      </p>

      <p className="mt-10 text-sm text-gray-500">
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
};

export default TermsAndConditionPage;

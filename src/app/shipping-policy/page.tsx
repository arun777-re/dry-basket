"use client";

import Head from "next/head";

const ShippingPolicyPage = () => {
  return (
    <>
      <Head>
        <title>Shipping Policy | Dry Basket</title>
        <meta
          name="description"
          content="Read Dry Basket's shipping policy to learn about our delivery timelines, shipping charges, service areas, and more."
        />
      </Head>

      <section className="max-w-screen-lg mx-auto px-4 md:px-8 py-10 text-gray-800 leading-relaxed">
        <h1 className="text-3xl font-semibold text-head mb-6 border-b border-gray-300 pb-3">
          Shipping Policy
        </h1>

        <p className="mb-4">
          At <strong>Dry Basket</strong>, we aim to deliver premium quality dry fruits
          to your doorstep quickly, safely, and efficiently. This Shipping Policy
          explains our delivery process, estimated timelines, and other important
          details related to your orders.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3 text-head">
          1. Order Processing Time
        </h2>
        <p className="mb-4">
          All orders are processed within <strong>1–2 business days</strong>. Orders placed
          after 5:00 PM IST will be processed the next business day. During peak
          seasons or promotional periods, processing may take slightly longer.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3 text-head">
          2. Shipping & Delivery Time
        </h2>
        <p className="mb-4">
          Once your order is processed, delivery usually takes:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li><strong>Metro cities:</strong> 2–4 business days</li>
          <li><strong>Other locations:</strong> 4–7 business days</li>
          <li>
            <strong>Remote areas:</strong> Delivery times may vary based on
            courier availability and service coverage.
          </li>
        </ul>
        <p className="mb-4">
          We work with trusted courier partners to ensure your products reach
          you in excellent condition. You’ll receive an email or SMS with a
          tracking link once your order ships.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3 text-head">
          3. Shipping Charges
        </h2>
        <p className="mb-4">
          <strong>Free shipping</strong> is available on orders above ₹499.
          For orders below ₹499, a nominal shipping fee of ₹49 may apply,
          depending on your location.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3 text-head">
          4. Order Tracking
        </h2>
        <p className="mb-4">
          You can track your order using the tracking ID shared via email/SMS.
          Simply click the link or visit our <strong>Order Tracking</strong> page
          on the website to check real-time delivery status.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3 text-head">
          5. Delayed or Missing Deliveries
        </h2>
        <p className="mb-4">
          If your order hasn’t arrived within the estimated delivery window,
          please contact our support team at{" "}
          <a href="mailto:support@drybasket.in" className="text-first underline">
            support@drybasket.in
          </a>{" "}
          or call us at <strong>+91 98765 43210</strong>. We’ll work with our
          courier partners to resolve the issue promptly.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3 text-head">
          6. Damaged Packages
        </h2>
        <p className="mb-4">
          In the unlikely event that your order arrives damaged, please take
          clear photos and contact us within <strong>24 hours</strong> of
          delivery. We’ll arrange a replacement or refund based on the situation.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3 text-head">
          7. International Shipping
        </h2>
        <p className="mb-4">
          Currently, we ship only within India. International shipping options
          may be introduced in the future.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3 text-head">
          8. Contact Us
        </h2>
        <p>
          For any queries related to shipping, please contact our customer care:
        </p>
        <ul className="list-disc list-inside mt-3 space-y-2">
          <li>Email: <a href="mailto:support@drybasket.in" className="text-first underline">support@drybasket.in</a></li>
          <li>Phone: +91 98765 43210</li>
          <li>Working Hours: Monday to Saturday, 9:30 AM – 7:30 PM</li>
        </ul>

        <p className="mt-10 text-gray-600 text-sm">
          <em>Last updated on: October 2025</em>
        </p>
      </section>
    </>
  );
};

export default ShippingPolicyPage;

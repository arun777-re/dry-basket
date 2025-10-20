'use client'

const PrivacyPolicyPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-brown-700">Privacy Policy</h1>
      <p className="mb-4">
        At <span className="font-semibold">Dry Basket</span>, we value your privacy and are
        committed to protecting your personal information. This Privacy Policy
        explains how we collect, use, and safeguard your information when you
        visit our website or make a purchase.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">1. Information We Collect</h2>
      <p className="mb-4">
        We may collect the following types of information:
      </p>
      <ul className="list-disc list-inside space-y-2 mb-4">
        <li>
          <strong>Personal Information:</strong> such as your name, email
          address, phone number, and shipping address when you place an order or
          register an account.
        </li>
        <li>
          <strong>Payment Information:</strong> collected securely through our
          payment gateways (we do not store credit/debit card details).
        </li>
        <li>
          <strong>Usage Data:</strong> including your IP address, browser type,
          and browsing behavior through cookies and analytics tools.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-3">2. How We Use Your Information</h2>
      <ul className="list-disc list-inside space-y-2 mb-4">
        <li>To process and deliver your orders efficiently.</li>
        <li>To send you order updates, offers, and promotional emails.</li>
        <li>To improve our website experience and customer service.</li>
        <li>To comply with legal requirements and prevent fraudulent activities.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-3">3. Cookies</h2>
      <p className="mb-4">
        We use cookies to enhance your browsing experience and analyze website
        traffic. You can choose to disable cookies in your browser settings, but
        some features of the site may not function properly.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">4. Data Security</h2>
      <p className="mb-4">
        We adopt appropriate data collection, storage, and processing practices
        along with security measures to protect against unauthorized access,
        alteration, or disclosure of your personal information.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">5. Sharing Your Information</h2>
      <p className="mb-4">
        We do not sell, trade, or rent users’ personal information. We may share
        limited data with trusted service providers who assist us in operating
        our business, conducting payments, or delivering products, under strict
        confidentiality agreements.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">6. Third-Party Services</h2>
      <p className="mb-4">
        Our site may include links to third-party websites. We are not
        responsible for the privacy practices or content of these sites. Please
        review their privacy policies separately.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">7. Your Rights</h2>
      <p className="mb-4">
        You have the right to access, update, or delete your personal
        information. You can also unsubscribe from marketing emails at any time
        by clicking the “unsubscribe” link provided in our communications.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">8. Updates to This Policy</h2>
      <p className="mb-4">
        Dry Basket may update this Privacy Policy from time to time. The updated
        version will be posted on this page with the revised date.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">9. Contact Us</h2>
      <p className="mb-4">
        If you have any questions or concerns about this Privacy Policy or your
        personal data, please contact us at:
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

export default PrivacyPolicyPage;

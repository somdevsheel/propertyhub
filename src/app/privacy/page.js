// src/app/privacy/page.js
export const metadata = {
  title: 'Privacy Policy - PropertyHub',
  description: 'Our privacy policy and how we handle your data',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold mb-3">Information We Collect</h2>
              <p>
                When you use our contact form or submit inquiries, we collect the following information:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Message content</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">How We Use Your Information</h2>
              <p>
                We use the information you provide to:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                <li>Respond to your property inquiries</li>
                <li>Provide information about available properties</li>
                <li>Communicate with you regarding your requests</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Data Storage and Security</h2>
              <p>
                Your information is stored securely in our database. We implement appropriate 
                technical and organizational measures to protect your personal data against 
                unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Information Sharing</h2>
              <p>
                We do not sell, trade, or rent your personal information to third parties. 
                Your contact information is used solely for the purpose of responding to your 
                property inquiries.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Cookies</h2>
              <p>
                Our website uses minimal cookies necessary for basic functionality. We do not 
                use tracking cookies or third-party advertising cookies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Your Rights</h2>
              <p>
                You have the right to:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                <li>Access your personal information</li>
                <li>Request correction of your personal data</li>
                <li>Request deletion of your personal information</li>
                <li>Object to processing of your personal data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Third-Party Services</h2>
              <p>
                We use the following third-party services:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                <li><strong>MongoDB Atlas</strong> - Database hosting</li>
                <li><strong>Cloudinary</strong> - Image hosting and optimization</li>
              </ul>
              <p className="mt-2">
                These services have their own privacy policies and we recommend reviewing them.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Children's Privacy</h2>
              <p>
                Our service is not directed to individuals under the age of 18. We do not 
                knowingly collect personal information from children.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. Any changes will be posted 
                on this page with an updated revision date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
              <p>
                If you have any questions about this privacy policy or wish to exercise your 
                rights, please contact us through our contact form.
              </p>
            </section>

            <section className="border-t pt-6">
              <p className="text-sm text-gray-600">
                <strong>Last updated:</strong> {new Date().toLocaleDateString()}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
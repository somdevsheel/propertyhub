// src/app/disclaimer/page.js
export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6">Disclaimer</h1>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold mb-3">Information Purpose Only</h2>
              <p>
                This website provides property listing information for informational purposes only. 
                We are not a real estate broker, agent, or licensed professional in the real estate industry.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">No Brokerage Services</h2>
              <p>
                PropertyHub does not provide brokerage services, real estate agency services, or any 
                professional real estate advice. We simply display property information that has been 
                submitted to our platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Accuracy of Information</h2>
              <p>
                While we strive to ensure the accuracy of property information displayed on our platform, 
                we cannot guarantee the completeness or accuracy of all listings. Property details, 
                availability, and pricing may change without notice.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">No Direct Owner Contact</h2>
              <p>
                We do not display owner contact information publicly. All inquiries must be submitted 
                through our contact form, and we will facilitate communication between interested parties 
                and property representatives.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Independent Verification</h2>
              <p>
                Users are strongly encouraged to independently verify all property information, conduct 
                proper due diligence, and consult with licensed real estate professionals before making 
                any property-related decisions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">No Liability</h2>
              <p>
                PropertyHub and its operators shall not be held liable for any errors, omissions, or 
                inaccuracies in the property information displayed, nor for any losses or damages arising 
                from the use of this platform or reliance on the information provided.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Third-Party Transactions</h2>
              <p>
                Any transactions, negotiations, or agreements made as a result of using this platform 
                are strictly between the user and the property owner or their authorized representatives. 
                We are not a party to any such transactions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Professional Advice</h2>
              <p>
                Nothing on this website should be construed as professional real estate, legal, 
                financial, or investment advice. Always consult with qualified professionals before 
                making property-related decisions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Privacy and Data</h2>
              <p>
                Information submitted through our inquiry forms will be used solely for the purpose of 
                responding to property inquiries. We do not sell or share user information with third 
                parties for marketing purposes.
              </p>
            </section>

            <section className="border-t pt-6">
              <p className="text-sm text-gray-600">
                By using this website, you acknowledge that you have read and understood this disclaimer 
                and agree to its terms. If you do not agree with any part of this disclaimer, please do 
                not use this website.
              </p>
              <p className="text-sm text-gray-600 mt-4">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
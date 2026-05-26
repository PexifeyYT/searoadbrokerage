import Link from 'next/link';
import { Truck } from 'lucide-react';

export const metadata = { title: 'Privacy Policy – Sea Road Brokerage' };

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#060D1F] text-white">
      <header className="border-b border-white/8 bg-white/3 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-2">
              <Truck className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-sm">Sea Road Brokerage</span>
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-gray-400 text-sm mb-8">Last updated: June 2025</p>

        <div className="prose prose-invert prose-sm max-w-none space-y-6 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-2">1. Information We Collect</h2>
            <p>We collect information you provide directly to us, including:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Contact information (name, email, phone number)</li>
              <li>Billing and shipping address information</li>
              <li>Freight shipment details (origin, destination, cargo type, weight)</li>
              <li>Account login credentials (email and password, encrypted)</li>
              <li>Company and carrier information for carrier applications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Provide freight brokerage services and process quote requests</li>
              <li>Contact you regarding your quote or shipment</li>
              <li>Send service updates and relevant communications</li>
              <li>Maintain your account and quote history</li>
              <li>Improve our services and website</li>
              <li>Comply with legal and regulatory obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">3. Information Sharing</h2>
            <p>We do not sell your personal information. We may share information with:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Carriers we arrange transportation with, as needed to complete your shipment</li>
              <li>Service providers who assist in operating our website and business</li>
              <li>Legal authorities when required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">4. Data Security</h2>
            <p>We use industry-standard security measures including encrypted authentication (Supabase), HTTPS, and Row-Level Security on our database to protect your personal information. However, no method of transmission over the Internet is 100% secure.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">5. Data Retention</h2>
            <p>We retain your information for as long as your account is active or as needed to provide services. You may request deletion of your account and associated data by contacting us at searoadbrokerageinc@gmail.com.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">6. Cookies</h2>
            <p>Our website uses essential cookies for authentication and session management. We do not use tracking or advertising cookies.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">7. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal information. California residents have additional rights under the CCPA. To exercise these rights, contact us at searoadbrokerageinc@gmail.com.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">8. Contact</h2>
            <p>For privacy questions or concerns:<br />
            Sea Road Brokerage INC<br />
            22492 Road 19 Site# J, Chowchilla, CA<br />
            Email: searoadbrokerageinc@gmail.com<br />
            Phone: (209) 920-0003</p>
          </section>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10">
          <Link href="/terms" className="text-blue-400 hover:text-blue-300 text-sm mr-6">Terms of Service</Link>
          <Link href="/" className="text-gray-400 hover:text-white text-sm">← Back to Home</Link>
        </div>
      </main>
    </div>
  );
}

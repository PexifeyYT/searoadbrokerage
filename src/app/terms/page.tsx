import Link from 'next/link';
import { Truck } from 'lucide-react';

export const metadata = { title: 'Terms of Service – Sea Road Brokerage' };

export default function TermsPage() {
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
        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
        <p className="text-gray-400 text-sm mb-8">Last updated: June 2025</p>

        <div className="prose prose-invert prose-sm max-w-none space-y-6 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-2">1. Agreement to Terms</h2>
            <p>By accessing or using Sea Road Brokerage INC's services, website, or submitting a quote request, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our services.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">2. Services</h2>
            <p>Sea Road Brokerage INC (USDOT 4398936, MC-1726540) is a licensed freight broker. We arrange transportation of freight between shippers and carriers. We do not own or operate trucks and are not responsible for loss or damage to freight beyond our contractual obligations.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">3. Quote Requests</h2>
            <p>Submitting a quote request does not constitute a binding contract. Quotes are estimates and are subject to change based on availability, fuel prices, and other market conditions. A binding contract is only formed when both parties have signed a bill of lading or rate confirmation.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">4. Contact Consent</h2>
            <p>By submitting a quote request or contact form, you consent to being contacted by Sea Road Brokerage INC via email or phone regarding your inquiry. You may opt out at any time by contacting us at searoadbrokerageinc@gmail.com.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">5. Limitation of Liability</h2>
            <p>Sea Road Brokerage INC's liability shall be limited to the amount paid for brokerage services. We are not liable for delays, cargo damage, or losses caused by circumstances beyond our control including weather, carrier negligence, or acts of God.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">6. Governing Law</h2>
            <p>These terms are governed by the laws of the State of California and applicable federal transportation law. Any disputes shall be resolved in courts located in Madera County, California.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">7. Changes to Terms</h2>
            <p>We reserve the right to update these terms at any time. Changes will be effective immediately upon posting to this page. Continued use of our services constitutes acceptance of the revised terms.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">8. Contact</h2>
            <p>For questions about these terms, contact us at:<br />
            Sea Road Brokerage INC<br />
            22492 Road 19 Site# J, Chowchilla, CA<br />
            Email: searoadbrokerageinc@gmail.com<br />
            Phone: (209) 920-0003</p>
          </section>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10">
          <Link href="/privacy" className="text-blue-400 hover:text-blue-300 text-sm mr-6">Privacy Policy</Link>
          <Link href="/" className="text-gray-400 hover:text-white text-sm">← Back to Home</Link>
        </div>
      </main>
    </div>
  );
}

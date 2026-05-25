import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import ContactForm from '@/components/forms/ContactForm';
import Card from '@/components/ui/Card';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900/30 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Contact Us</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Have questions? Our team is ready to help with your freight needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Get In Touch</h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Address</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      22492 Road 19 Site# J<br />
                      Chowchilla, California
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Phone</p>
                    <a href="tel:+12099200003" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                      (209) 920-0003
                    </a>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Email</p>
                    <a
                      href="mailto:searoadbrokerageinc@gmail.com"
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline break-all"
                    >
                      searoadbrokerageinc@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Hours</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      24/7 Dispatch Support<br />
                      Mon–Fri 8am–6pm PST (Office)
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">License Info</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">USDOT</span>
                  <span className="font-medium text-gray-900 dark:text-white">#4398936</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">MC Number</span>
                  <span className="font-medium text-gray-900 dark:text-white">MC-1726540</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">State</span>
                  <span className="font-medium text-gray-900 dark:text-white">California</span>
                </div>
              </div>
            </Card>

            {/* Google Maps Embed */}
            <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-dark-border h-48">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48955.52849!2d-120.265!3d37.122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80941e58f5dfd489%3A0xd05e5a6ac6869e0a!2sChowchilla%2C%20CA!5e0!3m2!1sen!2sus!4v1621234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <Card>
              <h2 className="font-semibold text-gray-900 dark:text-white text-lg mb-6">Send Us a Message</h2>
              <ContactForm />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

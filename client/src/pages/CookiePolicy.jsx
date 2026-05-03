import { motion } from 'framer-motion';

const LegalLayout = ({ title, lastUpdated, children }) => (
  <div className="min-h-screen bg-white text-black font-sans pt-32 pb-20 px-6">
    <div className="container mx-auto max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-brand-purple font-black uppercase tracking-widest text-[10px] mb-4 block">Legal Center</span>
        <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tighter mb-4">{title}</h1>
        <p className="text-gray-400 text-sm mb-12 italic">Last updated: {lastUpdated}</p>
        
        <div className="prose prose-brand max-w-none prose-h3:text-brand-purple prose-h3:font-display prose-p:text-gray-600 prose-p:leading-relaxed">
          {children}
        </div>
      </motion.div>
    </div>
  </div>
);

export default function CookiePolicy() {
  return (
    <LegalLayout title="Cookie Policy" lastUpdated="April 27, 2026">
      <section className="mb-10">
        <h3 className="text-2xl font-bold mb-4">1. What Are Cookies</h3>
        <p className="mb-4">
          Cookies are small pieces of text sent by your web browser by a website you visit. A cookie file is stored in your web browser and allows the Service or a third-party to recognize you and make your next visit easier and the Service more useful to you.
        </p>
      </section>

      <section className="mb-10">
        <h3 className="text-2xl font-bold mb-4">2. How Pixen Studio Uses Cookies</h3>
        <p className="mb-4">
          When you use and access the Service, we may place a number of cookies files in your web browser. We use cookies for the following purposes: to enable certain functions of the Service, to provide analytics, and to store your preferences.
        </p>
      </section>

      <section className="mb-10">
        <h3 className="text-2xl font-bold mb-4">3. Types of Cookies We Use</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li><strong>Essential Cookies:</strong> We may use essential cookies to authenticate users and prevent fraudulent use of user accounts.</li>
          <li><strong>Analytics Cookies:</strong> We may use analytics cookies to track information how the website is used so that we can make improvements.</li>
          <li><strong>Functional Cookies:</strong> We may use cookies to remember your choices such as language or login details.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h3 className="text-2xl font-bold mb-4">4. Your Choices Regarding Cookies</h3>
        <p className="mb-4">
          If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser. Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer.
        </p>
      </section>
    </LegalLayout>
  );
}

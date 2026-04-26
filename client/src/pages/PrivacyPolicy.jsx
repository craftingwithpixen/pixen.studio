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

export default function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="April 27, 2026">
      <section className="mb-10">
        <h3 className="text-2xl font-bold mb-4">1. Information We Collect</h3>
        <p className="mb-4">
          At Pixen Studio, we take your privacy seriously. We collect information that you provide directly to us when you fill out a contact form, subscribe to our newsletter, or communicate with us. This may include your name, email address, phone number, and any details about your project.
        </p>
      </section>

      <section className="mb-10">
        <h3 className="text-2xl font-bold mb-4">2. How We Use Your Information</h3>
        <p className="mb-4">
          We use the information we collect to provide, maintain, and improve our services. Specifically, we use your data to respond to your inquiries, send you project updates, and provide personalized design and development experiences.
        </p>
      </section>

      <section className="mb-10">
        <h3 className="text-2xl font-bold mb-4">3. Data Security</h3>
        <p className="mb-4">
          We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems.
        </p>
      </section>

      <section className="mb-10">
        <h3 className="text-2xl font-bold mb-4">4. Third-Party Disclosure</h3>
        <p className="mb-4">
          We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, so long as those parties agree to keep this information confidential.
        </p>
      </section>
    </LegalLayout>
  );
}

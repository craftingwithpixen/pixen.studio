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

export default function TermsOfService() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="April 27, 2026">
      <section className="mb-10">
        <h3 className="text-2xl font-bold mb-4">1. Agreement to Terms</h3>
        <p className="mb-4">
          By accessing or using the Pixen Studio website, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access our services.
        </p>
      </section>

      <section className="mb-10">
        <h3 className="text-2xl font-bold mb-4">2. Intellectual Property</h3>
        <p className="mb-4">
          The website and its original content, features, and functionality are and will remain the exclusive property of Pixen Studio and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Pixen Studio.
        </p>
      </section>

      <section className="mb-10">
        <h3 className="text-2xl font-bold mb-4">3. Project Engagement</h3>
        <p className="mb-4">
          Engagement for design and development services is subject to a separate Master Service Agreement (MSA) or Statement of Work (SOW). These Terms of Service apply only to the use of this website.
        </p>
      </section>

      <section className="mb-10">
        <h3 className="text-2xl font-bold mb-4">4. Limitation of Liability</h3>
        <p className="mb-4">
          In no event shall Pixen Studio, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
        </p>
      </section>
    </LegalLayout>
  );
}

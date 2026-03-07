const clients = [
  'Google', 'Microsoft', 'Figma', 'Shopify', 'Notion',
  'Vercel', 'Stripe', 'Linear', 'Dribbble', 'Loom',
  // duplicated for seamless scroll
  'Google', 'Microsoft', 'Figma', 'Shopify', 'Notion',
  'Vercel', 'Stripe', 'Linear', 'Dribbble', 'Loom',
];

export default function Clients() {
  return (
    <section className="py-14 border-y border-brand-border overflow-hidden bg-brand-bg">
      <p className="text-center badge mb-8">Trusted by teams worldwide</p>
      <div className="relative overflow-hidden">
        <div
          className="flex gap-12 items-center animate-marquee"
          style={{ width: 'max-content' }}
        >
          {clients.map((name, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-300 transition-colors duration-200 whitespace-nowrap"
            >
              <div className="w-6 h-6 rounded-md bg-brand-card border border-brand-border flex items-center justify-center">
                <span className="text-brand-light text-[10px] font-bold">{name[0]}</span>
              </div>
              <span className="font-semibold text-sm tracking-wide">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

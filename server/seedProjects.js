const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project');

dotenv.config();

const demoProjects = [
  {
    title: "Nova E-commerce",
    category: "Client Project",
    description: "A high-performance luxury fashion store built with Next.js and Shopify.",
    challenge: "Nova was struggling with slow page loads and a high bounce rate on mobile devices, leading to a 30% drop in annual revenue.",
    solution: "We rebuilt the entire frontend using Next.js for server-side rendering and optimized the checkout flow, reducing the time-to-purchase by 45%.",
    results: "Within 3 months of launch, mobile conversions increased by 120%, and the site achieved a 98/100 Lighthouse performance score.",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=2070",
    tags: ["Next.js", "Shopify", "Tailwind CSS", "UI/UX"],
    link: "https://nova-demo.pixen.studio",
    client: {
      name: "Sarah Jenkins",
      role: "CEO of Nova Global",
      feedback: "Pixen Studio didn't just build a website; they built a growth engine for our brand. The results speak for themselves."
    },
    slug: "nova-ecommerce",
    order: 1,
    featured: true
  },
  {
    title: "VitalPulse Health",
    category: "MVP",
    description: "Telemedicine platform connecting patients with specialists in real-time.",
    challenge: "The client needed to validate their telemedicine concept in a crowded market with a strict budget and a 2-month deadline.",
    solution: "We focused on core features: secure video consultation, prescription management, and appointment scheduling, using a scalable MERN stack.",
    results: "The MVP successfully secured $2M in Seed funding and onboarded 500+ licensed doctors within the first month.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2070",
    tags: ["React", "Node.js", "WebRTC", "MongoDB"],
    link: "https://vitalpulse.pixen.studio",
    client: {
      name: "Dr. Arjan Singh",
      role: "Founder",
      feedback: "The speed and quality of execution at Pixen are unmatched. They delivered a production-ready MVP in record time."
    },
    slug: "vitalpulse-health",
    order: 2,
    featured: true
  },
  {
    title: "Luminal AI Branding",
    category: "Client Project",
    description: "Complete visual identity and website for a next-gen AI research lab.",
    challenge: "Luminal AI had groundbreaking tech but lacked a visual identity that felt both futuristic and trustworthy.",
    solution: "We designed a minimalist yet bold brand system using generative patterns and a deep purple-to-green palette to reflect their tech-forward approach.",
    results: "The new branding helped Luminal secure partnerships with three Fortune 500 companies within weeks of rebranding.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1964",
    tags: ["Branding", "UI/UX", "Motion Design"],
    link: "",
    client: {
      name: "Marcus Thorne",
      role: "CTO at Luminal",
      feedback: "They captured the essence of our technology perfectly. Our new identity has given us a massive edge in recruitment."
    },
    slug: "luminal-ai",
    order: 3,
    featured: false
  },
  {
    title: "Pixen OS Dashboard",
    category: "Our Products",
    description: "Internal project management tool designed specifically for creative studios.",
    challenge: "Managing complex design workflows across distributed teams was becoming fragmented using standard tools.",
    solution: "We built a custom internal OS that combines asset management, client communication, and real-time collaboration into one interface.",
    results: "Internal efficiency increased by 60%, allowing us to take on 2x more projects without increasing headcount.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2015",
    tags: ["Product Design", "React", "Firebase"],
    link: "",
    client: {
      name: "Internal Team",
      role: "Pixen Studio",
      feedback: "This tool changed how we work. It's the backbone of everything we do at Pixen."
    },
    slug: "pixen-os",
    order: 4,
    featured: true
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB...');

    // Clear existing projects
    await Project.deleteMany({});
    console.log('Cleared existing projects.');

    // Insert demo projects
    await Project.insertMany(demoProjects);
    console.log('Successfully seeded demo projects!');

    process.exit();
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDB();

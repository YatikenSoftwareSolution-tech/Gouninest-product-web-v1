import { Home, Users, Zap } from "lucide-react";

const features = [
  {
    icon: <Home className="w-8 h-8 text-gradient" />,
    title: "Your Space, Your Rules",
    desc: "Personalised stays designed for how you live. Enjoy private or shared options with 24/7 support, full amenities, and flexible lease terms — ready when you are.",
  },
  {
    icon: <Users className="w-8 h-8 text-electric-500" />,
    title: "Join a Global Community",
    desc: "Live with students from over 50 countries. Build connections, make lifelong friends, and be part of a diverse, welcoming student network worldwide.",
  },
  {
    icon: <Zap className="w-8 h-8 text-electric-500" />,
    title: "Fast, Flexible, Stress-Free",
    desc: "Get a no-obligation quote within minutes. Our multilingual team negotiates the best deals for you — no extra fees, no hidden conditions.",
  },
];

const ChooseUs = () => (
  <section id="locations" className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16 animate-fade-in">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Why
          <span className="text-gradient"> Choose Us</span>?
        </h2>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto">
          Book with Confidence. Move In with Ease.
        </p>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto">
          Verified listings. Real student reviews. Total support from booking to
          move-in day.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-8">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:shadow-xl transition"
          >
            <div className="mb-4">{f.icon}</div>
            <h3 className="font-semibold text-xl mb-2 text-gradient">
              {f.title}
            </h3>
            <p className="text-dark text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ChooseUs;

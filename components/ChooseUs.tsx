import { Search, Clock, BadgeDollarSign } from "lucide-react";

const features = [
  {
    icon: <Search className="w-8 h-8 text-gradient" />,
    title: "Search - Compare - Relax",
    desc: "Choose from 2 Mn 100% verified student rooms near the university & compare between the best options.",
  },
  {
    icon: <Clock className="w-8 h-8 text-electric-500" />,
    title: "Easy Peasy",
    desc: "Instantly book the room in a matter of minutes. Save your time for more important things (Netflix).",
  },
  {
    icon: <BadgeDollarSign className="w-8 h-8 text-electric-500" />,
    title: "Best Price",
    desc: "We keep our promises. Grab the best offers along with the lowest price promise.",
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
          Discover why students choose us for their perfect stay, with features
          that set us apart in the most popular cities
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

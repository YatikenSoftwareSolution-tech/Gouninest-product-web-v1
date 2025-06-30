"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I book student accommodation?",
    answer: "Booking your student accommodation with UniNest is straightforward and user-friendly! Start by browsing through our extensive listings and using filters to find properties that match your preferences for location, budget, and amenities. Once you've found your ideal accommodation, click 'Book Now' to begin the process. You'll need to create a personal account, which helps us tailor your experience and keep track of your booking. We'll ask for some basic information including your student status, preferred move-in date, and contact details. To secure your booking, a deposit is required - typically equivalent to one month's rent. Our team will guide you through each step and is always available to answer any questions you might have about the booking process.",
  },
  {
    question: "What is included in the rent?",
    answer: "Our student accommodations come with a comprehensive package of included amenities to ensure a comfortable living experience. The basic utilities - water, electricity, and heating - are typically included in your rent, eliminating the hassle of managing multiple bills. High-speed internet/WiFi is provided throughout the building, ensuring you stay connected for both studies and entertainment. All rooms come fully furnished with essential items including a bed, desk, chair, wardrobe, and storage solutions. Common areas are equipped with additional furniture and amenities for shared use. Many of our properties offer premium features such as on-site gym access, regular cleaning services, communal study spaces, game rooms, and bicycle storage. Some locations even include additional services like 24/7 concierge, parcel reception, and organized social events. We recommend checking the specific property listing for a detailed breakdown of included amenities.",
  },
  {
    question: "Is the accommodation secure?",
    answer: "Your safety and security are our top priorities! Every UniNest property is equipped with comprehensive modern security systems designed to provide peace of mind. Our multi-layered security approach includes 24/7 CCTV coverage of all common areas and entry points, secure electronic access systems with individual key fobs or cards, and well-lit external areas. Many properties feature staffed reception desks during day hours and on-site security personnel during night hours. All windows and doors meet strict security standards, and many ground floor rooms have additional security measures. We maintain a detailed visitor log system and provide secure parcel storage. Our on-site teams are trained in emergency procedures, and we have direct links to local emergency services. Additionally, we offer a 24/7 emergency maintenance hotline for any urgent security concerns. Regular security audits and system updates ensure that our properties maintain the highest safety standards.",
  },
  {
    question: "Can I choose my roommates?",
    answer: "Absolutely! We understand that living with compatible roommates is crucial for a positive student experience. If you're planning to live with friends, you can easily arrange this through our group booking process. Simply mention their names during the booking procedure, and our accommodation team will work to place you together. For those looking to be matched with roommates, we use a sophisticated matching system that considers factors like study programs, interests, lifestyle preferences, and living habits to ensure compatible pairings. You can fill out a detailed preference questionnaire that helps us understand your living style, including factors like study habits, socializing preferences, and daily routines. We also organize pre-move-in virtual meet-and-greets for potential roommates when possible. If any compatibility issues arise after move-in, our on-site team is always available to help mediate and find solutions.",
  },
  {
    question: "What is the booking process?",
    answer: "Our booking process is designed to be transparent and straightforward, guiding you through several key stages to secure your perfect student home. First, browse and select your preferred accommodation through our website or mobile app. Once you've chosen, you'll complete a detailed application form that includes your personal information, university details, and preferred tenancy dates. We'll then conduct a quick eligibility check to ensure the accommodation suits your student status. Next, you'll need to pay a security deposit (typically one month's rent) which is held in a secure tenant deposit scheme. You'll receive a comprehensive tenancy agreement that outlines all terms and conditions - we encourage you to read this carefully and ask any questions you may have. Upon signing the agreement electronically, you'll receive a confirmation pack with move-in information, including your arrival date, key collection details, and essential contact information. Throughout this process, our dedicated booking team is available to assist you via phone, email, or live chat. We also provide flexible payment plans and options for international students.",
  }
];

const Faqs = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Frequently Asked
            <span className="text-gradient bg-gradient-to-r from-[var(--color-electric-500)] to-lime-500 bg-clip-text text-transparent">
              {" "}
              Questions
            </span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white rounded-lg shadow-md border border-gray-100"
            >
              <AccordionTrigger className="px-6 hover:no-underline hover:bg-gray-50 data-[state=open]:bg-gradient-to-r data-[state=open]:from-[var(--color-electric-500)] data-[state=open]:to-amber-500 data-[state=open]:text-white rounded-lg transition-all duration-200">
                <span className="text-left text-lg font-semibold">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pt-2 pb-4 text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-12 flex justify-center item-center">
          <p className="text-[var(--color-electric-500)] ">
            Still have questions?{" "}
            <span
              className="inline-block text-[var(--color-red-500)] animate-bounce text-2xl"
              style={{ animationDuration: "1s" }}
              aria-hidden="true"
            >
              ↓
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Faqs;
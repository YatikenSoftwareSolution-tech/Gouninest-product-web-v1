"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Why choose accommodation with GoUniNest?",
    answer: (
      <ul className="list-disc pl-5 space-y-1">
        <li>Wide selection of verified student properties in the UK, Australia, and the US</li>
        <li>Transparent rental prices with no hidden fees</li>
        <li>Seamless digital booking and support</li>
        <li>Long-standing partnerships with top universities and providers</li>
        <li>1-on-1 support from experienced housing advisors</li>
        <li>Special student deals and discounts</li>
        <li>Designed specifically for international student needs</li>
        <li>Easy-to-use website with smart filtering and real-time availability</li>
      </ul>
    ),
  },
  {
    question: "What types of accommodations are available for international students?",
    answer: (
      <ul className="list-disc pl-5 space-y-1">
        <li>Private en-suite rooms</li>
        <li>Shared apartments and studios</li>
        <li>Purpose-built student accommodations (PBSAs)</li>
        <li>Homestays and short-term leases</li>
        <li>On-campus affiliated and off-campus independent options</li>
      </ul>
    ),
  },
  {
    question: "How to book student houses with GoUniNest?",
    answer: (
      <ul className="list-disc pl-5 space-y-1">
        <li>Select city, university, or neighbourhood</li>
        <li>Use filters to narrow results (price, features, distance)</li>
        <li>Check out photos, reviews, and availability calendar</li>
        <li>Book online directly or consult a housing expert</li>
        <li>Complete documentation and make a secure payment</li>
      </ul>
    ),
  },
  {
    question: "How to find apartments for students online?",
    answer: (
      <ul className="list-disc pl-5 space-y-1">
        <li>Use GoUniNest’s user-friendly search platform</li>
        <li>Browse listings by location and university proximity</li>
        <li>Check out verified reviews and property photos</li>
        <li>Compare prices, inclusions, and features</li>
        <li>Contact support for assistance in shortlisting</li>
      </ul>
    ),
  },
  {
    question: "Why is college student housing so expensive?",
    answer: (
      <ul className="list-disc pl-5 space-y-1">
        <li>High demand around campuses and popular cities</li>
        <li>Properties often include premium amenities and bills</li>
        <li>Safety and location convenience increase value</li>
        <li>GoUniNest negotiates deals to offer better rates</li>
        <li>Students gain access to exclusive discounts and flexible lease terms</li>
      </ul>
    ),
  },
  {
    question: "What does my student room rent include?",
    answer: (
      <ul className="list-disc pl-5 space-y-1">
        <li>Fully furnished room setup for living and studying</li>
        <li>Utilities: electricity, water, internet, and gas</li>
        <li>Security features and maintenance support</li>
        <li>Use of shared spaces like kitchens, lounges, and fitness rooms</li>
        <li>Some properties may include meal plans or cleaning services</li>
      </ul>
    ),
  },
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
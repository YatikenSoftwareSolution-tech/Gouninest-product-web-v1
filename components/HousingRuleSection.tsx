import React, { useState } from "react";
import {
  ClipboardX,
  XCircle,
  AlertCircle,
  FileText,
  ClipboardList,
  PawPrint,
  CalendarCheck,
  CalendarPlus,
  Wallet,
  DoorOpen,
  Users,
  ScrollText,
  BedDouble,
  ChevronDown,
  Check,
  ChevronUp,
} from "lucide-react";

// Define types for clarity and type safety
interface RuleItem {
  title: string;
  icon?: React.ReactNode;
  content?: React.ReactNode;
  items?: string[];
}

interface RuleCategoryItem {
  category: string;
  icon: React.ReactNode;
  content?: string;
  items?: RuleItem[];
}
const houseRules: RuleCategoryItem[] = [
  {
    category: "Cancellation Policy",
    icon: <ClipboardX className="w-5 h-5 text-red-600" />,
    items: [
      {
        title: "No Visa No Pay",
        icon: <XCircle className="w-4 h-4 text-red-600" />,
        content: (
          <>
            <p className="mb-3 text-gray-800 leading-relaxed">
              Your application for a visa has been declined. Please note that
              this does not include situations where your visa has been granted
              and subsequently withdrawn.
            </p>
            <p className="text-gray-800 leading-relaxed">
              If you meet any of the above Cancellation Criteria and can provide
              us with evidence demonstrating that you meet the above criteria,
              your request for cancellation will be granted. If you have already
              accepted your Tenancy Agreement and paid your first instalment of
              Rent at the date your cancellation request is granted, we will
              refund you the first instalment of Rent less any Holding Fee paid
              (or an amount equivalent to the Holding Fee if you booked your
              room after 31st July).
            </p>
          </>
        ),
      },
      {
        title: "No Place No Pay",
        icon: <AlertCircle className="w-4 h-4 text-orange-600" />,
        content: (
          <>
            <p className="mb-3 text-gray-800 leading-relaxed">
              You have failed to obtain your grades to study at university and
              as such do not have student status.
            </p>
            <p className="text-gray-800 leading-relaxed">
              If you meet any of the above Cancellation Criteria and can provide
              us with evidence demonstrating that you meet the above criteria,
              your request for cancellation will be granted. If you have already
              accepted your Tenancy Agreement and paid your first instalment of
              Rent at the date your cancellation request is granted, we will
              refund you the first instalment of Rent less any Holding Fee paid
              (or an amount equivalent to the Holding Fee if you booked your
              room after 31st July).
            </p>
          </>
        ),
      },
      {
        title: "Details",
        icon: <FileText className="w-4 h-4 text-blue-600" />,
        content: (
          <div className="space-y-4">
            <h4 className="font-bold text-gray-900">Cancellation Policy</h4>
            <div className="space-y-3">
              <div>
                <h5 className="font-semibold text-gray-800 mb-2">
                  Before 31st July:
                </h5>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>
                    Pay your Holding Fee (deducted from first rent if not
                    cancelled)
                  </li>
                  <li>
                    Both Tenant and Guarantor must sign the Tenancy Agreement
                  </li>
                  <li>
                    First rent payment due by 31st July or booking may be
                    cancelled
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="font-semibold text-gray-800 mb-2">
                  After 31st July:
                </h5>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Pay first rent instalment within 3 days</li>
                  <li>Both Tenant and Guarantor must sign</li>
                  <li>No Holding Fee required</li>
                </ul>
              </div>

              <div>
                <h5 className="font-semibold text-gray-800 mb-2">
                  Cancellation Terms:
                </h5>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>
                    Within Decision Making Period: Full refund of Holding Fee
                  </li>
                  <li>
                    After Decision Period but before 31st July: Rent refund
                    minus Holding Fee
                  </li>
                  <li>
                    No action during Decision Period: Booking automatically
                    cancelled
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-semibold text-gray-800 mb-2">
                  After 1st August:
                </h5>
                <p className="text-gray-700 mb-3">
                  Cancellation only allowed if:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Visa application declined</li>
                  <li>Failed to obtain required grades</li>
                </ul>
                <p className="text-gray-700 mt-3">
                  Otherwise, tenant remains liable for full rent unless
                  replacement tenant found.
                </p>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    category: "Application Policy",
    icon: <ClipboardList className="w-5 h-5 text-purple-600" />,
    items: [
      { title: "Age Limitation", content: ">= 18 years old" },
      {
        title: "Education Requirement",
        items: ["PhD Permitted", "Postgraduate", "Undergraduate"],
      },
      { title: "Nationality or Region", content: "Unlimited nationality" },
    ],
  },
  {
    category: "Pets Policy",
    icon: <PawPrint className="w-5 h-5 text-amber-600" />,
    content: "No Pet",
  },
  {
    category: "Renewal Policy",
    icon: <CalendarCheck className="w-5 h-5 text-green-600" />,
    content:
      "Students can re-book through the student portal or contact the concierge to make an application.",
  },
  {
    category: "Early Move-in Policy",
    icon: <CalendarPlus className="w-5 h-5 text-teal-600" />,
    content:
      "Student can make an inquiry through Chapter email to apply for early check in.",
  },
  {
    category: "Refund Policy",
    icon: <Wallet className="w-5 h-5 text-indigo-600" />,
    items: [
      {
        title: "Refunds Before 31st July",
        icon: <FileText className="w-4 h-4 text-green-600" />,
        content: (
          <>
            <p className="mb-3 text-gray-800 leading-relaxed">
              You may receive a full refund of the Holding Fee if you cancel
              within the 3-day Decision Making Period.
            </p>
            <p className="text-gray-800 leading-relaxed">
              Cancellations after the Decision Period but before 31st July are
              eligible for a refund of rent paid, excluding the Holding Fee.
            </p>
          </>
        ),
      },
      {
        title: "Refunds After 31st July",
        icon: <AlertCircle className="w-4 h-4 text-orange-600" />,
        content: (
          <>
            <p className="mb-3 text-gray-800 leading-relaxed">
              Refunds are only applicable if:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Your visa application is declined (not withdrawn).</li>
              <li>You fail to obtain required academic grades.</li>
            </ul>
            <p className="mt-3 text-gray-800 leading-relaxed">
              In such cases, the first instalment of rent will be refunded,
              minus the Holding Fee or equivalent.
            </p>
          </>
        ),
      },
      {
        title: "Details",
        icon: <FileText className="w-4 h-4 text-blue-600" />,
        content: (
          <div className="space-y-4">
            <h4 className="font-bold text-gray-900">Refund Policy</h4>
            <div className="space-y-3">
              <div>
                <h5 className="font-semibold text-gray-800 mb-2">
                  Before 31st July:
                </h5>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>
                    Complete booking within 3 days (Decision Making Period)
                  </li>
                  <li>
                    Pay Holding Fee and sign Tenancy Agreement (both Tenant &
                    Guarantor)
                  </li>
                  <li>First rent payment must be made before 31st July</li>
                  <li>
                    Full refund of Holding Fee if cancelled within Decision
                    Period
                  </li>
                  <li>
                    After Decision Period but before 31st July: Rent refunded
                    minus Holding Fee
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="font-semibold text-gray-800 mb-2">
                  After 31st July:
                </h5>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>No Holding Fee required</li>
                  <li>
                    Refunds only if:
                    <ul className="list-disc pl-5 space-y-2 mt-2">
                      <li>Visa declined</li>
                      <li>Failed to get university admission</li>
                    </ul>
                  </li>
                  <li>Must provide valid supporting documents</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-semibold text-gray-800 mb-2">
                  Important Notes:
                </h5>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>
                    If you don’t meet criteria or don’t find a replacement, you
                    remain liable for full rent
                  </li>
                  <li>
                    Replacement tenants are accepted at management’s discretion
                  </li>
                  <li>
                    No replacements allowed after 1st June of tenancy period
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    category: "Room Assignment Policy",
    icon: <DoorOpen className="w-5 h-5 text-blue-600" />,
    content:
      "Certain Room number can be selected during the booking process. If available.",
  },
  {
    category: "Subletting Policy",
    icon: <Users className="w-5 h-5 text-orange-600" />,
    content: "After the Tenancy Start Date as set out in the Tenancy Agreement, requests for room moves or for us to accept a replacement tenant to take over you tenancy will be managed based on availability and at our sole discretion. An Administration Fee of £50 will be payable in each instance if agreed to by us and you will be responsible for cleaning the room in accordance with the terms of the Tenancy Agreement.\nRequests for replacement tenants received after 1 June within the Tenancy Period will not be accepted.",
  },
  {
    category: "Termination Policy",
    icon: <ScrollText className="w-5 h-5 text-gray-700" />,
    content: "Not Applicable, if students tend to terminate their current contract, after the Tenancy Start Date as set out in the Tenancy Agreement, requests for room moves or for us to accept a replacement tenant to take over you tenancy will be managed based on availability and at our sole discretion. An Administration Fee of £50 will be payable in each instance if agreed to by us and you will be responsible for cleaning the room in accordance with the terms of the Tenancy Agreement.\n Requests for replacement tenants received after 1 June within the Tenancy Period will not be accepted.",
  },
  {
    category: "Double Occupancy Policy",
    icon: <BedDouble className="w-5 h-5 text-pink-600" />,
    items: [
      {
        title: "Share Studio – Parthouse",
        content: "Increase of £000 per Week",
      },
      {
        title: "Share Studio – Lower Level",
        content: "Increase of £000 per Week",
      },
      {
        title: "Share Studio – Mid Level",
        content: "Increase of £000 per Week",
      },
      {
        title: "Share Studio – Upper Level",
        content: "Increase of £000 per Week",
      },
      {
        title: "Gold Studio – Lower Level",
        content: "Increase of £000 per Week",
      },
      {
        title: "Gold Studio – Mid Level",
        content: "Increase of £000 per Week",
      },
      {
        title: "Gold Studio – Upper Level",
        content: "Increase of £000 per Week",
      },
    ],
  },
];

export const HouseRulesSection = () => {
  const [expandedRules, setExpandedRules] = useState<Record<string, boolean>>(
    {}
  );
  const [expandedDetails, setExpandedDetails] = useState<
    Record<string, boolean>
  >({});

  const toggleRule = (category: string) => {
    setExpandedRules((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const toggleDetails = (category: string) => {
    setExpandedDetails((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h3 className="text-[20px] font-bold text-gray-900 mb-2">
          House Rules
        </h3>
        <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
      </div>
      <div className="grid gap-4">
        {houseRules.map((rule) => (
          <div
            key={rule.category}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
            aria-expanded={expandedRules[rule.category]}
          >
            <button
              className="w-full p-6 flex justify-between items-center gap-4 hover:bg-gray-50 transition-colors duration-200"
              onClick={() => toggleRule(rule.category)}
              aria-expanded={expandedRules[rule.category]}
              aria-controls={`${rule.category}-content`}
            >
              <div className="flex items-center gap-4">
                <div className="bg-gray-100 p-3 rounded-xl">
                  {rule.icon || <Check className="w-5 h-5 text-blue-600" />}
                </div>
                <h4 className="font-bold text-lg text-gray-900 text-left">
                  {rule.category}
                </h4>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-gray-600 transform transition-transform duration-300 ${
                  expandedRules[rule.category] ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              id={`${rule.category}-content`}
              className={`transition-all duration-300 ease-in-out ${
                expandedRules[rule.category]
                  ? "max-h-[2000px] opacity-100"
                  : "max-h-0 opacity-0"
              } overflow-hidden`}
            >
              <div className="px-6 pb-6 border-t border-gray-100">
                {typeof rule.content === "string" && (
                  <div className="pt-4">
                    <p className="text-gray-800 text-base leading-relaxed whitespace-pre-line">
                      {rule.content}
                    </p>
                  </div>
                )}

                {rule.items && (
                  <div className="space-y-4 pt-4">
                    {rule.items.map((item, index) => (
                      <div
                        key={item.title || index}
                        className="bg-gray-50 p-4 rounded-xl"
                      >
                        {item.title && (
                          <div className="flex items-center gap-3 mb-3">
                            {item.icon && (
                              <div className="flex-shrink-0">{item.icon}</div>
                            )}
                            <h5 className="font-bold text-gray-900 text-base">
                              {item.title}
                            </h5>
                          </div>
                        )}

                        {item.content && (
                          <div className="text-gray-800 text-sm leading-relaxed">
                            {item.title === "Details" ? (
                              <>
                                <div
                                  className={`relative transition-all duration-300 ${
                                    expandedDetails[rule.category]
                                      ? "max-h-full"
                                      : "max-h-[300px] overflow-hidden"
                                  }`}
                                >
                                  {item.content}

                                  {!expandedDetails[rule.category] && (
                                    <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                                  )}
                                </div>

                                <button
                                  onClick={() => toggleDetails(rule.category)}
                                  className="text-blue-600 hover:text-blue-800 font-medium mt-3 flex items-center gap-1"
                                >
                                  {expandedDetails[rule.category] ? (
                                    <>
                                      View less{" "}
                                      <ChevronUp className="w-5 h-5" />
                                    </>
                                  ) : (
                                    <>
                                      View more{" "}
                                      <ChevronDown className="w-5 h-5" />
                                    </>
                                  )}
                                </button>
                              </>
                            ) : (
                              item.content
                            )}
                          </div>
                        )}

                        {item.items && (
                          <ul className="space-y-2 mt-3 pl-7">
                            {item.items.map((subItem, subIndex) => (
                              <li
                                key={subIndex}
                                className="text-gray-700 text-sm flex items-start gap-3"
                              >
                                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                                <span>{subItem}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

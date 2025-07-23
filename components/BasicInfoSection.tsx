import React from "react";
import { Users, Bed, Bath } from "lucide-react";
import { Property } from "@/types/types";
import DOMPurify from "dompurify";

export interface SectionProps {
  selectedProperty: Property;
}

// Remove <h3> tags globally
const removeH3Tags = (html: string) => {
  return html.replace(/<h3[^>]*>.*?<\/h3>/gi, "");
};

// h4 tag shoul be bold
const boldH4Tags = (html: string): string => {
  return html.replace(
    /<h4([^>]*)>(.*?)<\/h4>/gi,
    `<h4 class="py-3"$1><strong>$2</strong></h4>`
  );
};

// Wrap <li> tags in <ol> if not already
const wrapListItemsWithOl = (html: string) => {
  return html.replace(
    /((?:<li>.*?<\/li>\s*)+)/gi,
    (match) => `<ol class="list-disc pl-6">${match}</ol>`
  );
};

const breakAfterEveryThirdFullStop = (html: string) => {
  const sentences = html.split(/(?<=\.)/); // Split while keeping the dot
  let count = 0;
  const result = sentences.map((sentence) => {
    count++;
    if (count % 3 === 0) {
      return sentence + '<div class="py-1"></div>';
    }
    return sentence;
  });
  return result.join("");
};

// Remove first 8 characters in every second <p> tag
const hideFirst8LettersInEverySecondParagraph = (html: string) => {
  const paragraphs = html.split("<p>");

  const modifiedParagraphs = paragraphs.map((paragraph, index) => {
    if (index === 1) return paragraph; // Skip anything before first <p>

    const [content, ...rest] = paragraph.split("</p>");
    if (index % 4 === 3) {
      const stripped = content.slice(8);
      return `<p>${stripped}</p>${rest.join("</p>")}`;
    } else {
      return `<p>${content}</p>${rest.join("</p>")}`;
    }
  });

  return modifiedParagraphs.join("");
};

export const BasicInfoSection: React.FC<SectionProps> = ({
  selectedProperty,
}) => {
  const cleanedDescription = selectedProperty.description
    ? breakAfterEveryThirdFullStop(
        wrapListItemsWithOl(
          boldH4Tags(
            hideFirst8LettersInEverySecondParagraph(
              removeH3Tags(selectedProperty.description)
            )
          )
        )
      )
    : "";

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h3 className="text-[20px] font-bold text-gray-900 mb-2">
          Basic Information
        </h3>
        <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
      </div>

      <div className="grid grid-cols-3 gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
          <Users className="w-7 h-7 text-blue-600 mb-2" />
          <span className="text-2xl font-bold text-gray-800">
            {selectedProperty.capacity || "N/A"}
          </span>
          <p className="text-sm text-gray-500 mt-1">Guests</p>
        </div>
        <div className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
          <Bed className="w-7 h-7 text-blue-600 mb-2" />
          <span className="text-2xl font-bold text-gray-800">
            {selectedProperty.bedrooms || "N/A"}
          </span>
          <p className="text-sm text-gray-500 mt-1">Bedrooms</p>
        </div>
        <div className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
          <Bath className="w-7 h-7 text-blue-600 mb-2" />
          <span className="text-2xl font-bold text-gray-800">
            {selectedProperty.bathrooms || "N/A"}
          </span>
          <p className="text-sm text-gray-500 mt-1">Bathrooms</p>
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <h4 className="font-semibold text-gray-800 mb-3">Description</h4>
        {cleanedDescription ? (
          <div
            className="text-left prose max-w-none text-gray-700 text-sm prose-h1:text-lg prose-p:leading-relaxed prose-ol:pl-5 prose-li:marker:text-blue-500"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(cleanedDescription),
            }}
          />
        ) : (
          <p className="text-gray-400">No description available</p>
        )}
      </div>
    </div>
  );
};

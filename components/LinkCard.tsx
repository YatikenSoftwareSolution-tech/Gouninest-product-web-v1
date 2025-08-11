import { X } from "lucide-react";
import Image from "next/image";

interface LinkCardProps {
  copied: boolean;
  handleCopyLink: () => void;
  handleBackToMain: () => void;
  isTransitioning: boolean;
}

const LinkCard = ({
  copied,
  handleCopyLink,
  handleBackToMain,
  isTransitioning,
}: LinkCardProps) => {
  const referralLink = "https://gouninest.com/referral/giftc";
  const shareMessage = "Check out this amazing service! Use my referral link: ";

  const handleWhatsAppShare = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(
      `${shareMessage}${referralLink}`
    )}`;
    window.open(url, "_blank");
  };

  const handleTelegramShare = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(
      referralLink
    )}&text=${encodeURIComponent(shareMessage)}`;
    window.open(url, "_blank");
  };

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      referralLink
    )}&quote=${encodeURIComponent(shareMessage)}`;
    window.open(url, "_blank", "width=600,height=400");
  };

  const handleEmailShare = () => {
    const subject = "Check out this referral link";
    const body = `${shareMessage}${referralLink}`;
    const url = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
  };

  return (
    <div
      className={`relative w-full bg-white backdrop-blur-2xl border border-white/30 rounded-2xl p-5 shadow-2xl transition-all duration-500 ${
        isTransitioning
          ? "opacity-0 transform scale-95 translate-x-4"
          : "opacity-100 transform scale-100 translate-x-0"
      }`}
    >
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-bold text-black">Refer via Link</h2>
        <button
          onClick={handleBackToMain}
          className=" p-1 absolute right-2 top-2 text-gray-500 hover:text-gray-600 transition-transform hover:rotate-90 duration-300 hover:scale-110 hover:bg-gray-100 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={referralLink}
          readOnly
          className="flex-1 p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 text-sm"
        />
        <button
          onClick={handleCopyLink}
          className={`px-4 py-3 rounded-lg font-semibold transition-colors text-sm ${
            copied
              ? "bg-green-500 text-white"
              : "bg-red-400 hover:bg-red-500 text-white"
          }`}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <div className="flex gap-3 ">
        <button
          onClick={handleWhatsAppShare}
          className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-md"
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <div>
              <Image
                src="/whatsapp-color.png"
                alt="whatsapp"
                width={24}
                height={24}
              />
            </div>
          </div>
        </button>
        <button
          onClick={handleTelegramShare}
          className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-md"
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <div>
              <Image
                src="/telegram.png"
                alt="telegram"
                width={45}
                height={45}
              />
            </div>
          </div>
        </button>
        <button
          onClick={handleFacebookShare}
          className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-md"
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <div>
              <Image
                src="/facebook.png"
                alt="facebook"
                width={40}
                height={40}
              />
            </div>
          </div>
        </button>
        <button
          onClick={handleEmailShare}
          className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-md"
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <div>
              <Image src="/gmail.png" alt="mail" width={40} height={40} />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default LinkCard;

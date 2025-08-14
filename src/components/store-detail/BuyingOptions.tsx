import React from "react";
import {
  Smartphone,
  Globe,
  ShoppingBag,
  MessageCircle,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  ExternalLink,
  Apple,
  Play,
  Store,
  Hash,
  Video,
  MessageSquare,
} from "lucide-react";

interface BuyingOptionsProps {
  buyingOptions?: {
    appStores?: {
      appStore?: string;
      playStore?: string;
    };
    marketplaces?: string[];
    socialMedia?: {
      instagram?: string;
      facebook?: string;
      twitter?: string;
      youtube?: string;
      whatsapp?: string;
    };
  };
}

const BuyingOptions: React.FC<BuyingOptionsProps> = ({ buyingOptions }) => {
  if (!buyingOptions) {
    return null;
  }

  const { appStores, marketplaces, socialMedia } = buyingOptions;

  return (
    <div className="space-y-4 md:space-y-6 mb-4 md:mb-6">
      {/* App Stores */}
      {(appStores?.appStore || appStores?.playStore) && (
        <div>
          <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-2 md:mb-3 flex items-center gap-2">
            <Smartphone className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
            Download Our App
          </h3>
          <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
            {appStores.appStore && (
              <a
                href={appStores.appStore}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 md:gap-3 bg-gray-100 text-gray-700 px-3 py-2.5 md:px-4 md:py-3 rounded-lg text-xs md:text-sm font-medium hover:bg-gray-200 transition-colors border border-gray-200 w-full sm:w-auto"
              >
                <Apple className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                <span>App Store</span>
                <ExternalLink className="w-3 h-3 md:w-4 md:h-4 text-gray-500" />
              </a>
            )}
            {appStores.playStore && (
              <a
                href={appStores.playStore}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 md:gap-3 bg-gray-100 text-gray-700 px-3 py-2.5 md:px-4 md:py-3 rounded-lg text-xs md:text-sm font-medium hover:bg-gray-200 transition-colors border border-gray-200 w-full sm:w-auto"
              >
                <Play className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                <span>Google Play</span>
                <ExternalLink className="w-3 h-3 md:w-4 md:h-4 text-gray-500" />
              </a>
            )}
          </div>
        </div>
      )}

      {/* Marketplaces */}
      {marketplaces && marketplaces.length > 0 && (
        <div>
          <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-2 md:mb-3 flex items-center gap-2">
            <Store className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
            Available On
          </h3>
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 md:gap-3">
            {marketplaces.map((marketplace, index) => (
              <div
                key={index}
                className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-3 py-2.5 md:px-4 md:py-3 rounded-lg text-xs md:text-sm font-medium border border-gray-200 w-full sm:w-auto"
              >
                <Globe className="w-3 h-3 md:w-4 md:h-4 text-gray-500 flex-shrink-0" />
                <span className="truncate">{marketplace}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Social Media */}
      {socialMedia && Object.values(socialMedia).some(Boolean) && (
        <div>
          <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-2 md:mb-3 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
            Follow Us
          </h3>
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 md:gap-3">
            {socialMedia.instagram && (
              <a
                href={socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-3 py-2.5 md:px-4 md:py-3 rounded-lg text-xs md:text-sm font-medium hover:bg-gray-200 transition-colors border border-gray-200 w-full sm:w-auto"
              >
                <Instagram className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                <span>Instagram</span>
                <ExternalLink className="w-3 h-3 md:w-4 md:h-4 text-gray-500" />
              </a>
            )}
            {socialMedia.facebook && (
              <a
                href={socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-3 py-2.5 md:px-4 md:py-3 rounded-lg text-xs md:text-sm font-medium hover:bg-gray-200 transition-colors border border-gray-200 w-full sm:w-auto"
              >
                <Facebook className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                <span>Facebook</span>
                <ExternalLink className="w-3 h-3 md:w-4 md:h-4 text-gray-500" />
              </a>
            )}
            {socialMedia.twitter && (
              <a
                href={socialMedia.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-3 py-2.5 md:px-4 md:py-3 rounded-lg text-xs md:text-sm font-medium hover:bg-gray-200 transition-colors border border-gray-200 w-full sm:w-auto"
              >
                <Hash className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                <span>Twitter</span>
                <ExternalLink className="w-3 h-3 md:w-4 md:h-4 text-gray-500" />
              </a>
            )}
            {socialMedia.youtube && (
              <a
                href={socialMedia.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-3 py-2.5 md:px-4 md:py-3 rounded-lg text-xs md:text-sm font-medium hover:bg-gray-200 transition-colors border border-gray-200 w-full sm:w-auto"
              >
                <Video className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                <span>YouTube</span>
                <ExternalLink className="w-3 h-3 md:w-4 md:h-4 text-gray-500" />
              </a>
            )}
            {socialMedia.whatsapp && (
              <a
                href={socialMedia.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-3 py-2.5 md:px-4 md:py-3 rounded-lg text-xs md:text-sm font-medium hover:bg-gray-200 transition-colors border border-gray-200 w-full sm:w-auto"
              >
                <MessageSquare className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                <span>WhatsApp</span>
                <ExternalLink className="w-3 h-3 md:w-4 md:h-4 text-gray-500" />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyingOptions;

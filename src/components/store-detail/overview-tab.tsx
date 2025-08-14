"use client";

import {
  ShoppingCart,
  Truck,
  Shield,
  CreditCard,
  RefreshCw,
  Phone,
  Mail,
  MapPin,
  Globe,
  Clock,
  Star,
  Users,
  Calendar,
  Award,
  CheckCircle,
  AlertCircle,
  Info,
  Package,
  Headphones,
  Gift,
  ShieldCheck,
  MessageSquare,
  ThumbsUp,
  Share2,
  Flag,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RatingBreakdown } from "./RatingBreakdown";
import { useStoreDetails } from "@/stores/storeDetailsStore";
import BuyingOptions from "./BuyingOptions";
import RatingOverview from "./RatingOverview";

interface StorePolicy {
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string[];
}

interface PaymentMethod {
  name: string;
  icon: React.ReactNode;
  available: boolean;
}

interface ShippingOption {
  name: string;
  price: string;
  delivery: string;
  description: string;
}

interface OverviewTabProps {
  storeId: string;
}

export function OverviewTab({ storeId }: OverviewTabProps) {
  const { storeDetails } = useStoreDetails();
  const isClaimed = storeDetails.data?.claimed || false;

  const storePolicies: StorePolicy[] = [
    {
      title: "Shipping Policy",
      description:
        "Fast and reliable shipping to get your orders to you quickly",
      icon: <Truck className="w-5 h-5 text-blue-600" />,
      details: [
        "Free shipping on orders over $50",
        "Standard shipping: 3-5 business days",
        "Express shipping: 1-2 business days",
        "Same-day delivery available in select areas",
        "Real-time tracking for all orders",
        "Multiple shipping carriers (FedEx, UPS, USPS)",
      ],
    },
    {
      title: "Return & Refund Policy",
      description: "Hassle-free returns with our customer-friendly policy",
      icon: <RefreshCw className="w-5 h-5 text-green-600" />,
      details: [
        "30-day return window from delivery date",
        "Free return shipping for defective items",
        "Full refund for unused items in original packaging",
        "Partial refund for used items (restocking fee may apply)",
        "Return labels provided for eligible returns",
        "Refunds processed within 5-7 business days",
      ],
    },
    {
      title: "Payment & Security",
      description:
        "Multiple secure payment options to protect your information",
      icon: <Shield className="w-5 h-5 text-purple-600" />,
      details: [
        "SSL encryption for all transactions",
        "PCI DSS compliant payment processing",
        "Fraud protection and monitoring",
        "Secure checkout with 3D Secure",
        "Multiple payment methods accepted",
        "Buy now, pay later options available",
      ],
    },
    {
      title: "Customer Support",
      description: "24/7 support to help with any questions or issues",
      icon: <Headphones className="w-5 h-5 text-orange-600" />,
      details: [
        "Live chat available 24/7",
        "Phone support: Mon-Fri 8AM-8PM EST",
        "Email support with 2-hour response time",
        "Help center with detailed guides",
        "Order tracking and status updates",
        "Product recommendations and sizing help",
      ],
    },
  ];

  const paymentMethods: PaymentMethod[] = [
    { name: "Visa", icon: <CreditCard className="w-5 h-5" />, available: true },
    {
      name: "Mastercard",
      icon: <CreditCard className="w-5 h-5" />,
      available: true,
    },
    {
      name: "American Express",
      icon: <CreditCard className="w-5 h-5" />,
      available: true,
    },
    { name: "PayPal", icon: <Globe className="w-5 h-5" />, available: true },
    {
      name: "Apple Pay",
      icon: <CreditCard className="w-5 h-5" />,
      available: true,
    },
    {
      name: "Google Pay",
      icon: <CreditCard className="w-5 h-5" />,
      available: true,
    },
    {
      name: "Shop Pay",
      icon: <CreditCard className="w-5 h-5" />,
      available: true,
    },
    {
      name: "Afterpay",
      icon: <CreditCard className="w-5 h-5" />,
      available: true,
    },
  ];

  const shippingOptions: ShippingOption[] = [
    {
      name: "Standard Shipping",
      price: "Free over $50",
      delivery: "3-5 business days",
      description: "Best value for most orders",
    },
    {
      name: "Express Shipping",
      price: "$9.99",
      delivery: "1-2 business days",
      description: "Faster delivery for urgent needs",
    },
    {
      name: "Same Day Delivery",
      price: "$19.99",
      delivery: "Same day",
      description: "Available in select metro areas",
    },
    {
      name: "International",
      price: "Varies by location",
      delivery: "7-14 business days",
      description: "Worldwide shipping available",
    },
  ];

  const storeInfo = {
    name: "Store Name",
    founded: "2012",
    employees: "150+",
    locations: "3 retail stores + online",
    certifications: ["BBB A+ Rating", "ISO 9001", "Green Business Certified"],
    awards: [
      "Best Online Retailer 2023",
      "Customer Choice Award 2022",
      "Excellence in Service 2021",
    ],
  };

  const contactInfo = [
    {
      type: "Customer Service",
      icon: <Phone className="w-4 h-4 text-blue-600" />,
      value: "+1 (555) 123-4567",
      hours: "Mon-Fri: 8AM-8PM EST",
      action: "Call Now",
    },
    {
      type: "Email Support",
      icon: <Mail className="w-4 h-4 text-green-600" />,
      value: "support@storename.com",
      hours: "24/7",
      action: "Send Email",
    },
    {
      type: "Live Chat",
      icon: <Headphones className="w-4 h-4 text-purple-600" />,
      value: "Available 24/7",
      hours: "Always Online",
      action: "Start Chat",
    },
    {
      type: "Retail Store",
      icon: <MapPin className="w-4 h-4 text-red-600" />,
      value: "123 Business St, City, State 12345",
      hours: "Mon-Sat: 9AM-6PM",
      action: "Get Directions",
    },
  ];

  const companyRankings = [
    "#1 of 156 best companies in Online Retail",
    "#3 of 89 best companies in E-commerce",
    "#2 of 67 best companies in Customer Service",
    "#1 of 45 best companies in Fast Shipping",
  ];

  return (
    <div className="min-h-screen bg-gray-50 md:p-2">
      <div className="flex flex-col lg:flex-row gap-4 md:gap-6 md:px-4">
        <div className="flex-1 space-y-4 md:space-y-6">
          {/* Company Details */}
          <div className="bg-white p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">
              Company details
            </h2>

            {/* About Company */}
            <div className="mb-4">
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">
                About Our Store
                <span className="text-xs md:text-sm text-gray-500 ml-2">
                  (Written by the company)
                </span>
              </h3>

              <div className="text-gray-700 text-xs md:text-sm leading-relaxed space-y-2 md:space-y-3">
                <p>
                  We are a trusted online retailer committed to providing
                  exceptional products and outstanding customer service. Founded
                  in 2012, we've built a reputation for quality, reliability,
                  and customer satisfaction.
                </p>
                <p>
                  Our mission is to make shopping easy, secure, and enjoyable
                  for all our customers. We offer a wide range of products with
                  competitive pricing and fast shipping options to meet your
                  needs.
                </p>
                <p>
                  With over a decade of experience and a team of 150+ dedicated
                  professionals, we've served thousands of satisfied customers
                  and continue to grow our business while maintaining the
                  highest standards of service.
                </p>
              </div>
            </div>

            <div className="text-center">
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 text-sm md:text-base px-3 md:px-4 py-2 md:py-2"
              >
                See more
              </Button>
            </div>

            {/* Buying Options */}
            <BuyingOptions
              buyingOptions={{
                appStores: {
                  appStore: "https://apps.apple.com/app/example",
                  playStore:
                    "https://play.google.com/store/apps/details?id=example",
                },
                marketplaces: ["Amazon", "Flipkart", "Myntra", "Nykaa"],
                socialMedia: {
                  instagram: "https://instagram.com/example",
                  facebook: "https://facebook.com/example",
                  twitter: "https://twitter.com/example",
                  youtube: "https://youtube.com/example",
                  whatsapp: "https://wa.me/1234567890",
                },
              }}
            />
          </div>

          {/* Contact Info */}
          <div className="bg-white p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
              Contact info
            </h2>
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-start gap-3 md:gap-4">
                <MapPin className="w-5 h-5 md:w-6 md:h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm md:text-base font-medium text-gray-900 mb-1">
                    Address
                  </p>
                  <p className="text-xs md:text-base text-gray-700">
                    6th Floor, Business Center, 123 Main Street, Suite 100, New
                    York, NY 10001, United States
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 md:gap-4">
                <Phone className="w-5 h-5 md:w-6 md:h-6 text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-sm md:text-base font-medium text-gray-900 mb-1">
                    Phone
                  </p>
                  <p className="text-xs md:text-base text-gray-700">
                    +1 (555) 123-4567
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 md:gap-4">
                <Mail className="w-5 h-5 md:w-6 md:h-6 text-purple-600 flex-shrink-0" />
                <div>
                  <p className="text-sm md:text-base font-medium text-gray-900 mb-1">
                    Email
                  </p>
                  <p className="text-xs md:text-base text-gray-700">
                    support@storename.com
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 md:gap-4">
                <Globe className="w-5 h-5 md:w-6 md:h-6 text-orange-600 flex-shrink-0" />
                <div>
                  <p className="text-sm md:text-base font-medium text-gray-900 mb-1">
                    Website
                  </p>
                  <p className="text-xs md:text-base text-gray-700">
                    www.storename.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar with RatingBreakdown */}
        <div className="lg:w-80 space-y-4 md:space-y-6">
          {/* Overall Rating */}
          <RatingOverview
            rating={4.8}
            totalReviews={17000}
            ratingBreakdown={{
              5: 14500,
              4: 1700,
              3: 510,
              2: 170,
              1: 170,
            }}
          />

          {/* Company Response Block - Commented out for now
          <div className="bg-white p-4 md:p-6">
            <div className="flex items-center gap-2 md:gap-3 mb-3">
              <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-gray-500 flex-shrink-0" />
              <div>
                <div className="text-xs md:text-sm font-medium text-gray-900">
                  Company Response
                </div>
                <div className="text-xs md:text-sm text-gray-600">
                  Replied to 98% of negative reviews
                </div>
                <div className="text-xs md:text-sm text-gray-600">
                  Typically replies within 1 week
                </div>
              </div>
            </div>
          </div>
          */}

          {/* Claim Your Business Block - Conditionally shown based on claimed status */}
          {!isClaimed ? (
            <div className="bg-white p-4 md:p-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                Is this your business?
              </h2>
              <p className="text-gray-600 mb-6 text-sm md:text-base">
                Claim your listing for free to respond to reviews, update your
                profile and manage your listing.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 w-full">
                Claim your business
              </Button>
            </div>
          ) : (
            <div className="bg-white p-4 md:p-6">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  Claimed Profile
                </h2>
              </div>
              <p className="text-gray-600 mb-4 text-sm md:text-base">
                This business profile has been claimed and is actively managed
                by the business owner.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Verified business owner</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Can respond to reviews</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Profile actively managed</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

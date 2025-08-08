"use client";

import { useState } from "react";
import { 
  Info, 
  MessageSquare, 
  Truck, 
  RotateCcw, 
  Tag, 
  Bell, 
  TrendingUp, 
  Users, 
  AlertTriangle,
  Shield,
  CheckCircle,
  Star,
  Globe,
  Phone,
  MapPin,
  Calendar,
  Package,
  CreditCard,
  Headphones,
  Gift,
  Zap,
  BarChart3,
  Heart,
  Flag
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Store {
  id?: string;
  name?: string;
  description?: string;
  logo?: string;
  rating?: number;
  totalRatings?: number;
  verified?: boolean;
  claimed?: boolean;
  website?: string;
  mobile?: string;
  state?: string;
  country?: string;
  tags?: string[];
  storeCategories?: Array<{ id: string; name: string }>;
}

interface Review {
  id: string;
  userId: string;
  comment: string;
  rating: number;
  createdAt: string;
  user?: {
    id: string;
    name: string;
    picture?: string;
  };
}

interface StoreDetailTabsProps {
  store?: Store;
  reviews: Review[];
  userReviewsCount: number;
}

export function StoreDetailTabs({ store, reviews, userReviewsCount }: StoreDetailTabsProps) {
  const [activeTab, setActiveTab] = useState("overview");

  // Add CSS for hiding scrollbar on webkit browsers
  const scrollbarHideStyle = `
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `;

  const tabsConfig = [
    {
      id: "overview",
      label: "Overview",
      icon: <Info className="w-4 h-4" />,
      count: null
    },
    {
      id: "reviews",
      label: "Reviews",
      icon: <MessageSquare className="w-4 h-4" />,
      count: userReviewsCount || reviews?.length || 0
    },
    {
      id: "shipping",
      label: "Shipping",
      icon: <Truck className="w-4 h-4" />,
      count: null
    },
    {
      id: "returns",
      label: "Returns & Support",
      icon: <RotateCcw className="w-4 h-4" />,
      count: null
    },
    {
      id: "deals",
      label: "Deals",
      icon: <Tag className="w-4 h-4" />,
      count: 3 // Mock count
    },
    {
      id: "coupons",
      label: "Coupons & Alerts",
      icon: <Bell className="w-4 h-4" />,
      count: 5 // Mock count
    },
    {
      id: "performance",
      label: "Performance",
      icon: <TrendingUp className="w-4 h-4" />,
      count: null
    },
    {
      id: "community",
      label: "Community",
      icon: <Users className="w-4 h-4" />,
      count: 12 // Mock count
    },
    {
      id: "reports",
      label: "Reports",
      icon: <AlertTriangle className="w-4 h-4" />,
      count: 0
    }
  ];

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Store Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
              {store?.logo ? (
                <img
                  src={store.logo}
                  alt={`${store?.name} logo`}
                  className="w-12 h-12 object-contain rounded-lg"
                />
              ) : (
                <span className="text-xl font-bold text-blue-600">
                  {store?.name?.charAt(0) || 'S'}
                </span>
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold">{store?.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= (store?.rating || 0)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {(store?.rating || 0).toFixed(1)} ({store?.totalRatings || 0} reviews)
                </span>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">{store?.description}</p>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {store?.verified && (
              <Badge className="bg-green-100 text-green-800 border-green-200">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified Store
              </Badge>
            )}
            {store?.claimed && (
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                <Shield className="w-3 h-3 mr-1" />
                Claimed Profile
              </Badge>
            )}
            <Badge className="bg-purple-100 text-purple-800 border-purple-200">
              <Star className="w-3 h-3 mr-1" />
              Top Rated
            </Badge>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-gray-900">98%</div>
              <div className="text-xs text-gray-600">Trust Score</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-gray-900">95%</div>
              <div className="text-xs text-gray-600">Response Rate</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-gray-900">2h</div>
              <div className="text-xs text-gray-600">Avg Response</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-gray-900">4.7</div>
              <div className="text-xs text-gray-600">Rating</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {store?.website && (
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-gray-400" />
              <div>
                <div className="text-sm text-gray-500">Website</div>
                <a href={store.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {store.website}
                </a>
              </div>
            </div>
          )}
          {store?.mobile && (
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <div>
                <div className="text-sm text-gray-500">Phone</div>
                <div className="font-medium">{store.mobile}</div>
              </div>
            </div>
          )}
          {(store?.state || store?.country) && (
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <div>
                <div className="text-sm text-gray-500">Location</div>
                <div className="font-medium">
                  {[store?.state, store?.country].filter(Boolean).join(', ')}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const ReviewsTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Customer Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Reviews will be displayed here</h3>
            <p className="text-gray-600">This will show the existing reviews component</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const ShippingTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-blue-600" />
            Shipping Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Shipping Methods</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">Standard Shipping</div>
                    <div className="text-sm text-gray-600">3-5 business days</div>
                  </div>
                  <div className="text-green-600 font-medium">Free</div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">Express Shipping</div>
                    <div className="text-sm text-gray-600">1-2 business days</div>
                  </div>
                  <div className="font-medium">$9.99</div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">Overnight</div>
                    <div className="text-sm text-gray-600">Next business day</div>
                  </div>
                  <div className="font-medium">$24.99</div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Shipping Regions</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">United States</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Canada</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">International (Selected Countries)</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const ReturnsTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-blue-600" />
            Returns & Support
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Return Policy</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium">30-Day Returns</div>
                    <div className="text-sm text-gray-600">Full refund within 30 days</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium">Original Packaging</div>
                    <div className="text-sm text-gray-600">Items must be in original condition</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CreditCard className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium">Refund Method</div>
                    <div className="text-sm text-gray-600">Original payment method</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Customer Support</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Headphones className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="font-medium">Live Chat</div>
                    <div className="text-sm text-gray-600">24/7 availability</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="font-medium">Phone Support</div>
                    <div className="text-sm text-gray-600">Mon-Fri 9AM-6PM</div>
                  </div>
                </div>
                <Button className="w-full mt-4">
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const DealsTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-blue-600" />
            Current Deals & Offers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="border border-green-200 bg-green-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Gift className="w-8 h-8 text-green-600" />
                <div className="flex-1">
                  <h4 className="font-semibold text-green-800">Free Shipping Weekend</h4>
                  <p className="text-sm text-green-700">Free shipping on all orders over $50</p>
                  <p className="text-xs text-green-600 mt-1">Valid until Dec 31, 2024</p>
                </div>
                <Badge className="bg-green-200 text-green-800">Active</Badge>
              </div>
            </div>
            <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Zap className="w-8 h-8 text-blue-600" />
                <div className="flex-1">
                  <h4 className="font-semibold text-blue-800">Flash Sale - 25% Off</h4>
                  <p className="text-sm text-blue-700">Limited time offer on selected items</p>
                  <p className="text-xs text-blue-600 mt-1">Valid until Dec 25, 2024</p>
                </div>
                <Badge className="bg-blue-200 text-blue-800">Limited</Badge>
              </div>
            </div>
            <div className="border border-purple-200 bg-purple-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Heart className="w-8 h-8 text-purple-600" />
                <div className="flex-1">
                  <h4 className="font-semibold text-purple-800">Loyalty Rewards</h4>
                  <p className="text-sm text-purple-700">Earn points with every purchase</p>
                  <p className="text-xs text-purple-600 mt-1">Ongoing program</p>
                </div>
                <Badge className="bg-purple-200 text-purple-800">Ongoing</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const CouponsTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-600" />
            Coupons & Price Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Available Coupons</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-white p-3 rounded border">
                  <div>
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">SAVE20</code>
                    <p className="text-sm text-gray-600 mt-1">20% off your first order</p>
                  </div>
                  <Button size="sm" variant="outline">Copy</Button>
                </div>
                <div className="flex items-center justify-between bg-white p-3 rounded border">
                  <div>
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">FREESHIP</code>
                    <p className="text-sm text-gray-600 mt-1">Free shipping on orders $25+</p>
                  </div>
                  <Button size="sm" variant="outline">Copy</Button>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Price Drop Alerts</h4>
              <p className="text-sm text-gray-600 mb-3">Get notified when prices drop on your favorite items</p>
              <Button className="w-full">
                <Bell className="w-4 h-4 mr-2" />
                Set Price Alert
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const PerformanceTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Store Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">A+</div>
              <div className="text-sm text-gray-600">Overall Grade</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">4.7</div>
              <div className="text-sm text-gray-600">Avg Rating</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">98%</div>
              <div className="text-sm text-gray-600">Satisfaction</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">2.1h</div>
              <div className="text-sm text-gray-600">Response Time</div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Customer Service</span>
                <span>95%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Shipping Speed</span>
                <span>88%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '88%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Product Quality</span>
                <span>92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const CommunityTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Community & Social
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Community Features Coming Soon</h3>
            <p className="text-gray-600 mb-4">Q&A, customer photos, and owner replies will be available here</p>
            <Button variant="outline">Join Community</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const ReportsTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flag className="w-5 h-5 text-red-600" />
            Reports & Trust Issues
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-green-600" />
                <div>
                  <h4 className="font-semibold text-green-800">Clean Record</h4>
                  <p className="text-sm text-green-700">No scam reports or suspicious activity detected</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Trust Indicators</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Business verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">SSL certificate valid</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">No phishing reports</span>
                </div>
              </div>
            </div>
            
            <Button variant="outline" className="w-full">
              <Flag className="w-4 h-4 mr-2" />
              Report an Issue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />;
      case "reviews":
        return <ReviewsTab />;
      case "shipping":
        return <ShippingTab />;
      case "returns":
        return <ReturnsTab />;
      case "deals":
        return <DealsTab />;
      case "coupons":
        return <CouponsTab />;
      case "performance":
        return <PerformanceTab />;
      case "community":
        return <CommunityTab />;
      case "reports":
        return <ReportsTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="mt-8">
      <style dangerouslySetInnerHTML={{ __html: scrollbarHideStyle }} />
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Desktop Tab Navigation */}
        <div className="hidden md:block">
          <TabsList className="grid w-full grid-cols-5 lg:grid-cols-9 h-auto p-1 bg-gray-50 rounded-lg border">
            {tabsConfig.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex flex-col items-center justify-center gap-2 px-3 py-4 text-xs font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 hover:bg-gray-100 rounded-md"
              >
                <div className="flex items-center justify-center">
                  {tab.icon}
                </div>
                <div className="text-center">
                  <div className="font-medium leading-tight">{tab.label}</div>
                  {tab.count !== null && (
                    <Badge 
                      variant="secondary" 
                      className="text-xs px-1.5 py-0.5 h-auto mt-1 bg-blue-100 text-blue-700 border-blue-200"
                    >
                      {tab.count}
                    </Badge>
                  )}
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Mobile Tab Navigation - Horizontal Scroll */}
        <div className="md:hidden">
          <div className="bg-gray-50 rounded-lg border p-1">
            <div className="flex overflow-x-auto gap-1 pb-2 hide-scrollbar">
              {tabsConfig.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-shrink-0 flex flex-col items-center justify-center gap-1.5 px-3 py-3 min-w-[80px] text-xs font-medium transition-all duration-200 rounded-md ${
                    activeTab === tab.id
                      ? "bg-white shadow-sm text-blue-600 border border-blue-200"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center justify-center">
                    {tab.icon}
                  </div>
                  <div className="text-center">
                    <div className="font-medium leading-tight whitespace-nowrap">
                      {tab.label.length > 8 ? tab.label.split(' ')[0] : tab.label}
                    </div>
                    {tab.count !== null && (
                      <Badge 
                        variant="secondary" 
                        className={`text-xs px-1 py-0 h-4 mt-1 ${
                          activeTab === tab.id 
                            ? "bg-blue-100 text-blue-700 border-blue-200" 
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {tab.count}
                      </Badge>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Mobile scroll indicator */}
          <div className="flex justify-center gap-1 mt-2">
            {Array.from({ length: Math.ceil(tabsConfig.length / 4) }).map((_, index) => (
              <div
                key={index}
                className="w-1.5 h-1.5 rounded-full bg-gray-300"
              />
            ))}
          </div>
        </div>

        <div className="mt-6">
          {tabsConfig.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="mt-0">
              {renderTabContent()}
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import { useAuth } from "@/contexts/AuthContext";
import "@/css/pageHeader.css";
import "@/css/branchTracker.css";
import "@/css/propertySearch.css";

export default function PropertySearch() {
  const router = useRouter();
  const { user } = useAuth();
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // All restrictions removed - all users have full access

  const properties = [
    {
      id: 1,
      name: "Brickell Financial Tower - Suite 1205",
      address: "701 Brickell Avenue, Miami, FL 33131",
      type: "Commercial Office",
      size: "3,500 sq ft",
      status: "Available Now",
      statusType: "available",
      price: 4200000,
      pricePerSqft: 1200,
    },
    {
      id: 2,
      name: "Downtown Arts Plaza",
      address: "1450 Biscayne Boulevard, Miami, FL 33132",
      type: "Mixed Use",
      size: "4,200 sq ft",
      status: "Available in 30 days",
      statusType: "pending",
      price: 5800000,
      pricePerSqft: 1381,
    },
    {
      id: 3,
      name: "South Beach Creative Hub",
      address: "1234 Ocean Drive, Miami, FL 33141",
      type: "Retail Space",
      size: "2,800 sq ft",
      status: "Available Now",
      statusType: "available",
      price: 3900000,
      pricePerSqft: 1393,
    },
    {
      id: 4,
      name: "Westside Innovation Center",
      address: "5678 Westside Drive, Miami, FL 33131",
      type: "Commercial Office",
      size: "4,500 sq ft",
      status: "Available in 60 days",
      statusType: "pending",
      price: 6200000,
      pricePerSqft: 1378,
    },
    {
      id: 5,
      name: "North Miami Tech Park",
      address: "9012 North Miami Drive, Miami, FL 33131",
      type: "Industrial",
      size: "12,000 sq ft",
      status: "Available Now",
      statusType: "available",
      price: 18000000,
      pricePerSqft: 1500,
    },
    {
      id: 6,
      name: "Eastside Business District",
      address: "3456 Eastside Avenue, Miami, FL 33131",
      type: "Commercial Office",
      size: "3,200 sq ft",
      status: "Available in 45 days",
      statusType: "pending",
      price: 4500000,
      pricePerSqft: 1406,
    },
    {
      id: 7,
      name: "Eastside Business District",
      address: "3456 Eastside Avenue, Miami, FL 33131",
      type: "Commercial Office",
      size: "3,200 sq ft",
      status: "Available in 45 days",
      statusType: "pending",
      price: 4500000,
      pricePerSqft: 1406,
    },
    {
      id: 8,
      name: "South Beach Marina",
      address: "7890 Marina Drive, Miami, FL 33131",
      type: "Commercial Office",
      size: "2,500 sq ft",
      status: "Available Now",
      statusType: "available",
      price: 3800000,
      pricePerSqft: 1520,
    },
    {
      id: 9,
      name: "Westside Creative District",
      address: "1122 Westside Street, Miami, FL 33131",
      type: "Mixed Use",
      size: "3,000 sq ft",
      status: "Available in 20 days",
      statusType: "pending",
      price: 4100000,
      pricePerSqft: 1367,
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log("Search filters:", { location, propertyType, priceRange });
  };

  const togglePropertySelection = (propertyId) => {
    setSelectedProperties((prev) =>
      prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const formatPrice = (price) => {
    const inrPrice = price * 83.5;
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(inrPrice);
  };

  const handleInitiateListing = () => {
    if (selectedProperties.length > 0) {
      console.log("Initiating listing for properties:", selectedProperties);
      // Redirect to Business Approval page
      router.push("/business-approval");
    }
  };

  return (
    <div className="dashboard-container">
      {/* Top Header Bar */}
      <header className="dashboard-header">
        <button
          className="header-hamburger"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="hamburger-icon"
          >
            <path
              d="M3 5H17M3 10H17M3 15H17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <div className="header-search">
          <svg
            className="search-icon"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M11.5 10.5L15 14M13 7C13 10.3137 10.3137 13 7 13C3.68629 13 1 10.3137 1 7C1 3.68629 3.68629 1 7 1C10.3137 1 13 3.68629 13 7Z"
              stroke="#6b7280"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="text"
            placeholder="Search branch..."
            className="header-search-input"
          />
        </div>
        <div className="header-actions">
          <button className="header-icon-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 2C10.5523 2 11 2.44772 11 3V4H15C15.5523 4 16 4.44772 16 5C16 5.55228 15.5523 6 15 6H5C4.44772 6 4 5.55228 4 5C4 4.44772 4.44772 4 5 4H9V3C9 2.44772 9.44772 2 10 2Z"
                fill="#6b7280"
              />
              <path
                d="M5 8H15L14.4 15.2C14.3 16.8 13 18 11.4 18H8.6C7 18 5.7 16.8 5.6 15.2L5 8Z"
                fill="#6b7280"
              />
            </svg>
          </button>
          <button className="header-icon-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 2L12.5 7.5L18.5 8.5L14 12.5L15 18.5L10 15.5L5 18.5L6 12.5L1.5 8.5L7.5 7.5L10 2Z"
                fill="#6b7280"
              />
            </svg>
          </button>
          <div className="header-profile">
            <div className="profile-avatar">AM</div>
          </div>
        </div>
      </header>

      <div className="dashboard-content-wrapper">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content Area */}
        <main className="dashboard-main">
          <div className="main-content">
            <PageHeader
              title="Property Search"
              subtitle="Search and select properties based on business requirements."
            />
            
            {/* Property Search Content */}
            <div className="property-search-content">
              {/* Search Filters Section */}
              <section className="search-filters-section">
                <div className="section-header">
                  <h2 className="section-title">Search Filters</h2>
                  <p className="section-subtitle">
                    Apply filters to find properties matching business requirements
                  </p>
                </div>
                <form onSubmit={handleSearch} className="filters-form">
                  <div className="filters-row">
                    <div className="filter-group">
                      <label htmlFor="location" className="filter-label">
                        Location
                      </label>
                      <select
                        id="location"
                        className="filter-select"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      >
                        <option value="">Select Location</option>
                        <option value="miami">Miami, FL</option>
                        <option value="new-york">New York, NY</option>
                        <option value="san-francisco">San Francisco, CA</option>
                        <option value="chicago">Chicago, IL</option>
                        <option value="boston">Boston, MA</option>
                        <option value="seattle">Seattle, WA</option>
                        <option value="los-angeles">Los Angeles, CA</option>
                      </select>
                    </div>
                    <div className="filter-group">
                      <label htmlFor="property-type" className="filter-label">
                        Property Type
                      </label>
                      <select
                        id="property-type"
                        className="filter-select"
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                      >
                        <option value="all">All Types</option>
                        <option value="commercial-office">Commercial Office</option>
                        <option value="retail">Retail</option>
                        <option value="industrial">Industrial</option>
                        <option value="mixed-use">Mixed Use</option>
                      </select>
                    </div>
                    <div className="filter-group">
                      <label htmlFor="price-range" className="filter-label">
                        Price Range
                      </label>
                      <select
                        id="price-range"
                        className="filter-select"
                        value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                      >
                        <option value="all">All Prices</option>
                        <option value="0-2m">₹0 - ₹16.7 Cr</option>
                        <option value="2m-5m">₹16.7 Cr - ₹41.75 Cr</option>
                        <option value="5m-10m">₹41.75 Cr - ₹83.5 Cr</option>
                        <option value="10m+">₹83.5 Cr+</option>
                      </select>
                    </div>
                    <button 
                      type="submit" 
                      className="search-button"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="search-icon"
                      >
                        <path
                          d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M19 19L14.65 14.65"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Search Properties
                    </button>
                  </div>
                </form>
              </section>

              {/* Available Properties Section */}
              <section className="available-properties-section">
                <div className="section-header-row">
                  <div className="section-header">
                    <h2 className="section-title">Available Properties</h2>
                    <p className="section-subtitle">
                      Properties matching your search criteria
                    </p>
                  </div>
                  <div className="properties-summary">
                    <span className="properties-count">{properties.length} Properties Found</span>
                    <button
                      className="initiate-button"
                      onClick={handleInitiateListing}
                      disabled={selectedProperties.length === 0}
                      style={selectedProperties.length === 0 ? { opacity: 0.5, cursor: "not-allowed" } : {}}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="checkbox-icon"
                      >
                        <path
                          d="M16 2H4C2.89543 2 2 2.89543 2 4V16C2 17.1046 2.89543 18 4 18H16C17.1046 18 18 17.1046 18 16V4C18 2.89543 17.1046 2 16 2Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7 10L9 12L13 8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Initiate Property Listing for Business Approval
                    </button>
                  </div>
                </div>

                <div className="properties-list">
                  {properties.map((property) => (
                    <div key={property.id} className="property-card">
                      <div className="property-card-left">
                        <input
                          type="checkbox"
                          id={`property-${property.id}`}
                          className="property-checkbox"
                          checked={selectedProperties.includes(property.id)}
                          onChange={() => togglePropertySelection(property.id)}
                        />
                        <div className="property-info">
                          <h3 className="property-name">{property.name}</h3>
                          <div className="property-address">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              className="map-pin-icon"
                            >
                              <path
                                d="M8 8C9.10457 8 10 7.10457 10 6C10 4.89543 9.10457 4 8 4C6.89543 4 6 4.89543 6 6C6 7.10457 6.89543 8 8 8Z"
                                fill="#ef4444"
                              />
                              <path
                                d="M8 1C5.23858 1 3 3.23858 3 6C3 10 8 15 8 15C8 15 13 10 13 6C13 3.23858 10.7614 1 8 1Z"
                                stroke="#ef4444"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <span>{property.address}</span>
                          </div>
                          <div className="property-details">
                            <span className="property-detail-item">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                className="detail-icon"
                              >
                                <path
                                  d="M2 4H14V12H2V4Z"
                                  stroke="#6b7280"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M6 4V12M10 4V12"
                                  stroke="#6b7280"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                />
                              </svg>
                              {property.type}
                            </span>
                            <span className="property-detail-item">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                className="detail-icon"
                              >
                                <path
                                  d="M2 2V14H14"
                                  stroke="#6b7280"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M6 6H14M6 10H14"
                                  stroke="#6b7280"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                />
                              </svg>
                              {property.size}
                            </span>
                            <span className={`property-detail-item ${property.statusType === "available" ? "available" : "pending"}`}>
                              {property.statusType === "available" ? (
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  className="detail-icon"
                                >
                                  <path
                                    d="M13 4L6 11L3 8"
                                    stroke="#10b981"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  className="detail-icon"
                                >
                                  <circle
                                    cx="8"
                                    cy="8"
                                    r="6"
                                    stroke="#f59e0b"
                                    strokeWidth="1.5"
                                  />
                                  <path
                                    d="M8 4V8L10 10"
                                    stroke="#f59e0b"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                  />
                                </svg>
                              )}
                              {property.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="property-card-right">
                        <div className="property-pricing">
                          <div className="property-price">{formatPrice(property.price)}</div>
                          <div className="property-price-per-sqft">
                            ₹{(property.pricePerSqft * 83.5).toLocaleString('en-IN')}/sq ft
                          </div>
                        </div>
                        {false ? (
                          <div
                            className="view-details-button"
                            style={{ 
                              opacity: 0.5, 
                              cursor: "not-allowed",
                              pointerEvents: "none"
                            }}
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              className="eye-icon"
                            >
                              <path
                                d="M8 4C4 4 1.33333 6.66667 1 8C1.33333 9.33333 4 12 8 12C12 12 14.6667 9.33333 15 8C14.6667 6.66667 12 4 8 4Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <circle
                                cx="8"
                                cy="8"
                                r="2"
                                stroke="currentColor"
                                strokeWidth="1.5"
                              />
                            </svg>
                            View Property Details
                          </div>
                        ) : (
                          <Link
                            href="/property-details"
                            className="view-details-button"
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              className="eye-icon"
                            >
                              <path
                                d="M8 4C4 4 1.33333 6.66667 1 8C1.33333 9.33333 4 12 8 12C12 12 14.6667 9.33333 15 8C14.6667 6.66667 12 4 8 4Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <circle
                                cx="8"
                                cy="8"
                                r="2"
                                stroke="currentColor"
                                strokeWidth="1.5"
                              />
                            </svg>
                            View Property Details
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}


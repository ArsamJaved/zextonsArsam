"use client";
import React, { useEffect } from 'react';

interface TrustBoxWidgetProps {
  className?: string;
}

const TrustBoxWidget: React.FC<TrustBoxWidgetProps> = ({ className = "mt-10 mb-10" }) => {
  useEffect(() => {
    // If window is defined and Trustpilot script exists, reload widgets
    if (window && (window as any).Trustpilot) {
      (window as any).Trustpilot.loadFromElement(document.getElementById('trustbox-container'));
    }
  }, []);

  return (
    <div className={className}>
    {/* TrustBox widget - Carousel */}
    <div className="trustpilot-widget" data-locale="en-US" data-template-id="53aa8912dec7e10d38f59f36" data-businessunit-id="62e8fdd30dc0c3a7268e8064" data-style-height="140px" data-style-width="100%" data-stars="1,2,3,4,5" data-review-languages="en">
      <a href="https://www.trustpilot.com/review/zextons.co.uk" target="_blank" rel="noopener">Trustpilot</a>
    </div>
</div>
  );
};

export default TrustBoxWidget;
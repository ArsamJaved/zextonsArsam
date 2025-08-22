import { useTrustPWidget } from '@/app/hooks/useTrustPWidget';
import React from 'react'

export default function TrustpilotWidget() {
    useTrustPWidget();
  return (
    <>
      <div
        className="trustpilot-widget"
        data-locale="en-GB"
        data-template-id="5613c9cde69ddc09340c6beb"
        data-businessunit-id="62e8fdd30dc0c3a7268e8064"
        data-style-height="100%"
        data-style-width="100%"
      >
        <a
          href="https://uk.trustpilot.com/review/zextons.co.uk"
          target="_blank"
          rel="noopener"
        >
          Trustpilot
        </a>
      </div>
    </>
  );
}

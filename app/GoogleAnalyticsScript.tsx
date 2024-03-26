import Script from "next/script";
import React from "react";

const GoogleAnalyticsScript = () => {
  return (
    <>
      <Script
        async={true}
        src="https://www.googletagmanager.com/gtag/js?id=TAG_ID"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {/* It is mandatory to provide a script id while passing a script as children to the next/script component */}
        {/* //Passing the second script as a children to the second next/Script tag */}
        {/* the 'beforeInteractive' value denotes that the script is loaded before Next.js injects any client-side script/code into the page. Remember that page interactivity can only be accomplished via CSR components/script. This is called Hydration. We should use this strategy for scripts that are critical and should be loaded first. Examples, include Bot-Detectors or cookie-consent managers */}
        {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'TAG_ID')`}
        {/* //Enclosing the script code in back-ticks prevents Type Safety errors */}
        {/* As our application grows we can be using several 3rd-party scripts and the codebase of this layout.tsx file keeps getting messier. So, it's better to modularize these script snippets */}
      </Script>
      {/* Now Let's implement a Navigation Bar UI that is common to all the pages in our Next.js App */}
    </>
  );
};

export default GoogleAnalyticsScript;

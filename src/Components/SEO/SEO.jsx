import React from "react";
import { Helmet } from "react-helmet-async";

const SITE_URL = "https://istetiet.com";
const DEFAULT_TITLE = "ISTE - Indian Society for Technical Education | Thapar Chapter";
const DEFAULT_DESCRIPTION = "Indian Society for Technical Education (ISTE) Students' Chapter, Thapar Institute of Engineering and Technology (TIET), Patiala. Empowering technical excellence, innovation, hackathons, and workshops.";
const DEFAULT_OG_IMAGE = `${SITE_URL}/istelogo.png`;

export default function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  canonicalPath = "",
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  schema = null,
  noIndex = false,
}) {
  const pageTitle = title.includes("ISTE") ? title : `${title} | ISTE TIET`;
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;

  return (
    <Helmet>
      {/* Basic Metadata */}
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="ISTE TIET" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data (JSON-LD) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}

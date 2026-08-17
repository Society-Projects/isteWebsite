import { useEffect } from "react";

const DEFAULT_KEYWORDS = "tiet, iste, college society, thapar chapter, thapar institute of engineering and technology, thapar university, technical society, engineering";
const DEFAULT_LOGO = "/istelogo.png";
const DEFAULT_SITE_NAME = "ISTE Thapar Chapter";
const DEFAULT_TITLE = "ISTE - Thapar Chapter | Premier Technical College Society at TIET";
const DEFAULT_DESCRIPTION = "Indian Society for Technical Education (ISTE) - Thapar Chapter. Premier technical college society at TIET promoting innovation, technical workshops, and engineering excellence.";

export default function SEO({
  title,
  description,
  keywords,
  ogImage,
  ogUrl,
  canonicalUrl,
}) {
  useEffect(() => {
    // Set Page Title
    const pageTitle = title ? `${title} | ISTE TIET` : DEFAULT_TITLE;
    document.title = pageTitle;

    // Helper to set or create meta tag
    const setMetaTag = (selector, attribute, value, content) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, value);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    const finalDescription = description || DEFAULT_DESCRIPTION;
    const finalKeywords = keywords
      ? `${keywords}, ${DEFAULT_KEYWORDS}`
      : DEFAULT_KEYWORDS;

    // Ensure absolute image URL for OpenGraph/Twitter sharing
    const logoUrl = ogImage || (window.location.origin + DEFAULT_LOGO);
    const currentUrl = ogUrl || canonicalUrl || window.location.href;

    // Standard Meta Tags
    setMetaTag('meta[name="description"]', 'name', 'description', finalDescription);
    setMetaTag('meta[name="keywords"]', 'name', 'keywords', finalKeywords);

    // Open Graph Meta Tags
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', pageTitle);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', finalDescription);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', logoUrl);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', currentUrl);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', 'website');
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', DEFAULT_SITE_NAME);

    // Twitter Meta Tags
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', pageTitle);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', finalDescription);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', logoUrl);
  }, [title, description, keywords, ogImage, ogUrl, canonicalUrl]);

  return null;
}

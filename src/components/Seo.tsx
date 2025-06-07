import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  siteName?: string;
  twitterHandle?: string;
}

const Seo = ({
  title = "Aniruddha Dey - Software Engineer & AI Enthusiast",
  description = "Full-stack developer and AI enthusiast with experience in building scalable web applications and machine learning models.",
  image = "/og-image.jpg",
  type = "website",
  siteName = "Aniruddha Dey's Portfolio",
  twitterHandle = "@aniruddhadey",
}: SeoProps) => {
  const location = useLocation();
  const baseUrl = import.meta.env.VITE_BASE_URL || 'https://aniruddhadey.dev';
  const canonicalUrl = `${baseUrl}${location.pathname}`;
  // Use a placeholder service for the OpenGraph image
  const fullImageUrl = 'https://via.placeholder.com/1200x630/0ea5e9/ffffff.png?text=Aniruddha+Dey%0ASoftware+Engineer+%26+AI+Enthusiast';

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:site_name" content={siteName} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      
      {/* Additional meta tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
      <meta name="theme-color" content="#0ea5e9" />
      
      {/* Favicon */}
      <link rel="icon" type="image/png" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:site_name" content={siteName} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      
      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Favicon */}
      <link rel="icon" type="image/png" href="/favicon.ico" sizes="32x32" />
      <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#0ea5e9" />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
    </Helmet>
  );
};

export default Seo;

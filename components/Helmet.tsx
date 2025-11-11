import React, { useEffect } from 'react';

interface HelmetProps {
  title: string;
  description: string;
  keywords: string;
}

const Helmet: React.FC<HelmetProps> = ({ title, description, keywords }) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    let descriptionTag = document.querySelector('meta[name="description"]');
    if (!descriptionTag) {
      descriptionTag = document.createElement('meta');
      descriptionTag.setAttribute('name', 'description');
      document.head.appendChild(descriptionTag);
    }
    descriptionTag.setAttribute('content', description);

    let keywordsTag = document.querySelector('meta[name="keywords"]');
    if (!keywordsTag) {
        keywordsTag = document.createElement('meta');
        keywordsTag.setAttribute('name', 'keywords');
        document.head.appendChild(keywordsTag);
    }
    keywordsTag.setAttribute('content', keywords);

  }, [title, description, keywords]);

  return null; // This component does not render anything
};

export default Helmet;
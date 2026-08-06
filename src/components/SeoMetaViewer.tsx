import React from 'react';

export const SeoMetaViewer: React.FC = () => {
  const schemaOrgJSON = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    'name': 'Dreams Fly International',
    'url': 'https://dreamsfly.net/',
    'logo': 'https://dreamsfly.net/logo.png',
    'image': 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80',
    'description': 'Premier licensed travel consultancy in Dhaka, Bangladesh for Canada, UK, USA, Australia, Schengen Europe visas, work permits, Umrah packages, and global air tickets.',
    'telephone': '+8801771304219',
    'email': 'dreamsflyinternational@gmail.com',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Office 1: Road 16, Rupnagar, Mirpur 11, Dhaka 1216 | Office 2: Rohanpur, Gomastapur, Chapainawabganj',
      'addressLocality': 'Dhaka',
      'postalCode': '1212',
      'addressCountry': 'BD'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': '23.7925',
      'longitude': '90.4167'
    },
    'openingHours': 'Mo-Sa 09:00-20:00',
    'priceRange': '৳৳',
    'sameAs': [
      'https://facebook.com/dreamsflyinternational',
      'https://t.me/mjjahanali'
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgJSON) }}
    />
  );
};

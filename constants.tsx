import React from 'react';
import { Facebook, X, Instagram, Linkedin, Youtube } from 'lucide-react';

export const BLOGGER_LINK = "https://cabadokas.blogspot.com/";

// Fix: Destructure the 'size' prop to apply it to width and height,
// and update the component's props type to accept 'size'. This aligns it
// with lucide-react icons and resolves typing issues.
const PinterestIcon = ({ size, ...props }: React.SVGProps<SVGSVGElement> & { size?: number | string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size || "24"}
        height={size || "24"}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M12 2C6.5 2 2 6.5 2 12c0 5.5 4.5 10 10 10s10-4.5 10-10C22 6.5 17.5 2 12 2Z" />
        <path d="M8.5 12c0-3 2-6 5.5-6 3.5 0 5 2.5 5 5.5 0 3.5-2 6-5.5 6-1 0-2-.5-2-1.5" />
        <path d="M11.5 9c0-.5.5-1 1-1s1 .5 1 1-.5 1-1 1-1-.5-1-1Z" />
        <path d="M12 12v6" />
    </svg>
);

export const WhatsappIcon = ({ size, ...props }: React.SVGProps<SVGSVGElement> & { size?: number | string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size || "24"}
        height={size || "24"}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
);

export const TiktokIcon = ({ size, ...props }: React.SVGProps<SVGSVGElement> & { size?: number | string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size || "24"}
        height={size || "24"}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M16 4h-2a4 4 0 0 0-4 4v10a4 4 0 1 1-8 0 4 4 0 0 1 4-4v-2a8 8 0 0 1 8-8h2v4z"></path>
    </svg>
);


// Fix: Provide a more specific type for the React elements to ensure
// TypeScript recognizes the 'size' prop, fixing React.cloneElement errors downstream.
export const SOCIAL_ICON_MAP: { [key: string]: React.ReactElement<{ size?: number | string }> } = {
  Facebook: <Facebook size={24} />,
  X: <X size={24} />,
  Instagram: <Instagram size={24} />,
  LinkedIn: <Linkedin size={24} />,
  YouTube: <Youtube size={24} />,
  Pinterest: <PinterestIcon size={24} />,
  Whatsapp: <WhatsappIcon size={24} />,
  Tiktok: <TiktokIcon size={24} />,
};
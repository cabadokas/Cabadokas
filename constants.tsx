import React from 'react';
import { Facebook, X, Instagram, Linkedin, Youtube, Ghost, Twitch } from 'lucide-react';

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

const DiscordIcon = ({ size, ...props }: React.SVGProps<SVGSVGElement> & { size?: number | string }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size || "24"}
        height={size || "24"}
        viewBox="0 0 24 24" 
        fill="currentColor"
        {...props}
    >
        <path d="M21.12,3.51A18.1,18.1,0,0,0,12,0,18.1,18.1,0,0,0,2.88,3.51,16.4,16.4,0,0,0,0,13.15a15.6,15.6,0,0,0,6.53,8.3,14.2,14.2,0,0,0,4.24,1.44,1.2,1.2,0,0,0,1.23-1,10.19,10.19,0,0,1-.52-2.14,1,1,0,0,1,.69-1.07,11.23,11.23,0,0,0,5.18,0,1,1,0,0,1,.69,1.07,10.19,10.19,0,0,1-.52,2.14,1.2,1.2,0,0,0,1.23,1A14.2,14.2,0,0,0,24,13.15,16.4,16.4,0,0,0,21.12,3.51ZM8.05,16.32a2.3,2.3,0,0,1-2.3-2.3A2.3,2.3,0,0,1,8.05,11.72a2.3,2.3,0,0,1,2.3,2.3A2.3,2.3,0,0,1,8.05,16.32Zm7.9,0a2.3,2.3,0,0,1-2.3-2.3,2.3,2.3,0,0,1,2.3-2.3,2.3,2.3,0,0,1,2.3,2.3A2.3,2.3,0,0,1,15.95,16.32Z" />
    </svg>
);

const BehanceIcon = ({ size, ...props }: React.SVGProps<SVGSVGElement> & { size?: number | string }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size || "24"}
        height={size || "24"}
        viewBox="0 0 24 24" 
        fill="currentColor"
        {...props}
    >
        <path d="M8.18,10.5h4.48c0,0-.17-1.85-.17-2.61,0-1.85,1.3-2.78,2.44-2.78,1.3,0,2.09,.83,2.09,2.09,0,1.67-1,2.32-1,2.32h3.49c0,0,1.23-1,1.23-3.25,0-3-2.32-4.27-4.64-4.27-2.87,0-5.12,2.09-5.12,5.12,0,2.44,.9,3.11,.9,3.11Zm15.82,2.87H17.43v2.87h6.16v2.53H17.43v3.11h6.63v2.53h-10.1V10.74h10.1v2.63ZM0,13.11H6.16c0,2.09-1.38,3.33-3.41,3.33S0,14.94,0,13.11Zm3.08-2.61c-2.44,0-3.08,1.67-3.08,2.61,0,1.16,.62,2.87,3.08,2.87,2.32,0,3.08-1.52,3.08-2.87,0-1.16-.7-2.61-3.08-2.61Z" />
    </svg>
);

const ThreadsIcon = ({ size, ...props }: React.SVGProps<SVGSVGElement> & { size?: number | string }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size || "24"}
        height={size || "24"}
        viewBox="0 0 24 24" 
        fill="currentColor"
        {...props}
    >
        <path d="M13.23,6.92c-1.39-1.39-3.3-2.17-5.31-2.17H7.17c-4.48,0-5.83,2.44-5.83,5.5v1.27c0,3.06,1.35,5.5,5.83,5.5h.75c2.01,0,3.92-.78,5.31-2.17,1.39-1.39,2.17-3.3,2.17-5.31,0-2.01-.78-3.92-2.17-5.31Zm-1.16,9.33c-.92,.92-2.21,1.44-3.52,1.44h-.75c-3.11,0-4-1.7-4-3.75v-1.27c0-2.05,.89-3.75,4-3.75h.75c1.31,0,2.6,.52,3.52,1.44,.92,.92,1.44,2.21,1.44,3.52,0,1.31-.52,2.6-1.44,3.52Zm-3.41-3.43c.12-.31,.21-.63,.25-.96,.13-.99-.08-1.99-.61-2.81-.3-.46-.68-.87-1.12-1.21-.49-.39-1.04-.68-1.63-.83-.4-.1-.8-.16-1.21-.16-.39,0-.77,.04-1.15,.12l.96,1c.1,0,.19,0,.29,0,.49,0,.97,.12,1.4,.36,.41,.22,.76,.54,.99,.94,.26,.45,.4,.97,.37,1.5-.04,.63-.28,1.21-.67,1.69l-1.12,1.37c-.36,.44-.79,.8-1.27,1.06-.51,.27-1.07,.41-1.64,.41-.53,0-1.04-.12-1.52-.35l-1.06,.86c.63,.3,1.33,.46,2.05,.46,.64,0,1.27-.12,1.86-.36,.59-.24,1.13-.59,1.59-1.03l1.13-1.38c.44-.54,.73-1.19,.83-1.89Z" />
    </svg>
);

const DribbbleIcon = ({ size, ...props }: React.SVGProps<SVGSVGElement> & { size?: number | string }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size || "24"}
        height={size || "24"}
        viewBox="0 0 24 24" 
        fill="currentColor"
        {...props}
    >
        <path d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0Zm8.12,13.43a13.38,13.38,0,0,1-2.48,4.52,13.1,13.1,0,0,1-5.64,3,13.1,13.1,0,0,1-6.13-1.36,2.23,2.23,0,0,1-.53-.2,1,1,0,0,1-.35-1.23,1,1,0,0,1,1.23-.35c.08,0,.17,.08,.25,.12a11.33,11.33,0,0,0,12.8-5.32c.11-.27,.22-.54,.32-.82a1,1,0,0,1,1.87,.73ZM19.2,7.3a1,1,0,0,1-1.11-.1,12.22,12.22,0,0,0-13.6-2,1,1,0,1,1-1-1.67A14.22,14.22,0,0,1,18.1,5.2,1,1,0,0,1,19.2,7.3Zm-5.8,13.41a11.3,11.3,0,0,0,3.32-13.4,1,1,0,0,1,1.8-.84,13.3,13.3,0,0,1-4,15.75,1,1,0,0,1-1.15-1.51ZM3,11.33A11.33,11.33,0,0,0,9.15,22.1a1,1,0,0,1-.7,1.8,13.3,13.3,0,0,1-5.7-12,1,1,0,0,1,1.93-.52c.22,0,.22,0,.22.05Z" />
    </svg>
);

const TelegramIcon = ({ size, ...props }: React.SVGProps<SVGSVGElement> & { size?: number | string }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size || "24"}
        height={size || "24"}
        viewBox="0 0 24 24" 
        fill="currentColor"
        {...props}
    >
        <path d="M11.944,0A11.944,11.944,0,1,0,23.888,11.944,11.95,11.95,0,0,0,11.944,0Zm5.842,8.357-1.9,8.87a.74.74,0,0,1-1.37.13L11.8,14.65l-2.68,2.57a.738.738,0,0,1-.54.22.713.713,0,0,1-.53-.22L7.5,16.63,4.98,15.7a.74.74,0,0,1-.04-1.36L16.89,9.57,17.1,9.5A.74.74,0,0,1,17.786,8.357Z" />
    </svg>
);


// Fix: Provide a more specific type for the React elements to ensure
// TypeScript recognizes props like 'size' and 'className', fixing React.cloneElement errors downstream.
export const SOCIAL_ICON_MAP: { [key: string]: React.ReactElement<{ size?: number | string; className?: string; }> } = {
  Facebook: <Facebook size={24} />,
  X: <X size={24} />,
  Instagram: <Instagram size={24} />,
  Tiktok: <TiktokIcon size={24} />,
  Discord: <DiscordIcon size={24} />,
  Snapchat: <Ghost size={24} />,
  YouTube: <Youtube size={24} />,
  Whatsapp: <WhatsappIcon size={24} />,
  Behance: <BehanceIcon size={24} />,
  Threads: <ThreadsIcon size={24} />,
  LinkedIn: <Linkedin size={24} />,
  Dribbble: <DribbbleIcon size={24} />,
  Pinterest: <PinterestIcon size={24} />,
  Twitch: <Twitch size={24} />,
  Telegram: <TelegramIcon size={24} />,
};
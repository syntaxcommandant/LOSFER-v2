import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
}

export const SearchIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

export const ShieldCheckIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

export const ShieldIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.944a11.955 11.955 0 018.618 3.04A12.02 12.02 0 0121 9c0 5.591-3.824 10.29-9 11.622C6.824 19.29 3 14.59 3 9c0-1.042.133-2.052.382-3.016A11.955 11.955 0 0112 2.944z" />
  </svg>
);

export const SparklesIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.286L13 21l-2.286-6.857L5 12l5.714-2.286L13 3z" />
  </svg>
);

export const QrCodeIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
  </svg>
);

export const CheckCircleIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const AlertTriangleIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

export const ArrowRightIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

export const ArrowLeftIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

export const ClockIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const MapPinIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const TagIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
  </svg>
);

export const FilterIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>
);

export const UserIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

export const LayersIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

export const UploadCloudIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

export const LockIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

export const CameraIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const RefreshCwIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

export const EyeIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

export const FileTextIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

export const CheckIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export const CheckCheckIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7M9 17l4 4L23 11" />
  </svg>
);

export const PlusIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

export const XIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const CpuIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m14-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
  </svg>
);

export const KeyIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
  </svg>
);

export const SmartphoneIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

export const DownloadIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

export const Share2Icon: React.FC<IconProps> = ({ className = 'w-5 h-5', ...props }) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className} {...props}>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);


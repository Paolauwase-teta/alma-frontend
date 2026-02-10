export default function AlmaLogo({ className = "w-10 h-10" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 100 100"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Circular background */}
            <circle cx="50" cy="50" r="48" fill="#1a3a2e" />

            {/* Inner circle */}
            <circle cx="50" cy="50" r="42" fill="none" stroke="#4a7c59" strokeWidth="2" />

            {/* Leaf icon - left leaf */}
            <path
                d="M 35 50 Q 30 40 35 30 Q 40 35 40 45 Q 38 50 35 50 Z"
                fill="#7cb88f"
            />

            {/* Leaf icon - right leaf */}
            <path
                d="M 65 50 Q 70 40 65 30 Q 60 35 60 45 Q 62 50 65 50 Z"
                fill="#7cb88f"
            />

            {/* Center stem */}
            <rect x="48" y="30" width="4" height="30" fill="#4a7c59" rx="2" />

            {/* Bottom wave - representing freshness/preservation */}
            <path
                d="M 25 60 Q 35 55 45 60 T 65 60 T 75 60"
                fill="none"
                stroke="#8bc99d"
                strokeWidth="3"
                strokeLinecap="round"
            />

            {/* Small dots - molecular representation */}
            <circle cx="35" cy="65" r="2" fill="#8bc99d" />
            <circle cx="50" cy="68" r="2" fill="#8bc99d" />
            <circle cx="65" cy="65" r="2" fill="#8bc99d" />
        </svg>
    );
}

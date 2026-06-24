function ExternalLinkIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            width="20"
            height="20"
        >
            <path
                d="M14 5H19V10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <path
                d="M19 5L10 14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />

            <path
                d="M12 6H7C5.9 6 5 6.9 5 8V17C5 18.1 5.9 19 7 19H16C17.1 19 18 18.1 18 17V12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}

export default ExternalLinkIcon;
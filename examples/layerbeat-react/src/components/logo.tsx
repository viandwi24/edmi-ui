export function LogoMark({ className }: { className?: string }) {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="3.2"
			strokeLinecap="round"
			className={className}
			aria-hidden
		>
			<path d="M19 12a7 7 0 1 1-7-7" />
			<path d="M12 9a3 3 0 1 0 3 3" />
		</svg>
	);
}

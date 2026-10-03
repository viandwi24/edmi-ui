// Round distro mark: a coloured disc (Ubuntu gets its circle of friends).
export function OsLogo({
	color,
	ubuntu = false,
	size = 22,
}: {
	color: string;
	ubuntu?: boolean;
	size?: number;
}) {
	return (
		<svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
			<circle cx="12" cy="12" r="11" fill={color} />
			{ubuntu ? (
				<>
					<circle
						cx="12"
						cy="12"
						r="5.2"
						fill="none"
						stroke="#fff"
						strokeWidth="2.2"
					/>
					<circle cx="5.6" cy="12" r="2" fill="#fff" />
					<circle cx="15.2" cy="6.5" r="2" fill="#fff" />
					<circle cx="15.2" cy="17.5" r="2" fill="#fff" />
				</>
			) : null}
		</svg>
	);
}

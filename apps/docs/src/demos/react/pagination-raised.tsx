import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@edmi-react/ui/pagination";
import { useState } from "react";

const TOTAL = 10;

// 1 ... 3 [4] 5 ... 10, same page list as the Vue and Svelte demos.
function pageItems(
	page: number,
): (number | "ellipsis-start" | "ellipsis-end")[] {
	if (page <= 3) return [1, 2, 3, 4, 5, "ellipsis-end", TOTAL];
	if (page >= TOTAL - 2)
		return [
			1,
			"ellipsis-start",
			TOTAL - 4,
			TOTAL - 3,
			TOTAL - 2,
			TOTAL - 1,
			TOTAL,
		];
	return [1, "ellipsis-start", page - 1, page, page + 1, "ellipsis-end", TOTAL];
}

export default function Demo() {
	const [page, setPage] = useState(4);
	const go = (next: number) => (event: React.MouseEvent) => {
		event.preventDefault();
		setPage(Math.min(TOTAL, Math.max(1, next)));
	};

	return (
		<div className="flex flex-col gap-5">
			{(["flat", "raised"] as const).map((level) => (
				<div key={level} className="flex flex-col gap-2">
					<p className="text-xs font-medium text-muted-foreground">
						{level === "flat"
							? "Flat (0)"
							: "Raised (+1): only the active link rises"}
					</p>
					<Pagination elevation={level}>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious
									href="#"
									onClick={go(page - 1)}
									aria-disabled={page === 1}
								/>
							</PaginationItem>
							{pageItems(page).map((item) =>
								typeof item === "number" ? (
									<PaginationItem key={item}>
										<PaginationLink
											href="#"
											isActive={item === page}
											onClick={go(item)}
										>
											{item}
										</PaginationLink>
									</PaginationItem>
								) : (
									<PaginationItem key={item}>
										<PaginationEllipsis />
									</PaginationItem>
								),
							)}
							<PaginationItem>
								<PaginationNext
									href="#"
									onClick={go(page + 1)}
									aria-disabled={page === TOTAL}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			))}
		</div>
	);
}

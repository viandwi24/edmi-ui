import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@edmi-react/ui/pagination";

export default function Demo() {
	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious href="#prev" />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#1">1</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#2" isActive>
						2
					</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#3">3</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationEllipsis />
				</PaginationItem>
				<PaginationItem>
					<PaginationNext href="#next" />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}

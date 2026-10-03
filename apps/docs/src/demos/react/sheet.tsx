import { Button } from "@edmi-react/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@edmi-react/ui/sheet";

export default function Demo() {
	return (
		<Sheet>
			<SheetTrigger render={<Button variant="outline" />}>Filters</SheetTrigger>
			<SheetContent side="right">
				<SheetHeader>
					<SheetTitle>Filters</SheetTitle>
					<SheetDescription>Narrow the index list.</SheetDescription>
				</SheetHeader>
				<div className="grid gap-2 px-[22px] text-[13px]">
					<label className="flex items-center gap-2" htmlFor="sheet-xstocks">
						<input id="sheet-xstocks" type="checkbox" defaultChecked />
						xStocks
					</label>
					<label className="flex items-center gap-2" htmlFor="sheet-ipo">
						<input id="sheet-ipo" type="checkbox" defaultChecked />
						Pre-IPO
					</label>
				</div>
				<SheetFooter>
					<Button>Apply</Button>
					<SheetClose render={<Button variant="outline" />}>Reset</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}

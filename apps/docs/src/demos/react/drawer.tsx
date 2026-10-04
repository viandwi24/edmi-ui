import { Button } from "@edmi-react/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@edmi-react/ui/drawer";

export default function Demo() {
	return (
		<Drawer>
			<DrawerTrigger render={<Button variant="outline" />}>
				Join MAG4
			</DrawerTrigger>
			<DrawerContent showHandle>
				<div className="mx-auto w-full max-w-sm">
					<DrawerHeader>
						<DrawerTitle>Join MAG4</DrawerTitle>
						<DrawerDescription>Amount in USDC</DrawerDescription>
					</DrawerHeader>
					<p className="text-center font-mono text-4xl">1,000</p>
					<DrawerFooter className="flex-row">
						<DrawerClose
							render={<Button variant="outline" className="flex-1" />}
						>
							Cancel
						</DrawerClose>
						<DrawerClose render={<Button className="flex-1" />}>
							Join
						</DrawerClose>
					</DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
	);
}

import { Button } from "@edmi-react/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@edmi-react/ui/dialog";
import { Input } from "@edmi-react/ui/input";

export default function Demo() {
	return (
		<Dialog>
			<DialogTrigger render={<Button variant="outline" />}>
				Edit profile
			</DialogTrigger>
			<DialogContent elevation="floating" showCloseButton>
				<DialogHeader>
					<DialogTitle>Edit profile</DialogTitle>
					<DialogDescription>
						Shown on your indexes and in the feed.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-3 text-[13px]">
					<div className="grid gap-1.5">
						<label htmlFor="dialog-name">Display name</label>
						<Input id="dialog-name" defaultValue="Dewi Lestari" />
					</div>
					<div className="grid gap-1.5">
						<label htmlFor="dialog-handle">Handle</label>
						<Input id="dialog-handle" defaultValue="@dewi" />
					</div>
				</div>
				<DialogFooter>
					<DialogClose render={<Button variant="outline" />}>
						Cancel
					</DialogClose>
					<Button>Save changes</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

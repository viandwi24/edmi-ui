import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@edmi-react/ui/alert-dialog";
import { Button } from "@edmi-react/ui/button";

export default function Demo() {
	return (
		<AlertDialog>
			<AlertDialogTrigger render={<Button variant="outline" />}>
				Close index
			</AlertDialogTrigger>
			<AlertDialogContent raised>
				<AlertDialogHeader>
					<AlertDialogTitle>Close this index?</AlertDialogTitle>
					<AlertDialogDescription>
						Holders can still withdraw, but no one can join. This cannot be
						undone.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction variant="destructive">
						Close index
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

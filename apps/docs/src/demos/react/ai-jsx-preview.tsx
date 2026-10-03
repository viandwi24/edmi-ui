import {
	JSXPreview,
	JSXPreviewContent,
	JSXPreviewError,
} from "@edmi-react/components/ai/jsx-preview";
import { Button } from "@edmi-react/ui/button";
import { Card } from "@edmi-react/ui/card";
import { Skeleton } from "@edmi-react/ui/skeleton";

const components = {
	Card: (props: React.ComponentProps<typeof Card>) => (
		<Card className="gap-0 px-4" size="sm" {...props} />
	),
	Button,
	Skeleton,
};

const rendered = `<Card>
  <div className="font-semibold">Join MAG4</div>
  <div className="mt-0.5 text-xs text-muted-foreground">Magnificent Four · 4 tokens</div>
  <div className="mt-3.5 flex gap-2">
    <Button raised>Join index</Button>
    <Button variant="outline">Details</Button>
  </div>
</Card>`;

// The model is still writing: <Card> and the last <div> are unclosed.
const streaming = `<Card>
  <div className="font-semibold">Join MAG4</div>
  <Skeleton className="mt-2 h-3 w-48" />
  <Skeleton className="mt-3.5 h-[34px] w-32" />`;

const broken = `<Card>
  <div className="font-semibold">Join MAG4</div>
  <Chartt data={`;

export default function Demo() {
	return (
		<div className="flex w-full max-w-3xl flex-col gap-5">
			<div className="grid gap-5 sm:grid-cols-2">
				<div className="flex flex-col gap-2">
					<span className="font-mono text-[10.5px] tracking-wide text-muted-foreground uppercase">
						Rendered
					</span>
					<JSXPreview components={components} jsx={rendered}>
						<JSXPreviewContent />
						<JSXPreviewError />
					</JSXPreview>
				</div>
				<div className="flex flex-col gap-2">
					<span className="font-mono text-[10.5px] tracking-wide text-muted-foreground uppercase">
						Streaming
					</span>
					<JSXPreview components={components} isStreaming jsx={streaming}>
						<JSXPreviewContent />
						<JSXPreviewError />
					</JSXPreview>
				</div>
			</div>
			<div className="flex max-w-sm flex-col gap-2">
				<span className="font-mono text-[10.5px] tracking-wide text-muted-foreground uppercase">
					Error
				</span>
				<JSXPreview components={components} jsx={broken}>
					<JSXPreviewContent />
					<JSXPreviewError />
				</JSXPreview>
			</div>
		</div>
	);
}

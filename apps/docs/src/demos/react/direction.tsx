import { Button } from "@edmi-react/ui/button";
import { DirectionProvider } from "@edmi-react/ui/direction";

function Card({ title, sub, join, share }: Record<string, string>) {
	return (
		<div className="w-64 rounded-xl border border-border bg-card p-4">
			<div className="text-sm font-medium">{title}</div>
			<div className="text-xs text-muted-foreground">{sub}</div>
			<div className="mt-3 flex gap-2">
				<Button size="sm">{join}</Button>
				<Button size="sm" variant="secondary">
					{share}
				</Button>
			</div>
		</div>
	);
}

export default function Demo() {
	return (
		<div className="flex flex-wrap gap-6">
			<DirectionProvider direction="ltr">
				<div dir="ltr">
					<Card
						title="Magnificent Four"
						sub="4 tokens · rebalanced weekly"
						join="Join"
						share="Share"
					/>
				</div>
			</DirectionProvider>
			<DirectionProvider direction="rtl">
				<div dir="rtl">
					<Card
						title="مؤشر الأربعة العظماء"
						sub="٤ رموز · إعادة توازن أسبوعية"
						join="انضم"
						share="مشاركة"
					/>
				</div>
			</DirectionProvider>
		</div>
	);
}

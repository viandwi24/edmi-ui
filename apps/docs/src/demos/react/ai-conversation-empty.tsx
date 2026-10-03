import { ConversationEmptyState } from "@edmi-react/components/ai/conversation";
import { Suggestion } from "@edmi-react/components/ai/suggestion";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

export default function Demo() {
	return (
		<div className="grid w-full max-w-3xl gap-4 sm:grid-cols-2">
			<div className="flex h-72 rounded-xl border border-border bg-card">
				<ConversationEmptyState
					title="Start a conversation"
					description="Ask about an index, a token or your portfolio."
					icon={
						<IconPlaceholder
							lucide="MessageSquareIcon"
							tabler="IconMessage"
							hugeicons="Message01Icon"
							phosphor="ChatIcon"
							remixicon="RiChat1Line"
						/>
					}
				/>
			</div>
			<div className="flex h-72 rounded-xl border border-border bg-card">
				<ConversationEmptyState
					variant="home"
					title="Good evening, Dwi"
					description="What should the keeper look at?"
				>
					<div className="flex flex-wrap justify-center gap-2">
						<Suggestion suggestion="Check drift" />
						<Suggestion suggestion="Show my fees" />
					</div>
				</ConversationEmptyState>
			</div>
		</div>
	);
}

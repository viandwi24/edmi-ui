import { ChatComposer } from "@edmi-react/components/ai/chat-composer";

export default function Demo() {
	return (
		<ChatComposer
			className="max-w-2xl"
			onSubmit={() => {}}
			onAttach={() => {}}
			onSpeech={() => {}}
			disclaimer="Edmi is AI and can make mistakes."
			models={[
				{ id: "opus", label: "Opus" },
				{ id: "sonnet", label: "Sonnet" },
			]}
			efforts={[
				{ id: "low", label: "Low" },
				{ id: "medium", label: "Medium" },
				{ id: "high", label: "High" },
			]}
			defaultEffort="medium"
			modes={[
				{ id: "auto", label: "Auto" },
				{ id: "ask", label: "Ask first" },
			]}
		/>
	);
}

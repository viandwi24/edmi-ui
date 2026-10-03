import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@edmi-react/ui/accordion";

export default function Demo() {
	return (
		<Accordion
			multiple
			defaultValue={["a", "c"]}
			variant="card"
			className="max-w-md"
		>
			<AccordionItem value="a">
				<AccordionTrigger>3.1 Vault incorporation</AccordionTrigger>
				<AccordionContent>How the vault entity is formed.</AccordionContent>
			</AccordionItem>
			<AccordionItem value="b">
				<AccordionTrigger>3.2 Index analytics</AccordionTrigger>
				<AccordionContent>Performance and weight history.</AccordionContent>
			</AccordionItem>
			<AccordionItem value="c">
				<AccordionTrigger>3.3 Holder support</AccordionTrigger>
				<AccordionContent>
					Answer holder questions with the agent, using the same mandate
					context.
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}

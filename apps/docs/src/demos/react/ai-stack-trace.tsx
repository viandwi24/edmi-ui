import {
	StackTrace,
	StackTraceActions,
	StackTraceContent,
	StackTraceCopyButton,
	StackTraceError,
	StackTraceErrorMessage,
	StackTraceErrorType,
	StackTraceExpandButton,
	StackTraceFrames,
	StackTraceHeader,
} from "@edmi-react/components/ai/stack-trace";

const trace = `TypeError: Cannot read properties of undefined (reading 'price')
    at getDrift (lib/drift.ts:14:22)
    at run (lib/keeper.ts:8:17)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)`;

export default function Demo() {
	return (
		<StackTrace
			className="max-w-xl"
			defaultOpen
			onFilePathClick={(file, line) => console.log(file, line)}
			trace={trace}
		>
			<StackTraceHeader>
				<StackTraceError>
					<StackTraceErrorType />
					<StackTraceErrorMessage />
				</StackTraceError>
				<StackTraceActions>
					<StackTraceCopyButton />
					<StackTraceExpandButton />
				</StackTraceActions>
			</StackTraceHeader>
			<StackTraceContent>
				<StackTraceFrames />
			</StackTraceContent>
		</StackTrace>
	);
}

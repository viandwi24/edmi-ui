import {
	Test,
	TestDuration,
	TestError,
	TestErrorMessage,
	TestName,
	TestResults,
	TestResultsContent,
	TestResultsDuration,
	TestResultsHeader,
	TestResultsProgress,
	TestResultsSummary,
	TestStatus,
	TestSuite,
	TestSuiteContent,
	TestSuiteName,
} from "@edmi-react/components/ai/test-results";

export default function Demo() {
	return (
		<TestResults
			className="max-w-xl"
			summary={{ duration: 1840, failed: 1, passed: 7, skipped: 1, total: 9 }}
		>
			<TestResultsHeader>
				<TestResultsSummary />
				<TestResultsDuration />
			</TestResultsHeader>
			<TestResultsProgress />
			<TestResultsContent>
				<TestSuite defaultOpen name="keeper.test.ts" status="failed">
					<TestSuiteName />
					<TestSuiteContent>
						<Test
							duration={12}
							name="skips when drift is under the limit"
							status="passed"
						/>
						<Test duration={31} name="rebalances at exactly 2%" status="failed">
							<TestStatus />
							<TestName />
							<TestDuration />
							<TestError>
								<TestErrorMessage>
									AssertionError: expected 0.02 to be less than 0.02
								</TestErrorMessage>
							</TestError>
						</Test>
						<Test name="respects approval above $500" status="skipped" />
						<Test name="sends one transaction" status="running" />
					</TestSuiteContent>
				</TestSuite>
			</TestResultsContent>
		</TestResults>
	);
}

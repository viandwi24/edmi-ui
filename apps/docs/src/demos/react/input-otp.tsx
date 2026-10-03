import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@edmi-react/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

export default function Demo() {
	return (
		<InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
			<InputOTPGroup>
				<InputOTPSlot index={0} />
				<InputOTPSlot index={1} />
				<InputOTPSlot index={2} />
			</InputOTPGroup>
			<InputOTPSeparator />
			<InputOTPGroup>
				<InputOTPSlot index={3} />
				<InputOTPSlot index={4} />
				<InputOTPSlot index={5} />
			</InputOTPGroup>
		</InputOTP>
	);
}

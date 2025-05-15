import AdvanceSettings from "../../src/ts/advanceSettings";

describe("AdvanceSettings class", () => {
	let advancedSettings: AdvanceSettings;

	beforeEach(() => {
		advancedSettings = new AdvanceSettings();
	});

	test("format time string to Date", () => {
		const date = advancedSettings.formatTime("12:34");
		expect(date).toBeInstanceOf(Date);
		expect(date.getHours()).toBe(12);
		expect(date.getMinutes()).toBe(34);
	});

	test("calculate time difference from now", () => {
		const now = new Date();
		const futureTime = `${now.getHours().toString().padStart(2, "0")}:${(
			now.getMinutes() + 1
		)
			.toString()
			.padStart(2, "0")}`;

		const diff = advancedSettings.timeDifference(futureTime);
		expect(diff).toBeGreaterThan(0);
	});
});

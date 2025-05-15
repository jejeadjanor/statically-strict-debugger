import Light from "../../src/ts/basicSettings";

describe("Testing the Light class...", () => {
	let light: Light;

	beforeEach(() => {
		light = new Light();
	});

	test("should instantiate without errors", () => {
		expect(light).toBeInstanceOf(Light);
	});

	test("should return a notification string", () => {
		const notificationMsg = "Test notification";
		const html = light.notification(notificationMsg);
		expect(typeof html).toBe("string");
		expect(html).toContain(notificationMsg);
	});

	test("should display notification in container", () => {
		const container = document.createElement("div");
		light.displayNotification("Hello", "beforeend", container);
		expect(container.innerHTML).toContain("Hello");
		expect(container.querySelector(".notification")).not.toBeNull();
	});

	test("should Set light ON attributes", () => {
		const imgElement = document.createElement("img");
		light.lightSwitchOn(imgElement);
		expect(imgElement.getAttribute("src")).toBe("../assets/svgs/light_bulb.svg");
		expect(imgElement.getAttribute("data-lightOn")).toBe(
			"../assets/svgs/light_bulb_off.svg"
		);
	});

	test("should Set light OFF attributes", () => {
		const imgElement = document.createElement("img");
		light.lightSwitchOff(imgElement);
		expect(imgElement.getAttribute("src")).toBe(
			"../assets/svgs/light_bulb_off.svg"
		);
		expect(imgElement.getAttribute("data-lightOn")).toBe(
			"../assets/svgs/light_bulb.svg"
		);
	});

	test("should remove notification element after timeout", () => {
		jest.useFakeTimers();
		const notification = document.createElement("div");
		notification.classList.add("notification");
		document.body.appendChild(notification);
		light.removeNotification(notification);

		expect(document.body.contains(notification)).toBe(true);

		jest.advanceTimersByTime(5000);
		expect(document.body.contains(notification)).toBe(false);

		jest.useRealTimers();
	});
});

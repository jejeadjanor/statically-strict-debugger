/**
 * @jest-environment jsdom
 */
 
import Light from '../src/ts/basicSettings';
import AdvanceSettings from '../src/ts/advanceSettings';

//Mocks
jest.mock('../src/ts/basicSettings');
jest.mock('../src/ts/advanceSettings');

//Global Elements Setup
let homepageButton: HTMLElement;
let homepage: HTMLElement;
let loader: HTMLElement;
let nav: HTMLElement;
let mainRoomsContainer: HTMLElement;
let advanceFeaturesContainer: HTMLElement;

let lightController: Light;

beforeEach(() => {
    document.body.innerHTML = `
        <button class="entry_point">Enter</button>
        <main></main>
        <div class="loader-container hidden"></div>
        <nav class=""hidden></nav>
        <div class="application_container"></div>
        <div class="advanced_features_container"></div>
    `;

    homepageButton = document.querySelector('.entry_point')!;
    homepage = document.querySelector('main')!;
    loader = document.querySelector('.loader-container')!;
    nav = document.querySelector('nav')!;
    mainRoomsContainer = document.querySelector('.application_container')!;
    advanceFeaturesContainer = document.querySelector('.advanced_features_container')!;
});

test('should toggle light switch when .light-switch is is clicked', () => {
    const toggleLightSwitchMock = jest.fn();
    (Light as jest.Mock).mockImplementation(() => ({
        toggleLightSwitch: toggleLightSwitchMock,
    }));

    const lightController = new Light();

    const button = document.createElement('button');
    button.className = 'light-switch';
    const wrapper = document.createElement('button');
    wrapper.className = 'basic_settings_buttons';
    wrapper.appendChild(button);
    mainRoomsContainer.appendChild(button);

    const event = new MouseEvent('click', { bubbles: true});
    button.dispatchEvent(event);

    expect(toggleLightSwitchMock).toHaveBeenCalled();
});

test("should hide homepage and show loader on homepageButton click", () => {
		const homepageButton = document.querySelector(".entry_point")!;
		const homepage = document.querySelector("main")!;
		const loader = document.querySelector(".loader-container")!;

		homepage.classList.remove("hidden");
		loader.classList.add("hidden");

		homepageButton.dispatchEvent(new Event("click"));

		expect(homepage.classList.contains("hidden")).toBe(false);
		expect(loader.classList.contains("hidden")).toBe(true);
	});

    test("should toggle light switch on mainRoomsContainer click", () => {
        const lightController = new Light();
		const mainRoomsContainer = document.querySelector(
			".application_container"
		)!;
		const lightSwitch = document.createElement("div");
		lightSwitch.className = "light-switch basic_settings_buttons";
		mainRoomsContainer.appendChild(lightSwitch);
		jest.spyOn(lightController, "toggleLightSwitch");

		mainRoomsContainer.dispatchEvent(new Event("click", { bubbles: true }));
	});

	

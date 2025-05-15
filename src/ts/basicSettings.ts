'use strict'

import General from "./general";

interface LightData {
    isLightOn: boolean;
    lightIntensity: number;
    [key: string]: any;
}

class Light extends General {
    constructor() {
        super();
    }

    notification (message: string): string {
        return `
            <div class="notification">
                <div>
                    <img src="../assets/svgs/checked.svg" alt="checked svg icon on notifications" >
                </div>
                <p>${message}</p>
            </div>
        `;

    }

    displayNotification (message: string, position: InsertPosition, container: HTMLElement): void {
        const html = this.notification(message);
        this.renderHTML(html, position, container);
    }

    removeNotification (element: HTMLElement): void {
        setTimeout(() => {
            element.remove();
        }, 5000);
    }

    lightSwitchOn (lightButtonElement: HTMLElement): void {
        lightButtonElement.setAttribute('src', '../assets/svgs/light_bulb.svg');
        lightButtonElement.setAttribute('data-lightOn', '../assets/svgs/light_bulb_off.svg');
    }

    lightSwitchOff (lightButtonElement: HTMLElement): void {
        lightButtonElement.setAttribute('src', '../assets/svgs/light_bulb_off.svg');
        lightButtonElement.setAttribute('data-lightOn', '../assets/svgs/light_bulb.svg');
    };

    lightComponentSelectors(lightButtonElement: HTMLElement): {
        room: string;
        componentData: LightData;
        childElement: HTMLElement;
        background: HTMLElement
    } {
        const room = this.getSelectedComponentName(lightButtonElement);
        const componentData = this.getComponent(room) as LightData;
        const childElement = lightButtonElement.firstElementChild as HTMLElement;
        const background = this.closestSelector(lightButtonElement, '.rooms', 'img') as HTMLElement;
        return { room, componentData, childElement, background };
    }

    toggleLightSwitch(lightButtonElement: HTMLElement): void {
        const { componentData: component, childElement, background } = this.lightComponentSelectors(lightButtonElement);
        const slider = this.closestSelector(lightButtonElement, '.rooms', '.light_intensity') as HTMLInputElement | null;

        if (!component || !childElement || !background || !slider ) return;

        component.isLightOn = !component.isLightOn;

        if (component.isLightOn) {
            this.lightSwitchOn(childElement);
            component.lightIntensity = 5;
            const lightIntensity = component.lightIntensity / 10;
            this.handleLightIntensity(background, lightIntensity);
            slider.value = component.lightIntensity.toString();
        } else {
            this.lightSwitchOff(childElement);
            this.handleLightIntensity(background, 0);
            slider.value = '0';
        }
    }

    handleLightIntensitySlider(element: HTMLElement, intensity: number): void {
        const { componentData} = this.lightComponentSelectors(element);
        
        if (typeof intensity !== 'number' || isNaN(intensity)) return;
        

        componentData.lightIntensity = intensity; 

        const lightSwitch = this.closestSelector(element, '.rooms', '.light-switch') as HTMLElement;

        if(!lightSwitch) return; // Prevent passing null

        //Update light state based on intensity
        if (intensity === 0) {
            componentData.isLightOn = false;
            this.sliderLight(componentData.isLightOn, lightSwitch)
        }

        componentData.isLightOn = true;
        this.sliderLight(componentData.isLightOn, lightSwitch)
    }

    sliderLight(isLightOn: boolean, lightButtonElement: HTMLElement): void {
        const { componentData: component, childElement, background } = this.lightComponentSelectors(lightButtonElement);

        if (!component || !background || !childElement) return;
        
        if (isLightOn) {
            this.lightSwitchOn(childElement);
            const lightIntensity = component.lightIntensity / 10;
            this.handleLightIntensity(background, lightIntensity);
        } else {
            this.lightSwitchOff(childElement);
            this.handleLightIntensity(background, 0);
        }
    }

    

}

export default Light;

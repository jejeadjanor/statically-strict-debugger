'use strict'

import General from "./general.js";
import Light from './basicSettings.js';

// import { Chart } from 'chart.js';

interface advanceSettingsData {
    name: string;
    lightIntensity: number;
    numOfLights: number;
    isLightOn: boolean;
    autoOn: string;
    autoOff: string;
    usage: number[];
    element?: HTMLElement;
    [key: string]: any;
}

class AdvanceSettings extends Light {
    constructor () {
        super();

    }

    #markup (component: advanceSettingsData): string {
        const {name, numOfLights, autoOn, autoOff} = component;
        return `
        <div class="advanced_features">
            <h3>Advanced features</h3>
            <section class="component_summary">
                <div>
                    <p class="component_name">${this.capFirstLetter(name)}</p>
                    <p class="number_of_lights">${numOfLights}</p>
                </div>
                <div>

                    <p class="auto_on">
                        <span>Automatic turn on:</span>
                        <span>${autoOn}</span>
                    </p>
                    <p class="auto_off">
                        <span>Automatic turn off:</span>
                        <span>${autoOff}</span>
                    </p>
                </div>
            </section>
            <section class="customization">
                <div class="edit">
                    <p>Customize</p>
                    <button class="customization-btn">
                        <img src="../assets/svgs/edit.svg" alt="customize settings svg icon">
                    </button>
                </div>
                <section class="customization-details hidden">
                    <div>
                        <h4>Automatic on/off settings</h4>
                        <div class="defaultOn">
                            <label for="">Turn on</label>
                            <input type="time" name="autoOnTime" id="autoOnTime">
                            <div>
                                <button class="defaultOn-okay">Okay</button>
                                <button class="defaultOn-cancel">Cancel</button>
                            </div>
                        </div>
                        <div class="defaultOff">
                            <label for="">Go off</label>
                            <input type="time" name="autoOffTime" id="autoOffTime">
                            <div>
                                <button class="defaultOff-okay">Okay</button>
                                <button class="defaultOff-cancel">Cancel</button>
                            </div>
                        </div>

                    </div>
                </section>
                <section class="summary">
                    <h3>Summary</h3>
                    <div class="chart-container">
                        <canvas id="myChart"></canvas>
                    </div>
                </section>
                <button class="close-btn">
                    <img src="../assets/svgs/close.svg" alt="close button svg icon">
                </button>
            </section>
            <button class="close-btn">
                <img src="../assets/svgs/close.svg" alt="close button svg icon">
            </button>
        </div>
        `
    }

    #analyticsUsage(data: number[]): void {
        const ctx = this.selector('#myChart') as HTMLCanvasElement;
        new (window as any).Chart(ctx, {
            type: 'line',
            data: {
              labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
              datasets: [{
                label: 'Hours of usage',
                data: data,
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
        });
    }

    modalPopUp(element: HTMLElement): void {
        const selectedRoom = this.getSelectedComponentName(element);
        const componentData = this.getComponent(selectedRoom) as advanceSettingsData;
        const parentElement = this.selector('.advanced_features_container') as HTMLElement;
        this.removeHidden(parentElement);
        
        // display modal view
        this.renderHTML(this.#markup(componentData), 'afterbegin', parentElement);

        // graph display
        this.#analyticsUsage(componentData.usage);
    }

    displayCustomization(selectedElement: HTMLElement):void {
        const element = this.closestSelector(selectedElement, '.customization', '.customization-details') as HTMLElement;
        this.toggleHidden(element);
    }

    closeModalPopUp(): void {
        const parentElement = this.selector('.advanced_features_container') as HTMLElement;
        const childElement = this.selector('.advanced_features') as HTMLElement;

        // remove child element from the DOM
        childElement.remove()
        // hide parent element
        this.addHidden(parentElement);
    }

    customizationCancelled(selectedElement: HTMLElement, parentSelectorIdentifier: string): void {
        const element = this.closestSelector(selectedElement, parentSelectorIdentifier, 'input') as HTMLInputElement;
        element.value = '';
        return;
    }

    customizeAutomaticOnPreset(selectedElement: HTMLElement): void {
        const element = this.closestSelector(selectedElement, '.defaultOn', 'input') as HTMLInputElement;
        const { value } = element;
        
        // when value is falsy
        if (!value) return;
        
        const component = this.getComponentData(element, '.advanced_features', '.component_name') as advanceSettingsData;
        component.autoOn = value;
        element.value = '';

        // selecting display or markup view
        const spanElement = this.selector('.auto_on > span:last-child') as HTMLElement;
        this.updateMarkupValue(spanElement, component.autoOn);

        // update room data with element
        this.setComponentElement(component);
        
        // handle light on automation
        this.automateLight(component['autoOn'], component);

    }

    customizeAutomaticOffPreset(selectedElement: HTMLElement): void {
        const element = this.closestSelector(selectedElement, '.defaultOff', 'input') as HTMLInputElement;
        const { value } = element;

        // when value is falsy
        if (!value) return; 
        
        const component = this.getComponentData(element, '.advanced_features', '.component_name') as advanceSettingsData;
        component.autoOff = value;
        element.value = '';

        // selecting display or markup view
        const spanElement = this.selector('.auto_off > span:last-child') as HTMLElement;
        this.updateMarkupValue(spanElement, component.autoOff);

        // update room data with element
        this.setComponentElement(component);
        
        // handle light on automation
        this.automateLight(component['autoOff'], component);

    }

    getSelectedComponent (componentName?: string): advanceSettingsData | Record<string, advanceSettingsData> {
        if (!componentName) return this.componentsData;
        const component = this.componentsData[componentName.toLowerCase()] as advanceSettingsData;
        return component;
    }

    getSelectedSettings (componentName: string):string {
        return this.#markup(this.getSelectedComponent(componentName) as advanceSettingsData);

    }

    setNewData (component:string, key:string, data:any): any {
        const selectedComponent = this.componentsData[component.toLowerCase()] as advanceSettingsData;
        return selectedComponent[key] = data;
    }

    capFirstLetter (word: string): string {
        return word.replace(word.at(0)!, word.at(0)!.toUpperCase())
    }

    getObjectDetails(): this {
        return this;
    }

    formatTime (time: string): Date {
        const [hour, min] = time.split(':').map(Number);
        
        const dailyAlarmTime = new Date();
        dailyAlarmTime.setHours(hour); 
        dailyAlarmTime.setMinutes(min);
        dailyAlarmTime.setSeconds(0);
        
        return dailyAlarmTime;
    };

    timeDifference (selectedTime: string): number {
        const now = new Date();
        const setTime = this.formatTime(selectedTime).getTime() - now.getTime();
        console.log(setTime, now);
        return setTime;
    }

    async timer (time: Date, message: string | boolean, component: advanceSettingsData): Promise<void> {
        return new Promise ((resolve, reject) => {
            const checkAndTriggerAlarm = () => {
                const now = new Date();
                
                if (
                    now.getHours() === time.getHours() &&
                    now.getMinutes() === time.getMinutes() &&
                    now.getSeconds() === time.getSeconds()
                ) {
                    resolve(this.toggleLightSwitch(component.element!))

                    // stop timer
                    clearInterval(intervalId);
                    
                }
            }
        
            // Check every second
            const intervalId = setInterval(checkAndTriggerAlarm, 1000);

        })
    }

    async automateLight (time: string, component: advanceSettingsData): Promise<void> {
        const formattedTime = this.formatTime(time);
        return await this.timer(formattedTime, true, component);
    }




}

export default AdvanceSettings;
'use script'
// elements declarations
const homepageButton = document.querySelector('.entry_point') as HTMLElement;
const homepage = document.querySelector('main') as HTMLElement;
const mainRoomsContainer = document.querySelector('.application_container') as HTMLElement;
const advanceFeaturesContainer = document.querySelector('.advanced_features_container') as HTMLElement;
const nav = document.querySelector('nav') as HTMLElement;
const loader = document.querySelector('.loader-container') as HTMLElement;
// const rooms = document.querySelectorAll('.rooms');

// imports
import Light from './ts/basicSettings.js';
import AdvanceSettings from './ts/advanceSettings.js';

// object creation
const lightController = new Light();
const advancedSettings = new AdvanceSettings();

// global variables
let selectedComponent: HTMLElement | null;
let isWifiActive = true;

// Event handlers
// hide homepage after button is clicked
homepageButton.addEventListener('click', function(e: MouseEvent): void {
    lightController.addHidden(homepage);
    lightController.removeHidden(loader);
    
    setTimeout(() => {
        lightController.removeHidden(mainRoomsContainer);
        lightController.removeHidden(nav);
    }, 1000);
})


mainRoomsContainer.addEventListener('click', (e: MouseEvent): void => {
    const selectedElement = e.target as HTMLElement;

    // when click occurs on light switch
    if (selectedElement.closest(".light-switch")) {
        const lightSwitch = selectedElement.closest(".basic_settings_buttons")?.firstElementChild as HTMLElement;
        if (lightSwitch) lightController.toggleLightSwitch(lightSwitch);
        return;
    }

    // when click occurs on advance modal
    if (selectedElement.closest('.advance-settings_modal')) {
        const advancedSettingsBtn = selectedElement.closest('.advance-settings_modal') as HTMLElement;
        if (advancedSettings) advancedSettings.modalPopUp(advancedSettingsBtn);
    }
});

mainRoomsContainer.addEventListener('change', (e: Event): void => {
    const slider = e.target as HTMLInputElement;
    const value = +slider?.value;

    lightController.handleLightIntensitySlider(slider, value);
    
})

// rooms.forEach((room) => {
//     const slider = room.querySelector('input[type="range"]') as HTMLInputElement | null;
//     const img = room.querySelector('img') as HTMLImageElement | null;

//     if(slider && img) {
//         slider.addEventListener('input', () => 
//         {
//         const value = Number(slider.value);
//         const brightness = value/10;
//         img.style.filter = `brightness(${brightness})`;
        
//     })
//     }
// })

// advance settings modal
advanceFeaturesContainer.addEventListener('click', (e: MouseEvent): void => {
    const selectedElement = e.target as HTMLElement;

    if (selectedElement.closest('.close-btn')) {
       advancedSettings.closeModalPopUp()
    }

    // display customization markup
    if (selectedElement.closest('.customization-btn')) {
        advancedSettings.displayCustomization(selectedElement);
    }

    // set light on time customization
    if (selectedElement.matches('.defaultOn-okay')) {
        advancedSettings.customizeAutomaticOnPreset(selectedElement);
    }
    
    // set light off time customization
    if (selectedElement.matches('.defaultOff-okay')) {
        advancedSettings.customizeAutomaticOffPreset(selectedElement);
    }

    // cancel light time customization
    if (selectedElement.textContent?.includes("Cancel")) {
        if (selectedElement.matches('.defaultOn-cancel')) {
            advancedSettings.customizationCancelled(selectedElement, '.defaultOn');
        } else if (selectedElement.matches('.defaultOff-cancel')) {
            advancedSettings.customizationCancelled(selectedElement, '.defaultOff');
        }
    }
});


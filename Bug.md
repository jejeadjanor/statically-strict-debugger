##Bug Report
### Bug 1 -  TypeScript Compilation Errors in Migrated Files
- **File** : main.ts,basicSettings.ts,advanceSettings.ts,general.ts 
- **Type** : Logical/Compilation
- **Description** : When the JavaScript files were renamed to .ts, several TypeScript compilation errors were introduced. These include:
>> Untyped variables
>> Missing or incorrect property typings
>> Unsafe DOM access and query selectors

- **Fix** : Refactor and annotate all TypeScript files with proper types. Ensure safe access to DOM elements using as or optional chaining. 

### Bug 2 -  The slider do not responsively increase and  decreases the room's light intensity immediately as you move it 
- **File** : handleLigtIntensitySlider() method in basicSettings.ts
- **Line** :  ~87
- **Type** : Logical
- **Description** : The logic within handleLightIntensitySlider() sets componentData.isLightOn = false in both the if and else blocks when intensity is adjusted. This prevents any response to slider changes and disables light updates
- **Fix** : Refactor the conditional to
        if (intensity === 0) {
            componentData.isLightOn = false;
            this.sliderLight(componentData.isLightOn, lightSwitch)
        }

        componentData.isLightOn = true;
        this.sliderLight(componentData.isLightOn, lightSwitch)

### Bug 3 -  The light switch(the light bulb) for each room component turns on or off the light of the selected room  
- **File** : Old basicSettings.js
- **Line** :  ~45-49 
- **Type** : Logical
- **Description** : lightComponentSelectors() method selects only the first room(const componentData = this.getComponent(room[0])) instead of iterating through all available room elements thus only the first's room light responds to switch toggles
- **Fix** : Remove [0] and use this const componentData = this.getComponent(room) instead.

### Bug 4 -  The specified time is not accurately displayed in the advanced settings when user choose their preferred automated time
- **File** : customizeAutomaticOnPreset() and customizeAutomaticOnPreset() methods in advancedSettings.ts
- **Line** :  155 & 178
- **Type** : Logical
- **Description** : customizeAutomaticOnPreset() and customizeAutomaticOnPreset() methods contain a condition that incorrectly use if (!!value) return; causing valid user input to be ignored and automated times not to display.
- **Fix** : Correct condition to if (!value) return; . This ensures that the time values are validated properly and only skipped if value is falsy.
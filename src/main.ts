import * as w4 from "./wasm4";
import * as UI from "./UI";


// MAIN WINDOW SETUP

let mainWindow: UI.Window = new UI.Window( 37, 14, 90, 130, 0x42);

let grabButton: UI.Button = new UI.Button( 80, 3, "-", 0);
mainWindow.append(grabButton);

let windowTitle: UI.Text = new UI.Text( 3, 3, "Window", false);
mainWindow.append(windowTitle);

let sliderA: UI.Slider = new UI.Slider( 3, 27, "Slider", 84, 0, 100, 50);
mainWindow.append(sliderA);



// PADDING SECTION SETUP

let paddingSection: UI.Window = new UI.Window( 3, 43, 0, 0, 0x00);
paddingSection.append( new UI.Text( 0, 0, "Button Padding", false) );
mainWindow.append(paddingSection);

let buttonA: UI.Button = new UI.Button( 8, 17, "A", 0);
paddingSection.append(buttonA);
let buttonB: UI.Button = new UI.Button( 30, 12, "B", 4);
paddingSection.append(buttonB);
let buttonC: UI.Button = new UI.Button( 59, 7, "C", 8);
paddingSection.append(buttonC);


// HIDE SECTION SETTUP

let hideButton: UI.Button = new UI.Button( 3, 85, "Hide", 2);
mainWindow.append(hideButton);

let smallWindow: UI.Window = new UI.Window( 28, 85, 58, 40, 0x41);
mainWindow.append(smallWindow);


let smallWindowTitle: UI.Text = new UI.Text( 3, 3, "Window 2", false);
smallWindow.append(smallWindowTitle);

let smallSlider: UI.Slider = new UI.Slider( 5, 22, "Name", 48, -3000, 3000, 10);
smallWindow.append(smallSlider);



// COLOR PALETTE SETTINGS

let settingsYTarget: i16 = 161;
let settingsY: f32 = <f32>settingsYTarget;

let settingsWindow: UI.Window = new UI.Window(-1, settingsYTarget, 162, 150, 0x42);
let settingsWindowHideButton: UI.Button = new UI.Button( 153, -11, "-", 0);
settingsWindow.append(settingsWindowHideButton);

settingsWindow.append(new UI.Text( 3, 3, "Color Palette", false));

let sliderR: UI.Slider = new UI.Slider( 3, 22, "Red", 156, 0, 255, 125);
settingsWindow.append(sliderR);
let sliderG: UI.Slider = new UI.Slider( 3, 45, "Green", 156, 0, 255, 125);
settingsWindow.append(sliderG);
let sliderB: UI.Slider = new UI.Slider( 3, 68, "Blue", 156, 0, 255, 125);
settingsWindow.append(sliderB);

let defaultPaletteButton: UI.Button = new UI.Button( 127, 3, "Default", 1);
settingsWindow.append(defaultPaletteButton);

let colorButton1: UI.Button = new UI.Button( 3, 85, "Color 1", 2);
settingsWindow.append(colorButton1);
let colorButton2: UI.Button = new UI.Button( 40, 85, "Color 2", 2);
settingsWindow.append(colorButton2);
let colorButton3: UI.Button = new UI.Button( 77, 85, "Color 3", 2);
settingsWindow.append(colorButton3);
let colorButton4: UI.Button = new UI.Button( 114, 85, "Color 4", 2);
settingsWindow.append(colorButton4);

let colorIndicator1: UI.Window = new UI.Window(5, 103, 31, 12, 0x41);
settingsWindow.append(colorIndicator1);
let colorIndicator2: UI.Window = new UI.Window(42, 103, 31, 12, 0x42);
settingsWindow.append(colorIndicator2);
let colorIndicator3: UI.Window = new UI.Window(79, 103, 31, 12, 0x43);
settingsWindow.append(colorIndicator3);
let colorIndicator4: UI.Window = new UI.Window(116, 103, 31, 12, 0x34);
settingsWindow.append(colorIndicator4);


function rgbToWasmColor(r: u32, g: u32, b: u32): u32 {
    return (r << 16) | (g << 8) | (b << 0);
}

function lerp( a: number, b: number, t: number ): number {
    return a + t * ( b - a );
}

/// *****************************
/// ********* MAIN LOOP *********
/// *****************************

export function update (): void {

    UI.update(); // !!! Necessary for UI interactions !!!

    mainWindow.update( 0, 0); // Rendering and updating main window and all it's children
    settingsWindow.update( 0, 0);

    // Window grab action
    if(grabButton.isHold) {
        mainWindow.x = <i16>Math.min( 157, Math.max( 3, UI.Mouse.x )) - 83;
        mainWindow.y = <i16>Math.min( 153, Math.max( 1, UI.Mouse.y )) - 5;
    }

    // Hide small window action
    if(hideButton.isPressed) {
        smallWindow.hidden = !smallWindow.hidden;
    }


    // Background Settings Window
    settingsY = <f32>lerp(settingsY, <f32>settingsYTarget, 0.05);

    if(settingsWindowHideButton.isPressed) {
        if(settingsYTarget === 161) { settingsYTarget = 35; }
        else { settingsYTarget = 161; }
    }

    settingsWindow.y = <i16>settingsY;
    
    if(colorButton1.isPressed) { store<u32>(w4.PALETTE, rgbToWasmColor(<u8>sliderR.value, <u8>sliderG.value, <u8>sliderB.value), 0);  }
    if(colorButton2.isPressed) { store<u32>(w4.PALETTE, rgbToWasmColor(<u8>sliderR.value, <u8>sliderG.value, <u8>sliderB.value), 4); }
    if(colorButton3.isPressed) { store<u32>(w4.PALETTE, rgbToWasmColor(<u8>sliderR.value, <u8>sliderG.value, <u8>sliderB.value), 8); }
    if(colorButton4.isPressed) { store<u32>(w4.PALETTE, rgbToWasmColor(<u8>sliderR.value, <u8>sliderG.value, <u8>sliderB.value), 12); }

    if(defaultPaletteButton.isPressed) {
        store<u32>(w4.PALETTE, 0xe0f8cf, 0 * sizeof<u32>());
        store<u32>(w4.PALETTE, 0x86c06c, 1 * sizeof<u32>());
        store<u32>(w4.PALETTE, 0x306850, 2 * sizeof<u32>());
        store<u32>(w4.PALETTE, 0x071821, 3 * sizeof<u32>());
    }
}
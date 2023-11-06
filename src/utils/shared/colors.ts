export interface lightDark {
    light: string;
    dark: string;
}

export interface colorState {
    bgColor: lightDark;
    bgColor2?: lightDark;
    textColor: lightDark;
}

const sharedColors: colorState = {
    bgColor: { light: "gray.300", dark: "gray.600" },
    textColor: { light: "gray.800", dark: "white" }
}

export type LDColor = [string, string];

export default sharedColors;
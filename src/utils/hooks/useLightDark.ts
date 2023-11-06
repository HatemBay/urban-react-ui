import { useColorModeValue } from "@chakra-ui/react"
import { lightDark } from "../interfaces/colors"

// export type LDColor = [string, string];

export const useLightDark = (x: lightDark): string => {
    return useColorModeValue(x.light, x.dark)
    // return useColorModeValue(...[...Object.values(x)] as LDColor)
}
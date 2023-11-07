import { useColorModeValue } from "@chakra-ui/react"
import { lightDark } from "../utils/interfaces/colors"

// export type LDColor = [string, string];

const useLightDark = (x: lightDark): string => {
    return useColorModeValue(x.light, x.dark)
    // return useColorModeValue(...[...Object.values(x)] as LDColor)
}

export default useLightDark;
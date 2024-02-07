import { useColorModeValue } from "@chakra-ui/react"
import { LightDark } from "../utils/interfaces/globalColors"

// export type LDColor = [string, string];

const useLightDark = (x: LightDark): string => {
    return useColorModeValue(x.light, x.dark)
    // return useColorModeValue(...[...Object.values(x)] as LDColor)
}

export default useLightDark;
<<<<<<< HEAD
import { useColorModeValue } from "@chakra-ui/react"
import { LightDark } from "../utils/interfaces/globalColors"

// export type LDColor = [string, string];

const useLightDark = (x: LightDark): string => {
    return useColorModeValue(x.light, x.dark)
    // return useColorModeValue(...[...Object.values(x)] as LDColor)
}

=======
import { useColorModeValue } from "@chakra-ui/react"
import { LightDark } from "../utils/interfaces/globalColors"

// export type LDColor = [string, string];

const useLightDark = (x: LightDark): string => {
    return useColorModeValue(x.light, x.dark)
    // return useColorModeValue(...[...Object.values(x)] as LDColor)
}

>>>>>>> 846f6cb141ed49dc7a2547f910356b8ffe19a2b7
export default useLightDark;
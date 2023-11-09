import { Box, Container, Heading } from "@chakra-ui/react";
import { useRouteError } from "react-router-dom";

type Props = {
};

// TODO: improve UI
// TODO: change component name
export const NotFound = (props: Props) => {
    interface Error {
        message: string,
        code: number,
    }

    interface Errors {
        Forbidden: Error,
        Unauthorized: Error,
        NotFound: Error,
    }

    const ErrorMessage: Errors = {
        Forbidden: { message: "Access denied. You do not have permission to access this resource.", code: 301 },
        Unauthorized: { message: "Authentication required.", code: 304 },
        NotFound: { message: "Not found.", code: 404 },
    }

    const error = useRouteError() as unknown as Error | null;
    let errDisplay: Error;

    switch (error?.message) {
        case ("Forbidden"):
            errDisplay = ErrorMessage.Forbidden;
            break;
        case ("Unauthorized"):
            errDisplay = ErrorMessage.Unauthorized;
            break;
        default:
            errDisplay = ErrorMessage.NotFound;
    }

    return (<>
        <Container>
            <Heading>
                {errDisplay.message}
            </Heading>
        </Container>
    </>)
}
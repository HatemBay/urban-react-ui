/**
 * Creates a custom toast notification for the given promise, displaying a success message or an error message.
 *
 * @param {any} toast - the toast notification function, MUST BE A useToast HOOK
 * @param {any} promise - the promise to be executed
 * @param {string} successMessage - the success message to be displayed
 * @param {string} errorMessage - the error message to be displayed
 * @return {any} the result of the toast promise
 */
const customToast = (
  toast: any,
  promise: any,
  successMessage: string,
  errorMessage: string
): any => {
  return toast.promise(
    promise
      .then((result: any) => {
        if (result.error) {
          throw new Error(result.error.message);
        }
      })
      .catch((err: any) => {
        throw new Error(err.message);
      }),
    {
      success: {
        title: "Success",
        colorScheme: "green",
        description: successMessage,
        isClosable: true,
      },
      error: {
        title: "Error",
        colorScheme: "red",
        description: errorMessage,
        isClosable: true,
      },
      loading: {
        title: "Pending",
        description: "Please wait..",
        isClosable: true,
      },
    }
  );
};
export default customToast;

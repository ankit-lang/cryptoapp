import { Alert, AlertIcon } from "@chakra-ui/react";
import React from "react";

const ErrorComponent = ({ message }) => {
  return (
    <div>
      <Alert status="error" position={'fixed'} left={"50%"}
      transform={'translateX(-50%)'}
    w={"container.md"}
    bottom={10}>
        <AlertIcon />
        {message}
      </Alert>
    </div>
  );
};

export default ErrorComponent;

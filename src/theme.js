import { createSystem, defaultConfig } from "@chakra-ui/react";

const theme = createSystem(defaultConfig, {
  theme: {
    tokens: {
      config: {
        initialColorMode: { value: "light" },
        useSystemColorMode: { value: false },
      },
    },
  },
});

export default theme;

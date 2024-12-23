import { createSystem, defaultConfig } from "@chakra-ui/react";

const theme = createSystem(defaultConfig, {
  theme: {
    tokens: {
      config: {
        initialColorMode: { value: "dark" },
        useSystemColorMode: { value: false },
      },
    },
  },
});

export default theme;

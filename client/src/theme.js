import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  
  colors: {
    brown: {
      1: "#fff6eb",
      5: "#ffedd8",
      10: "#ffe4c4",
      20: "#ffdcb1",
      40: "#ffd39d",
      60: "#ffca89",
      80: "#ffc176",
      100: "#ffb862",
      150: "#ffaf4e",
      200: "#ffa73b",
      250: "#ff9e27",
      300: "#ff9514",
      350: "#ff8c00",
      400: "#eb8100",
      450: "#d87600",
      500: "#c46c00",
      550: "#b16100",
      600: "#9d5600",
      650: "#894b00",
      700: "#764100",
      750: "#623600",
      800: "#4e2b00",
      850: "#3b2000",
      900: "#271600",
    },
  },
  components: {
    Box: {
      baseStyle: {
        bg: "primary.200",
      },
    },
  },
});

export default theme;

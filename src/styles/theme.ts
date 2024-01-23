import { Theme, createTheme } from "@mui/material/styles"
declare module "@mui/material/styles" {
  interface Theme {}
}

export const theme: Theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#00a38d",
    },
    secondary: {
      main: "#8D00A3",
    },
  },
  typography: {
    fontFamily: "'Nunito Sans', sans-serif",
    allVariants: {
      fontFamily: "'Nunito Sans', sans-serif",
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          "&::first-letter": {
            textTransform: "uppercase",
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          "&::first-letter": {
            textTransform: "uppercase",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
          padding: "16px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          fontWeight: "bold",
          fontSize: "16px",
          textTransform: "capitalize",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderRadius: "8px",
            transition:
              "border-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          },
          "&.Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderWidth: "3px",
              transition:
                "border-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            },
          },
        },
      },
    },
  },
})
// box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;

import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  shape: {
    borderRadius: 12,
  },

  palette: {
    primary: {
      main: "#2563eb",
    },
    background: {
      default: "#f3f4f6",
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily:
            "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
        input: {
          padding: "12px 14px",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "medium",
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root:not(.MuiInputBase-multiline)": {
            height: 48,
            marginTop: 0,
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          height: 48,
          borderRadius: 12,
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          minHeight: 20,
        },
      },
    },
  },
});

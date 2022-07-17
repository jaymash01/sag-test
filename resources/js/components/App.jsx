import React from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DefaultLayout from "../layouts/Default";
import Import from "../pages/Import";
import DataTableReport from "../pages/DataTableReport";
import GraphicalReport from "../pages/GraphicalReport";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffcc01",
      contrastText: "#fff",
    },
    secondary: {
      main: "#0d0a00",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: [
      '"Poppins"',
      "sans-serif",
    ].join(","),
    fontSize: 12,
    color: "#000"
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <DefaultLayout>
          <Routes>
            <Route
              exact={true}
              path={"/"}
              element={<Navigate to="/data-table"/>}
            />
            <Route
              path={"/import"}
              element={<Import />}
            />
            <Route
              path={"/data-table"}
              element={<DataTableReport />}
            />
            <Route
              path={"/graph"}
              element={<GraphicalReport />}
            />
          </Routes>
        </DefaultLayout>
      </Router>
    </ThemeProvider>
  );
};

export default App;

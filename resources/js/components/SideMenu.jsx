import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

import { BarChart as BarChartIcon, ListAlt as ListIcon, UploadFile as ImportIcon } from "@mui/icons-material";

const SideMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    setItems([
      {
        id: "1",
        title: "Import",
        icon: <ImportIcon />,
        path: "/import",
      },
      {
        id: "2",
        title: "Data Table",
        icon: <ListIcon />,
        path: "/data-table",
      },
      {
        id: "3",
        title: "Graphical Report",
        icon: <BarChartIcon />,
        path: "/graph",
      },
    ]);
  }, []);

  return (
    <List component="nav">
      {items.map(e => (
        <ListItemButton
          key={e.id}
          selected={location.pathname.indexOf(e.path) !== -1}
          onClick={() => {
            if (e.items && e.items.length) {
              setOpen(!open ? e.path : null);
            } else {
              navigate(e.path);
            }
          }}
          sx={{
            "&.Mui-selected": {
              borderRightWidth: 3,
              borderRightStyle: "solid",
              borderRightColor: (theme) => theme.palette.primary.main,
            },
          }}
        >
          <ListItemIcon>{e.icon}</ListItemIcon>
          <ListItemText primary={e.title}/>
        </ListItemButton>
      ))}
    </List>
  );
};

export default SideMenu;

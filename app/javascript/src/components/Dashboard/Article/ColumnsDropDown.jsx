import React from "react";

import { Down } from "neetoicons";
import { Dropdown, Checkbox, Typography } from "neetoui";

import { TABLE_COLUMNS } from "./constants";

const { Menu, MenuItem } = Dropdown;

const ColumnsDropDown = ({ visibleColumns, setVisibleColumns }) => (
  <Dropdown
    buttonStyle="secondary"
    closeOnSelect={false}
    icon={Down}
    label="Columns"
  >
    <Typography className="px-2 pt-2 font-semibold" style="body2">
      Columns
    </Typography>
    <Menu>
      {TABLE_COLUMNS.map((item, idx) => {
        if (!item) return null;

        return (
          <MenuItem.Button
            key={idx}
            prefix={
              <Checkbox
                checked={visibleColumns.includes(item)}
                id="column"
                onChange={() =>
                  setVisibleColumns(visibleColumns => {
                    if (visibleColumns.includes(item)) {
                      return visibleColumns.filter(column => column !== item);
                    }

                    return [...visibleColumns, item];
                  })
                }
              />
            }
          >
            {item}
          </MenuItem.Button>
        );
      })}
    </Menu>
  </Dropdown>
);

export default ColumnsDropDown;

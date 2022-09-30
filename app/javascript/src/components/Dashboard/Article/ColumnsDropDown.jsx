import React from "react";

import { Down } from "neetoicons";
import { Dropdown, Checkbox, Typography } from "neetoui";

const { Menu, MenuItem } = Dropdown;
const listItems = ["Title", "Category", "Date", "Author", "Status"];

const ColumnsDropDown = () => (
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
      {listItems.map((item, idx) => (
        <MenuItem.Button key={idx} prefix={<Checkbox id="checkbox_name" />}>
          {item}
        </MenuItem.Button>
      ))}
    </Menu>
  </Dropdown>
);

export default ColumnsDropDown;

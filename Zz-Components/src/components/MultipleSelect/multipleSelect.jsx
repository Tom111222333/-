import React from "react";
import { Select, Button } from "antd";
function multipleSelect(props) {
  const { value, options, onChange, ButtonClick } = props;
  return (
    <div
      style={{
        display: "flex",
        border: "1px solid rgb(204, 204, 204)",
        borderRadius: "6px",
      }}
    >
      <Select
        mode="multiple"
        allowClear
        value={value}
        options={options?.map((d) => ({
          value: d.value,
          label: d.label,
        }))}
        showSearch
        optionFilterProp="children"
        onChange={onChange}
        bordered={false}
        maxTagCount={2}
      />
      <span style={{ borderLeft: "1px solid rgb(204, 204, 204)" }}>
        <Button
          style={{ border: "none", borderRadius: "0 6px 6px 0" }}
          onClick={ButtonClick}
        >
          全选
        </Button>
      </span>
    </div>
  );
}

export default multipleSelect;

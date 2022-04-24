/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { Button, Table } from '@mantine/core';

function TableComponent({ actions = [], columns = [], rows = [] }) {
  return (
    <Table highlightOnHover striped>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column.value}</th>
          ))}

          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr>
            {columns.map((column, index) => {
              const value = row[column.key];

              return (
                <td key={index}>
                  {typeof column.render === 'function'
                    ? column.render(value)
                    : value}
                </td>
              );
            })}

            <td>
              {actions.map(({
                icon, name, onClick, ...props
              }, index) => (
                <Button
                  leftIcon={icon}
                  key={index}
                  onClick={() => onClick(row)}
                  {...props}
                >
                  {name}
                </Button>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default TableComponent;

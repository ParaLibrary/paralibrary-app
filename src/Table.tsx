import React, { cloneElement } from "react";
import { Table } from "react-bootstrap";

interface TableProps<T> {
  title?: string;
  data: T[];
  children: React.ReactElement | React.ReactElement[];
  hideOnEmpty?: boolean;
}

interface ColDefProps {
  label: string;
  col: string;
}

export const TableHeader: React.FC<ColDefProps> = ({ label }) => {
  return <th>{label}</th>;
};

interface CellProps<T> {
  point: T;
}

const TableCell = <T,>(props: CellProps<T>) => {
  return <td>{props.point}</td>;
};

interface RowProps<T> {
  index: number;
  template: React.ReactElement | React.ReactElement[];
  data: T;
}

const TableRow = <T,>(props: RowProps<T>) => {
  const { index, template, data } = props;
  return (
    <tr>
      {React.Children.map(template, (child: React.ReactElement) => {
        const colChild = child.props as ColDefProps;
        const col = colChild && (colChild.col as keyof T);
        if (col) {
          return <TableCell point={data[col]}></TableCell>;
        }
        return cloneElement(child, child.props);
      })}
    </tr>
  );
};

const AutoTable = <T extends { id: number }>(props: TableProps<T>) => {
  const { title, data, children, hideOnEmpty } = props;
  return data.length > 0 && !!hideOnEmpty ? (
    <>
      {title && <h2>{title}</h2>}
      <Table>
        <thead>
          <tr>{children}</tr>
        </thead>
        <tbody>
          {data.map((row: T, index: number) => (
            <TableRow index={index} data={row} template={children}></TableRow>
          ))}
        </tbody>
      </Table>
    </>
  ) : null;
};

export default AutoTable;

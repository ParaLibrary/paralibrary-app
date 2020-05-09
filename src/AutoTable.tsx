import React, { cloneElement, useMemo, ReactElement, ReactNode } from "react";
import { Table } from "react-bootstrap";
import styled from "styled-components";

interface TableColumnProps {
  col: string;
  component?: any;
}

export const TableColumn: React.FC<TableColumnProps> = ({ children }) => {
  return <th>{children}</th>;
};

const Padding = styled.div`
  padding-bottom: 16px;
`;

interface RowProps<T> {
  template: React.ReactElement | React.ReactElement[];
  data: T;
  rowAs?:
    | React.ExoticComponent<{
        children?: React.ReactNode;
      }>
    | string;
  // Haven't a clue what this is but it satisfies TypeScript
  // so fingers crossed
}

const TableRow = <T,>(props: RowProps<T>) => {
  const { template, data, rowAs } = props;
  const Row = rowAs || "tr";
  return (
    <Row>
      {React.Children.map(template, (child: React.ReactElement) => {
        const childProps = child.props as TableColumnProps;
        const Cell = !!rowAs ? React.Fragment : "td";
        const Wrapper = childProps.component;
        const col = (child.props as TableColumnProps).col as keyof T;
        if (col) {
          if (Wrapper) {
            return (
              <Cell>
                <Wrapper data={data[col]} />
              </Cell>
            );
          }
          return <Cell>{data[col]}</Cell>;
        }
        return <Cell>{cloneElement(child, { data })}</Cell>;
      })}
    </Row>
  );
};

interface TableProps<T> {
  title?: React.ReactNode;
  data: T[];
  children: React.ReactElement | React.ReactElement[];
  hideOnEmpty?: boolean;
  placeholder?: React.ReactNode | React.ReactNode[];
  tableAs?: React.ReactNode;
  rowAs?:
    | React.ExoticComponent<{
        children?: React.ReactNode;
      }>
    | string;
}

const AutoTable = <T extends { id: string }>(props: TableProps<T>) => {
  const {
    title,
    data,
    children,
    hideOnEmpty,
    placeholder,
    tableAs,
    rowAs,
  } = props;
  const filteredHeaders = useMemo(
    () =>
      React.Children.map(children, (child) => {
        if (((child as ReactElement).props as TableColumnProps).col) {
          return child;
        }
        return data.length > 0 ? <th></th> : null;
      }),
    [children, data]
  );

  const Wrapper = !!tableAs ? tableAs : Table;
  const Body = !!tableAs ? React.Fragment : "tbody";

  return data.length === 0 && hideOnEmpty && !placeholder ? null : (
    <>
      {title}
      {data.length === 0 ? (
        <Padding>{placeholder}</Padding>
      ) : (
        <Wrapper bordered size={"sm"}>
          {!tableAs && (
            <thead>
              <tr>{filteredHeaders}</tr>
            </thead>
          )}
          <Body>
            {data.map((row: T) => (
              <TableRow
                key={row.id}
                data={row}
                template={children}
                rowAs={!!tableAs ? rowAs : undefined}
              />
            ))}
          </Body>
        </Wrapper>
      )}
    </>
  );
};

export default AutoTable;

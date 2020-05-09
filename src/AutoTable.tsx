import React, { cloneElement, useMemo, ReactElement, ReactNode } from "react";
import { Table } from "react-bootstrap";
import styled from "styled-components";

interface TableColumnProps {
  col: string;
  wrapper?: any;
}

export const TableColumn: React.FC<TableColumnProps> = ({ children }) => {
  return <th>{children}</th>;
};

const Padding = styled.div`
  padding-bottom: 16px;
`;

interface RowProps<T> {
  id: string;
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
  const { id, template, data, rowAs } = props;
  const Row = rowAs || "tr";
  return (
    <Row>
      {React.Children.map(template, (child: React.ReactElement) => {
        const childProps = child.props as TableColumnProps;
        const Outer = !!rowAs ? React.Fragment : "td";
        const Data = !!childProps.wrapper ? childProps.wrapper : React.Fragment;
        const col = (child.props as TableColumnProps).col as keyof T;
        if (col) {
          return (
            <Outer>
              <Data data={data[col]}>{data[col]}</Data>
            </Outer>
          );
        }
        return <Data>{cloneElement(child, { id })}</Data>;
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
                id={row.id}
                data={row}
                template={children}
                rowAs={!!tableAs ? rowAs : undefined}
              ></TableRow>
            ))}
          </Body>
        </Wrapper>
      )}
    </>
  );
};

export default AutoTable;

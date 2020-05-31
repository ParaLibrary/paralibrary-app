import React from "react";
import Fade from "react-reveal";

const Segementer = styled.div`
  > div {
    margin-bottom: 0.5rem;
  }
`;

interface ListProps<T> {
  items: T[];
  title?: React.ReactElement;
  placeholder?: React.ReactElement;
  component: React.FC<T & Role & any>;
}

export interface Role {
  userRole: "owner" | "requester";
}

interface ExtraProps {
  [field: string]: any;
}

function List<T extends { id: string }>(
  props: ListProps<T> & Role & ExtraProps
): JSX.Element | null {
  const {
    items,
    placeholder,
    userRole,
    title,
    component,
    ...otherProps
  } = props;
  const Container = component;
  if (items.length === 0) {
    return !!title && !!placeholder ? (
      <>
        {title} {placeholder}
      </>
    ) : null;
  } else {
    return (
      <>
        {title}
        <Segementer>
          {items.map((item) => (
            <Fade key={item.id} collapse right>
              <Container {...item} userRole={userRole} {...otherProps} />
            </Fade>
          ))}
        </Segementer>
      </>
    );
  }
}

export default List;

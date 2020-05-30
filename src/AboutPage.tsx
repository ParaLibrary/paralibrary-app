import React from "react";
import styled from "styled-components";
import Image from "react-bootstrap/Image";

import PageLayout from "./PageLayout";

const CreatorLayout = styled.div`
  margin-top: 16px;
  display: flex;
  flex: column nowrap;
  @media screen and (min-width: ${({ theme }) => theme.mediumViewport}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 16px 16px;
  }
`;

const AboutPage: React.FC = () => {
  return (
    <PageLayout loaded header={<h1>About ParaLibrary</h1>}>
      <hr />
      <h3>Vision</h3>
      <p>
        ParaLibrary was developed to allow users to turn their personal
        libraries into public ones. The system allows you to log and organize
        what physical books you own in a digitized version of your personal home
        library. You can then view your friends or neighbors libraries and make
        requests to borrow books from them. You can coordinate lending books to
        your friends, seeing what have been requested and what has been loaned
        out.
      </p>
      <p>
        ParaLibrary took inspiration from programs such as Little Free Library
        that make books available to anyone. However, we wanted to give the user
        more oversite since you may want to share a book you love with someone
        else but still like to know where it is. It's also a great tool if you
        just want to keep track of all the books in your house!
      </p>
      <hr />
      <h3>Creators</h3>
      <CreatorLayout>
        <Creator
          image="https://media-exp1.licdn.com/dms/image/C5603AQEgj13O5X-KLg/profile-displayphoto-shrink_400_400/0?e=1596067200&v=beta&t=79sYd3cVEEzjKF_LFNmRfbeVDAQgYOC3c3qy8UQU49U"
          name="Tait Weicht"
        >
          Likes heavy-tailed random walks on the beach and chaos theory. Two of
          his favorite authors are Neil Stephenson and David Foster Wallace.
        </Creator>
      </CreatorLayout>
    </PageLayout>
  );
};

interface CreatorProps {
  image?: string;
  name: string;
}

const CreatorImage = styled(Image)`
  display: inline;
  float: right;
  max-height: 64px;
  max-width: 64px;
  margin-left: 8px;
`;

const InlineHeader = styled.h5`
  display: inline;
`;

const Creator: React.FC<CreatorProps> = ({ image, name, children }) => {
  return (
    <div>
      {image && <CreatorImage src={image} rounded />}
      <InlineHeader>{name}</InlineHeader> <br />
      {children}
    </div>
  );
};

export default AboutPage;

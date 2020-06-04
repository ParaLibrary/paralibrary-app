import React from "react";
import styled from "styled-components";
import Image from "react-bootstrap/Image";

import PageLayout from "./PageLayout";

const CreatorLayout = styled.div`
  margin-top: 16px;
  display: flex;
  flex-flow: column nowrap;

  @media screen and (min-width: ${({ theme }) => theme.mediumViewport}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
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
        <Creator
          image="https://media-exp1.licdn.com/dms/image/C5603AQF8sQgmRldLBg/profile-displayphoto-shrink_200_200/0?e=1596067200&v=beta&t=AvvUfA18zgUKG3EBA4ZKzKHUNxQy5q57K4o5kR4DGNc"
          name="Trent Hashimoto"
        >
          Loves exploring the Greater Seattle Area's food and scenery.
          Definitely enjoys reading books for fun.
        </Creator>
        <Creator
          image="https://media-exp1.licdn.com/dms/image/C4D03AQFEfy-ffnnnqQ/profile-displayphoto-shrink_100_100/0?e=1596672000&v=beta&t=0mlZBzBIJu2ADaotNcDQ1MOM1QjAckdYAwot_ouRN-s"
          name="Ben Jenkins"
        >
          Enjoys spending time outdoors in the great Pacific Northwest. His
          favorite author is Carl Jung, despite the fact that he can barely
          understand anything Jung writes about.
        </Creator>
        <Creator
          image="https://media-exp1.licdn.com/dms/image/C5603AQGdOqm3anlbNw/profile-displayphoto-shrink_200_200/0?e=1596672000&v=beta&t=9F6Z4qTw-2HwMmcE7gc4b1NJ47nxAxAVMhjezZz6MIA"
          name="Nathan Gatlin"
        >
          Is fond of the city of Seattle and the surrounding cities. Favorite
          author is William Shakespeare because of his use of iambic pentameter
          and how he uses and his implementation of upward inflection.
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
  float: left;
  width: 30%;
  max-height: 100px;
  max-width: 100px;
  min-width: 32px;
  margin-right: 8px;
`;

const InlineHeader = styled.h5`
  display: inline;
`;

const CreatorCard = styled.div`
  border-radius: 3px;
  padding: 10px;
  margin: 10px;
`;

const Creator: React.FC<CreatorProps> = ({ image, name, children }) => {
  return (
    <CreatorCard>
      {image && <CreatorImage src={image} rounded />}
      <InlineHeader>{name}</InlineHeader> <br />
      {children}
    </CreatorCard>
  );
};

export default AboutPage;

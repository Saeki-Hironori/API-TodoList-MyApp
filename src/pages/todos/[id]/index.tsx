import React from "react";

const index = () => {
  return <div></div>;
};

export default index;

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

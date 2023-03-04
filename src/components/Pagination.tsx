import Link from "next/link";
import styled from "@emotion/styled";
import { Button, HStack } from "@chakra-ui/react";

export const Pagination = (props: any) => {
  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  const SButtonPage = styled(Button)`
    width: 40px;
    height: 40px;
    border: 1px solid #000000cc;
    border-radius: 10px;
    font-size: 18px;
    font-weight: bold;
    background-color: #ffffff;
  `;
  const SButtonPagePrev = styled(SButtonPage)`
    background-color: #b5b5b5;
    color: #ffffff;
    border: none;
  `;
  const SButtonPageNext = styled(SButtonPage)`
    color: #b5b5b5;
  `;

  const pages = Math.ceil(props.totalCount / props.PER_PAGE);
  console.log(props.totalCount + "トータル記事数");
  console.log(props.currentPage + "現在のページ");

  return (
    <>
      {pages > 1 && (
        <HStack justifyContent={"center"} marginTop={"16px"}>
          <SButtonPage
            onClick={() => props.setCurrentPage(props.currentPage - 1)}
          >
            ＜
          </SButtonPage>
          {range(1, pages).map((number, index) => {
            return (
              <SButtonPage
                key={index}
                onClick={() => props.setCurrentPage(number)}
              >
                {number}
              </SButtonPage>
            );
          })}
          <SButtonPage
            onClick={() => props.setCurrentPage(props.currentPage - 1)}
          >
            ＞
          </SButtonPage>
        </HStack>
      )}
    </>
  );

  // if (pages > 1) {
  //   if (pages <= 6) {
  //     return (
  //       // <HStack justifyContent={"center"} marginTop={"16px"}>
  //       //   {range(1, pages).map((number, index) => {
  //       //     if (index = props.pageId - 1) {
  //       //       return <SButtonPage key={index}>{number}</SButtonPage>;
  //       //     } else {
  //       //       return (
  //       //         <SButtonPage key={index}>
  //       //           <Link href={`/page/${number}`}>{number}</Link>
  //       //         </SButtonPage>
  //       //       );
  //       //     }
  //       //   })}
  //       // </HStack>
  //       <HStack justifyContent={"center"} marginTop={"16px"}>
  //         {range(1, pages).map((number, index) => {
  //           return (
  //             <SButtonPage
  //               key={index}
  //               onClick={() => props.setCurrentPage({ number })}
  //             >
  //               {number}
  //             </SButtonPage>
  //           );
  //         })}
  //       </HStack>
  //     );
  //   } else {
  //     //   if (props.pageId) {
  //     //     return (
  //     //       <HStack justifyContent={"center"} marginTop={"16px"}>
  //     //         <SButtonPage>
  //     //           <Link href={`/page/${props.pageId}`}>{props.pageId}</Link>
  //     //         </SButtonPage>
  //     //       </HStack>
  //     //     );
  //     //   } else {
  //     //     return (
  //     //       <HStack justifyContent={"center"} marginTop={"16px"}>
  //     //         <SButtonPage>
  //     //           <Link href={`/page/1`}>1</Link>
  //     //         </SButtonPage>
  //     //         <SButtonPage>
  //     //           <Link href={`/page/2`}>2</Link>
  //     //         </SButtonPage>
  //     //         <SButtonPage>
  //     //           <Link href={`/page/3`}>3</Link>
  //     //         </SButtonPage>
  //     //         <SButtonPage>…</SButtonPage>
  //     //       </HStack>
  //     //     );
  //     //   }
  //   }
  // }
};

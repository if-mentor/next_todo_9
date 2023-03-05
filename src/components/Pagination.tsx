import Link from "next/link";
import styled from "@emotion/styled";
import { Button, HStack, Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export const Pagination = (props: any) => {
  const pages = Math.ceil(props.totalCount / props.PER_PAGE);
  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(pages);
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

  useEffect(() => {
    if (props.currentPage - 3 >= 1) {
      if (props.currentPage + 3 <= pages) {
        setStart(props.currentPage - 3);
        setEnd(props.currentPage + 3);
      } else {
        setStart(props.currentPage - 3);
        setEnd(pages);
      }
    } else {
      if (props.currentPage + 3 <= pages) {
        setStart(1);
        setEnd(6);
      } else {
        setStart(1);
        setEnd(6);
      }
    }
  }, [props.currentPage]);

  return (
    <>
      {pages > 1 && (
        <HStack justifyContent={"center"} marginTop={"16px"}>
          {props.currentPage != 1 && (
            <SButtonPage
              onClick={() => props.setCurrentPage(props.currentPage - 1)}
            >
              ＜
            </SButtonPage>
          )}
          {pages < 6 ? (
            <>
              {range(1, pages).map((number, index) => {
                return (
                  <>
                    {props.currentPage == number ? (
                      <SButtonPage
                        key={index}
                        style={{ background: "#aaa", color: "#fff" }}
                      >
                        {number}
                      </SButtonPage>
                    ) : (
                      <SButtonPage
                        key={index}
                        onClick={() => props.setCurrentPage(number)}
                      >
                        {number}
                      </SButtonPage>
                    )}
                  </>
                );
              })}
            </>
          ) : (
            <>
              {start > 1 && <Box>...</Box>}

              {range(start, end).map((number, index) => {
                return (
                  <>
                    {props.currentPage == number ? (
                      <SButtonPage
                        key={index}
                        style={{ background: "#aaa", color: "#fff" }}
                      >
                        {number}
                      </SButtonPage>
                    ) : (
                      <SButtonPage
                        key={index}
                        onClick={() => props.setCurrentPage(number)}
                      >
                        {number}
                      </SButtonPage>
                    )}
                  </>
                );
              })}
              {end < pages && <Box>...</Box>}
            </>
          )}

          {props.currentPage != pages && (
            <SButtonPage
              onClick={() => props.setCurrentPage(props.currentPage + 1)}
            >
              ＞
            </SButtonPage>
          )}
        </HStack>
      )}
    </>
  );
};

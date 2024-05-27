import { Typography } from "@mui/material"
import styled from "styled-components"

export interface FlagWrapperProps {
  alt: string
  onClick: React.MouseEventHandler<HTMLDivElement>
  src: string
}

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  width: 100%;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing(2)};
  cursor: pointer;

  img {
    width: 100%;
    max-width: ${({ theme }) => theme.spacing(3.75)};
    transition: transform 0.2s;
  }
`

const FlagWrapper = ({ alt, onClick, src }: FlagWrapperProps) => {
  return (
    <Wrapper onClick={onClick}>
      <img alt={alt} src={src} />
      <Typography
        sx={{
          textTransform: "uppercase",
          fontWeight: "bold",
          color: "#486581",
        }}
      >
        {alt}
      </Typography>
    </Wrapper>
  )
}

export default FlagWrapper

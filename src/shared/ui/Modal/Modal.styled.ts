import styled from "styled-components"

export const ModalContentWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.palette.background.paper};
  box-shadow: 24;
  padding: ${({ theme }) => theme.spacing(2)};
  border-top: ${({ theme }) => theme.spacing(1)} solid;
  border-color: ${({ theme }) => theme.palette.primary.main};
  border-radius: ${({ theme }) => theme.spacing(1)}
    ${({ theme }) => theme.spacing(1)} 0 0;
`

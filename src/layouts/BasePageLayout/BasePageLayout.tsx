import Logo from "@/assets/images/care-point-full-logo.svg?react"
import LangSwitcher from "@/shared/LangSwitcher/LangSwitcher"
import { Container } from "@mui/material"
import { Outlet } from "react-router-dom"

const BasePageLayout = () => {
  return (
    <Wrapper>
      <LangSwitcher $variant="standalone" />
      <LogoContainerWrapper>
        {<Logo width={250} height={100} />}
      </LogoContainerWrapper>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Outlet />
      </Container>
    </Wrapper>
  )
}

export default BasePageLayout

import styled from "styled-components"

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fffefe;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' x2='0' y1='1' y2='0' gradientTransform='rotate(137,0.5,0.5)'%3E%3Cstop offset='0' stop-color='%2300A38D'/%3E%3Cstop offset='1' stop-color='%239643FF'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='0' x2='0' y1='0' y2='1' gradientTransform='rotate(98,0.5,0.5)'%3E%3Cstop offset='0' stop-color='%2300A38D'/%3E%3Cstop offset='1' stop-color='%23FF390A'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%23FFF' fill-opacity='0' stroke-miterlimit='10'%3E%3Cg stroke='url(%23a)' stroke-width='8.91'%3E%3Cpath transform='translate(-47.95 2) rotate(-1.1500000000000004 1409 581) scale(0.9719919999999999)' d='M1409 581 1450.35 511 1490 581z'/%3E%3Ccircle stroke-width='2.9700000000000006' transform='translate(-61 37) rotate(3.0999999999999996 800 450) scale(1.0029119999999998)' cx='500' cy='100' r='40'/%3E%3Cpath transform='translate(7.699999999999999 -39) rotate(23 401 736) scale(1.0029119999999998)' d='M400.86 735.5h-83.73c0-23.12 18.74-41.87 41.87-41.87S400.86 712.38 400.86 735.5z'/%3E%3C/g%3E%3Cg stroke='url(%23b)' stroke-width='2.7'%3E%3Cpath transform='translate(222 1.1999999999999993) rotate(-0.2999999999999998 150 345) scale(0.994664)' d='M149.8 345.2 118.4 389.8 149.8 434.4 181.2 389.8z'/%3E%3Crect stroke-width='5.940000000000001' transform='translate(-60 -100.5) rotate(17.999999999999993 1089 759)' x='1039' y='709' width='100' height='100'/%3E%3Cpath transform='translate(-132.4 35.6) rotate(3 1400 132) scale(0.92)' d='M1426.8 132.4 1405.7 168.8 1363.7 168.8 1342.7 132.4 1363.7 96 1405.7 96z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
  width: 100%;
  min-height: 100vh;
`
export const LogoContainerWrapper = styled.div`
  display: grid;
  place-items: center;
  max-width: 20rem;
  margin: 2rem auto 6rem;
  padding: 0 2rem;
`

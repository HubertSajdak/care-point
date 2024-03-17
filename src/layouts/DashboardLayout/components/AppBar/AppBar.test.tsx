// import MockTheme from "@/mocks/MockTheme"
// import { render, screen, waitFor } from "@testing-library/react"
// import userEvent from "@testing-library/user-event"
// import AppBar from "./AppBar"
//
// describe("appbar tests", () => {
//   it("should display appbar component in the document", () => {
//     render(
//       <div>
//         <MockTheme>
//           <AppBar
//             isOpen={false}
//             handleDrawerToggle={() => {}}
//             drawerWidth={240}
//             userName={"Nicola"}
//             userAvatar={""}
//             isUserDataLoading={false}
//           />
//         </MockTheme>
//       </div>,
//     )
//     const appBar = screen.getByTestId("banner")
//     expect(appBar).toBeInTheDocument()
//   })
//   it("username is displayed within appbar", () => {
//     render(
//       <div>
//         <MockTheme>
//           <AppBar
//             isOpen={false}
//             handleDrawerToggle={() => {}}
//             drawerWidth={240}
//             userName={"Nicola"}
//             userAvatar={""}
//             isUserDataLoading={false}
//           />
//         </MockTheme>
//       </div>,
//     )
//     const userName = screen.getByText("Nicola")
//     expect(userName).toBeInTheDocument()
//   })
//   it("should open the menu when user clicks", async () => {
//     const user = userEvent.setup()
//     render(
//       <div>
//         <MockTheme>
//           <AppBar
//             isOpen={false}
//             handleDrawerToggle={() => {}}
//             drawerWidth={240}
//             userName={"Nicola"}
//             userAvatar={""}
//             isUserDataLoading={false}
//           />
//         </MockTheme>
//       </div>,
//     )
//     const userMenu = screen.getByTestId("user-menu")
//     expect(userMenu).toBeInTheDocument()
//     const menuAppbar = screen.getByTestId("menu-appbar")
//     expect(menuAppbar).toHaveStyle("visibility: hidden")
//     await user.click(userMenu)
//     waitFor(() => {
//       expect(userMenu).toHaveBeenCalledTimes(1)
//       expect(menuAppbar).not.toHaveStyle("visibility: hidden")
//     })
//   })
// })

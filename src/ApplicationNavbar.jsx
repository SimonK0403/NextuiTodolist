import { Navbar, NavbarContent, NavbarItem, NavbarBrand, Switch } from "@nextui-org/react"

function ApplicationNavbar() {

  return (
    <Navbar isBordered>
      <NavbarContent justify='end'>
        <NavbarBrand>
          <p className='font-bold text-3xl'>Todoliste</p>
        </NavbarBrand>
        <NavbarItem>
          <Switch >
            Dark Mode
          </Switch>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default ApplicationNavbar
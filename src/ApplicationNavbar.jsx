import { Navbar, NavbarContent, NavbarItem, NavbarBrand, Switch } from "@nextui-org/react"
import { useDarkMode } from "./components/DarkModeProvider"

function ApplicationNavbar() {
  const [isDarkMode, setIsDarkMode] = useDarkMode()

  return (
    <Navbar isBordered>
      <NavbarContent justify='end'>
        <NavbarBrand>
          <p className='font-bold text-3xl'>Todoliste</p>
        </NavbarBrand>
        <NavbarItem>
          <Switch 
            isSelected={isDarkMode}
            onValueChange={(value) => setIsDarkMode(value)}
          >
            Dark Mode
          </Switch>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default ApplicationNavbar
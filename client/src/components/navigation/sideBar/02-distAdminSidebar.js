import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { resetLoginDetails } from '../../../redux/reducers/userSlice'
import {
  IconButton,
  Image,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack, 
  Button, 
  useColorMode
} from '@chakra-ui/react'
import {
    MoonIcon,
    SunIcon
  } from '@chakra-ui/icons'
import {
  FiHome,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiChevronUp,
} from 'react-icons/fi'
import {PiUsersFourBold} from 'react-icons/pi'
import { IconType } from 'react-icons'

interface LinkItemProps {
  name: string,
  icon: IconType
}

interface NavItemProps extends FlexProps {
  icon: IconType,
  children: React.ReactNode
}

interface MobileProps extends FlexProps {
  onOpen: () => void
}

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const LinkItems: Array<LinkItemProps> = [
  // { name: 'Home', icon: FiHome, href: "/" },
  { name: 'Students', icon: PiUsersFourBold, href: "/student-management"},

]

const SidebarContent = ({ onClose, onOpen, ...rest }: SidebarProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { district } = useSelector(state => state.user)
  const{fullName} = useSelector((state) => state.user)


  //PROFILE SECTION
  const handleSignOut = () => {
  dispatch(resetLoginDetails())
  navigate("/dist-admin-login")
    }
  const handelEditProfileButtonClick = () => {
    navigate("/profile")
  }
  return (
    <Box
      transition="0.5s ease"
      bg='white'
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
      <Image 
        src={require('../../../uploads/assets/nndswo-logo.jpeg')}
         ></Image>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem my={2} bg="gray.50" color="blue.600" key={link.name} icon={link.icon} onClick={()=> navigate(link.href)} >
          {link.name}
        </NavItem>
      ))}

      {/* <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        Logo
      </Text> */}

      <HStack pos="relative" p={2}
          top="60%" spacing={{ base: '0', md: '6' }}>

        {/* <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} /> */}
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <HStack>
                {/* <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                /> */}
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="md" fontWeight="bold">{fullName}</Text>
                  <Text fontSize="sm" fontWeight="bold" color="blue.500">
                    {district} District Admin
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronUp  />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>

              <MenuItem _hover={{bg: 'blue.500', color: 'gray.50'}} onClick={() => handleSignOut()}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
      
    </Box>
  )
}

const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Box
      as="a"
      // href="/"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'blue.500',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  )
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { district } = useSelector(state => state.user)
  const{fullName} = useSelector((state) => state.user)


    //PROFILE SECTION
    const handleSignOut = () => {
    dispatch(resetLoginDetails())
    navigate("/dist-admin-login")
  }
  const handelEditProfileButtonClick = () => {
    navigate("/profile")
  }

  return (
    <>      <IconButton
    display={{ base: 'flex', md: 'none' }}
    onClick={onOpen}
    variant="outline"
    aria-label="open menu"
    icon={<FiMenu />}
  /></>
  )
}

const DistAdminSidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()


  return (
    <Box  >
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} onOpen={onOpen} />
        </DrawerContent>
      </Drawer>
      <MobileNav  onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {/* Content */}
      </Box>
    </Box>
  )
}

export default DistAdminSidebar
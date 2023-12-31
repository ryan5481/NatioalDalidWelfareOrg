import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import axios from "axios"
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
} from 'react-icons/fi'
import { PiUsersFourFill } from 'react-icons/pi'
import {FaUserTie } from 'react-icons/fa'
import {FaUserGroup, FaGear, FaUserGraduate } from 'react-icons/fa6'
import {GoHomeFill } from 'react-icons/go'
import {ImUsers} from 'react-icons/im'
import { IconType } from 'react-icons'
const baseUrl = process.env.REACT_APP_BASE_URL


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
  { name: 'Dashboard', icon: GoHomeFill, href: "/" },
  { name: 'Board members', icon: FaUserTie, href: "/board-members" },
  { name: 'District Admins', icon: FaUserGroup, href: "/user-management" },
  { name: 'NCSEP', icon: PiUsersFourFill, href: "/ncsep-students" },
  { name: 'PRLMSP & ETHS', icon: PiUsersFourFill, href: "/prlmsp-eth-students" },
  // { name: 'Alumuni', icon: FaUserGraduate, href: "/alumuni" },
  { name: 'Settings', icon: FaGear, href: "/settings" },
]

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const navigate = useNavigate()
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">

        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} onClick={() => navigate(link.href)} >
          {link.name}
        </NavItem>
      ))}
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
          bg: 'cyan.900',
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
  const { fullName } = useSelector((state) => state.user)
  const [logoImageData, setLogoImageData] = useState({})

  const fetchLogoImage = async () => {
    const res = await axios.get(`${baseUrl}/get-logo-image`)
    if (res) {
        const data = res.data.data;
        setLogoImageData(data);
    }
  }

  useEffect(() => {
    fetchLogoImage()
  }, [])

console.log("LOGO" + logoImageData)

  //PROFILE SECTION
  const handleSignOut = () => {
    dispatch(resetLoginDetails())
    navigate("/super-admin-login")
  }
  const handelEditProfileButtonClick = () => {
    navigate("/profile")
  }


  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'space-between' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      {logoImageData && logoImageData.logoImageName && 
      <Image
        pos={"relative"}
        left={"25%"}
        maxH="60px"
        src={require(`../../../uploads/logoImage/${logoImageData.logoImageName}`)}
      ></Image>}

      <HStack spacing={{ base: '0', md: '6' }}>
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
        >
          {/* <Button onClick={toggleColorMode} m={2} >
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button> */}

        </Stack>
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
                  <Text fontSize="sm" fontWeight="bold">{fullName}</Text>
                  <Text fontSize="xs" color="gray.600">
                    Super Admin
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuItem onClick={() => { handelEditProfileButtonClick() }} >Edit pofile</MenuItem>

              <MenuDivider />
              <MenuItem onClick={() => handleSignOut()}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  )
}

const SuperAdminSidebar = () => {
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
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {/* Content */}
      </Box>
    </Box>
  )
}

export default SuperAdminSidebar
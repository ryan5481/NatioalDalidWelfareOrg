import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  useColorMode,
  Image,
  Center
} from '@chakra-ui/react'
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon
} from '@chakra-ui/icons'
const baseUrl = process.env.REACT_APP_BASE_URL 
interface Props {
  children: React.ReactNode
}

export default function NavBar() {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const navigate = useNavigate()

  //GET
  const [menuItems, setMenuItems] = useState([]);
  const [logoImageData, setLogoImageData] = useState({});


  const fetchLogoImage = async () => {
    try {
      const res = await axios.get(`${baseUrl}/get-logo-image`)
      const data = res.data.data
      setLogoImageData(data)   
    } catch (error) {
      console.error("Error: ", error)
    }
  }
  // console.log(logoImageData.logoImage)

  const fecthNavBarItems = async () => {
    try {
      const res = await axios.get(`${baseUrl}/get-navbar-menu`)
      const data = res.data.data
      setMenuItems(data)

    } catch (error) {
      console.error("Error: ", error)
    }
  }
  // console.log("MENU: " + JSON.stringify(menuItems))

  useEffect(() => {
    fetchLogoImage()
    fecthNavBarItems()
  }, [])


  return (
    <>
      <Flex
        pos='fixed'
        // top='45px'
        w='100%'
        zIndex='10'
        bg={useColorModeValue('white', 'brown.800')}
        color={useColorModeValue('gray.600', 'white')}
        h={'70px'}
        py={{ base: 0 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderBottomColor={'blue.200'}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        {logoImageData && logoImageData.logoImage &&
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Image
            src={ require("../../uploads/logoImages/" + logoImageData.logoImage)}
            alt="Logo"
            h='60px'
            p={2}
            _hover={{
              textDecoration: 'none',
              cursor: "pointer"
            }}
            // textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            onClick={() => navigate("/")}
          />
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <Center>
              <DesktopNav menuItems={menuItems} />
            </Center>
          </Flex>
        </Flex>
}
        {/* toggle dark/light modes */}
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
        >
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav menuItems={menuItems} />
      </Collapse>
    </>
  )
}


const DesktopNav = (props) => {
  const textColorMode = useColorModeValue('blue.500', 'gray.300')
  const linkHoverColor = useColorModeValue('gray.200', 'white')
  const popoverContentBgColor = useColorModeValue('white', 'gray.800')
  const navigate = useNavigate();
  const menuHrefs = [
    { href: "jobs" },
    { href: "resume" },
    {
      href: "license",
      children: [
        { href: "license" },
        { href: "newspaper" },

      ]
    },
    {
      href: "about-us",
      children: [
        { href: "about-nepal" },
        { href: "choose-us" },
      ]
    },
    { href: "gallery" },
    { href: "contact-us" }
  ]

  return (
    <Stack direction={'row'} spacing={4} fontWeight="bold"
      color={useColorModeValue('blue.500', 'gray.300')}
    >
      <Box
        p={2}
        fontSize={'md'}
        fontWeight={500}
        _hover={{
          textDecoration: 'none',
          color: linkHoverColor,
          bg: 'blue.400',
          rounded: '10px',
          shadow: 'md',
          cursor: "pointer"
        }}
        onClick={() => navigate("/")}
      >
        Home
      </Box>
      {props.menuItems.map((navItem, index) => (
        <Center>
          <Box key={navItem.label} fontWeight="bold">
            <Popover trigger={'hover'} placement={'bottom-start'}>
              <PopoverTrigger>
                <Box
                  as="a"
                  p={2}
                  href={navItem[index]?.href ?? '/home'}
                  fontSize={'md'}
                  fontWeight={500}
                  _hover={{
                    textDecoration: 'none',
                    color: linkHoverColor,
                    bg: 'blue.400',
                    rounded: '10px',
                    shadow: 'md'
                  }}
                // onClick={() => navigate(navItem.urlPath || "/")}
                >
                  {navItem.label}
                </Box>
              </PopoverTrigger>

              {navItem.children.length !== 0 && (
                <PopoverContent
                  border={0}
                  boxShadow={'xl'}
                  bg={popoverContentBgColor}
                  p={4}
                  color={textColorMode}
                  rounded={'10px'}
                  minW={'sm'}>
                  <Stack>
                    {navItem.children.map((child, childIndex) => (
                      <DesktopSubNav
                        key={child.label} {...child}
                        href={navItem[index]?.children[childIndex]?.href}
                        _hover={{
                          textDecoration: 'none',
                          color: linkHoverColor,
                          bg: 'blue.400',
                          rounded: '10px',
                          shadow: 'md'
                        }}
                      // onClick={() => navigate("/" + menuHrefs[index]?.children?.href)}
                      />
                    ))}
                  </Stack>
                </PopoverContent>
              )}
            </Popover>


          </Box>
        </Center>
      ))}
    </Stack>
  )
}

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  const linkHoverColor = useColorModeValue('gray.200', 'white')

  return (
    <Box
      as="a"
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      color={'blue.500'}
      _hover={{
        color: linkHoverColor,
        bg: useColorModeValue('blue.400', 'blue.400'), rounded: '10px'
      }}
    >
      <Stack direction={'row'} align={'center'}>
        <Box
        >
          <Text
            transition={'all 0.3s ease'}
            _groupHover={{ color: 'white.400' }}
            fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={'sm'} color={'white.400'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}>
          <Icon color={'white.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  )
}

const MobileNav = (props) => {
  const navigate = useNavigate()
  return (
    <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }} fontWeight="bold">
      <Box
        as="a"
        p={2}
        fontSize={'md'}
        fontWeight={500}
        _hover={{
          textDecoration: 'none',
          cursor: "pointer"
        }}
        onClick={() => navigate("/")}
      >
        Home
      </Box>
      {props.menuItems.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} onClick={navItem.slug} />
      ))}
    </Stack>
  )
}

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure()
  const linkHoverColor = useColorModeValue('gray.200', 'white')
  const navigate = useNavigate()


  return (
    <Stack spacing={4} onClick={children && onToggle}>

      <Box
        py={2}
        as="a"
        href={href ?? '#'}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          {children &&
            children.map((child) => (
              <Box as="a" key={child.label} py={2}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  )
}

interface NavItem {
  label: string,
  subLabel?: string,
  children?: Array<NavItem>
}

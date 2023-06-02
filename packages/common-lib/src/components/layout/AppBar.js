import React, { useState } from 'react'
import { useRef } from 'react'

import {
  HStack,
  Box,
  StatusBar,
  Pressable,
  Input,
  Menu,
  Stack,
  InputLeftAddon,
  InputGroup,
  InputRightAddon
} from 'native-base'
import { QrReader } from 'react-qr-reader'
import { useNavigate } from 'react-router-dom'
import IconByName from '../IconByName'
import { eventBus } from '../../services/EventBus'

export default function AppBar({
  isEnableHamburgerMenuButton,
  isEnableLanguageMenu,
  isEnableSearchBtn,
  setSearch,
  setSearchState,
  color,
  languages,
  onPressBackButton,
  rightIcon,
  LeftIcon,
  CenterIcon,
  centerPlate,
  isShowNotificationButton,
  isHideMenuButton,
  titleComponent,
  isBackButtonShow,
  isQRcodebutton,
  isLanguageIcon,
  ...props
}) {
  const [searchInput, setSearchInput] = useState(false)
  const [startScan, setStartScan] = useState(false)
  const [data, setData] = useState('No result')
  const [FrontmediaStream, setFrontmediaStream] = useState(null)
  const frontVideoRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  const closeModal = () => {
    setIsOpen(false)
    location.reload()
  }

  const cameraCapture = async () => {
    setIsOpen(true)

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { facingMode: 'environment' }
    })
    setFrontmediaStream(stream)
    frontVideoRef.current.srcObject = stream
    frontVideoRef.current.play()
    frontVideoRef.current.muted = true
  }

  const navigate = useNavigate()
  const setLang = (e) => {
    if (e === 'logout') {
      localStorage.setItem('token', '')
      localStorage.clear()
      eventBus.publish('AUTH', {
        eventType: 'LOGOUT',
        data: {}
      })
    } else {
      localStorage.setItem('lang', e)
      window.location.reload()
    }
  }

  const handleSeachState = (boolean) => {
    if (setSearchState) setSearchState(boolean)
    setSearchInput(boolean)
  }

  return (
    <Box pt={7} px={3} {...props?._box}>
      <StatusBar bg='gray.600' barStyle='light-content' />
      <Box safeAreaTop bg='gray.600' />

      {searchInput ? (
        <Stack alignItems='center'>
          <InputGroup width='100%'>
            <InputLeftAddon
              p='0'
              bg='transparent'
              borderWidth='0'
              children={
                <IconByName
                  size='sm'
                  name='ArrowLeftLineIcon'
                  color={color ? color : ''}
                  onPress={() => {
                    if (onPressBackButton) {
                      onPressBackButton()
                    } else {
                      navigate(-1)
                    }
                  }}
                />
              }
            />
            <Input
              variant='unstyled'
              bg='transparent'
              size={'full'}
              placeholder='search'
              onChange={(e) => setSearch(e.target.value)}
            />
            <InputRightAddon
              p='0'
              bg='transparent'
              borderWidth='0'
              children={
                <IconByName
                  color='coolGray.500'
                  name='CloseCircleLineIcon'
                  p='0'
                  onPress={() => handleSeachState(false)}
                />
              }
            />
          </InputGroup>
        </Stack>
      ) : CenterIcon ? (
        <React.Fragment>
          <HStack
            bg='transparent'
            justifyContent='center'
            alignItems='center'
            minH='32px'
          >
            <HStack space='4' alignItems='center'>
              {isEnableHamburgerMenuButton ? (
                <IconByName size='sm' name='bars' color={color ? color : ''} />
              ) : isBackButtonShow ? (
                <IconByName
                  size='sm'
                  name='ArrowLeftLineIcon'
                  color={color ? color : ''}
                  onPress={() => {
                    if (onPressBackButton) {
                      onPressBackButton()
                    } else {
                      navigate(-1)
                    }
                  }}
                />
              ) : (
                <React.Fragment />
              )}
              {LeftIcon ? LeftIcon : <React.Fragment />}
            </HStack>
            {titleComponent ? titleComponent : <React.Fragment />}
            <HStack alignItems={'center'}>
              {!searchInput && isEnableSearchBtn ? (
                <IconByName
                  color={color ? color : ''}
                  size='sm'
                  name='SearchLineIcon'
                  onPress={() => handleSeachState(true)}
                />
              ) : (
                <React.Fragment />
              )}
              {rightIcon ? rightIcon : <React.Fragment />}

              {isShowNotificationButton ? (
                <IconByName
                  name='Notification2LineIcon'
                  color={color ? color : ''}
                  onPress={() => navigate('/notification')}
                />
              ) : (
                <React.Fragment />
              )}
            </HStack>
          </HStack>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <HStack
            bg='transparent'
            justifyContent='space-between'
            alignItems='center'
            minH='32px'
            space={'2'}
          >
            <HStack space='4' alignItems='center'>
              {isEnableHamburgerMenuButton ? (
                <IconByName size='sm' name='bars' color={color ? color : ''} />
              ) : isBackButtonShow ? (
                <IconByName
                  size='sm'
                  name='ArrowLeftLineIcon'
                  color={color ? color : ''}
                  onPress={() => {
                    if (onPressBackButton) {
                      onPressBackButton()
                    } else {
                      navigate(-1)
                    }
                  }}
                />
              ) : (
                <React.Fragment />
              )}
              {LeftIcon ? LeftIcon : <React.Fragment />}
            </HStack>
            {titleComponent ? titleComponent : <React.Fragment />}
            <HStack alignItems={'center'}>
              {!searchInput && isEnableSearchBtn ? (
                <IconByName
                  color={color ? color : ''}
                  size='sm'
                  name='SearchLineIcon'
                  onPress={() => handleSeachState(true)}
                />
              ) : (
                <React.Fragment />
              )}
              {rightIcon ? rightIcon : <React.Fragment />}
              {isShowNotificationButton ? (
                <IconByName
                  name='Notification2LineIcon'
                  color={color ? color : ''}
                  onPress={() => navigate('/notification')}
                />
              ) : (
                <React.Fragment />
              )}

              {isLanguageIcon ? (
                <Stack px='3' {...props?._languageMenu}>
                  <Menu
                    right='8%'
                    w='170'
                    placement='bottom right'
                    trigger={(triggerProps) => {
                      return (
                        <Pressable
                          accessibilityLabel='More options menu'
                          {...triggerProps}
                        >
                          <IconByName
                            size='sm'
                            name='TranslateIcon'
                            isDisabled={true}
                            color={color ? color : ''}
                          />
                        </Pressable>
                      )
                    }}
                  >
                    {languages?.map((e, index) => (
                      <Menu.Item
                        key={index}
                        label={e.title}
                        textValue={e.code}
                        onPress={(item) => setLang(e.code)}
                      >
                        {e.title}
                      </Menu.Item>
                    ))}
                  </Menu>
                </Stack>
              ) : (
                <React.Fragment />
              )}

              {isQRcodebutton ? (
                <Stack px='3'>
                  <Pressable
                    onPress={() => [
                      setStartScan(!startScan),
                      cameraCapture(),
                      navigate('/qrscanner')
                    ]}
                  >
                    <IconByName
                      size='sm'
                      name='QrCodeLineIcon'
                      isDisabled={true}
                      color={color ? color : ''}
                    />
                  </Pressable>
                </Stack>
              ) : (
                <React.Fragment />
              )}
              {startScan && (
                <Stack>
                  <QrReader
                    constraints={{ facingMode: 'environment' }}
                    // videoContainerStyle={(width = '200px')}
                    // videoStyle={'150px'}
                    scanDelay={3000}
                    onResult={(result, error) => {
                      if (!!result) {
                        location.reload()
                        window.open(result, '_blank')
                        console.log(result)
                        setData(result?.text)
                      }

                      if (!!error) {
                        console.info(error)
                      }
                    }}
                  />
                </Stack>
              )}
              {!isHideMenuButton ? (
                <Stack px='3' {...props?._menuButton}>
                  <Pressable onPress={(item) => setLang('logout')}>
                    <IconByName
                      size='sm'
                      name='LogoutCircleLineIcon'
                      isDisabled={true}
                      color={color ? color : ''}
                    />
                  </Pressable>
                </Stack>
              ) : (
                <React.Fragment />
              )}
            </HStack>
          </HStack>
          {isOpen && (
            <div style={{ position: 'relative  ', zIndex: 9999 }}>
              <div className='modal-content'>
                <span
                  style={{ cursor: 'pointer' }}
                  className='close'
                  onClick={closeModal}
                >
                  &times;
                </span>
                <h2>QR Scanner</h2>
                <p>Scanning</p>
                <video ref={frontVideoRef} style={{ width: 150 }} />
              </div>
            </div>
          )}
        </React.Fragment>
      )}
    </Box>
  )
}

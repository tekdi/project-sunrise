import React, { useEffect, useState } from 'react'
import { eventBus } from '../services/EventBus'
import AppRoutesContainer from './AppRoutesContainer'
import { getAppshellData } from './helper'
import NotFound from './NotFound'
import { hotjar } from 'react-hotjar'

function AppShell({
  colors,
  themeName,
  routes,
  AuthComponent,
  basename,
  isShowFooterLink,
  appName,
  _authComponent,
  skipLogin = false,
  guestRoutes,
  ...otherProps
}: any) {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [theme, setTheme] = React.useState<any>({})
  const [accessRoutes, setAccessRoutes] = React.useState<any>([])
  const [footerLinks, setFooterLinks] = React.useState<any>([])
  const [alert, setAlert] = React.useState<any>()
  const [allConfig, setAllConfig] = React.useState<any>()
  const hjid = 3178164
  const hjsv = 6
  hotjar.initialize(hjid, hjsv)
  if (hotjar.initialized()) {
    hotjar.identify('USER_ID', { userProperty: 'value' })
  }
  if (localStorage.getItem('console')) {
    console.log({ accessRoutes })
  }
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const searchParams = Object.fromEntries(urlSearchParams.entries())
    if (searchParams.token != undefined) {
      localStorage.setItem('token', searchParams.token)
      setToken(searchParams.token)
      skipLogin = true
    }
  }, [])

  useEffect(() => {
    const getData = async () => {
      const { newTheme, newRoutes, newFooterLinks, config } =
        await getAppshellData(routes, '', themeName)
      if (isShowFooterLink) {
        setFooterLinks({
          menues: otherProps?.footerLinks
            ? otherProps?.footerLinks
            : newFooterLinks
        })
      }
      if (!token) {
        setAccessRoutes([
          ...(guestRoutes ? guestRoutes : []),
          {
            path: '*',
            component: AuthComponent
          }
        ])
      } else {
        setAccessRoutes([
          ...routes,
          {
            path: '*',
            component: NotFound
          }
        ])
      }
      setTheme(newTheme)
      setAllConfig(config)
    }

    getData()
    const subscription = eventBus.subscribe('AUTH', (data, envelop) => {
      if (data.eventType == 'LOGIN_SUCCESS') {
        setToken(localStorage.getItem('token'))
      } else if (data.eventType == 'LOGOUT') {
        if (skipLogin) {
          setTimeout(() => {
            window.location.href = '/oauth2/sign_out?rd=/'
          }, 1)
        } else {
          setTimeout(() => {
            window.location.href = '/'
          }, 1)
        }
      }
    })
    return () => {
      eventBus.unsubscribe(subscription)
    }
  }, [token, routes, otherProps?.footerLinks])

  if (!Object.keys(theme).length) {
    return <React.Fragment />
  }

  return (
    <AppRoutesContainer
      {...{
        theme,
        routes: accessRoutes,
        basename,
        footerLinks,
        appName: 'Teacher App',
        alert,
        setAlert,
        config: allConfig
      }}
    />
  )
}
export default AppShell

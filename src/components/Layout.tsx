import React from 'react'
import styled, { ThemeProvider } from 'styled-components'

import Navigation from '@components/Navigation'
import Footer from '@components/Footer'

import { rhythm, scale } from '@utils/typography'
import { colors } from '@constants/index'

interface ILayout {
  location: ILocation
  children: any
}

const theme = {
  rhythm,
  scale,
  colors,
}

const AppContainer = styled.div`
	display: flex;
	flex-direction: column;
  min-height: 100vh;
  background: ${props => props.theme.colors.mainBackground};

  h2 {
    margin-top: ${props => props.theme.rhythm(0.25)};
  }
`

const HeaderContainer = styled.div`
`

const MainContainer = styled.div`
  flex: 1;
  padding: 0;
  margin-top: ${props => props.theme.rhythm(1.25)};

  main {
    margin-left: auto;
    margin-right: auto;
    max-width: ${props => props.theme.rhythm(40)};
    padding: 0 ${props => props.theme.rhythm(0.5)};
  }
`

const FooterContainer = styled.div`
  margin-top: ${props => props.theme.rhythm(1)};
`

class Layout extends React.Component<ILayout, {}> {
  render() {
    const { children } = this.props

    return (
      <ThemeProvider theme={theme}>
        <AppContainer>
          <HeaderContainer>
            <Navigation />
          </HeaderContainer>
          <MainContainer>
            <main>{children}</main>
          </MainContainer>
          <FooterContainer>
            <Footer />
          </FooterContainer>
        </AppContainer>
      </ThemeProvider>
    )
  }
}

export default Layout

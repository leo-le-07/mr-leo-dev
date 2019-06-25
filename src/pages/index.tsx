import React from 'react'
import styled from 'styled-components'

import Layout from '@components/Layout'

interface IProps {
  location: ILocation
}

const StyledContainer = styled.div`
`

class HomePage extends React.Component<IProps, {}> {
  render() {
    return (
      <Layout location={this.props.location}>
        <StyledContainer>
          Home Page
        </StyledContainer>
      </Layout>
    )
  }
}

export default HomePage

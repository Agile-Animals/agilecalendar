import * as React from 'react'
import { Layout, Text } from '@ui-kitten/components'

const HomeScreen = () => {
  return (
    <Layout style={{flex: 1}}>
      <Text style={styles.heading} category="h2">
        Översikt
      </Text>
    </Layout>
  )
}

const styles = {
  heading: {
    marginLeft: 24,
    marginTop: 24
  }
}

export default HomeScreen
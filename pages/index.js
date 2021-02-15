/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from 'theme-ui'
import Layout from '../components/Layout'
import Input from '../containers/Input'

export default function Home() {
  return (
    <Layout>
      <div sx={{bg: 'background'}}>
        <Input />
      </div>
    </Layout>
  )
}

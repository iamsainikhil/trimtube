import Button from './Button'
import PropTypes from 'prop-types'

const Tab = ({label, activeTab, action}) => {
  return (
    <h2>
      <Button
        primary={{
          bg: label === activeTab ? 'shade1' : 'background',
          color: 'text',
        }}
        action={action}>
        {label}
      </Button>
    </h2>
  )
}

Tab.propTypes = {
  label: PropTypes.string,
  activeTab: PropTypes.string,
  action: PropTypes.func,
}

export default Tab

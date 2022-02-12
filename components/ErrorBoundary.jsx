import {Component} from 'react'
import Error from './Error'

export class ErrorBoundary extends Component {
  state = {
    hasError: false,
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {hasError: true}
  }

  componentDidCatch(error) {
    console.error(error)
  }

  render() {
    return (
      <div>
        {this.state.hasError ? (
          <Error message='Something went wrong. Reload the page!' />
        ) : (
          this.props.children
        )}
      </div>
    )
  }
}

export default ErrorBoundary

import React from 'react'
import { connect } from 'react-redux'
import autobind from 'autobind-decorator'

import { RepoState } from '../reducers/repos.reducers'
import { Input } from '../components/main-view/input/Input'
import { ItemList } from '../components/main-view/itemlist/ItemList'
import { Info } from '../components/main-view/info/Info'
import { actions } from '../actions/actions'
import { Dispatch } from 'redux'

interface MainContainerProps {
  repos: RepoState

  decrementIndex: () => void
  incrementIndex: () => void
  updateValue: (value: string) => void
  toggleView: () => void
  fetchRequest: () => void
}

class MainContainer extends React.Component<MainContainerProps> {
  state = {
    inputValue: '',
  }

  componentDidMount() {
    this.props.fetchRequest()
  }

  @autobind
  handlePressUpKey() {
    this.props.decrementIndex()
  }

  @autobind
  handlePressDownKey() {
    this.props.incrementIndex()
  }

  @autobind
  handleInputChange(value: string) {
    this.props.updateValue(value)
    this.setState({
      inputValue: value,
    })
  }

  @autobind
  onClickItem(url: string) {
    this.openTarget(url)
  }

  render(): JSX.Element {
    const { inputValue } = this.state
    const { repos, toggleView } = this.props

    return (
      <React.Fragment>
        <Input
          repos={repos}
          onPressUpKey={this.handlePressUpKey}
          onPressDownKey={this.handlePressDownKey}
          onChange={this.handleInputChange}
          openTarget={this.openTarget}
        />
        <ItemList
          inputValue={inputValue}
          repos={repos}
          onClickItem={this.onClickItem}
        />
        <Info authStatus={repos.fetchResponseType} onToggleView={toggleView} />
      </React.Fragment>
    )
  }

  private openTarget(url: string) {
    chrome.tabs.create({ url })
    setTimeout(() => window.close, 300)
  }
}

const mapStateToProps = (state: MainContainerProps) => ({
  repos: state.repos,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  decrementIndex: () => dispatch(actions.decrementIndex()),
  incrementIndex: () => dispatch(actions.incrementIndex()),
  updateValue: (value: string) => dispatch(actions.updateValue(value)),
  toggleView: () => dispatch(actions.toggleView()),
  fetchRequest: () => dispatch(actions.fetchRequest()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainContainer)

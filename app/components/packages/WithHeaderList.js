/**
HOC for List and ListHeader
**/

import { ipcRenderer } from 'electron'
import { autoBind } from '../../utils'
import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import Header from './ListHeader'
import List from './List'

function withHeaderList(List, options = {}) {
  return class WithHeaderList extends React.Component {
    constructor(props) {
      super(props)
      autoBind(['sortBy'], this)
    }
    componentDidMount() {
      const { mode, directory, toggleLoader } = this.props

      toggleLoader(true)
      ipcRenderer.send('ipc-event', {
        ipcEvent: 'get-packages',
        cmd: ['outdated', 'list'],
        mode,
        directory
      })
    }
    sortBy(prop, dir) {
      const { packages, setPackages } = this.props

      const comparator = R.comparator((a, b) =>
        R.gt(R.propOr(R.F, prop, b), R.propOr(R.F, prop, a))
      )

      const sortedByLatest = R.sort(comparator, packages)
      setPackages(sortedByLatest)
    }
    render() {
      const {
        loading,
        packages,
        mode,
        directory,
        total,
        toggleMainLoader,
        ...rest
      } = this.props
      const { title } = options

      return (
        <section>
          <Header sortBy={this.sortBy} total={total} title={title} />
          <List
            mode={mode}
            directory={directory}
            packages={packages}
            loading={loading}
            toggleMainLoader={toggleMainLoader}
          />
        </section>
      )
    }
  }
}

export default withHeaderList
